/*
Template Name: Qovex - Responsive Bootstrap 4 Admin Dashboard
Author: Themesbrand
Website: https://themesbrand.com/
Contact: themesbrand@gmail.com
File: Sweet alerts 
*/

!function ($) {
    "use strict";

    var SweetAlert = function () {
    };

    //examples
    SweetAlert.prototype.init = function () {

        //Basic
        $('#sa-basic').on('click', function () {
        	Swal.fire({
        		title: 'هرکسی می تونه از کامپیوتر استفاده کنه',
        		confirmButtonColor: '#3b5de7',
        		confirmButtonText: 'باشه'
        	})
        });

        //A title with a text under
        $('#sa-title').click(function () {
        	Swal.fire({
        		title: "اینترنت؟",
        		text: 'هنوز هم چنین چیزی وجود داره؟',
        		type: 'question',
        		confirmButtonColor: '#3b5de7',
        		confirmButtonText: 'باشه'
        	})
        });

        //Success Message
        $('#sa-success').click(function () {
        	Swal.fire({
        		title: 'عالی بود!',
        		text: 'شما روی دکمه کلیک کردید!',
        		type: 'success',
        		showCancelButton: true,
        		confirmButtonColor: '#3b5de7',
        		cancelButtonColor: "#f46a6a",
        		confirmButtonText: 'باشه',
        		cancelButtonText: 'انصراف'
        	})
        });

        //Warning Message
        $('#sa-warning').click(function () {
        	Swal.fire({
        		title: "آیا اطمینان دارید؟",
        		text: "قادر به بازگردانی این عمل نخواهید بود!",
        		type: "warning",
        		showCancelButton: true,
        		confirmButtonColor: "#34c38f",
        		cancelButtonColor: "#f46a6a",
        		confirmButtonText: "بله، حذف کن!",
        		cancelButtonText: 'انصراف'
        	}).then(function (result) {
        		if (result.value) {
        			Swal.fire({
        				title: "حذف شد!",
        				text: "فایل شما حذف شد.",
        				type: "success",
        				confirmButtonText: 'باشه'
        			});
        		}
        	});
        });

        //Parameter
        $('#sa-params').click(function () {
        	Swal.fire({
        		title: "آیا اطمینان دارید؟",
        		text: "قادر به بازگردانی این عمل نخواهید بود!",
        		type: 'warning',
        		showCancelButton: true,
        		confirmButtonText: "بله، حذف کن!",
        		cancelButtonText: 'نه، حذف نکن!',
        		confirmButtonClass: 'btn btn-success mt-2',
        		cancelButtonClass: 'btn btn-danger ml-2 mt-2',
        		buttonsStyling: false
        	}).then(function (result) {
        		if (result.value) {
        			Swal.fire({
        				title: 'حذف شد!',
        				text: 'فایل شما حذف شد.',
        				type: 'success',
						confirmButtonText: 'باشه'
        			})
        		} else if (
        			// Read more about handling dismissals
        			result.dismiss === Swal.DismissReason.cancel
        		) {
        			Swal.fire({
        				title: 'لغو شد',
        				text: 'فایل خیالی شما در امان است :)',
        				type: 'error',
						confirmButtonText: 'باشه'
        			})
        		}
        	});
        });

        //Custom Image
        $('#sa-image').click(function () {
        	Swal.fire({
        		title: 'عالیه!',
        		text: 'مودال با یک تصویر سفارشی.',
        		imageUrl: 'assets/images/logo-dark.png',
        		imageHeight: 20,
        		confirmButtonColor: "#3b5de7",
        		confirmButtonText: 'باشه',
        		animation: false
        	})
        });
		
        //Auto Close Timer
        $('#sa-close').click(function () {
        	var timerInterval;
        	Swal.fire({
        		title: 'بسته شدن خودکار!',
        		html: 'من تا <strong></strong> ثانیه بسته خواهم شد.',
        		timer: 2000,
        		onBeforeOpen: function () {
        			Swal.showLoading();
        			timerInterval = setInterval(function () {
        				Swal.getContent().querySelector('strong').textContent = Swal.getTimerLeft() / 1000;
        			}, 100);
        		},
        		onClose: function () {
        			clearInterval(timerInterval);
        		}
        	}).then(function (result) {
        		if (
        			// Read more about handling dismissals
        			result.dismiss === Swal.DismissReason.timer
        		) {
        			console.log('من توسط تایمر بسته شدم');
        		}
        	});
        });

        //custom html alert
        $('#custom-html-alert').click(function () {
        	Swal.fire({
        		title: '<u>نمونه</u> <i>HTML</i>',
        		type: 'info',
        		html: 'می تونید از <b>متن ضخیم</b>، ' +
        			'<a href="#">لینک</a> ' +
        			'و سایر تگ های HTML استفاده کنید',
        		showCloseButton: true,
        		showCancelButton: true,
        		confirmButtonClass: 'btn btn-success',
        		cancelButtonClass: 'btn btn-danger ml-1',
        		confirmButtonColor: "#47bd9a",
        		cancelButtonColor: "#f46a6a",
        		confirmButtonText: '<i class="fas fa-thumbs-up mr-1"></i> عالیه!',
        		cancelButtonText: '<i class="fas fa-thumbs-down"></i>'
        	});
        });

        //position
        $('#sa-position').click(function () {
        	Swal.fire({
        		position: 'top-end',
        		type: 'success',
        		title: 'کار شما ذخیره شد',
        		showConfirmButton: false,
        		timer: 1500
        	});
        });

        //Custom width padding
        $('#custom-padding-width-alert').click(function () {
        	Swal.fire({
        		title: 'عرض، فاصله و پس زمینه سفارشی.',
        		width: 600,
        		padding: 100,
        		confirmButtonColor: "#3b5de7",
        		confirmButtonText: 'باشه',
        		background: '#fff url(assets/images/geometry.png)'
        	});
        });

        //Ajax
        $('#ajax-alert').click(function () {
        	Swal.fire({
        		title: 'برای درخواست Ajax ایمیل را ثبت کنید',
        		input: 'email',
        		showCancelButton: true,
        		confirmButtonText: 'ثبت',
        		cancelButtonText: 'انصراف',
        		confirmButtonColor: "#3b5de7",
        		cancelButtonColor: "#f46a6a",
        		showLoaderOnConfirm: true,
        		preConfirm: function (email) {
        			return new Promise(function (resolve, reject) {
        				setTimeout(function () {
        					if (email === 'taken@example.com') {
        						reject('این ایمیل از قبل استفاده شده است.');
        					} else {
        						resolve();
        					}
        				}, 2000);
        			});
        		},
        		allowOutsideClick: false
        	}).then(function (email) {
        		Swal.fire({
        			type: 'success',
        			title: 'درخواست Ajax تمام شد!',
        			html: 'ایمیل ثبت شده: ' + email.value,
        			confirmButtonText: "باشه"
        		});
        	});
        });

        //chaining modal alert
        $('#chaining-alert').click(function () {
        	Swal.mixin({
        		input: 'text',
        		showCancelButton: true,
        		confirmButtonText: 'بعدی &larr;',
        		cancelButtonText: 'انصراف',
        		confirmButtonColor: "#3b5de7",
        		cancelButtonColor: "#74788d",
        		progressSteps: ['1', '2', '3']
        	}).queue([{
        			title: 'سوال 1',
        			text: 'زنجیر بندی مودال های swal2 ساده است'
        		},
        		'سوال 2',
        		'سوال 3'
        	]).then(function (result) {
        		if (result.value) {
        			Swal.fire({
        				title: 'همه مراحل تمام شد!',
        				html: 'پاسخ های شما: <pre><code>' +
        					JSON.stringify(result.value) +
        					'</code></pre>',
        				confirmButtonText: 'عالیه!'
        			});
        		}
        	});
        });

        //Danger
        $('#dynamic-alert').click(function () {
        	swal.queue([{
        		title: 'IP عمومی شما',
        		confirmButtonColor: "#3b5de7",
        		confirmButtonText: 'نمایش IP عمومی من',
        		text: 'IP عمومی شما توسط درخواست Ajax دریافت خواهد شد ',
        		showLoaderOnConfirm: true,
        		preConfirm: function () {
        			return new Promise(function (resolve) {
        				$.get('https://api.ipify.org?format=json')
						.done(function (data) {
							swal.insertQueueStep({
								title: data.ip,
								confirmButtonText: 'باشه'
							});
							resolve();
						});
        			});
        		}
        	}]).catch(swal.noop);
        });

    },
	//init
	$.SweetAlert = new SweetAlert, $.SweetAlert.Constructor = SweetAlert
}(window.jQuery),

//initializing
function ($) {
	"use strict";
	$.SweetAlert.init();
}(window.jQuery);