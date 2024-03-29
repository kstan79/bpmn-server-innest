/**
 * This file was automatically generated by simpleapp generator. Every
 * MODIFICATION OVERRIDE BY GENERATEOR
 * last change 2024-02-23
 * Author: Ks Tan
 */
import { Schema } from 'mongoose';
import {  ProductCategory,  Product,  }  from '../types/prd.type';
const schemasetting = {
  
      
    
          _id: {type:'string', required:true},  //force _id as string
          
    
          created: {type: String, required: false},  //field 
          
    
          updated: {type: String, required: false},  //field 
          
    
          createdBy: {type: String, required: false},  //field 
          
    
          updatedBy: {type: String, required: false},  //field 
          
    
          tenantId: {type: Number, required: false},  //field 
          
    
          orgId: {type: Number, required: false},  //field 
          
    
          branchId: {type: Number, required: false},  //field 
          
    
          productCode: {type: String, required: true},  //field 
          
    
          productName: {type: String, required: true},  //field 
          
    
          defaultPrice: {type: Number, required: false},  //field 
          
    
          active: {type: Boolean, required: false},  //field 
          
    
          description: {type: String, required: false},  //field 
          
    
          tags: [{type: <string>{}, required:false}],  //custom array
          
    
          category: {type: <ProductCategory>{}, required:false},   //object
      };

export const ProductMongoSchema = new Schema(schemasetting,{collection: 'product'})
.pre('save', function(next) {
    this.increment();
    return next();
})

     
       
            .index({ 'orgId':1, 'productCode': 1 }, { unique: true })
      
  
  


  
          .index({'category._id':1})
      