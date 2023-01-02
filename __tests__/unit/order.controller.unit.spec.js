const OrderRepositoryDepInj = require('../../repositories/order.repository.depInj')


let mockOrderModel = {
    create: jest.fn(),
}

let orderRepository = new OrderRepositoryDepInj(mockOrderModel)

describe('3계층 아키텍처 Order controller 유닛 테스트', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    test('Order controller createOrder method', async () => {
        
    })
})