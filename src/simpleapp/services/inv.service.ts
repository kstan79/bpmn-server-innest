/**
 * This file was automatically generated by simpleapp generator. It is changable
 * --remove-this-line-to-prevent-override--
 * last change 2024-02-23
 * Author: Ks Tan
 */

/**
 * This file was automatically generated by simpleapp generator.
 
 * last change 2023-09-23
 * Author: Ks Tan
 */
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { UserContext } from '../generate/commons/user.context';
import { InvoiceProcessor } from '../generate/processors/inv.processor';
//import { Invoice,InvoiceHooks} from '../generate/types';
import * as types from '../generate/types';
export { Invoice } from '../generate/types';

@Injectable()
export class InvoiceService extends InvoiceProcessor {
  public hooks: types.InvoiceHooks = {};
  constructor(@InjectModel('Invoice') mydoc: Model<types.Invoice>) {
    super(mydoc);
  }

  /***************************** begin x-document-api definitions *****************************************/

  /***************************** end x-document-api definitions *****************************************/
}
