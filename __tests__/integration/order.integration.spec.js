const { text } = require('express');
const supertest = require('supertest');
const app = require('../../app.js');
const { sequelize } = require('../../models/index.js');

// 통합 테스트(Integration Test)를 진행하기에 앞서 Sequelize에 연결된 모든 테이블의 데이터를 삭제합니다.
//  단, NODE_ENV가 test 환경으로 설정되어있는 경우에만 데이터를 삭제합니다.
beforeAll(async () => {
    if (process.env.NODE_ENV === 'test') await sequelize.sync();
    else throw new Error('NODE_ENV가 test 환경으로 설정되어 있지 않습니다.');
});


describe('Layered Architecture Pattern, Order Integration Test', () => {
    test('GET getDriverOrder when no driver exsists', async () => {
        const driverId = 0
        
        const response = await supertest(app)
            .get('/api/driver/' + driverId)

        expect(response.status).toEqual(404)
    })
    
    // test('POST createOrder integration test', async () => {
    //     const createOrderBodyParams = {
    //         customerId: 1,
    //         driverId: 2,
    //         phone: 1234,
    //         address: "newAddress",
    //         request: "newRequest",
    //         usageDateTimeStart: new Date("1 January 2023 00:00"),
    //         usageTime: 1
    //     }

    //     const driverId = 5

    //     const response = await supertest(app)
    //         .post('/api/orders/' + driverId)
    //         .send(createOrderBodyParams)

    //     expect(response.status).toEqual(201)

    //     expect(response.body).toMatchObject({
    //         customerId: createOrderBodyParams.customerId,
    //         driverId: createOrderBodyParams.driverId,
    //         phone: createOrderBodyParams.phone,
    //         address: createOrderBodyParams.address,
    //         request: createOrderBodyParams.request,
    //         status: '대기 중',
    //         usageDateTimeStart: createOrderBodyParams.usageDateTimeStart,
    //         usageTime: createOrderBodyParams.usageTime,
    //         createdAt: expect.anything(),
    //         updatedAt: expect.anything()
    //     })
    // })

})