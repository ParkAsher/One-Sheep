const OrderRepositoryDepInj = require('../../repositories/order.repository.depInj')


let mockOrderModel = {
    create: jest.fn(),
}

let orderRepository = new OrderRepositoryDepInj(mockOrderModel)

describe('3계층 아키텍처 Order repository 유닛 테스트', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    test('Order repository createOrder method', async () => {
        mockOrderModel.create = jest.fn(() => {
            return "create result"
        })

        const createOrderParams = {
            customerId: 1,
            driverId: 2,
            phone: 1234,
            address: "newAddress",
            request: "newRequest",
            usageDateTimeStart: new Date("1 January 2023 00:00"),
            usageTime: 1
        }

        const createOrderData = await orderRepository.createOrder(
            createOrderParams.customerId,
            createOrderParams.driverId,
            createOrderParams.phone,
            createOrderParams.address,
            createOrderParams.request,
            createOrderParams.usageDateTimeStart,
            createOrderParams.usageTime,
        )

        // create method는 "create result"를 반환해야한다
        expect(createOrderData).toEqual("create result")

        // create는 한 번 실행되야한다
        expect(mockOrderModel.create).toHaveBeenCalledTimes(1)

        // create는 올바른 객체로 불려야한다
        expect(mockOrderModel.create).toHaveBeenCalledWith({
            customerId: createOrderParams.customerId,
            driverId: createOrderParams.driverId,
            phone: createOrderParams.phone,
            address: createOrderParams.address,
            request: createOrderParams.request,
            usageDateTimeStart: createOrderParams.usageDateTimeStart,
            usageTime: createOrderParams.usageTime,
        })

    })

})