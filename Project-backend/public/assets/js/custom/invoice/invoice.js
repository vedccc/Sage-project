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
            "url": "/invoice/list",
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

    dtable.on('draw', function () {
        dtable.column(0, { search: 'applied', order: 'applied' }).nodes().each(
            function (cell, i) {
                cell.innerHTML = i + 1;
            }
        );
    });
});
