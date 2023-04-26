var dtable;
$(document).ready(function () {
    dtable = $('#list').DataTable({
        "colReoder": false,
        "pageLength": 10,
        "serverSide": true,
        "scrollX": true,
        "paging": true,
        "lengthChange": false,
        "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100]],
        "ajax": {
            "type": "GET",
            "url": "/state/list",
        },
        'columns':
            [
              
                { "data": "", "defaultContent": "", 'name': '_id', "orderable": false },
                { "data": "name", "defaultContent": "", 'name': 'name', "orderable": false },
                {
                    'data': { "status": "status", "id": "_id" },
                    "name": "status",
                    render: function (data) {
                        if (data.status == 1) {
                            return `<span class="label label-rouded label-success">Activated</span>`;
                        } else {
                            return `<span class="label label-rouded label-danger">Deactivated</span>`;
                        }
                    },
                },
                {
                    'data': { "status": "status", "id": "_id" }, "orderable": false,
                    render: function (data) {
                        // return `<a title="Edit" class="edit_form btn btn-success btn-circle" data-target="${data._id}" style="cursor:pointer"><i class="far fa-edit"></i></a>`;

                        // html = '<a title="Edit" href="#" class="edit_form btn btn-success btn-circle" data-target="'+ data._id +'"><i class="far fa-edit"></i></a> ';
                        if (data.status == 1) {
                            html = '<a title="Deactivate" class="btn btn-danger btn-circle change_status" data-status="0" data-target="'+ data._id +'"><i class="fa fa-times"></i></a> ';
                        } else {
                            html = '<a title="Activate" class="btn btn-success btn-circle change_status" data-status="1" data-target="'+ data._id +'"><i class="fa fa-check"></i></a> ';
                        }
                        return html;
                    },
                },
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
            url: '/state/add',
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
            url: AUTH_HTTP_PATH + "state/store",
            dataType: 'json',
            data: formData,
            type: 'POST',
            success: function (data) {
                if (data.status == 1) {
                    show_toaster("state", data.message, "success", function () {
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

    $('body').on('click','.change_status',function(e){
        e.preventDefault();
        const id = $(this).data('target');
        const status = $(this).data('status');
        $.ajax({
            type: 'POST',
            url: AUTH_HTTP_PATH + 'state/status/change',
            dataType: 'json',
            data: {
                status: status,
                id: id
            },
            success: function (data) {
                if (data.status == 1) {
                    show_toaster("State", data.message, "success");
                    dtable.ajax.reload();
                } else {
                    show_toaster("Oops!", data.message, "error");
                }
            }
        });
    });

});

$('body').on('click', '.edit_form', function (e) {
    e.preventDefault();
    const id = $(this).data('target');
    console.log('data', id);
    $.ajax({
        type: 'POST',
        url: AUTH_HTTP_PATH + 'state/edit',
        dataType: 'json',
        data: { id: id },
        success: function (data) {
            if (data.status == 1) {
                $('.list-index').hide();
                $('.dynamic-container').html(data.html);
                addselect2('.select2');
                // $('.form_html').html(data.html);
                $(window).scrollTop(0);
            }
        }
    });
});


$('body').on('submit', '#edit', function (e) {
    e.preventDefault();
    var formData = $("#edit").serialize();
    $('label span.error').remove();
    $('#submit_btn').attr('disabled', true);
    $.ajax({
        url: AUTH_HTTP_PATH + "state/update",
        dataType: 'json',
        data: formData,
        type: 'POST',
        success: function (data) {
            if (data.status == 1) {
                show_toaster("City", data.message, "success", function () {
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