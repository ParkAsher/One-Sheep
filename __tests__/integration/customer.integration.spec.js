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


describe('Layered Architecture Pattern, Customer Integration Test', () => {
    // 고객 회원가입
    test('POST signup', async () => {
        const signUpParams = {
            id: 'testid',
            name: 'testname',
            password: 'testtest',
            passwordCheck: 'testtest',
        }

        const response = await supertest(app)
            .post('/api/customers/signup')
            .query({})
            .send(signUpParams)

        expect(response.status).toEqual(200)

        expect(response.body).toMatchObject({
            success: true,
            message: '회원가입에 성공하였습니다.'
        })
    })
})