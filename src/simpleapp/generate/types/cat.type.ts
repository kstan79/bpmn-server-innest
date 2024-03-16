/**
 * This file was automatically generated by simpleapp generator. Every
 * MODIFICATION OVERRIDE BY GENERATEOR
 * last change 2024-02-23
 * Author: Ks Tan
 */
import { DefaultHooks } from '../types';

export type Category = {
  _id?: string; // {"type":"string","required":false,"format":"uuid","default":""}
  created?: string; // {"type":"string","required":false,"default":""}
  updated?: string; // {"type":"string","required":false,"default":""}
  createdBy?: string; // {"type":"string","required":false,"default":""}
  updatedBy?: string; // {"type":"string","required":false,"default":""}
  tenantId?: number; // {"type":"number","required":false,"default":1}
  orgId?: number; // {"type":"number","required":false,"default":1}
  branchId?: number; // {"type":"number","required":false,"default":1}
  categoryCode?: string; // {"type":"string","required":false,"examples":["TUITION"],"default":""}
  categoryName?: string; // {"type":"string","required":false,"examples":["Tuition Service"],"default":""}
  active?: boolean; // {"type":"boolean","required":false,"examples":[true],"default":true}
  categoryType?: string; // {"type":"string","required":false,"examples":["class"],"default":""}
  description?: string; // {"type":"string","required":false,"format":"text","examples":["Maths Tuition primary 1"],"default":""}
};

export type CategoryHooks = DefaultHooks<Category> & {};
