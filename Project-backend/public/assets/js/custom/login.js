function show_toaster(title, message, type, next = false) {
    $.toast({
        heading: title,
        text: message,
        position: 'top-right',
        loaderBg: '#ff6849',
        icon: type,
        hideAfter: 3000,
        stack: 6
    });
    if (next)
        setTimeout(function () { next(true); }, 3000);
}
$(document).ready(function () {
    addselect2('.select2');
    $('.dropify').dropify();
})
$(document).ready(function () {
    let timerOn = false;
    let timer_sec = 60;

    let username = localStorage.getItem("username");
    let password = localStorage.getItem("password");
    if (username && password) {
        $("#username").val(username);
        $("#password").val(password);
        $('#checkbox-signup').prop('checked', true);
    }

    $("#login").submit(function (e) {
        e.preventDefault();
        var formData = $("#login").serialize();
        $('label span.error').remove();
        $.ajax({
            url: "/login",
            dataType: 'json',
            data: formData,
            type: 'POST',
            success: function (data) {
                if (data.status == 1) {
                    show_toaster("Login Successfuly", data.message, "success", function () {
                        location.href = '/dashboard';
                    });
                } else if (data.status == 0) {
                    show_toaster("Oops!", data.message, "error",);
                } else {
                    error_display(data.message);
                }
            }
        });
    });

    function error_display(errorArr) {
        $.each(errorArr, function (key, val) {
            show_label_error(key, val);
            $("#" + key).focus();
            return;
        });
    }

    function show_label_error(key, val) {
        if ($("label[for='" + key + "'] #" + key + "-error").length == 0) {
            $("label[for='" + key + "']").append('<span id="' + key + '-error" class="error text-danger"> (' + val + ')</span>');
        } else {
            $("#" + key + "-error").html(' (' + val + ')').show();
        }
        $("label[for='" + key + "'].ticket-cell-label").fadeIn();
    }
});