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
            "url": "/product/list",
        },
        'columns':
            [
                {"data": "", "defaultContent": "", 'name': '_id', "orderable": false, },
                // { "data": "image", "defaultContent": "", 'name': 'image', "orderable": false, },

                {
                    'data': { "image": "image",}, "orderable": false,
                    render: function (data) {
                        let image = '<div style="display: flex;">'
                        if (data.image.length>0) {
                            data.image.map((row)=>{
                                image+=` <div style="flex: 3.33%;">
                                <img src='${HTTP_PATH}public/uploads/product/${row}' style="height: 50px;"> 
                              </div>`
                            }
                           )
                        }
                        image+=`</div>`;
                        return image;
                    },
                },

                { "data": "title", "defaultContent": "", 'name': 'title', "orderable": false, },
                { "data": "description", "defaultContent": "", 'name': 'description', "orderable": false, },
                { "data": "price", "defaultContent": "", 'name': 'price', "orderable": false, },
                {
                    'data': { "status": "status", "id": "_id" }, "orderable": false,
                    render: function (data) {
                        return `<a title="Delete" class="delete btn btn-danger btn-circle" data-target="${data._id}" style="cursor:pointer"><i class="fas fa-trash-alt"></i></a>
                        <a title="Edit" class="edit_form btn btn-success btn-circle" data-target="${data._id}" style="cursor:pointer"><i class="fas fa-edit"></i></a>
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

    $('body').on('submit', '#add', function (e) {
        e.preventDefault();
    var formData = new FormData($("#add")[0]);
    $('label span.error').remove();
    $.ajax({
        url: "/product/store",
        dataType: 'json',
        data: formData,
        method: 'POST',
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            if (data.status == 1) {
                show_toaster("Product Add Successfuly", data.message, "success", function () {
                    location.reload();
                });
            } else if (data.status == 0) {
                show_toaster("Oops!", data.message);
            } else {
                error_display(data.message);
            }
        }
    });
    });

    $('body').on('submit', '#edit', function (e) {
        e.preventDefault();
    var formData = new FormData($("#edit")[0]);
    $('label span.error').remove();
    $.ajax({
        url: "/product/update",
        dataType: 'json',
        data: formData,
        method: 'POST',
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            if (data.status == 1) {
                show_toaster("Product Update Successfuly", data.message, "success", function () {
                    location.reload();
                });
            } else if (data.status == 0) {
                show_toaster("Oops!", data.message);
            } else {
                error_display(data.message);
            }
        }
    });
    });

    $('body').on('click', '.btn_add', function (e) {
         e.preventDefault();
        const self = $(this);
        $.ajax({
            type: 'GET',
            url: '/product/add',
            dataType: 'json',
            data: {},
            success: function (data) {
                if (data.status == 1) {
                    $('.list-index').hide();
                    $('.dynamic-container').html(data.html);
                    $('.dropify').dropify();
                    
                    $('#type').change();
                }
            }
        });
    });

    $('body').on('click', '.edit_form', function (e) {
        e.preventDefault();
        const id = $(this).data('target');
        console.log('data', id);
        $.ajax({
            method: 'POST',
            url: AUTH_HTTP_PATH + 'product/edit',
            dataType: 'json',
            data: { id: id },
            success: function (data) {
                if (data.status == 1) {
                    $('.list-index').hide();
                    $('.dynamic-container').html(data.html);
                    $('.dropify').dropify();
                    // $('.form_html').html(data.html);
                    $(window).scrollTop(0);
                }
            }
        });
    });

    // $('body').on('submit', '#edit', function (e) {
    //     e.preventDefault();
    //     var formData = new FormData($("#edit")[0]);
    //     $('label span.error').remove();
    //     $('#submit_btn').attr('disabled', true);
    //     $.ajax({
    //         url: AUTH_HTTP_PATH + "product/update",
    //         dataType: 'json',
    //         data: formData,
    //         type: 'POST',
    //         success: function (data) {
    //             if (data.status == 1) {
    //                 show_toaster("product", data.message, "success", function () {
    //                     $('.dynamic-container').html('');
    //                     $('#submit_btn').attr('disabled', false);
    //                     $('.list-index').show();
    //                     dtable.ajax.reload();
    //                 });
    //             } else if (data.status == 0) {
    //                 show_toaster("Oops!", data.message, "error");
    //                 $('#submit_btn').attr('disabled', false);
    //             } else {
    //                 error_display(data.message);
    //                 $('#submit_btn').attr('disabled', false);
    //             }
    //         }
    //     });
    // });

    $('body').on('click', '.delete', function (e) {
        e.preventDefault();
        const id = $(this).data('target');
        swal({
            title: "Confirm",
            text: "Are you Sure you want to delete it?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(function (isConfirm) {
            if (isConfirm.value) {
                $.ajax({
                    type: 'DELETE',
                    url: AUTH_HTTP_PATH + 'product/delete',
                    data: { id: id },
                    success: function (data) {
                        if (data.status == '1') {
                            swal({
                                title: 'product',
                                text: data.message,
                                type: "success",
                                buttons: 'OK'
                                // timer: 1500
                            }).then(function () {
                                dtable.ajax.reload();
                            });

                        } else {
                            swal({
                                title: 'Oops!',
                                text: 'Error',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
                    }
                });
            }
        });
    });

});
