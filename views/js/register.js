$(document).ready(function () {
    // 이미지 업로드
    $('#register-image').on('change', upload_image);
});

// 이미지 업로드 함수
function upload_image(e) {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append('file', file);

    $.ajax({
        type: 'POST',
        url: '/api/users/drivers/image',
        cache: false,
        contentType: false,
        processData: false,
        data: formData,
        success: function (response) {
            let image_url = response.filePath;
            $('#register-image').attr('value', image_url);
        },
    });
}

$('.radio-role').on('click', function () {
    let checkedRole = $('input[name=role]:checked').val();

    if (checkedRole === 'driver') {
        $('#register-image').removeAttr('disabled');
    } else {
        $('#register-image').attr('disabled', true);
    }
});
