/**
 * This file was automatically generated by simpleapp generator. Every
 * MODIFICATION OVERRIDE BY GENERATEOR
 * last change 2024-02-23
 * Author: Ks Tan
 */
import { ApiProperty } from '@nestjs/swagger';

export class Autoincreament {
  @ApiProperty({ type: 'string', required: false, format: 'uuid', default: '' })
  _id: string;
  @ApiProperty({ type: 'string', required: false, default: '' })
  created: string;
  @ApiProperty({ type: 'string', required: false, default: '' })
  updated: string;
  @ApiProperty({ type: 'string', required: false, default: '' })
  createdBy: string;
  @ApiProperty({ type: 'string', required: false, default: '' })
  updatedBy: string;
  @ApiProperty({ type: 'number', required: false, default: 1 })
  tenantId: number;
  @ApiProperty({ type: 'number', required: false, default: 1 })
  orgId: number;
  @ApiProperty({ type: 'number', required: false, default: 1 })
  branchId: number;
  @ApiProperty({ type: 'string', required: true, default: '' })
  collectionName: string;
  @ApiProperty({ type: 'string', required: true, default: '' })
  fieldName: string;
  @ApiProperty({ type: 'number', required: true, default: 0 })
  nextNo: number;
}

/*****************************customized code begin here *****************************************/