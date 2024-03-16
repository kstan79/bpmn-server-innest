/**
 * This file was automatically generated by simpleapp generator. Every
 * MODIFICATION OVERRIDE BY GENERATEOR
 * last change 2024-02-23
 * Author: Ks Tan
 */
import { Schema } from 'mongoose';
import { BranchOrganization, Branch } from '../types/branch.type';
const schemasetting = {
  _id: { type: 'string', required: true }, //force _id as string

  created: { type: String, required: false }, //field

  updated: { type: String, required: false }, //field

  createdBy: { type: String, required: false }, //field

  updatedBy: { type: String, required: false }, //field

  tenantId: { type: Number, required: false }, //field

  orgId: { type: Number, required: false }, //field

  branchId: { type: Number, required: false }, //field

  branchCode: { type: String, required: true }, //field

  branchName: { type: String, required: true }, //field

  active: { type: Boolean, required: false }, //field

  description: { type: String, required: false }, //field

  organization: { type: <BranchOrganization>{}, required: false }, //object
};

export const BranchMongoSchema = new Schema(schemasetting, {
  collection: 'branch',
})
  .pre('save', function (next) {
    this.increment();
    return next();
  })

  .index({ orgId: 1, branchCode: 1 }, { unique: true })

  .index(
    {
      branchId: 1,
    },
    { unique: true },
  )

  .index({ 'organization._id': 1 });