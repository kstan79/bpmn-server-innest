/**
 * This file was automatically generated by simpleapp generator.
 * Once this file exists whole test regarding 'category' will not override
 * last change 2023-11-27
 * Author: Ks Tan
 */

import { getServer, getSupertest, token, getXorg } from '../../setting';
import createsuccess_id1 from './stub/id1.create'; //define accepted data
import updatesuccess_id1 from './stub/id1.update'; //define accepted data
import createsuccess_id2 from './stub/id2.create'; //define rejected data

const prefix = 'cat';
const id1 = '00000000-0000-0000-0000-000000000001';
const id2 = '00000000-0000-0000-0000-000000000002';
const existAutoCompleteKeyword = 'C';
describe(`Execute test /${prefix}:`, () => {
  /**
   * t1: simple crud test for success flow using id1
   *  create
   *    -> search
   *       -> autocomplete
   *       -> update
   *          -> delete
   *             --> search
   *
   */
  it(`Basic /${prefix} CRUD with ${id1}`, async () => {
    await getSupertest(getServer())
      .post(`/${prefix}`)
      .send(createsuccess_id1())
      .set('Authorization', token)
      .set('x-org', getXorg())
      .expect(201)
      .then(async (res) => {
        expect(res.body._id).toBe(id1);
        // console.log("after created, try search")
        //verify record by id
        await getSupertest(getServer())
          .get(`/${prefix}/${id1}`)
          .set('Authorization', token)
          .set('x-org', getXorg())
          .expect(200)
          .then(async (res) => {
            //verify after record exists
            expect(res.body._id).toBe(id1);
            await getSupertest(getServer())
              .get(
                `/${prefix}/autocomplete?keyword=${existAutoCompleteKeyword}`,
              )
              .set('Authorization', token)
              .set('x-org', getXorg())
              .expect(200)
              .then((res) => {
                expect(res.body[0]._id).toBe(id1);
              }); //ensure autocomplete ok

            await getSupertest(getServer())
              .put(`/${prefix}/${id1}`)
              .send(updatesuccess_id1())
              .set('Authorization', token)
              .set('x-org', getXorg())
              .expect(200)
              .then(async (res) => {
                expect(res.body._id).toBe(id1);
                await getSupertest(getServer())
                  .delete(`/${prefix}/${id1}`)
                  .set('Authorization', token)
                  .set('x-org', getXorg())
                  .expect(200)
                  .then(async (res) => {
                    expect(res.body.result.deletedCount).toBe(1);
                    expect(res.body.data._id).toBe(id1);
                    await getSupertest(getServer())
                      .get(`/${prefix}/${id1}`)
                      .set('Authorization', token)
                      .set('x-org', getXorg())
                      .expect(404);
                  }); //end delete
              }); //end update id1
          }); //verify id exists
      }); // after create
  }); //end simple crud test id1

  /**
   * t2: test block record
   */
  it(`test /${prefix} with reject ${id2}`, async () => {
    await getSupertest(getServer())
      .post(`/${prefix}`)
      .send(createsuccess_id2())
      .set('Authorization', token)
      .set('x-org', getXorg())
      .expect(400);
  });
});
