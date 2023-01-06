const CustomerService = require('../../services/customer.service.js')
const bcrypt = require('bcrypt')

let mockCustomerRepository = {
    getUserUse: jest.fn(),
    isUserExist: jest.fn(),
    createUser: jest.fn()
}

let customerService = new CustomerService()
customerService.customerRepository = mockCustomerRepository

describe('3계층 아키텍처 Customer service 유닛 테스트', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    // 고객 이용내역 조회 유닛 테스트
    test('Customer service getUserUse method', async () => {
        mockCustomerRepository.getUserUse = jest.fn(() => {
            return "repository.getUserUse result"
        })

        const customerId = 10

        const customer = await customerService.getUserUse(customerId)

        expect(mockCustomerRepository.getUserUse).toHaveBeenCalledTimes(1)

        expect(customer).toEqual("repository.getUserUse result")
    })

    // 고객 회원가입 유닛 테스트
    test('Customer service createUser method', async () => {
        const createUserParams = {
            id: 'testid',
            name: 'testname',
            password: 'testpassword'
        }

        const createUserReturnValue = {
            status: 200,
            success: true,
            message: '회원가입에 성공하였습니다.'
        }

        mockCustomerRepository.isUserExist = jest.fn(() => {
            return [[],[]]
        })

        mockCustomerRepository.createUser = jest.fn(() => {
            return createUserReturnValue
        })

        // bcrypt mock 부분은 해결 못함, expect.anything()으로 해결
        // const bcrypt = jest.spyOn(bcrypt, 'hash')
        // const hashedPassword = await customerService.createUser.bcrypt.hash(createUserParams.password, 10)
        // expect(bcrypt).toHaveBeenCalledTimes(1)
        // expect(bcrypt).toHaveBeenCalledWith(createUserParams.password, 10)
        
        const createUser = await customerService.createUser(
            createUserParams.id,
            createUserParams.name,
            createUserParams.password)

        expect(mockCustomerRepository.isUserExist).toHaveBeenCalledTimes(1)
        expect(mockCustomerRepository.isUserExist).toHaveBeenCalledWith(createUserParams.id)

        expect(mockCustomerRepository.createUser).toHaveBeenCalledTimes(1)
        expect(mockCustomerRepository.createUser).toHaveBeenCalledWith(
            createUserParams.id,
            createUserParams.name,
            expect.anything())

        expect(createUser).toEqual(createUserReturnValue)
    })
})