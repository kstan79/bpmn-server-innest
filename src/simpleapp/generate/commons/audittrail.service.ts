/**
 * This file was automatically generated by simpleapp generator. Every
 * MODIFICATION OVERRIDE BY GENERATEOR
 * last change 2023-10-28
 * Author: Ks Tan
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditTrail {
  constructor() {}

  addEvent(data: any) {
    console.log('Add event into db:', data);
  }
}
