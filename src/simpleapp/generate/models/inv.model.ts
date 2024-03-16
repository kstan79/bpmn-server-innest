/**
 * This file was automatically generated by simpleapp generator. Every
 * MODIFICATION OVERRIDE BY GENERATEOR
 * last change 2024-02-23
 * Author: Ks Tan
 */
import { Schema } from 'mongoose';
import {
  InvoiceCustomer,
  InvoiceDetailsProduct,
  InvoiceDetails,
  InvoiceDocNoFormat,
  Invoice,
} from '../types/inv.type';
const schemasetting = {
  _id: { type: 'string', required: true }, //force _id as string

  created: { type: String, required: false }, //field

  updated: { type: String, required: false }, //field

  createdBy: { type: String, required: false }, //field

  updatedBy: { type: String, required: false }, //field

  tenantId: { type: Number, required: false }, //field

  orgId: { type: Number, required: false }, //field

  branchId: { type: Number, required: false }, //field

  invoiceNo: { type: String, required: true }, //field

  invoiceDate: { type: String, required: false }, //field

  invoiceTitle: { type: String, required: true }, //field

  invoiceTotal: { type: Number, required: false }, //field

  description: { type: String, required: false }, //field

  customer: { type: <InvoiceCustomer>{}, required: false }, //object

  details: [{ type: <InvoiceDetails>{}, required: false }], //custom array

  docNoFormat: { type: <InvoiceDocNoFormat>{}, required: false }, //object
};

export const InvoiceMongoSchema = new Schema(schemasetting, {
  collection: 'invoice',
})
  .pre('save', function (next) {
    this.increment();
    return next();
  })

  .index({ orgId: 1, invoiceNo: 1 }, { unique: true })

  .index({ 'customer._id': 1 })

  .index({ 'details.product._id': 1 })

  .index({ 'docNoFormat._id': 1 });