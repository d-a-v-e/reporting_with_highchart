/*
 *  Document   : compCharts.js
 *  Author     : pixelcave
 *  Description: Custom javascript code used in Charts page
 */

 var CompCharts = function() {

    return {
        //jsonurl is passed in from php call to this script
        init: function(jsonurl) {

            // Get the elements where we will attach the charts
            var chartClassic = $('#chart-classic');
            // Random data for the charts which flot charts has no trouble reading and displaying
            var dataSales = [[1, 500], [2, 420], [3, 480], [4, 350], [5, 600], [6, 850], [7, 1100], [8, 950], [9, 1220], [10, 1300], [11, 1500], [12, 1700]];
            var dataEarnings = [[1, 1560], [2, 1650], [3, 1320], [4, 1950], [5, 1800], [6, 2400], [7, 2100], [8, 2550], [9, 3300], [10, 3900], [11, 4200], [12, 4500]];
            //'ticks' for chart on x-axis
            var chartMonths = [[1, 'Jan'], [2, 'Feb'], [3, 'Mar'], [4, 'Apr'], [5, 'May'], [6, 'Jun'], [7, 'Jul'], [8, 'Aug'], [9, 'Sep'], [10, 'Oct'], [11, 'Nov'], [12, 'Dec']];
            //array to receive json data (at the moment stored locally on computer) json 'data' is exactly the same as 'dataSales[]'
            var dataJson = [];

			//get data from json 			
			$.ajax({
				url: jsonurl,
				type: "GET",
				dataType: "json",
				success: onDataReceived
			});

           function onDataReceived(series) {
            //push only json "data" items into dataJson[]
            dataJson.push(series["data"]);
             buildTable();
         }

         function buildTable(){
            $.plot(chartClassic,
                [
                {
                    label: 'Earnings',
                        //reads fine from dataEarnings
                        data: dataEarnings,
                        lines: {show: true, fill: true, fillColor: {colors: [{opacity: 0.25}, {opacity: 0.25}]}},
                        points: {show: true, radius: 6}
                    },
                    {
                        label: 'Sales',
                        data: dataJson[0],
                        lines: {show: true, fill: true, fillColor: {colors: [{opacity: 0.15}, {opacity: 0.15}]}},
                        points: {show: true, radius: 6}
                    }
                    ],
                    {
                        colors: ['#3498db', '#333333'],
                        legend: {show: true, position: 'nw', margin: [15, 10]},
                        grid: {borderWidth: 0, hoverable: true, clickable: true},
                        yaxis: {ticks: 4, tickColor: '#eeeeee'},
                        xaxis: {ticks: chartMonths, tickColor: '#ffffff'}
                    }
                    );
};
}
};
}();