$(document).ready(function () {
    // 이미지 업로드
    $('#register-image').on('change', upload_image);
});

// 유저 타입 선택에 따른 이미지 input태그 핸들러
$('.radio-role').on('click', function () {
    let checkedRole = $('input[name=role]:checked').val();

    if (checkedRole === 'driver') {
        $('#register-image').removeAttr('disabled');
    } else {
        $('#register-image').attr('disabled', true);
    }
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

// 회원가입
function register() {
    // id
    let id = $('#id').val();
    // name
    let name = $('#name').val();
    // password
    let password = $('#password').val();
    // password-check
    let passwordCheck = $('#password-check').val();

    // role value
    let checkedRole = $('input[name=role]:checked').val();
    if (!checkedRole) {
        alert('역할을 선택해주세요.');
        return;
    }

    let body = {
        id: id,
        name: name,
        password: password,
        passwordCheck: passwordCheck,
    };

    if (checkedRole === 'customer') {
        $.ajax({
            type: 'POST',
            url: '/api/users/customers/signup',
            data: body,
            success: function (response) {
                console.log(response);
            },
            error: function (response) {
                console.log(response.responseJSON.message);
                $('.error-message-wrap').empty();
                let temp = `
                    <p>${response.responseJSON.message}</p>
                `;
                $('.error-message-wrap').append(temp);
            },
        });
    }

    if (checkedRole === 'driver') {
    }
}
