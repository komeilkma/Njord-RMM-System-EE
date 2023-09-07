/*
Template Name: Qovex - Responsive Bootstrap 4 Admin Dashboard
Author: Themesbrand
Website: https://themesbrand.com/
Contact: themesbrand@gmail.com
File: Range slider 
*/


$(document).ready(function () {
    $("#range_01").ionRangeSlider({
        skin: "round"
    });
    
    $("#range_02").ionRangeSlider({
        skin: "round",
        min: 100,
        max: 1000,
        from: 550
    });
    
    $("#range_03").ionRangeSlider({
        skin: "round",
        type: "double",
        grid: true,
        min: 0,
        max: 1000,
        from: 200,
        to: 800,
        prefix: '<span class="d-inline-block">تومان</span> '
    });
   
    $("#range_04").ionRangeSlider({
        skin: "round",
        type: "double",
        grid: true,
        min: -1000,
        max: 1000,
        from: -500,
        to: 500
    });
    
    $("#range_05").ionRangeSlider({
        skin: "round",
        type: "double",
        grid: true,
        min: -1000,
        max: 1000,
        from: -500,
        to: 500,
        step: 250
    });
    
    $("#range_06").ionRangeSlider({
        skin: "round",
        grid: true,
        from: 3,
        values: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"]
    });
    
    $("#range_07").ionRangeSlider({
        skin: "round",
        grid: true,
        min: 1000,
        max: 1000000,
        from: 200000,
        step: 1000,
        prettify_enabled: true,
        prettify_separator: ","
    });
    
    $("#range_08").ionRangeSlider({
        skin: "round",
        min: 100,
        max: 1000,
        from: 550,
        disable: true
    });
	
	$("#range_09").ionRangeSlider({
        skin: "round",
        grid: true,
        min: 18,
        max: 70,
        from: 30,
        postfix: ' <span class="d-inline-block">سن</span>',
        max_postfix: "+"
    });
	
	$("#range_10").ionRangeSlider({
        skin: "round",
        type: "double",
        min: 100,
        max: 200,
        from: 145,
        to: 155,
        prefix: '<span class="d-inline-block">کیلوگرم</span> ',
        postfix: ' <span class="d-inline-block">:وزن</span>',
        decorate_both: true
    });
	
	$("#range_11").ionRangeSlider({
        skin: "round",
        type: "single",
        grid: true,
        min: -90,
        max: 90,
        from: 0,
        postfix: ' <span class="d-inline-block">تومان</span>'
	});
	
    $("#range_12").ionRangeSlider({
        skin: "round",
        type: "double",
        min: 1000,
        max: 2000,
        from: 1200,
        to: 1800,
        hide_min_max: true,
        hide_from_to: true,
        grid: true
    });
});