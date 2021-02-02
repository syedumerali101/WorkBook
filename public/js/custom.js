//----------File Upload Porfile Pic--------
$(document).ready(function () {

    var readURL = function (input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.profile-pic').attr('src', e.target.result);

            }

            reader.readAsDataURL(input.files[0]);
        }
    }


    $(".file-upload").on('change', function () {
        readURL(this);
    });

    $(".upload-button").on('click', function () {
        $(".file-upload").click();
    });

    //---------- DELETE Porfile Pic-Replace with generic image-------
    $(".delete-pic").on('click', function () {
        $('.profile-pic').attr('src', "/assets/img/defaultpic.png");
        $("#toast-update-success").toast('show'); //show only when saved in db
    });
    //-------------------------------    

});
//-------END File Upload------


//----------temporary notifications or TOASTS--------
$(document).ready(function () {
    $(".show-toast-success").click(function () {
        $("#toast-update-success").toast('show');
    });
    $(".show-toast-fail").click(function () {
        $("#toast-update-fail").toast('show');
    });
});
//-------------------------------------