// socket
const socket = io.connect('http://localhost:1004');

socket.on('orderMessage', function (data) {
    const { customerId, customerName, driverId, driverName } = data;
    const messageHtml = `${customerName}님이 방금 ${driverName} 차량을 이용 신청했어요!`;

    const htmlTemp = `
        <div class="alert alert-primary show fade" role="alert" id="customerAlert">${messageHtml}
        </div>
    `;
    $('body').append(htmlTemp);
});
