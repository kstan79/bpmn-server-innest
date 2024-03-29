/**
 * This file was automatically generated by simpleapp generator. Every
 * MODIFICATION OVERRIDE BY GENERATEOR
 * last change 2024-02-23
 * Author: Ks Tan
 */
import {DefaultHooks} from  "../types"

  
    export type CustomerDocNoFormat = {
     
           
                        _id ?: string;   // {"type":"string","required":false,"default":""}                   
                        label ?: string;   // {"type":"string","required":false,"default":""}              
  }
  
    export type Customer = {
     
           
                        _id ?: string;   // {"type":"string","required":false,"format":"uuid","default":""}                   
                        created ?: string;   // {"type":"string","required":false,"default":""}                   
                        updated ?: string;   // {"type":"string","required":false,"default":""}                   
                        createdBy ?: string;   // {"type":"string","required":false,"default":""}                   
                        updatedBy ?: string;   // {"type":"string","required":false,"default":""}                   
                        tenantId ?: number;   // {"type":"number","required":false,"default":1}                   
                        orgId ?: number;   // {"type":"number","required":false,"default":1}                   
                        branchId ?: number;   // {"type":"number","required":false,"default":1}                   
                        customerNo ?: string;   // {"type":"string","required":false,"format":"documentno","examples":["S0001"],"default":""}                   
                        customerName ?: string;   // {"type":"string","required":false,"examples":["Customer 1"],"default":""}                   
                        customerStatus ?: string;   // {"type":"string","required":false,"examples":["unknown"],"default":""}                   
                        email ?: string;   // {"type":"string","required":false,"default":""}                   
                        tel ?: string;   // {"type":"string","required":false,"default":""}                   
                        active ?: boolean;   // {"type":"boolean","required":false,"examples":[true],"default":true}                   
                        description ?: string;   // {"type":"string","required":false,"format":"text","default":""}                   
                        docNoFormat : CustomerDocNoFormat; //child object
              
  }



export type CustomerHooks = DefaultHooks<Customer> & {
  
  
}