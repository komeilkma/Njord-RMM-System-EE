/*
Template Name: Qovex - Responsive Bootstrap 4 Admin Dashboard
Author: Themesbrand
Website: https://themesbrand.com/
Contact: themesbrand@gmail.com
File: Session time 
*/

$.sessionTimeout({
	title: 'جلسه شما در حال اتمام است!',
	message: 'جلسه شما در حال اتمام است.',
	keepAliveUrl: 'pages-starter.html',
	logoutButton: 'خروج',
	keepAliveButton: 'متصل ماندن',
	logoutUrl: 'pages-login.html',
	redirUrl: 'pages-lock-screen.html',
	warnAfter: 3000,
	redirAfter: 30000,
	countdownMessage: 'انتقال پس از {timer} ثانیه.'
});