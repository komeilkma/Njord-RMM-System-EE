/*
Template Name: Qovex - Responsive Bootstrap 4 Admin Dashboard
Author: Themesbrand
Website: https://themesbrand.com/
Contact: themesbrand@gmail.com
File: Form xeditable
*/


$(function () {

    //modify buttons style
    $.fn.editableform.buttons =
        '<button type="submit" class="btn btn-success editable-submit btn-sm waves-effect waves-light"><i class="mdi mdi-check"></i></button>' +
        '<button type="button" class="btn btn-danger editable-cancel btn-sm waves-effect waves-light"><i class="mdi mdi-close"></i></button>';

    //inline

    $('#inline-username').editable({
        type: 'text',
        pk: 1,
        name: 'username',
        title: 'نام کاربری را وارد کنید',
        mode: 'inline',
        inputclass: 'form-control-sm'
    });

    $('#inline-firstname').editable({
        validate: function (value) {
            if ($.trim(value) == '') return 'وارد کردن این فیلد الزامی است';
        },
        mode: 'inline',
		inputclass: 'form-control-sm',
		emptytext: 'خالی'
    });

    $('#inline-sex').editable({
        prepend: "انتخاب نشده",
        mode: 'inline',
        inputclass: 'form-control-sm',
        source: [
            {value: 1, text: 'آقا'},
            {value: 2, text: 'خانم'}
        ],
        display: function (value, sourceData) {
            var colors = {"": "#98a6ad", 1: "#5fbeaa", 2: "#5d9cec"},
                elem = $.grep(sourceData, function (o) {
                    return o.value == value;
                });

            if (elem.length) {
                $(this).text(elem[0].text).css("color", colors[value]);
            } else {
                $(this).empty();
            }
        }
    });

    $('#inline-status').editable({
        mode: 'inline',
		inputclass: 'form-control-sm',
		sourceError: 'خطا در هنگام بارگذاری لیست'
    });

    $('#inline-group').editable({
        showbuttons: false,
        mode: 'inline',
        inputclass: 'form-control-sm'
    });

    $('#inline-dob').editable({
        mode: 'inline',
        inputclass: 'form-control-sm'
    });

    $('#inline-comments').editable({
        showbuttons: 'bottom',
        mode: 'inline',
        inputclass: 'form-control-sm'
    });

});