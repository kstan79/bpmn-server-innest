/**
 * This file was automatically generated by simpleapp generator. Every
 * MODIFICATION OVERRIDE BY GENERATEOR
 * last change 2024-02-23
 * Author: Ks Tan
 */
import { Schema } from 'mongoose';
import { TenantOwner, Tenant } from '../types/tenant.type';
const schemasetting = {
  _id: { type: 'string', required: true }, //force _id as string

  created: { type: String, required: false }, //field

  updated: { type: String, required: false }, //field

  createdBy: { type: String, required: false }, //field

  updatedBy: { type: String, required: false }, //field

  tenantId: { type: Number, required: true }, //field

  orgId: { type: Number, required: false }, //field

  branchId: { type: Number, required: false }, //field

  tenantName: { type: String, required: true }, //field

  active: { type: Boolean, required: false }, //field

  description: { type: String, required: false }, //field

  owner: { type: <TenantOwner>{}, required: false }, //object
};

export const TenantMongoSchema = new Schema(schemasetting, {
  collection: 'tenant',
})
  .pre('save', function (next) {
    this.increment();
    return next();
  })

  .index({ tenantId: 1 }, { unique: true })

  .index({ 'owner._id': 1 });
