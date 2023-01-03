// 모든 페이지에서 유저 정보를 들고 있게 하기 위한 함수 (프론트 핸들링)
function getSelf(callback) {
    $.ajax({
        type: 'GET',
        url: '/api/users/login/check',
        async: false,
        success: function (response) {
            callback(response.user);
        },
        error: function (response) {
            console.log(response);
            window.location.href = '/login';
        },
    });
}
