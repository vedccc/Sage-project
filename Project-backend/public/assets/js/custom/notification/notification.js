var dtable;
$(document).ready(function () {
    dtable = $('#list').DataTable({
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
                {
                    "title":"Action", 'data': { "id": "_id" }, "orderable": false,
                    render: function (data) {
                    //    html = '<button class="edit_form btn btn-success" data-target="'+ data._id +'">Send</button> ';
                       html = `<button data-toggle="modal" data-target="#responsive-modal" class="edit_form btn btn-success" />Send</button>
                       <div id="responsive-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
                         <div class="modal-dialog">
                             <div class="modal-content">
                                 <div class="modal-header">
                                     <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                     <h4 class="modal-title">Modal Content is Responsive</h4> </div>
                                 <div class="modal-body">
                                     <form class="form-horizontal" method="post" name="add" id="add" enctype="multipart/form-data">
                                        <div class="form-body">
                                        <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                            <label class="col-sm-12 col-form-label" for="title">
                                                Title</label>

                                            <div class="col-sm-12">
                                            <input type="hidden" name="id" value="${data._id}">
                                                <input type="text" name="title" id="title" autocomplete="off" class="form-control"
                                                placeholder="Title" />
                                            </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                            <label class="col-sm-12 col-form-label" for="description">
                                                Description</label>

                                            <div class="col-sm-12">
                                            <textarea class="form-control" name="description" id="message-text"></textarea>
                                            </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-6" style="margin-left: 15px">
                                        <div class="form-group m-t-15">
                                            <button type="submit" class="pull-left btn m-t-10 btn btn-success" id="submit_btn">
                                            Save
                                            </button>
                                            <button type="submit" class="pull-left btn m-t-10 btn btn-danger btn_cancel_template"
                                            style="margin-left: 10px">
                                            Cancel
                                            </button>
                                        </div>
                                        </div>
                                        </div>
                                        </div>
                                     </form>
                                 </div>
                    
                             </div>
                         </div>
                     </div> `;
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
});
