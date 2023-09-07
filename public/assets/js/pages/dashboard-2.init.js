/*
Author: Darth Vader
Version: 1.0.0
*/

Apex.chart = {
	fontFamily: 'inherit',
	locales: [{
		"name": "fa",
		"options": {
			"months": ["ژانویه", "فوریه", "مارس", "آوریل", "می", "ژوئن", "جولای", "آگوست", "سپتامبر", "اکتبر", "نوامبر", "دسامبر"],
			"shortMonths": ["ژانویه", "فوریه", "مارس", "آوریل", "می", "ژوئن", "جولای", "آگوست", "سپتامبر", "اکتبر", "نوامبر", "دسامبر"],
			"days": ["یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه"],
			"shortDays": ["ی", "د", "س", "چ", "پ", "ج", "ش"],
			"toolbar": {
				"exportToSVG": "دریافت SVG",
				"exportToPNG": "دریافت PNG",
				"exportToCSV": "دریافت CSV",
				"menu": "فهرست",
				"selection": "انتخاب",
				"selectionZoom": "بزرگنمایی قسمت انتخاب شده",
				"zoomIn": "بزرگ نمایی",
				"zoomOut": "کوچک نمایی",
				"pan": "جا به جایی",
				"reset": "بازنشانی بزرگ نمایی"
			}
		}
	}],
	defaultLocale: "fa"
}

		var settings = {
			"url": "http://localhost:8080/api/v1/custom/gatewaycount",
			"method": "POST",
			"timeout": 0,
			"headers": {
			  "Authorization": "Bearer "+getCookie("token"),
			  "Content-Type": "application/json"
			},
  "data": JSON.stringify({
    "start_date": "1402-01-01",
    "start_time": "00:00",
    "end_date": "1402-12-30",
    "end_time": "23:59",
	"all_time" : "0"
  }),
};




$.ajax(settings).done(function (response) {
	
	const monthData = {};
response.count.forEach(entry => {
    monthData[entry.month] = entry.row_count;
});
rowCountsArray = [];
for (let month = 1; month <= 12; month++) {
    const monthStr = `1402-${month.toString().padStart(2, '0')}`;
    rowCountsArray.push(monthData[monthStr] || "0");
}
var options = {
	series: [{
		data: rowCountsArray
	}],
	chart: {
		type: 'bar',
		height: 250,
		toolbar: {
			show: false
		},
	},
	plotOptions: {
		bar: {
			horizontal: true,
			barHeight: '24%',
			endingShape: 'rounded',
		}
	},
	dataLabels: {
		enabled: false
	},
	colors: ['#556ee6'],
	xaxis: {
		categories: [
			'فروردین',
			'اردیبهشت',
			'خرداد',
			'تیر',
			'مرداد',
			'شهریور',
			'مهر',
			'آبان',
			'آذر',
			'دی',
			'بهمن',
			'اسفند'
		],
		title: {
			text: 'تعداد دستگاه های متصل شده'
		},
	},
}


  
	

var chart = new ApexCharts(document.querySelector("#bar-chart"), options);
chart.render();


	});





var options = {
	series: [100],
	chart: {
		height: 120,
		type: 'radialBar',
	},
	plotOptions: {
		radialBar: {
			offsetY: -12,
			hollow: {
				margin: 5,
				size: '60%',
				background: 'rgba(59, 93, 231, .25)',
			},
			dataLabels: {
				name: {
					show: false,
				},
				value: {
					show: true,
					fontSize: '12px',
					offsetY: 5,
				},
				style: {
					colors: ['#fff'],
					fill: ['#fff']
				}
			}
		},
	},
	colors: ['#3b5de7'],
}

var chart = new ApexCharts(document.querySelector("#radial-chart-1"), options);
chart.render();


// Radial chart 2
var options = {
	series: [100],
	chart: {
		height: 120,
		type: 'radialBar',
	},
	plotOptions: {
		radialBar: {
			offsetY: -12,
			hollow: {
				margin: 5,
				size: '60%',
				background: 'rgba(69, 203, 133, .25)',
			},
			dataLabels: {
				name: {
					show: false,
				},
				value: {
					show: true,
					fontSize: '12px',
					offsetY: 5,
				},
				style: {
					colors: ['#fff'],
					fill: ['#fff']
				}
			}
		},
	},
	colors: ['#45CB85'],
}

var chart = new ApexCharts(document.querySelector("#radial-chart-2"), options);
chart.render();