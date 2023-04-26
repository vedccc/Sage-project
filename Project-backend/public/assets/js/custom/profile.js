
$("#edit_profile").submit(function (e) {
    e.preventDefault();
    var formData = new FormData($("#edit_profile")[0]);
    $('label span.error').remove();
    $.ajax({
        url: "/edit-profile/update",
        dataType: 'json',
        data: formData,
        method: 'POST',
        cache: false,
        contentType: false,
        processData: false,
        // url: "/login",
        // dataType: 'json',
        // data: formData,
        // type: 'POST',
        success: function (data) {
            if (data.status == 1) {
                show_toaster("Profile Updated Successfuly", data.message, "success", function () {
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

$('body').on('submit', '#change_password', function (e) {
    e.preventDefault();
    var formData = $("#change_password").serialize();
    $('label span.error').remove();
    $.ajax({
        url: AUTH_HTTP_PATH + "change-password/update",
        dataType: 'json',
        data: formData,
        type: 'POST',
        success: function (data) {
            if (data.status == 1) {
                show_toaster("Password changed successfully.", data.message, "success", function () {
                    location.reload();
                });

            } else if (data.status == 0) {
                show_toaster("Oops!", data.message, "error");
            } else {
                error_display(data.message);
            }
        }
    });
});