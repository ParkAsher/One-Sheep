let userdata;
$(document).ready(function () {
    // getCustomerPoints();

    getSelf(function (user) {
        userdata = user;
    });

    // 로그인된 회원이 보유한 포인트 가져오기
    document.getElementById('points-current').innerHTML = '보유한 포인트: ' + userdata.point + 'p';

    // ------------- 메인페이지 완료되면 완료하기
    // 사장 정보 불러오기
    // $.ajax({
    //     type: 'GET',
    //     url: `/api/users/drivers/${driverId}`,
    //     async: false,
    //     success: function(response) {
    //         let name = response.data.name
    //         let image = response.data.image

    //     }
    // })

    // 사장 리뷰 불러오기
    // $.ajax({
    //     type: 'GET',
    //     url: `/api/reviews/${driverId}`,
    //     async: false,
    //     success: function(response) {
    //         let stars
    //         let content
    //         let createdAt
    //         let customerName
    //         let temp_html
    //         let starsEmoji = ''

    //         for(let i=0; i<response.data; i++) {
    //             stars = response.data[i]['stars']
    //             content = response.data[i]['content']
    //             createdAt = response.data[i]['createdAt']
    //             customerName = response.data[i]['Customer.name']

    //             for (let i=0; i<Number(stars); i++) {
    //                 starsEmoji += '😴'
    //             }

    //             temp_html = `<div class="card">
    //                             <div class="card-body">
    //                                 <h5 class="card-title">${customerName}</h5>
    //                                 <p class="review-stars">${starsEmoji}</p>
    //                                 <p class="review-date">${createdAt}</p>
    //                                 <p class="card-text">${content}</p>
    //                             </div>
    //                         </div>`

    //             $('#review-cards').append(temp_html)
    //         }

    //     }
    // })
});

function postOrder() {
    let rawDate = $('#datetimepicker1Input').val();
    const year = Number(rawDate.split(' ')[0]);
    const month = Number(rawDate.split(' ')[1]);
    const date = Number(rawDate.split(' ')[2]);
    let hour = Number(rawDate.split(' ')[4].split('시')[0]);

    if (rawDate.split(' ')[3] === '오후') {
        hour = hour + 12;
    }

    const usageDateTimeStart = new Date(year, month - 1, date, hour);
    const usageTime = Number($('#order-time').val());
    const request = $('#order-request').val();

    let userId;
    let driverId;

    // $.ajax({
    //     type: 'POST',
    //     url: `/api/orders/${driverId}`,
    //     async: false,
    //     success: function(response) {
    //         // 성공 메시지
    //     }
    // })
}
