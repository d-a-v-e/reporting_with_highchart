$(function() {

		var options = {
			lines: {
				show: true
			},
			points: {
				show: true
			},
			xaxis: {
				tickDecimals: 0,
				tickSize: 1
			}
		};

		var data = [];

		$.plot("#placeholder", data, options);

		// Fetch one series, adding to what we already have

		var alreadyFetched = {};
		
				$.ajax({
				url: "http://www.flotcharts.org/flot/examples/ajax/data-eu-gdp-growth.json",
				type: "GET",
				dataType: "json",
				success: onDataReceived
			});

			function onDataReceived(series) {

				if (!alreadyFetched[series.label]) {
					alreadyFetched[series.label] = true;
					data.push(series);
				}

				$.plot("#placeholder", data, options);
			}


		);




	});