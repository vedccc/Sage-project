var dtable;
$(document).ready(function () {
    dtable = $('#list').DataTable({
        "colReoder": false,
        "pageLength": 10,
        "processing": true,
        "serverSide": true,
        "scrollX": true,
        "paging": true,
        "lengthChange": false,
        // "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100]],
        "ajax": {
            "type": "GET",
            "url": "/user-management/list",
        },
        'columns':
            [
                { "data": "", "defaultContent": "", 'name': '_id', "orderable": false },
                { "data": "name", "defaultContent": "", 'name': 'name', "orderable": false },
                { "data": "email", "defaultContent": "", 'name': 'email', "orderable": false },
                { "data": "mobile_number", "defaultContent": "", 'name': 'mobile_number', "orderable": false },
                { "data": "state", "defaultContent": "", 'name': 'state', "orderable": false },
                { "data": "city", "defaultContent": "", 'name': 'city', "orderable": false },
                { "data": "address", "defaultContent": "", 'name': 'address', "orderable": false },
            ],
        "columnDefs": [
            {
                "className": "actioncell",
                "orderable": false,
                "searchable": false,
                "sortable": false,
                "targets": [0],
                "width": "5%",
            },
        ],
        "order": [0, 'desc'],
    });

    dtable.on('draw', function () {
        dtable.column(0, { search: 'applied', order: 'applied' }).nodes().each(
            function (cell, i) {
                cell.innerHTML = i + 1;
            }
        );
    });

    $('body').on('click', '.btn_add', function (e) {
        e.preventDefault();
        const self = $(this);
        $.ajax({
            type: 'GET',
            url: '/user-management/add',
            dataType: 'json',
            data: {},
            success: function (data) {
                if (data.status == 1) {
                    $('.list-index').hide();
                    $('.dynamic-container').html(data.html);
                    addselect2('.select2');
                }
            }
        });
    });
    $('body').on('submit', '#add', function (e) {
        e.preventDefault();
        var formData = $("#add").serialize();
        $('label span.error').remove();
        $('#submit_btn').attr('disabled', true);
        $.ajax({
            url: AUTH_HTTP_PATH + "user-management/store",
            dataType: 'json',
            data: formData,
            type: 'POST',
            success: function (data) {
                if (data.status == 1) {
                    show_toaster("user management system", data.message, "success", function () {
                        $('.dynamic-container').html('');
                        $('#submit_btn').attr('disabled', false);
                        $('.list-index').show();
                        dtable.ajax.reload();
                    });
                } else if (data.status == 0) {
                    show_toaster("Oops!", data.message, "error");
                    $('#submit_btn').attr('disabled', false);
                } else {
                    error_display(data.message);
                    $('#submit_btn').attr('disabled', false);
                }
            }
        });
    });
});