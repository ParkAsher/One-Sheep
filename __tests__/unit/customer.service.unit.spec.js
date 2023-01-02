const CustomerService = require('../../services/customer.service')


let mockCustomerRepository = {
    create: jest.fn(),
}

// let customerRepository = new CustomerService(mockCustomerRepository)

describe('3계층 아키텍처 Customer service 유닛 테스트', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    test('', async () => {
        
    })
})