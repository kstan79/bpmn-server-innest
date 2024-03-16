/**
 * This file was automatically generated by simpleapp generator. Every
 * MODIFICATION OVERRIDE BY GENERATEOR
 * last change 2024-02-23
 * Author: Ks Tan
 */
import { DefaultHooks } from '../types';

export type TenantOwner = {
  _id: string; // {"type":"string","required":true,"default":""}
  label: string; // {"type":"string","required":true,"default":""}
  uid: string; // {"type":"string","required":true,"default":""}
};

export type Tenant = {
  _id?: string; // {"type":"string","required":false,"format":"uuid","default":""}
  created?: string; // {"type":"string","required":false,"default":""}
  updated?: string; // {"type":"string","required":false,"default":""}
  createdBy?: string; // {"type":"string","required":false,"default":""}
  updatedBy?: string; // {"type":"string","required":false,"default":""}
  tenantId: number; // {"type":"number","required":true,"default":1}
  orgId?: number; // {"type":"number","required":false,"default":1}
  branchId?: number; // {"type":"number","required":false,"default":1}
  tenantName: string; // {"type":"string","required":true,"default":""}
  active?: boolean; // {"type":"boolean","required":false,"examples":[true],"default":true}
  description?: string; // {"type":"string","required":false,"default":""}
  owner: TenantOwner; //child object
};

export type TenantHooks = DefaultHooks<Tenant> & {};