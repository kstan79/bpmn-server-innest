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
import {AutoincreamentJsonSchema } from '../jsonschemas/autoinc.jsonschema'
import { SimpleAppService } from './simpleapp.processor';
import { IsolationType } from '../types';
import {DocNumberFormatGenerator} from '../commons/docnogenerator.service'
import {  Autoincreament,  }  from '../types/autoinc.type';
import {   DefaultAutoincreament,   } from '../defaults/autoinc.default'



@Injectable()
export class AutoincreamentProcessor extends SimpleAppService<Autoincreament>  {
  protected documentIdentityCode=''
  protected documentIdentityLabel=''
  
  protected foreignkeys = {}
    constructor(mydoc: Model<Autoincreament>) {
    super('AUTOINC','autoincreament',mydoc,IsolationType.none);
    this.setSchema(AutoincreamentJsonSchema)
    this.setData(DefaultAutoincreament(crypto.randomUUID()))
        }
   
   reCalculateValue(data:Autoincreament){
    //console.log('trigger new recalculate')    
    const jsopbj= new jsonpath['JSONPath']()
        
  }


  /***************************** additional execute *****************************************/
    

}
