$(document).ready(function () {
    getCustomerPoints()
})

// 이용 기간을 클릭 또는 입력시 차감 포인트 업데이트하기
function pointsDeducted() {
    let orderTime = document.getElementById("order-time").value

    document.getElementById("points-deducted").innerHTML = '차감 포인트: ' + orderTime * 10000 + 'p'

    // -------------- 로그인 기능 완료되면 완료
    // document.getElementById("points-remaining").innerHTML = '잔여 포인트: '
}

// --------------- 로그인 기능 완료되면 완료하기
// 로그인된 회원이 보유한 포인트 가져오기
function getCustomerPoints() {
    $.ajax({
        type: 'GET',
        url: '/api/users/login/check',
        success: function(response) {
            const customerPoints = response.user.point

            document.getElementById("points-current").innerHTML = '보유한 포인트: ' + customerPoints + 'p'
        }
    })
}

// ------------- 메인페이지 완료되면 완료하기
function getDriverInfo(driverId) {
    $.ajax({
        type: 'GET',
        url: `/api/users/drivers/${driverId}`,
        success: function(response) {

        }
    })
}