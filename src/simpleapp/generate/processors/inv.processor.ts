/**
 * This file was automatically generated by simpleapp generator. Every
 * MODIFICATION OVERRIDE BY GENERATEOR
 * last change 2024-02-23
 * Author: Ks Tan
 */
import { UserContext } from '../commons/user.context'
import * as sharelibs from '../sharelibs'
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as jsonpath from 'jsonpath'
import { Model } from 'mongoose';
import {InvoiceJsonSchema } from '../jsonschemas/inv.jsonschema'
import { SimpleAppService } from './simpleapp.processor';
import { IsolationType } from '../types';
import {DocNumberFormatGenerator} from '../commons/docnogenerator.service'
import {  InvoiceCustomer,  InvoiceDetailsProduct,  InvoiceDetails,  InvoiceDocNoFormat,  Invoice,  }  from '../types/inv.type';
import {   DefaultInvoiceCustomer,    DefaultInvoiceDetailsProduct,    DefaultInvoiceDetails,    DefaultInvoiceDocNoFormat,    DefaultInvoice,   } from '../defaults/inv.default'



@Injectable()
export class InvoiceProcessor extends SimpleAppService<Invoice>  {
  protected documentIdentityCode='invoiceNo'
  protected documentIdentityLabel='invoiceTitle'
    protected withDocNumberFormat = true
  
  protected foreignkeys = {"customer":["$.customer._id"],"product":["$.details[*].product._id"],"docnoformat":["$.docNoFormat._id"]}
    constructor(mydoc: Model<Invoice>) {
    super('INV','invoice',mydoc,IsolationType.org);
    this.setSchema(InvoiceJsonSchema)
    this.setData(DefaultInvoice(crypto.randomUUID()))
        }
   
   reCalculateValue(data:Invoice){
    //console.log('trigger new recalculate')    
    const jsopbj= new jsonpath['JSONPath']()
                                // {"jsonPath":"$.details[*]","formula":"sharelibs.getSubtotal(value)"}          //const tmp = jsopbj.query(vdata,fieldpath).filter((item:string)=>item!='')
          
          jsopbj.apply(data, '$.details[*]', function(value:any) { return sharelibs.getSubtotal(value) });

                            // {"jsonPath":"$.invoiceTotal","formula":"sharelibs.getTotal(data.details)"}          //const tmp = jsopbj.query(vdata,fieldpath).filter((item:string)=>item!='')
          
          jsopbj.apply(data, '$.invoiceTotal', function(value:any) { return sharelibs.getTotal(data.details) });

                  
  }


  /***************************** additional execute *****************************************/
    

}
