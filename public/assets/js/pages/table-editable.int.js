/*
Template Name: Qovex - Responsive Bootstrap 4 Admin Dashboard
Author: Themesbrand
Website: https://themesbrand.com/
Contact: themesbrand@gmail.com
File: table editable
*/

(function ($) {

    var datatable = $('.table-editable').dataTable({
            "columns": [
            { "name": "id" },
            { "name": "age" },
            { "name": "qty" },
            { "name": "cost" },
            ],
            "bPaginate": false,
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            	var setCell = function (response, newValue) {
            		var table = new $.fn.dataTable.Api('.table');
            		var cell = table.cell('td.focus');
            		var cellData = cell.data();

            		var div = document.createElement('div');
            		div.innerHTML = cellData;
            		var a = div.childNodes;
            		a.innerHTML = newValue;

            		console.log('jml a new ' + div.innerHTML);
            		cell.data(div.innerHTML);
            		highlightCell($(cell.node()));

            		// This is huge cheese, but the a has lost it's editable nature.  Do it again.
            		$('td.focus a').editable({
            			'mode': 'inline',
            			'success': setCell
            		});
            	};
            	$('.editable').editable({
            		'mode': 'inline',
            		'success': setCell
            	});
            },
            "autoFill" : {
                "columns" : [1, 2]
            },
			"keys" : true,
			"language": {
				"sEmptyTable":     "هیچ داده ای در جدول وجود ندارد",
				"sInfo":           "نمایش _START_ تا _END_ از _TOTAL_ رکورد",
				"sInfoEmpty":      "نمایش 0 تا 0 از 0 رکورد",
				"sInfoFiltered":   "(فیلتر شده از _MAX_ رکورد)",
				"sInfoPostFix":    "",
				"sInfoThousands":  ",",
				"sLengthMenu":     "نمایش _MENU_ رکورد",
				"sLoadingRecords": "در حال بارگزاری...",
				"sProcessing":     "در حال پردازش...",
				"sSearch":         "جستجو:",
				"sZeroRecords":    "رکوردی با این مشخصات پیدا نشد",
				"oPaginate": {
					"sFirst":    "ابتدا",
					"sLast":     "انتها",
					"sNext":     "بعدی",
					"sPrevious": "قبلی"
				},
				"oAria": {
					"sSortAscending":  ": فعال سازی نمایش به صورت صعودی",
					"sSortDescending": ": فعال سازی نمایش به صورت نزولی"
				},
				"autoFill": {
					'button': '>',
					'increment': 'افزایش / کاهش هر سلول به مقدار: <input type="number" value="1">',
					'fillHorizontal': 'پر کردن افقی سلول ها',
					'fillVertical': 'پر کردن عمودی سلول ها',
					'cancel': 'انصراف',
					'fill': 'پر کردن همه سلول ها با مقدار این سلول'
				}
			}
        });
        
    addCellChangeHandler();
    addAutoFillHandler();
        
    function highlightCell($cell) {
        var originalValue = $cell.attr('data-original-value');
        if (!originalValue) {
            return;
        }
        var actualValue = $cell.text();
        if (!isNaN(originalValue)) {
            originalValue = parseFloat(originalValue);
        }
        if (!isNaN(actualValue)) {
            actualValue = parseFloat(actualValue);
        }
        if ( originalValue === actualValue ) {
            $cell.removeClass('cat-cell-modified').addClass('cat-cell-original');
        } else {
            $cell.removeClass('cat-cell-original').addClass('cat-cell-modified');
        }
    }

    function addCellChangeHandler() {
        $('a[data-pk]').on('hidden', function (e, editable) {
            var $a = $(this);
            var $cell = $a.parent('td');
            highlightCell($cell);
        });
    }

    function addAutoFillHandler() {
        var table = $('.table').DataTable();
        table.on('autoFill', function (e, datatable, cells) {
            var datatableCellApis = $.each(cells, function(index, row) {
                var datatableCellApi = row[0].cell;
                var $jQueryObject = $(datatableCellApi.node());
                highlightCell($jQueryObject);
            });
        });
    }

})(jQuery);