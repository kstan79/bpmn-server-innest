/**
 * This file was automatically generated by simpleapp generator. Every
 * MODIFICATION OVERRIDE BY GENERATEOR
 * last change 2024-02-23
 * Author: Ks Tan
 */
import { UserContext } from '../commons/user.context';
import * as sharelibs from '../sharelibs';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as jsonpath from 'jsonpath';
import { Model } from 'mongoose';
import { BranchJsonSchema } from '../jsonschemas/branch.jsonschema';
import { SimpleAppService } from './simpleapp.processor';
import { IsolationType } from '../types';
import { DocNumberFormatGenerator } from '../commons/docnogenerator.service';
import { BranchOrganization, Branch } from '../types/branch.type';
import {
  DefaultBranchOrganization,
  DefaultBranch,
} from '../defaults/branch.default';

@Injectable()
export class BranchProcessor extends SimpleAppService<Branch> {
  protected documentIdentityCode = 'branchCode';
  protected documentIdentityLabel = 'branchName';

  protected foreignkeys = { organization: ['$.organization._id'] };
  constructor(mydoc: Model<Branch>) {
    super('BRANCH', 'branch', mydoc, IsolationType.org);
    this.setSchema(BranchJsonSchema);
    this.setData(DefaultBranch(crypto.randomUUID()));
    this.addAutoCompleteField({
      branchId: 'branchId',
    });
  }

  reCalculateValue(data: Branch) {
    //console.log('trigger new recalculate')
    const jsopbj = new jsonpath['JSONPath']();
  }

  /***************************** additional execute *****************************************/
}
