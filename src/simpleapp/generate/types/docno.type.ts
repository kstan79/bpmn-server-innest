/**
 * This file was automatically generated by simpleapp generator. Every
 * MODIFICATION OVERRIDE BY GENERATEOR
 * last change 2024-02-23
 * Author: Ks Tan
 */
import { DefaultHooks } from '../types';

export type DocnoformatBranch = {
  _id?: string; // {"type":"string","required":false,"default":""}
  label?: string; // {"type":"string","required":false,"default":""}
  branchId?: number; // {"type":"number","required":false,"default":0}
};

export type Docnoformat = {
  _id?: string; // {"type":"string","required":false,"format":"uuid","default":""}
  created?: string; // {"type":"string","required":false,"default":""}
  updated?: string; // {"type":"string","required":false,"default":""}
  createdBy?: string; // {"type":"string","required":false,"default":""}
  updatedBy?: string; // {"type":"string","required":false,"default":""}
  tenantId?: number; // {"type":"number","required":false,"default":1}
  orgId?: number; // {"type":"number","required":false,"default":1}
  branchId?: number; // {"type":"number","required":false,"default":1}
  docNoFormatNo?: string; // {"type":"string","required":false,"examples":["INV"],"default":""}
  docNoFormatName?: string; // {"type":"string","required":false,"examples":["Invoice Default Format"],"default":""}
  active?: boolean; // {"type":"boolean","required":false,"examples":[true],"default":true}
  default?: boolean; // {"type":"boolean","required":false,"examples":[true],"default":true}
  docNoType?: string; // {"type":"string","required":false,"examples":["SI","PI"],"default":""}
  docNoPattern?: string; // {"type":"string","required":false,"description":"{date} format as ISO8601 symbol","examples":["SI{YYMM}-<000>","PI-2023-<0000>"],"default":""}
  nextNumber?: number; // {"type":"number","required":false,"default":1}
  branch: DocnoformatBranch; //child object
};

export type DocnoformatHooks = DefaultHooks<Docnoformat> & {};