var GenderCharts = function() {

    return {
        //jsonurl will be passed in from php call to this script
        init: function() {

            var jsonGenderStackedBarURL = "http://www.biota-labs.com/ei/sales/ei_return_sales_gender_country.php?clientid=1&campaignid=31"
            var jsonGenderPieChartURL = "http://www.biota-labs.com/ei/sales/ei_return_sales_gender_campaign.php?clientid=1&campaignid=31";
            var barData;
            var barSeries = [];
            var genderKey = {"M": "Male", "F": "Female", "NA": "Unknown"};
            var customerCounts = [];
            var countries = [];
            var countryTicks = [];
            var genders = [];
            var pieChartSeries = [];
            var pieData;



            //get data from json            
            $.ajax({
                type:'GET',
                dataType:'json',
                url: jsonGenderStackedBarURL,
                success: onDataReceived
            });


            $.ajax({
                type:'GET',
                dataType:'json',
                url: jsonGenderPieChartURL,
                success: onDataReceivedPie
            });

            function onDataReceived(stackedBarJsonData){
                barData = stackedBarJsonData;
                sortData();
                getShitDone();
                plotTheChart();
            }

            function sortData(){
                console.log("get countries and sort them");
                var unsortedCountries = [];
                var unsortedGenders = [];
                for (var i = 0; i < barData.length; i++) {
                    unsortedCountries[i] = barData[i]["country"];
                    unsortedGenders[i] = barData[i]["gender"];
                };
                countries = unsortedCountries.filter(function(itm,i,unsortedCountries){
                    return i==unsortedCountries.indexOf(itm);
                });
                genders = unsortedGenders.filter(function(itm,i,unsortedGenders){
                    return i==unsortedGenders.indexOf(itm);
                });
                for (var i = 0; i < countries.length; i++) {
                    var countryTemp = [i,countries[i]];
                    countryTicks.push(countryTemp);
                };

            }

            function getShitDone(){
                var myData = [];//data object inside series
                var myLabel;//label for each series (outlet)
                var order;
                var seriesObject = {};

                for (var i = 0; i < genders.length; i++) {
                    myData = [];
                    myLabel = genderKey[genders[i]];
                    order = 0;
                    for (var j = 0; j < barData.length; j++) {
                     if (genders[i] === barData[j]["gender"]){
                        var tempData = [order,parseInt(barData[j]["customers"])];
                        myData.push(tempData);
                        order++;
                    };
                };

                seriesObject = {data:myData,label:myLabel};
                barSeries.push(seriesObject);
            };
            console.log(barSeries);
        }

            function plotTheChart(){
            var fontOptions = {
                size: 9,
                lineHeight: 10,
                style: "italic",
                family: "sans-serif",
                color: "#545454"
            }
            var options = {
                xaxis: {
                   ticks: countryTicks, tickColor: '#ffffff',
                   font:fontOptions,
               },
               series: {
                bars: {
                    show: true,
                    barWidth: .6,
                    align: "center"
                },
                stack: true
            }
        };

            $.plot("#gender-stacked-chart", barSeries, options);
    }


            //following is for the pie chart...
            function onDataReceivedPie(pieJson){

                pieData = pieJson;

                for (var i = 0; i < pieData.length; i++) {
                    var seriesObjectPieTemp = {label: genderKey[pieData[i]["gender"]],data: pieData[i]["customers"]};
                    pieChartSeries.push(seriesObjectPieTemp);
                };
                console.log(pieChartSeries);
                buildPieChart();
    }

            function buildPieChart(){

                $.plot('#gender-pie-chart', pieChartSeries,
                {
                    legend: {show: false},
                    series: {
                        pie: {
                            show: true,
                            radius: 1,
                            label: {
                                show: true,
                                radius: 3 / 4,
                                formatter: function(label, pieSeries) {
                                    return '<div class="chart-pie-label">' + label + '<br>' + Math.round(pieSeries.percent) + '%</div>';
                                },
                                background: {opacity: 0.75, color: '#000000'}
                            }
                        }
                    }
                }
                    );
            }

    }
    };
}();