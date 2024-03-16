/**
 * This file was automatically generated by simpleapp generator. Every
 * MODIFICATION OVERRIDE BY GENERATEOR
 * last change 2024-02-23
 * Author: Ks Tan
 */
export const ProductJsonSchema = {
  type: 'object',
  'x-simpleapp-config': {
    documentType: 'prd',
    documentName: 'product',
    uniqueKey: 'productCode',
    documentTitle: 'productName',
    isolationType: 'org',
    pageType: 'crud',
    additionalAutoCompleteFields: ['defaultPrice'],
    foreignKeys: { category: ['$.category._id'] },
  },
  properties: {
    _id: { type: 'string', format: 'uuid' },
    created: { type: 'string' },
    updated: { type: 'string' },
    createdBy: { type: 'string' },
    updatedBy: { type: 'string' },
    tenantId: { type: 'integer', default: 1 },
    orgId: { type: 'integer', default: 1 },
    branchId: { type: 'integer', default: 1 },
    productCode: { type: 'string', examples: ['BK-MTHP1'] },
    productName: { type: 'string', examples: ['Math Primary 1 Book'] },
    category: {
      type: 'object',
      'x-foreignkey': 'category',
      properties: { _id: { type: 'string' }, label: { type: 'string' } },
    },
    defaultPrice: { type: 'number' },
    active: { type: 'boolean', default: true },
    description: { type: 'string' },
    tags: {
      type: 'array',
      items: { type: 'string', examples: ['P1', 'Math'] },
    },
  },
};
