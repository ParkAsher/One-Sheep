$(document).ready(function () {
    // 진행중인 신청내용을 담을 배열
    let orderInProgress = [];
    // 완료된 신청내용 담을 배열
    let dataSource = [];

    // 비동기적으로 만들기 async: false
    $.ajax({
        type: 'GET',
        url: '/api/orders/driver?driverId=5',
        async: false,
        success: function (response) {
            if (response.data) {
                // 신청 내역이 있다면?
                for (let i = 0; i < response.data.length; i++) {
                    // data 배열을 돌면서
                    if (response.data[i].request === null) response.data[i].request = ''; // 요청사항이 null일때 빈 문자열로 만들어 줌
                    if (response.data[i].status !== '완료') orderInProgress.push(response.data[i]);
                    if (response.data[i].status === '완료') dataSource.push(response.data[i]);
                }
            } else {
                // 신청 내역이 없다면?
                let temp = `
                    <div class="message">
                        ${response.message}
                    </div>
                `;
                $('#order-in-progress-content-container').append(temp);
                $('#data-container').append(temp);
                return;
            }
        },
        error: function (response) {
            console.log(response.responseJSON.message);
            return;
        },
    });

    //console.log(orderInProgress);
    //console.log(dataSource);

    if (orderInProgress.length !== 0 && dataSource.length === 0) {
        // 진행 중인 신청 내용이 있고, 완료된 내역이 없을때
        for (let i = 0; i < orderInProgress.length; i++) {
            let orderHtml = `
                <div class="order-in-progress-content-wrap" orderId=${orderInProgress[i].orderId}>
                    <div class="content-left">
                        <!-- 상태 -->
                        <div class="content-left-status">
                            <div class="content-head">진행상태</div>
                            <div class="content-body">${orderInProgress[i].status}</div>
                        </div>
                        <!-- 신청자 -->
                        <div class="content-left-customer">
                            <div class="content-head">신청자</div>
                            <div class="content-body">${orderInProgress[i].customerName}</div>
                        </div>
                        <!-- 전화번호 -->
                        <div class="content-left-phone">
                            <div class="content-head">전화번호</div>
                            <div class="content-body">${orderInProgress[i].phone}</div>
                        </div>
                        <!-- 주소 -->
                        <div class="content-left-address">
                            <div class="content-head">주소</div>
                            <div class="content-body">${orderInProgress[i].address}</div>
                        </div>
                    </div>
                    <div class="content-right">
                        <!--요청사항-->
                        <div class="content-right-request">
                            <div class="content-head">요청사항</div>
                            <div class="content-body">${orderInProgress[i].request}</div>
                        </div>
                        <!-- 사용날짜 -->
                        <div class="content-right-usageDate">
                            <div class="content-head">사용날짜</div>
                            <div class="content-body">${orderInProgress[i].usageDateTimeStart}</div>
                        </div>
                        <!-- 사용시간 -->
                        <div class="content-right-usageTime">
                            <div class="content-head">사용시간</div>
                            <div class="content-body">${orderInProgress[i].usageTime}시간</div>
                        </div>
                    </div>
                </div>
            `;
            $('#order-in-progress-content-container').append(orderHtml);

            if (orderInProgress[i].status === '이동중' || orderInProgress[i].status === '서비스이용중' || orderInProgress[i].status === '접수완료') {
                $('.order-btn-wrap').css('display', 'none');
            }
        }

        let messageHtml = `
            <div class="message">
                신청 내역이 존재하지 않습니다.
            </div>
        `;
        $('#data-container').append(messageHtml);
        return;
    }

    if (orderInProgress.length === 0 && dataSource.length !== 0) {
        // 진행 중인 신청 내역이 없고, 완료된 내역이 있을때
        // 페이지네이션
        let container = $('#pagination');
        container.pagination({
            dataSource: dataSource,
            pageSize: 3,
            callback: function (data, pagination) {
                let dataHtml = ``;
                $.each(data, function (index, item) {
                    dataHtml += `
                        <div class="order-in-progress-content-wrap" orderId=${item.orderId}>
                            <div class="content-left">
                                <!-- 상태 -->
                                <div class="content-left-status">
                                    <div class="content-head">진행상태</div>
                                    <div class="content-body">${item.status}</div>
                                </div>
                                <!-- 신청자 -->
                                <div class="content-left-customer">
                                    <div class="content-head">신청자</div>
                                    <div class="content-body">${item.customerName}</div>
                                </div>
                                <!-- 전화번호 -->
                                <div class="content-left-phone">
                                    <div class="content-head">전화번호</div>
                                    <div class="content-body">${item.phone}</div>
                                </div>
                                <!-- 주소 -->
                                <div class="content-left-address">
                                    <div class="content-head">주소</div>
                                    <div class="content-body">${item.address}</div>
                                </div>
                            </div>
                            <div class="content-right">
                                <!--요청사항-->
                                <div class="content-right-request">
                                    <div class="content-head">요청사항</div>
                                    <div class="content-body">${item.request}</div>
                                </div>
                                <!-- 사용날짜 -->
                                <div class="content-right-usageDate">
                                    <div class="content-head">사용날짜</div>
                                    <div class="content-body">${item.usageDateTimeStart}</div>
                                </div>
                                <!-- 사용시간 -->
                                <div class="content-right-usageTime">
                                    <div class="content-head">사용시간</div>
                                    <div class="content-body">${item.usageTime}시간</div>
                                </div>
                            </div>
                        </div>
                    `;
                });
                $('#data-container').html(dataHtml);
            },
        });

        let messageHtml = `
            <div class="message">
                신청 내역이 존재하지 않습니다.
            </div>
        `;
        $('#order-in-progress-content-container').append(messageHtml);
        return;
    }

    if (orderInProgress.length !== 0 && dataSource.length !== 0) {
        // 둘다 있을 때
        for (let i = 0; i < orderInProgress.length; i++) {
            let orderHtml = `
                <div class="order-in-progress-content-wrap" orderId=${orderInProgress[i].orderId}>
                    <div class="content-left">
                        <!-- 상태 -->
                        <div class="content-left-status">
                            <div class="content-head">진행상태</div>
                            <div class="content-body">${orderInProgress[i].status}</div>
                        </div>
                        <!-- 신청자 -->
                        <div class="content-left-customer">
                            <div class="content-head">신청자</div>
                            <div class="content-body">${orderInProgress[i].customerName}</div>
                        </div>
                        <!-- 전화번호 -->
                        <div class="content-left-phone">
                            <div class="content-head">전화번호</div>
                            <div class="content-body">${orderInProgress[i].phone}</div>
                        </div>
                        <!-- 주소 -->
                        <div class="content-left-address">
                            <div class="content-head">주소</div>
                            <div class="content-body">${orderInProgress[i].address}</div>
                        </div>
                    </div>
                    <div class="content-right">
                        <!--요청사항-->
                        <div class="content-right-request">
                            <div class="content-head">요청사항</div>
                            <div class="content-body">${orderInProgress[i].request}</div>
                        </div>
                        <!-- 사용날짜 -->
                        <div class="content-right-usageDate">
                            <div class="content-head">사용날짜</div>
                            <div class="content-body">${orderInProgress[i].usageDateTimeStart}</div>
                        </div>
                        <!-- 사용시간 -->
                        <div class="content-right-usageTime">
                            <div class="content-head">사용시간</div>
                            <div class="content-body">${orderInProgress[i].usageTime}시간</div>
                        </div>
                    </div>
                </div>
            `;
            $('#order-in-progress-content-container').append(orderHtml);

            if (orderInProgress[i].status === '이동중' || orderInProgress[i].status === '서비스이용중' || orderInProgress[i].status === '접수완료') {
                $('.order-btn-wrap').css('display', 'none');
            }
        }

        let container = $('#pagination');
        container.pagination({
            dataSource: dataSource,
            pageSize: 3,
            callback: function (data, pagination) {
                let dataHtml = ``;
                $.each(data, function (index, item) {
                    dataHtml += `
                        <div class="order-in-progress-content-wrap" orderId=${item.orderId}>
                            <div class="content-left">
                                <!-- 상태 -->
                                <div class="content-left-status">
                                    <div class="content-head">진행상태</div>
                                    <div class="content-body">${item.status}</div>
                                </div>
                                <!-- 신청자 -->
                                <div class="content-left-customer">
                                    <div class="content-head">신청자</div>
                                    <div class="content-body">${item.customerName}</div>
                                </div>
                                <!-- 전화번호 -->
                                <div class="content-left-phone">
                                    <div class="content-head">전화번호</div>
                                    <div class="content-body">${item.phone}</div>
                                </div>
                                <!-- 주소 -->
                                <div class="content-left-address">
                                    <div class="content-head">주소</div>
                                    <div class="content-body">${item.address}</div>
                                </div>
                            </div>
                            <div class="content-right">
                                <!--요청사항-->
                                <div class="content-right-request">
                                    <div class="content-head">요청사항</div>
                                    <div class="content-body">${item.request}</div>
                                </div>
                                <!-- 사용날짜 -->
                                <div class="content-right-usageDate">
                                    <div class="content-head">사용날짜</div>
                                    <div class="content-body">${item.usageDateTimeStart}</div>
                                </div>
                                <!-- 사용시간 -->
                                <div class="content-right-usageTime">
                                    <div class="content-head">사용시간</div>
                                    <div class="content-body">${item.usageTime}시간</div>
                                </div>
                            </div>
                        </div>
                    `;
                });
                $('#data-container').html(dataHtml);
            },
        });
    }
});

function statusChange(status) {
    // 해당 신청 번호
    let orderId = $('.order-in-progress-content-wrap').attr('orderId');
    // 변경 할 상태
    let statusValue = status;

    let result = confirm('정말 상태를 변경하시겠습니까?');
    if (result === false) {
        return;
    }

    $.ajax({
        type: 'PUT',
        url: '/api/orders/' + orderId + '/status',
        data: { status: statusValue },
        success: function (response) {
            window.location.reload();
        },
        error: function (response) {
            console.log(response.responseJSON.message);
        },
    });
}
