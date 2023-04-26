var dtable;
$(document).ready(function () {
    $('#start_date').datetimepicker({
        format: 'DD/MM/YYYY'
    }); $('#end_date').datetimepicker({
        format: 'DD/MM/YYYY'
    });
    
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
            "url": "/payment/list",
        },
        'columns':
            [
              
                { "data": "", "defaultContent": "", 'name': '_id', "orderable": false },
                { "data": "user_name", "defaultContent": "", 'name': 'user_name', "orderable": false },
                { "data": "title", "defaultContent": "", 'name': 'title', "orderable": false },
                { "data": "email", "defaultContent": "", 'name': 'email', "orderable": false },
                { "data": "number", "defaultContent": "", 'name': 'number', "orderable": false },
                { "data": "amount", "defaultContent": "", 'name': 'amount', "orderable": false },
                { "data": "tax", "defaultContent": "", 'name': 'tax', "orderable": false },
                { "data": "discount", "defaultContent": "", 'name': 'discount', "orderable": false },
                { "data": "status", "defaultContent": "", 'name': 'status', "orderable": false },
                {
                    'data': { "status": "status", "id": "_id" }, "orderable": false,
                    render: function (data) {
                        return `
                        <a title="Edit" class="edit_form btn btn-success " data-target="${data._id}" style="cursor:pointer">view</a>
                        `;
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
});

$('body').on('click', '.edit_form', function (e) {
    e.preventDefault();
    const id = $(this).data('target');
    console.log('data', id);
    $.ajax({
        type: 'POST',
        url: AUTH_HTTP_PATH + 'payment/invoice',
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
        url: AUTH_HTTP_PATH + "payment/update",
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


    $("body").on('click', '#print',function(){
        var mode = 'iframe'; //popup
        var close = mode == "popup";
        var options = {
            mode: mode,
            popClose: close
        };
        $("div.printableArea").printArea(options);
      });
