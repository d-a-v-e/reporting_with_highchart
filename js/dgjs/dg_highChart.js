var TotalZoomChart = function() {

    return {
        init: $(function () {

            var totalSalesURL = "http://www.biota-labs.com/ei/sales/ei_return_sales_total_week.php?clientid=1&campaignid=30";
            var outletSalesURL = "http://www.biota-labs.com/ei/sales/ei_return_sales_outlet_week.php?clientid=1&campaignid=30"
            var totalSalesData = [];
            var outletSalesData = [];
            var allSeries = [];

            //first ajax call to kick things off and get total sales data
            $.ajax({
                type:'GET',
                dataType:'json',
                url: totalSalesURL,
                success: onDataReceived1
            });

            function onDataReceived1(theData){
                for (var i = 0; i < theData.length; i++) {
                    var dObject = [parseInt(theData[i]["SaleJulian"]),parseInt(theData[i]["volume"])];
                    totalSalesData.push(dObject);
                };
                var tempSeriesObject = {};
                tempSeriesObject = {type:'area', name:'Total Sales', data:totalSalesData};
                allSeries.push(tempSeriesObject);
                addOutlets();
            }

            function addOutlets(){

                $.ajax({
                    type:'GET',
                    dataType:'json',
                    url: outletSalesURL,
                    success: onDataReceived2
                });

                function onDataReceived2(theData){
                    var outletSalesData = theData;
                    var outlets = [];
                    for (var i = 0; i < theData.length; i++) {
                        outlets.push(theData[i]["outlet"]); 
                    };

                    var sortedOutlets = []
                    sortedOutlets = outlets.filter(function(itm,i,outlets){
                        return i==outlets.indexOf(itm);
                    });

                var outletDataObject = [];//data object inside series
                var myLabel;//label for each series (outlet)
                var seriesObject = {};

                for (var i = 0; i < sortedOutlets.length; i++) {
                    outletDataObject = [];
                    myLabel = sortedOutlets[i];

                    for (var j = 0; j < outletSalesData.length; j++) {
                     if (sortedOutlets[i] === outletSalesData[j]["outlet"]){
                        var tempData = [parseInt(outletSalesData[j]["SaleJulian"]),parseInt(outletSalesData[j]["volume"])];
                        outletDataObject.push(tempData);
                    };
                };

                seriesObject = {type:'area', name:myLabel, data:outletDataObject};
                allSeries.push(seriesObject);
            };
            makeChart();
        }

    }


    function makeChart(){
        console.log(allSeries);
        $('#container').highcharts({
            chart: {
                zoomType: 'x',
                spacingRight: 20,
                animation: true
            },
            title: {
                text: 'Total and Individual Sales by Outlets'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                'Click and drag in the plot area to zoom in' :
                'Pinch the chart to zoom in'
            },
            xAxis: {
                type: 'datetime',
                maxZoom: 14 * 24 * 3600000, // fourteen days
                title: {
                    text: null
                }
            },
            yAxis: {
                title: {
                    text: 'Volume'
                }
            },
            tooltip: {
                enabled: true,
                shared: true
            },
            legend: {
                enabled: true
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                        stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    lineWidth: 1,
                    marker: {
                        enabled: false
                    },
                    shadow: false,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },

            series: allSeries
        });
}
})
};
}();

