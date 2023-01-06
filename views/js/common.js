// socket
const socket = io.connect('http://localhost:1004');

socket.on('orderMessage', function (data) {
    const { customerId, customerName, driverId, driverName } = data;
    const messageHtml = `<span style="font-weight:bold; font-size: 25px; color: blue;">${customerName}</span>님이 방금 <span style="font-weight:bold; font-size: 25px; color: blue;">${driverName}</span> 차량을 이용 신청했어요!`;

    const htmlTemp = `
        <div class="alert alert-primary show fade" role="alert" id="customerAlert">${messageHtml}
        </div>
    `;
    $('body').append(htmlTemp);
});
