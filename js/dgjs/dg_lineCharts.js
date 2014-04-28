
 var LineCharts = function() {

    return {
        //jsonurl is passed in from php call to this script
        init: function() {

            var chartClassic = $('#chart-line');
            var outletSalesJsonURL = "http://www.biota-labs.com/ei/sales/ei_return_sales_outlet_month.php?clientid=1&campaignid=30";
            var totalSalesJsonURL = "http://www.biota-labs.com/ei/sales/ei_return_sales_total_month.php?clientid=1&campaignid=30";

            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            var totalSalesJson;
            var outletSalesJson;
            var dateTicks = [];
            var salesSeries = [];
            var outlets = [];
            var sortedOutlets = [];
            var allSeries = [];

            $.ajax({
                url: totalSalesJsonURL,
                type: "GET",
                dataType: "json",
                success: onDataReceivedTotal
            });

        function onDataReceivedTotal(totalSalesData) {
            totalSalesJson = totalSalesData;
            createTotalSalesAndTicks();
            nextAjaxCall();
        }


        function createTotalSalesAndTicks(){
            for (var i = 0; i < totalSalesJson.length; i++) {
                var mySeriesObject = [i+1,parseInt(totalSalesJson[i]["volume"])];
                salesSeries.push(mySeriesObject);
                var monthPlusYear = (months[totalSalesJson[i]["SaleMonth"]-1] + "," + totalSalesJson[i]["SaleYear"]);
                var dateTicksObject = [i+1,monthPlusYear];
                dateTicks.push(dateTicksObject);
            };

            var salesSeriesObject = {data:salesSeries,label:"Total"};
            allSeries.push(salesSeriesObject);
        }

        function nextAjaxCall(){
            $.ajax({
                url: outletSalesJsonURL,
                type: "GET",
                dataType: "json",
                success: onDataReceivedOutlet
            });

            function onDataReceivedOutlet(outletData){
                outletSalesJson = outletData;
                for (var i = 0; i < outletSalesJson.length; i++) {
                    outlets.push(outletSalesJson[i]["outlet"]); 
                };
                getOutlets();
                createOutletsSeries();

            }
        }



            function getOutlets(){
                sortedOutlets = outlets.filter(function(itm,i,outlets){
                    return i==outlets.indexOf(itm);
                });
            }



            function createOutletsSeries(){

                var outletDataObject = [];//data object inside series
                var myLabel;//label for each series (outlet)
                var order;
                var seriesObject = {};
                var started = false;

                for (var i = 0; i < sortedOutlets.length; i++) {
                    started = true;
                    outletDataObject = [];
                    myLabel = sortedOutlets[i];
                    order = 1;

                    for (var j = 0; j < outletSalesJson.length; j++) {
                         if (sortedOutlets[i] === outletSalesJson[j]["outlet"]){
                            var tempData = [order,parseInt(outletSalesJson[j]["volume"])];
                            outletDataObject.push(tempData);
                            order++;
                         };
                    };

                    seriesObject = {data:outletDataObject,label:myLabel};
                    allSeries.push(seriesObject);
                };
                buildTable();
            }

        function buildTable(){

            var options = 
                    {
                       // colors: ['#3498db', '#333333'],
                        legend: {show: true, position: 'nw', margin: [15, 10]},
                        grid: {borderWidth: 0, hoverable: true, clickable: true},
                        yaxis: {ticks: 4, tickColor: '#eeeeee'},
                        xaxis: {ticks: dateTicks, tickColor: '#ffffff'}
                    };

            var allSeriesWithOptions = [];
            for (var i = 0; i < allSeries.length; i++) {
                var seriesObjectWithOptions = {
                        label: allSeries[i].label,
                        data: allSeries[i].data,
                        lines: {show: true, fill: false},//, fillColor: {colors: [{opacity: 0.25}, {opacity: 0.25}]}},
                        points: {show: true, radius: 3}
                };
                allSeriesWithOptions.push(seriesObjectWithOptions);
            };
            console.log(allSeriesWithOptions);
            console.log(options);

           $.plot(chartClassic,allSeriesWithOptions,options);
        }

            // Creating and attaching a tooltip to the classic chart
            var previousPoint = null, ttlabel = null;
            chartClassic.bind('plothover', function(event, pos, item) {

                if (item) {
                    if (previousPoint !== item.dataIndex) {
                        previousPoint = item.dataIndex;

                        $('#chart-tooltip').remove();
                        var y = item.datapoint[1];
                        var name = item.series.label;
                        ttlabel = '<strong>' + y + '</strong>';


                        $('<div id="chart-tooltip" class="chart-tooltip">' + ttlabel + '<br>' + name +'</div>')
                            .css({top: item.pageY - 45, left: item.pageX + 5}).appendTo("body").show();
                    }
                }
                else {
                    $('#chart-tooltip').remove();
                    previousPoint = null;
                }
            });
    }

};
}();