/**
 * This file was automatically generated by simpleapp generator. Every
 * MODIFICATION OVERRIDE BY GENERATEOR
 * last change 2024-02-23
 * Author: Ks Tan
 */
import { UserService, User } from './../services/user.service';
import {
  Injectable,
  Scope,
  Inject,
  Logger,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserContext } from '../generate/commons/user.context';
import { RegTenant } from './profile.types';
import * as mongoose from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { TenantService, Tenant } from '../services/tenant.service';
import { OrganizationService, Organization } from '../services/org.service';
import { BranchService, Branch } from '../services/branch.service';
import { PermissionService, Permission } from './../services/perm.service';

const Base64URL = require('@darkwolf/base64url');
@Injectable()
export class ProfileService {
  protected logger = new Logger();
  constructor(
    private usersvc: UserService,
    private tenantsvc: TenantService,
    private orgsvc: OrganizationService,
    private branchsvc: BranchService,
    private permsvc: PermissionService,
  ) {}

  /**
   * get user profile for current tenant
   * tenantId=0, if profile not exists will auto create one
   * tenantId>0, if profile not exists will reject
   * @param appuser
   * @returns
   */
  async getProfile(appuser: UserContext) {
    const accessTenantId = appuser.getTenantId();
    this.logger.verbose(
      `get userprofile for ${appuser.getUid()} for tenantId ${accessTenantId}`,
      'getProfile',
    );
    const userinfo = await appuser.getUserInfo();

    if (userinfo._id == '') {
      this.logger.warn('unknown _id for ', appuser.getUid());

      let newprofile;
      if (accessTenantId == 0) {
        newprofile = await this.createUserProfile(appuser);
        newprofile['time'] = new Date().toISOString();
        return newprofile;
      } else {
        return undefined;
      }
    } else {
      userinfo['time'] = new Date().toISOString();
      return userinfo;
    }
  }

  async createUserProfile(appuser: UserContext) {
    const data: User = {
      uid: appuser.getUid(),
      fullName: appuser.getFullname(),
      email: appuser.getEmail(),
      active: true,
      doctype: 'user',
    } as User;
    if (appuser.getTenantId() == 0) {
      data.tenantId = 0;
      data.orgId = 0;
      data.branchId = 0;
    }
    const createresult = await this.usersvc.create(appuser, data);
    const userinfo = await appuser.getUserInfo();
    userinfo._id = createresult._id;
    return userinfo;
  }

  async createTenant(appuser: UserContext, tenantName: string) {
    // try{
    appuser.getDBSession().startTransaction();
    const tenantdata: Tenant = {
      tenantId: 1,
      tenantName: tenantName,
      active: true,
      owner: {
        _id: appuser.getId(),
        label: appuser.getFullname(),
        uid: appuser.getUid(),
      },
    };
    this.logger.log(tenantdata, 'createTenant data');
    const tenantResult = await this.tenantsvc.create(appuser, tenantdata);
    if (!tenantResult) {
      throw new BadRequestException('Create tenant failed');
    }
    this.logger.log(tenantResult, 'createTenant result');
    const tenantId = tenantResult.tenantId;

    // return tenantResult
    const orgdata: Organization = {
      tenantId: tenantResult.tenantId,
      orgName: tenantName,
      active: true,
      orgCode: 'HQ',
      orgId: 1,
    };

    this.logger.log(orgdata, 'createOrg data');
    const orgResult = await this.orgsvc.create(appuser, orgdata);
    if (!orgResult) {
      throw new BadRequestException('Create Org failed');
    }
    const orgRecordId = orgResult._id.toString();
    this.logger.log(orgResult, 'createOrg result');

    const branchdata: Branch = {
      branchId: 1,
      branchCode: 'HQ',
      branchName: tenantName,
      active: true,
      orgId: orgResult.orgId,
      tenantId: tenantResult.tenantId,
      organization: { _id: orgRecordId, label: tenantName },
    };
    this.logger.log(branchdata, 'createbranch data');

    const branchResult = await this.branchsvc.create(appuser, branchdata);
    if (!branchResult) {
      throw new BadRequestException('Create Branch failed');
    }
    const branchRecordId = branchResult._id.toString();
    this.logger.log(branchResult, 'createbranch result');

    const userdata: User = {
      tenantId: tenantResult.tenantId,
      orgId: orgResult.orgId,
      branchId: branchResult.branchId,
      uid: appuser.getUid(),
      fullName: appuser.getFullname(),
      email: appuser.getEmail(),
      active: true,
    };
    this.logger.log(userdata, 'createtenant user data');
    const userResult = await this.usersvc.create(appuser, userdata);
    // if(true ){
    if (!userResult) {
      throw new BadRequestException('Create User failed');
    }

    this.logger.log(userResult, 'createtenant user result');
    const userRecordId = userResult._id.toString();

    const permdata: Permission = {
      tenantId: tenantResult.tenantId,
      orgId: orgResult.orgId,
      branchId: branchResult.branchId,
      uid: appuser.getUid(),
      userId: userRecordId,
      groups: ['admin'],
    };
    this.logger.log(permdata, 'create Permission data');
    const permResult = await this.permsvc.create(appuser, permdata);
    if (!permResult) {
      throw new BadRequestException('Create permResult failed');
    }

    this.logger.log(permResult, 'create Permission result');

    //tenant owner shall map to userId for that tenant

    const tenantUpdateData = await this.tenantsvc.findById(
      appuser,
      tenantResult._id,
    );
    this.logger.log(
      tenantUpdateData,
      `update tenant owner(${tenantResult._id})`,
    );
    tenantUpdateData.owner._id = userRecordId;
    const updateTenantOwnerResult = await this.tenantsvc.findIdThenUpdate(
      appuser,
      tenantResult._id,
      tenantUpdateData,
    );
    if (!updateTenantOwnerResult) {
      throw new BadRequestException('Update tenant owner failed');
    }
    const xorg: string = Base64URL.encodeText(
      `${tenantResult.tenantId}-${orgResult.orgId}-${branchResult.branchId}`,
    );
    const finalresult = {
      xOrg: xorg,
      tenantId: tenantResult.tenantId,
      orgId: orgResult.orgId,
      branchId: branchResult.branchId,
    };
    return finalresult;
    // }catch(e){
    //   this.logger.error("Couldn't generate tenant or subsequence records")
    //   throw new InternalServerErrorException(e)
    // }
  }

  /**
   * accept or reject invitation
   * @param appuser
   * @param id
   * @param decision
   */
  async decideInvitation(appuser: UserContext, id: string, decision: string) {
    return await appuser.decideInvitation(id, decision);
  }

  async getAllTenants(appuser: UserContext) {
    return await appuser.getAllTenants();
  }

  async getSession(appuser: UserContext) {
    return 'OK';
  }
}
