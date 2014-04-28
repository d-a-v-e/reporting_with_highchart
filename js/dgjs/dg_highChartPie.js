var PieChart = function() {
	return {
		init: function(clientid,campaignid,sourceid){
			console.log(clientid +", "+campaignid +", "+sourceid);
			var URL = "http://www.biota-labs.com/ei/sales/ei_return_sales_total_ticket.php?";
			var dataURL = "http://www.biota-labs.com/ei/sales/ei_return_sales_total_ticket.php?clientid=1&campaignid=30&sourceid=5";
			if(sourceid === 0){
				dataURL = (URL+"clientid="+clientid+"&campaignid="+campaignid);
			}
			else{
				dataURL = (URL+"clientid="+clientid+"&campaignid="+campaignid+"&sourceid="+sourceid);
			}
			var pieData = [];

			$.ajax({
				type:'GET',
				dataType:'json',
				url: dataURL,
				success: onDataReceived
			});

			function onDataReceived(theData){
				for (var i = 0; i < theData.length; i++){
					var tempPieData = [theData[i]["productdescription"],parseInt(theData[i]["volume"])];
					pieData.push(tempPieData);
				};
				console.log(pieData);
				makeChart();
			}

			function makeChart(){
				$('#pie-container').highcharts({
					chart: {
						plotBackgroundColor: null,
						plotBorderWidth: null,
						plotShadow: false
					},
					title: {
						text: null
					},
					tooltip: {
						pointFormat: '{series.name}: <b>{point.y}</b>'
					},
					plotOptions: {
						pie: {
							allowPointSelect: true,
							cursor: 'pointer',
							dataLabels: {
								enabled: true,
								color: '#000000',
								connectorColor: '#000000',
								format: '<b>{point.name}</b>: {point.percentage:.1f} %',
								style: {
									fontSize:'70%'
								}
							}
						}
					},
					series: [{
						type: 'pie',
						name: 'Ticket Share',
						data: pieData
					}]
				});
			}

		}
};
}();