/**
 * This file was automatically generated by simpleapp generator. Every
 * MODIFICATION OVERRIDE BY GENERATEOR
 * last change 2023-10-28
 * Author: Ks Tan
 */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as supertest from 'supertest';

// var request = require('request');

import { error } from 'console';
import { AppModule } from './../src/app.module';
let token = '';
let emptyxorg = 'MC0wLTA';
let newxorg = '';
let app: INestApplication;
let superagent = supertest.agent;

beforeAll(async () => {
  await superagent(process.env.OAUTH2_CONFIGURL)
    .post('/protocol/openid-connect/token')
    .set('accept', 'application/json')
    .set('accept-language', 'en_us')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({
      grant_type: 'password',
      client_id: process.env.OAUTH2_CLIENTID,
      client_secret: process.env.OAUTH2_CLIENTSECRET,
      username: process.env.TEST_OAUTH2_USERNAME,
      password: process.env.TEST_OAUTH2_PASSWORD,
    })
    .expect(200)
    .then((res) => {
      token = `Bearer ${res.body.access_token}`;
        //   console.log("tokentokentokentoken",token)
    });

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  
  app = moduleFixture.createNestApplication();
  await app.init();

  //prepare new tenant
  // await getSupertest(getServer())
  //   .post('/profile/tenant')
  //   .send({ tenantName: 'testTenant' })
  //   .set('Authorization', token)
  //   .set('x-org', emptyxorg)
  //   .expect(201)
  //   .then((res) => {
  //     expect(res.body).toHaveProperty('xOrg');
  //     setNewXorg(res.body.xOrg);
  //   });
  setNewXorg('MS0xLTE')

  //   describe('try create new tenant', () => {
  //     it('/profile/tenant ', async () => {
  //        await getSupertest(getServer()).post('/profile/tenant').set('Authorization',token).set('x-org', emptyxorg)
  //        .send({
  //         tenantName:'Test-Tenant'
  //        })
  //       .expect(201)
  //       .then((result)=>{
  //         console.log("result of create tenant", result)
  //       })
  //     });
  //   })
});

afterAll(async () => {
  await app.close();
});

export const getServer = () => {
    
  //        <==== ADD THESE 2 FUNCTIONS
//   return process.env.TEST_SERVER
  return app.getHttpServer();
};

export const getSupertest = (app: any) => {
  //   <==== ADD THESE 2 FUNCTIONS
  return superagent(app);
};
export const setNewXorg = (str: string) => (newxorg = str);
export const getXorg = () => newxorg;
export { token, emptyxorg };

// describe('SimpleApp Test', () => {
//   let app: INestApplication;
//   let superagent = supertest.agent
//   beforeAll(async()=>{
//     await superagent(process.env.OAUTH2_CONFIGURL)
//       .post('/protocol/openid-connect/token')
//       .set("accept","application/json")
//       .set("accept-language","en_us")
//       .set("content-type","application/x-www-form-urlencoded")
//       .send({
//           grant_type:'password',
//           client_id:process.env.OAUTH2_CLIENTID,
//           client_secret: process.env.OAUTH2_CLIENTSECRET,
//           username:process.env.TEST_OAUTH2_USERNAME,
//           password:process.env.TEST_OAUTH2_PASSWORD
//         }).expect(200).then((res)=>{
//           token =`Bearer ${res.body.access_token}`
//         })

//         const moduleFixture: TestingModule = await Test.createTestingModule({
//           imports: [AppModule],
//         }).compile();
//         app = moduleFixture.createNestApplication();
//         await app.init();
//   })

//   describe('Check no token or xorg /', () => {
//     it('/ (GET)', async () => {
//       await supertest.agent(app.getHttpServer()).get('/').set('x-org', emptyxorg).expect(401);
//       await supertest.agent(app.getHttpServer()).get('/').set('Authorization',token).expect(401);
//     });
//   })
//   describe('Try with jwt token and empty xorg', () => {
//     it('/ (GET)', async () => {
//       await supertest.agent(app.getHttpServer()).get('/').set('Authorization',token).set('x-org', emptyxorg).expect(200);
//     });
//   })

//   describe('Try obtain user profile', () => {
//     it('/profile (GET)', async () => {
//        await supertest.agent(app.getHttpServer()).get('/profile').set('Authorization',token).set('x-org', emptyxorg)
//       .expect(200)
//       .then((result)=>{
//         expect(result.body.tenantId).toEqual(0)
//         expect(result.body.email).toContain('@')
//       })
//     });
//   })

//   describe('Try search all tenants', () => {
//     it('/tenant/search (POST)', async () => {
//        await supertest.agent(app.getHttpServer()).post('/tenant/search')
//        .send({fields:['tenantId']}).set('Authorization',token).set('x-org', emptyxorg)
//        .expect(200)
//     });
//   })

//   afterAll(async () => {
//     await app.close();
//   });
// });
