/**
 * This file was automatically generated by simpleapp generator. Every
 * MODIFICATION OVERRIDE BY GENERATEOR
 * last change 2024-02-23
 * Author: Ks Tan
 */
export const PermissionJsonSchema = {"type":"object","x-simpleapp-config":{"documentType":"perm","documentName":"permission","isolationType":"org","additionalApis":[{"action":"listUser","entryPoint":"listuser","requiredRole":["SuperAdmin"],"method":"get","description":"Get current permissionlist lookup user info"}],"foreignKeys":{"user":["$.userId"]}},"properties":{"_id":{"type":"string","format":"uuid"},"created":{"type":"string"},"updated":{"type":"string"},"createdBy":{"type":"string"},"updatedBy":{"type":"string"},"tenantId":{"type":"integer","default":1,"minimum":0},"orgId":{"type":"integer","default":1,"minimum":0},"branchId":{"type":"integer","default":1,"minimum":0},"groups":{"type":"array","minItems":1,"items":{"type":"string"}},"uid":{"type":"string","description":"sso unique identity, which is keycloak sub"},"userId":{"type":"string","x-foreignkey":"user","format":"uuid","description":"primary key from user"}}}