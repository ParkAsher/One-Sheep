const CustomerController = require('../../controllers/customer.controller.js')


let mockCustomerService = {
    getUserUse: jest.fn(),
}

let mockJest = {
    validateAsync: jest.fn()
}

let mockRequest = {
    params: jest.fn()
}

let mockResponse = {
    status: jest.fn(),
    json: jest.fn()
}


let customerController = new CustomerController()
customerController.customerService = mockCustomerService

describe('3계층 아키텍처 Customer controller 유닛 테스트', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    test('Customer controller getUserUse method', async () => {

    })
})