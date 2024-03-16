/**
 * This file was automatically generated by simpleapp generator. Every
 * MODIFICATION OVERRIDE BY GENERATEOR
 * last change 2024-02-23
 * Author: Ks Tan
 */
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DocnoformatProcessor } from '../generate/processors/docno.processor';
import { Docnoformat, DocnoformatHooks } from '../generate/types';
import { UserContext } from '../generate/commons/user.context';
import * as moment from 'moment';
import { DocNumberFormatGenerator } from '../generate/commons/docnogenerator.service';
export { Docnoformat } from '../generate/types';

@Injectable()
export class DocnoformatService extends DocnoformatProcessor {
  protected strictIsolation = false;
  hooks: DocnoformatHooks = {};
  constructor(@InjectModel('Docnoformat') mydoc: Model<Docnoformat>) {
    super(mydoc);
  }

  /**
   * list document number format and prepare sample of docformat
   * @param appuser
   * @param doctype
   * @returns
   */
  async runListDocFormats(appuser: UserContext, doctype: string) {
    doctype = doctype.toUpperCase();
    const searchresult = await this.search(
      appuser,
      { docNoType: doctype, 'branch.branchId': appuser.getBranchId() },
      undefined,
      { default: 'desc' },
    );
    //console.log('searchresult',searchresult);
    let data: any = [];
    for (let i = 0; i < searchresult.length; i++) {
      const s = searchresult[i];
      if (s.active && s.docNoPattern) {
        data.push({
          _id: s._id,
          docNoFormatNo: s.docNoFormatNo,
          docNoFormatName: s.docNoFormatName,
          docNoPattern: s.docNoPattern,
          nextNumber: s.nextNumber,
          default: s.default,
          sample: DocNumberFormatGenerator.previewDocNo(s),
        });
      }
    }
    return data;
  }
}