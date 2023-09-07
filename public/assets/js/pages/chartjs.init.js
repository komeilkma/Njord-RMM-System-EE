/*
Template Name: Qovex - Responsive Bootstrap 4 Admin Dashboard
Author: Themesbrand
Website: https://themesbrand.com/
Contact: themesbrand@gmail.com
File: Chartjs chart
*/

!function($) {
	"use strict";
	
	Chart.defaults.global.defaultFontFamily = '"primary-font", "segoe ui", "tahoma"';

    var ChartJs = function() {};

    ChartJs.prototype.respChart = function(selector,type,data, options) {
        Chart.defaults.global.defaultFontColor="#8791af",
        Chart.defaults.scale.gridLines.color="rgba(166, 176, 207, 0.1)";
        // get selector by context
        var ctx = selector.get(0).getContext("2d");
        // pointing parent container to make chart js inherit its width
        var container = $(selector).parent();

        // enable resizing matter
        $(window).resize( generateChart );

        // this function produce the responsive Chart JS
        function generateChart(){
            // make chart width fit with its container
            var ww = selector.attr('width', $(container).width() );
            switch(type){
                case 'Line':
                    new Chart(ctx, {type: 'line', data: data, options: options});
                    break;
                case 'Doughnut':
                    new Chart(ctx, {type: 'doughnut', data: data, options: options});
                    break;
                case 'Pie':
                    new Chart(ctx, {type: 'pie', data: data, options: options});
                    break;
                case 'Bar':
                    new Chart(ctx, {type: 'bar', data: data, options: options});
                    break;
                case 'Radar':
                    new Chart(ctx, {type: 'radar', data: data, options: options});
                    break;
                case 'PolarArea':
                    new Chart(ctx, {data: data, type: 'polarArea', options: options});
                    break;
            }
            // Initiate new chart or Redraw

        };
        // run function - render chart at first load
        generateChart();
    },
    //init
    ChartJs.prototype.init = function() {
        //creating lineChart
        var lineChart = {
            labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی'],
            datasets: [
                {
                    label: "آمار فروش",
                    fill: true,
                    lineTension: 0.5,
                    backgroundColor: "rgba(59, 93, 231, 0.2)",
                    borderColor: "#3b5de7",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "#3b5de7",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "#3b5de7",
                    pointHoverBorderColor: "#fff",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [65, 59, 80, 81, 56, 55, 40, 55, 30, 80]
                },
                {
                    label: "درآمد ماهانه",
                    fill: true,
                    lineTension: 0.5,
                    backgroundColor: "rgba(235, 239, 242, 0.2)",
                    borderColor: "#ebeff2",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "#ebeff2",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "#ebeff2",
                    pointHoverBorderColor: "#eef0f2",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [80, 23, 56, 65, 23, 35, 85, 25, 92, 36]
                }
            ]
        };

        var lineOpts = {
            scales: {
                yAxes: [{
                    ticks: {
                        max: 100,
                        min: 20,
                        stepSize: 10
                    }
                }]
            }
        };

        this.respChart($("#lineChart"),'Line',lineChart, lineOpts);

        //donut chart
        var donutChart = {
            labels: [
                "دسکتاپ",
                "تبلت"
            ],
            datasets: [
                {
                    data: [300, 210],
                    backgroundColor: [
                        "#3b5de7",
                        "#ebeff2"
                    ],
                    hoverBackgroundColor: [
                        "#3b5de7",
                        "#ebeff2"
                    ],
                    hoverBorderColor: "#fff"
                }]
        };
        this.respChart($("#doughnut"),'Doughnut',donutChart);


        //Pie chart
        var pieChart = {
            labels: [
                "دسکتاپ",
                "تبلت"
            ],
            datasets: [
                {
                    data: [300, 180],
                    backgroundColor: [
                        "#45cb85",
                        "#ebeff2"
                    ],
                    hoverBackgroundColor: [
                        "#45cb85",
                        "#ebeff2"
                    ],
                    hoverBorderColor: "#fff"
                }]
        };
        this.respChart($("#pie"),'Pie',pieChart);


        //barchart
        var barChart = {
            labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر'],
            datasets: [
                {
                    label: "آمار فروش",
                    backgroundColor: "rgba(69, 203, 133, 0.8)",
                    borderColor: "rgba(69, 203, 133, 0.8)",
                    borderWidth: 1,
                    hoverBackgroundColor: "rgba(69, 203, 133, 0.9)",
                    hoverBorderColor: "rgba(69, 203, 133, 0.9)",
                    data: [65, 59, 81, 45, 56, 80, 50,20]
                }
            ]
        };
        var barOpts = {
            scales: {
                xAxes: [{
                    barPercentage: 0.4
                }]
            }
        }
        this.respChart($("#bar"),'Bar',barChart, barOpts);


        //radar chart
        var radarChart = {
            labels: ["خوردن", "نوشیدن", "خوابیدن", "طراحی", "کدنویسی", "دوچرخه سواری", "دویدن"],
            datasets: [
                {
                    label: "دسکتاپ",
                    backgroundColor: "rgba(238, 185, 2, 0.2)",
                    borderColor: "#EEB902",
                    pointBackgroundColor: "#EEB902",
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "#EEB902",
                    data: [65, 59, 90, 81, 56, 55, 40]
                },
                {
                    label: "تبلت",
                    backgroundColor: "rgba(69, 203, 133, 0.2)",
                    borderColor: "#45cb85",
                    pointBackgroundColor: "#45cb85",
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "#45cb85",
                    data: [28, 48, 40, 19, 96, 27, 100]
                }
            ]
        };
        this.respChart($("#radar"),'Radar',radarChart);

        //Polar area  chart
        var polarChart = {
            datasets: [{
                data: [
                    11,
                    16,
                    7,
                    18
                ],
                backgroundColor: [
                    "#ff715b",
                    "#45cb85",
                    "#eeb902",
                    "#3b5de7"
                ],
                label: 'مجموعه داده من', // for legend
                hoverBorderColor: "#fff"
            }],
            labels: [
                "سری 1",
                "سری 2",
                "سری 3",
                "سری 4"
            ]
        };
        this.respChart($("#polarArea"),'PolarArea',polarChart);
    },
    $.ChartJs = new ChartJs, $.ChartJs.Constructor = ChartJs

}(window.jQuery),

//initializing
function($) {
    "use strict";
    $.ChartJs.init();
}(window.jQuery);