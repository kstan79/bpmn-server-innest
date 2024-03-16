/**
 * This file was automatically generated by simpleapp generator. Every
 * MODIFICATION OVERRIDE BY GENERATEOR
 * last change 2024-02-23
 * Author: Ks Tan
 */

export const DefaultInvoiceCustomer = (uuid: string) => {
  // {"_id":{"type":"string","required":false,"default":""},"label":{"type":"string","required":false,"default":""}}
  return {
    _id: uuid,

    // skip cause already hardcoded

    label: '',
  };
};

export const DefaultInvoiceDetailsProduct = (uuid: string) => {
  // {"_id":{"type":"string","required":false,"default":""},"label":{"type":"string","required":false,"default":""},"defaultPrice":{"type":"number","required":false,"default":0}}
  return {
    _id: uuid,

    // skip cause already hardcoded

    label: '',

    defaultPrice: 0,
  };
};

export const DefaultInvoiceDetails = (uuid: string) => {
  // {"quantity":{"type":"number","required":false,"default":1},"unitPrice":{"type":"number","required":false,"default":0},"subTotal":{"type":"number","required":false,"default":0},"created":{"type":"string","required":false,"description":"iso8601 dataempty mean new record","default":""},"updated":{"type":"string","required":false,"description":"iso8601 or empty","default":""},"createdBy":{"type":"string","required":false,"default":""},"updatedBy":{"type":"string","required":false,"default":""},"_id":{"type":"string","required":false,"default":""},"product":"InvoiceDetailsProduct"}
  return {
    _id: uuid,

    quantity: 1,

    unitPrice: 0,

    subTotal: 0,

    created: '',

    updated: '',

    createdBy: '',

    updatedBy: '',

    // skip cause already hardcoded

    product: DefaultInvoiceDetailsProduct(''),
  };
};

export const DefaultInvoiceDocNoFormat = (uuid: string) => {
  // {"_id":{"type":"string","required":false,"default":""},"label":{"type":"string","required":false,"default":""}}
  return {
    _id: uuid,

    // skip cause already hardcoded

    label: '',
  };
};

export const DefaultInvoice = (uuid: string) => {
  // {"_id":{"type":"string","required":false,"format":"uuid","default":""},"created":{"type":"string","required":false,"default":""},"updated":{"type":"string","required":false,"default":""},"createdBy":{"type":"string","required":false,"default":""},"updatedBy":{"type":"string","required":false,"default":""},"tenantId":{"type":"number","required":false,"default":1},"orgId":{"type":"number","required":false,"default":1},"branchId":{"type":"number","required":false,"default":1},"invoiceNo":{"type":"string","required":false,"format":"documentno","examples":["SI1111"],"default":""},"invoiceDate":{"type":"string","required":false,"format":"date","default":""},"invoiceTitle":{"type":"string","required":false,"examples":["Sales to XYZ"],"default":""},"invoiceTotal":{"type":"number","required":false,"default":0},"description":{"type":"string","required":false,"format":"text","examples":["Maths Tuition primary 1"],"default":""},"customer":"InvoiceCustomer","details":["InvoiceDetails"],"docNoFormat":"InvoiceDocNoFormat"}
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

    invoiceNo: '',

    invoiceDate: '',

    invoiceTitle: '',

    invoiceTotal: 0,

    description: '',

    customer: DefaultInvoiceCustomer(''),

    details: [DefaultInvoiceDetails(crypto.randomUUID())], //typeof field == array     ["InvoiceDetails"]

    docNoFormat: DefaultInvoiceDocNoFormat(''),
  };
};
