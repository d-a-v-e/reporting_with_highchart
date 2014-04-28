var BarCharts = function() {

    return {
        //jsonurl is passed in from php call to this script
        init: function(jsonexternalurl) {

            var jsonexternalurl = "http://www.biota-labs.com/ei/sales/ei_return_sales_outlet.php?clientid=1&campaignid=29"
            var dataJson;
            var venueTicks = new Array();
            var volumes = new Array();
            var eventvenues = new Array();
            var sortedEventVenues = new Array();
            var outlets = new Array();
            var sortedOutlets = new Array();
            var values = new Array();
            var mySeries = new Array();
            var ticksArray = new Array();



            //get data from json            
            $.ajax({
                type:'GET',
                dataType:'json',
                url: jsonexternalurl,
                success: onDataReceived
            });

            function onDataReceived(series){
                dataJson = series;
                sortData();
                getOutlets();
                getVenues();
                getShitDone();
                plotTheChart();
            }

            function sortData(){
                console.log("split up data");
                for (var i = 0; i < dataJson.length; i++) {
                    volumes[i] = dataJson[i]["volume"];
                    eventvenues[i] = dataJson[i]["eventvenue"];
                    outlets[i] = dataJson[i]["outlet"];
                    values[i] = dataJson[i]["value"];
                };
            }

            function getVenues(){
                var currentVenue = eventvenues[0];
                sortedEventVenues[0] = eventvenues[0];
                venueTicksTemp = [0,eventvenues[0]];
                venueTicks.push(venueTicksTemp);
                var count = 1;
                for (var i = 0; i < eventvenues.length; i++) {
                    if(currentVenue !== eventvenues[i]){
                        sortedEventVenues.push(eventvenues[i]);
                        currentVenue = eventvenues[i];
                        venueTicksTemp = [count,currentVenue];
                        venueTicks.push(venueTicksTemp);
                        count++;
                    }
                }
            }

            function getOutlets(){
                console.log("find number of outlets");
                sortedOutlets = outlets.filter(function(itm,i,outlets){
                    return i==outlets.indexOf(itm);
                });
            }



            function getShitDone(){
                var myData = [];//data object inside series
                var myLabel;//label for each series (outlet)
                var order;
                var seriesObject = {};
                var started = false;

                for (var i = 0; i < sortedOutlets.length; i++) {
                    started = true;
                    myData = [];
                    myLabel = sortedOutlets[i];
                    order = 0;

                    for (var j = 0; j < dataJson.length; j++) {
                         if (sortedOutlets[i] === dataJson[j]["outlet"]){
                            var tempData = [order,dataJson[j]["volume"]];
                            myData.push(tempData);
                            order++;
                         };
                    };

                    seriesObject = {data:myData,label:myLabel};
                    mySeries.push(seriesObject);
                };
                console.log(venueTicks);
                console.log(mySeries);
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
                       ticks: venueTicks, tickColor: '#ffffff',
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
                $.plot("#chart-bars", mySeries, options);
            }

        }
    };
}();