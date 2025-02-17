// Basic DataTable
$(function(){
	$('#basicExample').DataTable({
		'iDisplayLength': 4,
		"language": {
			"lengthMenu": "نمایش _MENU_ در هر صفحه",
			"info": "نمایش صفحه _PAGE_ از _PAGES_",
		}
	});
});



// FPrint/Copy/CSV
setTimeout(() => {
$(function(){
	$('#copy-print-csv').DataTable( {
		order: [[0, 'desc']],
		dom: 'Bfrtip',
		buttons: [
			'copyHtml5',
			'excelHtml5',
			'pdfHtml5',
			'print'
		],
		'iDisplayLength': 20,
	});
});

}, 1000)



$(function(){
	$('#copy-print-csv2').DataTable( {
		dom: 'Bfrtip',
		buttons: [
			'copyHtml5',
			'excelHtml5',
			'csvHtml5',
			'pdfHtml5',
			'print'
		],
		'iDisplayLength': 20,
	});
});


$(function(){
	$('#copy-print-csv3').DataTable( {
		dom: 'Bfrtip',
		buttons: [
			'copyHtml5',
			'excelHtml5',
			'csvHtml5',
			'pdfHtml5',
			'print'
		],
		'iDisplayLength': 20,
	});
});

// Fixed Header
$(document).ready(function(){
	var table = $('#fixedHeader').DataTable({
		fixedHeader: true,
		'iDisplayLength': 4,
		"language": {
			"lengthMenu": "نمایش _MENU_ در هر صفحه",
			"info": "نمایش صفحه _PAGE_ از _PAGES_",
		}
	});
});


// Vertical Scroll
$(function(){
	$('#scrollVertical').DataTable({
		"scrollY": "207px",
		"scrollCollapse": true,
		"paging": false,
		"bInfo" : false,
	});
});



// Row Selection
$(function(){
	$('#rowSelection').DataTable({
		'iDisplayLength': 4,
		"language": {
			"lengthMenu": "نمایش _MENU_ در هر صفحه",
			"info": "نمایش صفحه _PAGE_ از _PAGES_",
		}
	});
	var table = $('#rowSelection').DataTable();

	$('#rowSelection tbody').on( 'click', 'tr', function () {
		$(this).toggleClass('selected');
	});

	$('#button').on('click', function () {
		alert( table.rows('.selected').data().length +' row(s) selected' );
	});
});



// Highlighting rows and columns
$(function(){
	$('#highlightRowColumn').DataTable({
		'iDisplayLength': 4,
		"language": {
			"lengthMenu": "نمایش _MENU_ در هر صفحه",
		}
	});
	var table = $('#highlightRowColumn').DataTable();  
	$('#highlightRowColumn tbody').on('mouseenter', 'td', function (){
		var colIdx = table.cell(this).index().column;
		$(table.cells().nodes()).removeClass('highlight');
		$(table.column(colIdx).nodes()).addClass('highlight');
	});
});



// Using API in callbacks
$(function(){
	$('#apiCallbacks').DataTable({
		'iDisplayLength': 4,
		"language": {
			"lengthMenu": "نمایش _MENU_ در هر صفحه",
		},
		"initComplete": function(){
			var api = this.api();
			api.$('td').on('click', function(){
			api.search(this.innerHTML).draw();
		});
		}
	});
});


// Hiding Search and Show entries
$(function(){
	$('#hideSearchExample').DataTable({
		'iDisplayLength': 4,
		"searching": false,
		"language": {
			"lengthMenu": "نمایش _MENU_ در هر صفحه",
			"info": "نمایش صفحه _PAGE_ از _PAGES_",
		}
	});
});
