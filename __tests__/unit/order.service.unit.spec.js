const OrderServiceDepInj = require('../../services/order.service.js')


let mockOrderRepository = {
    createOrder: jest.fn(),
    ifOrderInProgress: jest.fn(),
    findAll: jest.fn()
}

let orderService = new OrderServiceDepInj(mockOrderRepository)

describe('3계층 아키텍처 Order service 유닛 테스트', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    // 오더 신청 유닛 테스트
    test('Order service createOrder method', async () => {
        const ifOrderInProgressReturnValue = [{
            orderId: 1,
            customerId: 1,
            driverId: 1,
            phone: 1,
            address: '어딘가',
            request: '',
            status: '완료',
            usageDateTimeStart: new Date("1 January 2023 00:00"),
            usageTime: 1,
            createdAt: new Date("1 January 2023 00:00"),
            updatedAt: new Date("1 January 2023 00:00")
        }]

        mockOrderRepository.createOrder = jest.fn(() => {
            return "create result"
        })
        
        mockOrderRepository.ifOrderInProgress = jest.fn(() => {
            return ifOrderInProgressReturnValue
        })

        mockOrderRepository.findAll = jest.fn(() => {
            return ifOrderInProgressReturnValue
        })

        const createOrderParams = {
            customerId: 1,
            driverId: 2,
            phone: 1234,
            address: "newAddress",
            request: "newRequest",
            status: "접수 대기",
            usageDateTimeStart: new Date("1 January 2023 00:00"),
            usageTime: 1
        }

        const createOrderData = await orderService.createOrder(
            createOrderParams.customerId,
            createOrderParams.driverId,
            createOrderParams.phone,
            createOrderParams.address,
            createOrderParams.request,
            createOrderParams.status,
            createOrderParams.usageDateTimeStart,
            createOrderParams.usageTime
        )

        // ifOrderInProgress method는 "create result"를 반환해야한다
        expect(createOrderData).toEqual("create result")

        // create method는 "create result"를 반환해야한다
        // expect(createOrderData).toEqual("create result")


        // repository.ifOrderInProgress, repository.createOrder 한 번 실행되야한다
        expect(mockOrderRepository.createOrder).toHaveBeenCalledTimes(1)
        expect(mockOrderRepository.ifOrderInProgress).toHaveBeenCalledTimes(1)

        // repository.createOrder는 올바른 객체로 불려야한다
        expect(mockOrderRepository.createOrder).toHaveBeenCalledWith(
            createOrderParams.customerId,
            createOrderParams.driverId,
            createOrderParams.phone,
            createOrderParams.address,
            createOrderParams.request,
            createOrderParams.status,
            createOrderParams.usageDateTimeStart,
            createOrderParams.usageTime,
        )
        // repository.createOrder는 올바른 객체로 불려야한다
        expect(mockOrderRepository.ifOrderInProgress).toHaveBeenCalledWith(createOrderParams.driverId)

    })

})