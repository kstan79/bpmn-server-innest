/**
 * This file was automatically generated by simpleapp generator. Every
 * MODIFICATION OVERRIDE BY GENERATEOR
 * last change 2024-02-23
 * Author: Ks Tan
 */
import { ApiProperty } from '@nestjs/swagger';

export class Organization {
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
  @ApiProperty({ type: 'number', required: true, default: 1 })
  orgId: number;
  @ApiProperty({ type: 'number', required: false, default: 1 })
  branchId: number;
  @ApiProperty({ type: 'string', required: true, default: '' })
  orgCode: string;
  @ApiProperty({ type: 'string', required: true, default: '' })
  orgName: string;
  @ApiProperty({ type: 'boolean', required: false, default: true })
  active: boolean;
  @ApiProperty({ type: 'string', required: false, format: 'text', default: '' })
  description: string;
  @ApiProperty({
    type: 'string',
    required: false,
    examples: ['Asia/Kuala_Lumpur'],
    default: '',
  })
  timeZone: string;
  @ApiProperty({ type: 'number', required: false, default: 0 })
  offsetMinute: number;
  @ApiProperty({ type: 'string', required: false, default: '' })
  currency: string;
  @ApiProperty({ type: 'string', required: false, default: '' })
  country: string;
}

/*****************************customized code begin here *****************************************/
