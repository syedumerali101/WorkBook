$(document).ready(function () {
    $("#generate-coupon-button").click(function () {

        let __this = $(this)

        __this.attr("disabled", true);
        __this.addClass('fadeOut');

        var form = __this.parents('form');

        $.ajax({
            url: 'http://localhost:8080/generate-coupons',
            data: $(form).serialize(),
            type: 'post',
            dataType: 'json',

            success: function (response) {
                //success process here

                if (response.code) {
                    $('#coupon-code-text').text(response.code);
                }

                __this.attr("disabled", false);
                __this.removeClass('fadeOut');

            },
            error: function (error) {
                __this.attr("disabled", false);
                __this.removeClass('fadeOut');

            },
        });
    });

    $("#profile-update-button").click(function () {

        let __this = $(this)

        var form = __this.parents('form');

        $.ajax({
            url: 'http://localhost:8080/update-profile',
            data: $(form).serialize(),
            type: 'post',
            dataType: 'json',
            beforeSend: function () {
                __this.attr("disabled", true);
                __this.addClass('fadeOut');
            },
            success: function (response) {
                alert(response.message)
                if (response.code) {
                    location.reload()
                }

            },
            complete: function (data) {
                __this.attr("disabled", false);
                __this.removeClass('fadeOut');
            },
            error: function (error) {


            },
        });
    });

})