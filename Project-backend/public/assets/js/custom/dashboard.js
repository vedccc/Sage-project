var dtable;
$(document).ready(function () {
    "use strict";
    //gauge chart
    $(".mtbutton").on("click", function () {
        var randomNum = Math.floor((Math.random() * 100));
        $('#gaugeDemo .gauge-arrow').trigger('updateGauge', randomNum);
    });
    $('#gaugeDemo .gauge-arrow').cmGauge();
    getData();

    dtable = $('#list').DataTable({
        "colReoder": false,
        "processing": false,
        "serverSide": false,
        "paging": false,
        // "destroy": true,
        "lengthChange": false,
        "searching": false,
        "ordering": false,
        "info": false,
        "bPaginate": false,
        "bInfo": false,
        "ajax": {
            "type": "GET",
            "url": "/dashboard/list",
        },
        'columns':
            [
                { "data": "name", "defaultContent": "", 'name': 'name' },
                {
                    'data': { "status": "status", "id": "_id" },
                    render: function (data) {
                        if (data.status === "Sent") {
                            return `<span class="label label-success label-rouded">Sent</span>`;
                        } else {
                            return `<span class="label label-danger label-rounded">Failed</span>`;
                        }
                    },
                },
                // { "data": "description", "defaultContent": "", 'name': 'description' },
                { "data": "email", "defaultContent": "", 'name': 'email' },
                { "data": "created_at", "defaultContent": "", 'name': 'created_at' },
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

// Morris donut chart
getData = function () {
    $.ajax({
        type: 'GET',
        url: '/dashboard/get-email-count',
        dataType: 'json',
        data: {},
        success: function (data) {
            if (data.status == 1) {
                Morris.Donut({
                    element: 'morris-donut-chart',
                    data: [{
                        label: "Failed",
                        value: data.totalEmailFaild,
                    }, {
                        label: "Sent",
                        value: data.totalEmailSent,
                    },
                    ],
                    resize: true,
                    // '#f33155', '#11a0f8'
                    colors: ['#f33155', '#7ace4c']
                });
            }
        }
    });
}


    paymentList = $('#new').DataTable({
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
                { "data": "email", "defaultContent": "", 'name': 'email', "orderable": false },
                { "data": "number", "defaultContent": "", 'name': 'number', "orderable": false },
                { "data": "amount", "defaultContent": "", 'name': 'amount', "orderable": false },
                { "data": "tax", "defaultContent": "", 'name': 'tax', "orderable": false },
                { "data": "discount", "defaultContent": "", 'name': 'discount', "orderable": false },
                { "data": "status", "defaultContent": "", 'name': 'status', "orderable": false },
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

    paymentList.on('draw', function () {
        paymentList.column(0, { search: 'applied', order: 'applied' }).nodes().each(
            function (cell, i) {
                cell.innerHTML = i + 1;
            }
        );
    });



    userList = $('#dashboardUser').DataTable({
        "colReoder": false,
        "pageLength": 10,
        "serverSide": true,
        "scrollX": true,
        "paging": true,
        "lengthChange": false,
        // "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100]],
        "ajax": {
            "type": "GET",
            "url": "/notification/list",
        },
        'columns':
            [
              
                { "data": "", "defaultContent": "", 'name': '_id', "orderable": false },
                { "data": "name", "defaultContent": "", 'name': 'name', "orderable": false },
                { "data": "email", "defaultContent": "", 'name': 'email', "orderable": false },
                { "data": "number", "defaultContent": "", 'name': 'number', "orderable": false },
                
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

    userList.on('draw', function () {
        userList.column(0, { search: 'applied', order: 'applied' }).nodes().each(
            function (cell, i) {
                cell.innerHTML = i + 1;
            }
        );
    });



