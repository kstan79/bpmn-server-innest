/**
 * This file was automatically generated by simpleapp generator. Every
 * MODIFICATION OVERRIDE BY GENERATEOR
 * last change 2024-02-23
 * Author: Ks Tan
 */

export const DefaultAutoincreament = (uuid: string) => {
  // {"_id":{"type":"string","required":false,"format":"uuid","default":""},"created":{"type":"string","required":false,"default":""},"updated":{"type":"string","required":false,"default":""},"createdBy":{"type":"string","required":false,"default":""},"updatedBy":{"type":"string","required":false,"default":""},"tenantId":{"type":"number","required":false,"default":1},"orgId":{"type":"number","required":false,"default":1},"branchId":{"type":"number","required":false,"default":1},"collectionName":{"type":"string","required":true,"default":""},"fieldName":{"type":"string","required":true,"default":""},"nextNo":{"type":"number","required":true,"default":0}}
  return {
    _id: uuid,

    // skip cause already hardcoded

    created: '',

    updated: '',

    createdBy: '',

    updatedBy: '',

    tenantId: 0, //it will override by save handle

    orgId: 0, //it will override by save handle

    branchId: 0, //it will override by save handle

    collectionName: '',

    fieldName: '',

    nextNo: 0,
  };
};
