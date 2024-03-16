/**
 * This file was automatically generated by simpleapp generator. Every
 * MODIFICATION OVERRIDE BY GENERATEOR
 * last change 2024-02-23
 * Author: Ks Tan
 */
import { DefaultHooks } from '../types';

export type InvoiceCustomer = {
  _id?: string; // {"type":"string","required":false,"default":""}
  label?: string; // {"type":"string","required":false,"default":""}
};

export type InvoiceDetailsProduct = {
  _id?: string; // {"type":"string","required":false,"default":""}
  label?: string; // {"type":"string","required":false,"default":""}
  defaultPrice?: number; // {"type":"number","required":false,"default":0}
};

export type InvoiceDetails = {
  quantity?: number; // {"type":"number","required":false,"default":1}
  unitPrice?: number; // {"type":"number","required":false,"default":0}
  subTotal?: number; // {"type":"number","required":false,"default":0}
  created?: string; // {"type":"string","required":false,"description":"iso8601 dataempty mean new record","default":""}
  updated?: string; // {"type":"string","required":false,"description":"iso8601 or empty","default":""}
  createdBy?: string; // {"type":"string","required":false,"default":""}
  updatedBy?: string; // {"type":"string","required":false,"default":""}
  _id?: string; // {"type":"string","required":false,"default":""}
  product: InvoiceDetailsProduct; //child object
};

export type InvoiceDocNoFormat = {
  _id?: string; // {"type":"string","required":false,"default":""}
  label?: string; // {"type":"string","required":false,"default":""}
};

export type Invoice = {
  _id?: string; // {"type":"string","required":false,"format":"uuid","default":""}
  created?: string; // {"type":"string","required":false,"default":""}
  updated?: string; // {"type":"string","required":false,"default":""}
  createdBy?: string; // {"type":"string","required":false,"default":""}
  updatedBy?: string; // {"type":"string","required":false,"default":""}
  tenantId?: number; // {"type":"number","required":false,"default":1}
  orgId?: number; // {"type":"number","required":false,"default":1}
  branchId?: number; // {"type":"number","required":false,"default":1}
  invoiceNo?: string; // {"type":"string","required":false,"format":"documentno","examples":["SI1111"],"default":""}
  invoiceDate?: string; // {"type":"string","required":false,"format":"date","default":""}
  invoiceTitle?: string; // {"type":"string","required":false,"examples":["Sales to XYZ"],"default":""}
  invoiceTotal?: number; // {"type":"number","required":false,"default":0}
  description?: string; // {"type":"string","required":false,"format":"text","examples":["Maths Tuition primary 1"],"default":""}
  customer: InvoiceCustomer; //child object

  details: InvoiceDetails[]; //array

  docNoFormat: InvoiceDocNoFormat; //child object
};

export type InvoiceHooks = DefaultHooks<Invoice> & {};
