/**
 * This file was automatically generated by simpleapp generator. Every
 * MODIFICATION OVERRIDE BY GENERATEOR
 * last change 2024-02-23
 * Author: Ks Tan
 */
export const DocnoformatJsonSchema = {
  type: 'object',
  'x-simpleapp-config': {
    isolationType: 'org',
    documentType: 'docno',
    documentName: 'docnoformat',
    pageType: 'crud',
    uniqueKey: 'docNoFormatNo',
    documentTitle: 'docNoFormatName',
    additionalAutoCompleteFields: ['default'],
    additionalApis: [
      {
        action: 'listDocFormats',
        entryPoint: '/listdocformats/:doctype',
        requiredRole: ['User'],
        method: 'get',
        description: 'get list of document format for 1 doctype',
      },
    ],
    foreignKeys: { branch: ['$.branch._id'] },
  },
  properties: {
    _id: { type: 'string', format: 'uuid' },
    created: { type: 'string' },
    updated: { type: 'string' },
    createdBy: { type: 'string' },
    updatedBy: { type: 'string' },
    tenantId: { type: 'integer', default: 1, minimum: 1 },
    orgId: { type: 'integer', default: 1, minimum: 1 },
    branchId: { type: 'integer', default: 1, minimum: 1 },
    branch: {
      type: 'object',
      'x-foreignkey': 'branch',
      properties: {
        _id: { type: 'string' },
        label: { type: 'string' },
        branchId: { type: 'integer' },
      },
    },
    docNoFormatNo: { type: 'string', examples: ['INV'] },
    docNoFormatName: { type: 'string', examples: ['Invoice Default Format'] },
    active: { type: 'boolean', examples: [true], default: true },
    default: { type: 'boolean', examples: [true], default: true },
    docNoType: { type: 'string', examples: ['SI', 'PI'] },
    docNoPattern: {
      type: 'string',
      examples: ['SI{YYMM}-<000>', 'PI-2023-<0000>'],
      description: '{date} format as ISO8601 symbol',
    },
    nextNumber: { type: 'integer', default: 1 },
  },
};