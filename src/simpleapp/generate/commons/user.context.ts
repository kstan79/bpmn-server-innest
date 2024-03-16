/**
 * This file was automatically generated by simpleapp generator. Every
 * MODIFICATION OVERRIDE BY GENERATEOR
 * last change 2024-01-01
 * Author: Ks Tan
 * permission design
 * 1. during sign in, user can pick run as what group user
 * 2.
 */
import {
  Injectable,
  Scope,
  Inject,
  Logger,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { Model, model, connect, PipelineStage } from 'mongoose';
import { ModifiedCollection, ModifiedRecords } from '../types';
import _, { isNumber } from 'lodash';
import { Module } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Role } from './roles/roles.enum';
import * as rolegroups from './roles/roles.group';
import { UserService } from './../../services/user.service';
import { InjectModel } from '@nestjs/mongoose';
const Base64URL = require('@darkwolf/base64url');
import { UserMongoSchema } from './../models/user.model';
import { User } from './../types/user.type';
import { Permission } from './../types/perm.type';
import {
  ProfileUserBranch,
  ProfileUserInvites,
} from '../../profile/profile.types';

import { ClientSession } from 'mongoose';

@Injectable({ scope: Scope.REQUEST })
export class UserContext {
  protected sessionId: string = crypto.randomUUID();
  protected logger = new Logger();
  protected uid: string = '-';
  protected _id: string = '-';
  protected uname: string = '';
  protected email: string = '';
  protected fullname: string = '';
  protected xOrg: string = '';
  protected tenantId: number = 0;
  protected orgId: number = 0;
  protected orgRecordId: string = '';
  protected branchRecordId: string = '';
  protected branchId: number = 0;
  protected ssoACL: any = {};
  protected token: string = '';
  protected refreshtoken: string = '';
  protected groups: string[] = [];
  protected branchCode: string = '';
  protected branchName: string = '';
  protected orgCode: string = '';
  protected orgName: string = '';
  protected timeZone: string = '';
  protected country: string = '';
  protected offsetMinute: number = 0;
  protected currency: string = '';
  protected branches: any[] = [];
  protected lastActivity: string = new Date().toISOString();
  protected invites: any[] = []; //User + field tenant:Tenant[]
  protected roles: string[] = [];
  protected moreProps: any[] = [];
  private dbsession: ClientSession;
  protected modifiedRecords: ModifiedRecords = {
    createds: {},
    updateds: {},
    deleteds: {},
  };

  constructor(
    private readonly usermodel: Model<User>,
    private readonly permmodel: Model<Permission>,
    // private dbsession: ClientSession,
  ) {}

  setDBSession = (dbsession: ClientSession) => {
    this.dbsession = dbsession;
  };
  getDBSession = (): ClientSession => this.dbsession;
  getId = () => this._id;
  getUid = () => this.uid;
  getUname = () => this.uname;
  getFullname = () => this.fullname;
  getTenantId = () => this.tenantId;
  getOrgId = () => this.orgId;
  getBranchId = () => this.branchId;
  getEmail = () => this.email;
  getTimeZone = () => this.timeZone;
  getCountry = () => this.country;
  getOffsetMinute = () => this.offsetMinute;
  getGroups = () => this.groups;
  getCurrency = () => this.currency;
  getMoreProps = () => this.moreProps;
  getRoles = () => this.roles;
  getModifieds = () => this.modifiedRecords;
  getBranches = (): ProfileUserBranch[] => {
    this.branches;
    const data: ProfileUserBranch[] = [];

    if (this.branches) {
      for (let i = 0; i < this.branches.length; i++) {
        const b = this.branches[i];
        data.push({
          _id: b._id,
          branch: b.branch[0],
          groups: b.groups,
          xOrg: this.generateXorg(b.tenantId, b.orgId, b.branchId),
        });
      }
    }
    return data;
  };
  getInvites = (): ProfileUserInvites[] => {
    // const usermodel = model<User>('user',UserMongoSchema,'user')

    const data: ProfileUserInvites[] = [];
    if (this.invites) {
      // console.log("getInvites",res)
      for (let i = 0; i < this.invites.length; i++) {
        const r = this.invites[0];

        data.push({
          _id: r._id,
          email: r.email,
          tenantId: r.tenantId,
          fullName: '',
          tenantName: r.tenant[0].tenantName,
          created: r.created,
        });
      }
    }
    return data;
  };
  setCurrentUserInfo = async (tokenstr: string, xorg) => {
    this.setXorg(xorg);
    if(tokenstr) await this.setUserToken(tokenstr);
    else return //anonymous

  };

  /**
   * obtain user profile filter by uid,tenantId,orgId,branchId
   * @returns Promise<User|undefined>
   */
  obtainProfileFromDb = async (): Promise<User | undefined> => {
    const filter = { $match: { uid: this.uid, tenantId: this.tenantId } };

    const joinpermission: PipelineStage = {
      $lookup: {
        from: 'permission',
        localField: '_id',
        foreignField: 'userId',
        as: 'permissions',
        pipeline: [
          {
            $match: {
              // userId:this.getId(),
              tenantId: this.tenantId,
              orgId: this.orgId,
              branchId: this.branchId,
            },
          },
          {
            $lookup: {
              from: 'branch',
              localField: 'branchId',
              foreignField: 'branchId',
              as: 'currentbranch',
            },
          },
          {
            $lookup: {
              from: 'organization',
              localField: 'orgId',
              foreignField: 'orgId',
              as: 'currentorg',
            },
          },
        ],
      },
    };

    const pipeline: PipelineStage[] = [filter];

    if (this.tenantId > 0) {
      pipeline.push(joinpermission);
    }
    // console.log("obtainProfileFromDbobtainProfileFromDb ",pipeline)
    // const users = await usermodel.find(filter)
    const users = await this.usermodel.aggregate(pipeline);
    this.logger.verbose(
      `aggregate user profile from database`,
      'obtainProfileFromDb',
    );
    this.logger.verbose(pipeline, 'obtainProfileFromDb x');
    this.logger.verbose(users, 'obtainProfileFromDb');
    // console.log("obtainProfileFromDbobtainProfileFromDb ",users)
    if (users && users.length > 0) {
      const userinfo = users[0];

      //console.log(userinfo)
      if (this.tenantId > 0) {
        const myperm = userinfo.permissions[0];

        if (myperm && myperm.groups) {
          userinfo.groups = myperm.groups;
          userinfo.roles = [] as Role[];
          for (let g = 0; g < userinfo.groups.length; g++) {
            const roles: Role[] = rolegroups[userinfo.groups[g]]();
            for (let r = 0; r < roles.length; r++) {
              if (!userinfo.roles.includes(roles[r]))
                userinfo.roles.push(roles[r]);
            }
          }

          userinfo.branchRecordId = myperm.currentbranch[0].branchRecordId;
          userinfo.branchCode = myperm.currentbranch[0].branchCode;
          userinfo.branchName = myperm.currentbranch[0].branchName;
          userinfo.orgRecordId = myperm.currentorg[0]._id;
          userinfo.orgCode = myperm.currentorg[0].orgCode;
          userinfo.orgName = myperm.currentorg[0].orgName;
          userinfo.timeZone = myperm.currentorg[0].timeZone;
          userinfo.currency = myperm.currentorg[0].currency;
          userinfo.country = myperm.currentorg[0].country;
          userinfo.offsetMinute = myperm.currentorg[0].offsetMinute;
        }
      } else {
        userinfo.groups = [];
      }

      const currentitme = new Date(this.lastActivity).getTime();

      const dblastactivity = userinfo.lastActivity ?? '2000-01-01T00:00:00Z';
      const lastvisit = new Date(dblastactivity).getTime() ?? 0;
      // if(currentitme - lastvisit)

      //update last activtity dont too frequent
      //if(!dblastactivity || currentitme - lastvisit > 5000 ){
      //  const newusermodel = await this.usermodel.findById(userinfo._id)
      //  newusermodel.lastActivity= this.lastActivity
      //  const result = await newusermodel.save()
      //}

      // const result =  await this.usermodel.findOneAndUpdate({_id: userinfo._id},{lastActivity: new Date().toISOString})
      return userinfo;
    } else {
      return undefined;
    }
  };
  setUserToken = async (tokenstr: string) => {
    //define token info
    const tokeninfo = jwt.decode(tokenstr);
    this.token = tokenstr;
    this.uid = tokeninfo.sub;
    this.email = tokeninfo.email;
    this.uname = tokeninfo.preferred_username;
    this.fullname = tokeninfo.name;
    this.ssoACL = tokeninfo.resource_access;
    this.logger.verbose(`set token ${this.uid}`);
    //read current user from db
    // console.log("await this.obtainProfileFromDb()")
    const userinfo = await this.obtainProfileFromDb();
    this.logger.verbose(userinfo, 'obtainProfileFromDb result');
    if (userinfo) {
      this.logger.debug(
        `${this.uid} user exists in tenant (${this.tenantId})`,
        'setUserToken',
      );

      this._id = userinfo._id.toString();
      this.branchCode = userinfo['branchCode'] ?? '';
      this.branchName = userinfo['branchName'] ?? '';
      this.orgCode = userinfo['orgCode'] ?? '';
      this.orgName = userinfo['orgName'] ?? '';
      this.timeZone = userinfo['timeZone'] ?? '';
      this.currency = userinfo['currency'] ?? '';
      this.country = userinfo['country'] ?? '';
      this.offsetMinute = userinfo['offsetMinute'] ?? '';
      this.orgRecordId = userinfo['orgRecordId'] ?? '';
      this.branchRecordId = userinfo['branchRecordId'] ?? '';
      this.groups = userinfo['groups'] ?? [];
      this.roles = userinfo['roles'] ?? [Role.Everyone, Role.User];
      this.moreProps = this.setMoreProps(userinfo);
    } else {
      this.logger.debug(`Set unknown id of current user`, 'setUserToken');
      // this.group = ''
      // this.tenantId=0
      // this.orgId=0
      // this.orgCode=0
      this.roles = [Role.Everyone, Role.Unknown];
    }
    this.logger.debug(
      `${this.uid} have _id (${this.getId()}), group (${
        this.groups
      }) and role (${this.getRoles()})`,
    );

    if (this.isRealmAdmin() && !this.roles.includes(Role.SuperAdmin)) {
      this.roles.push(Role.SuperAdmin);
    }
    this.logger.verbose(this);
  };

  generateXorg = (
    tenantId: number,
    orgId: number,
    branchId: number,
  ): string => {
    return Base64URL.encodeText(`${tenantId}-${orgId}-${branchId}`);
  };
  getInfo = () => {
    return this;
  };
  getBranchFilter = () => {
    return {
      tenantId: this.tenantId,
      orgId: this.orgId,
      branchId: this.branchId,
    };
  };
  getTenantFilter = () => {
    return { tenantId: this.tenantId };
  };
  getOrgFilter = () => {
    return {
      tenantId: this.tenantId,
      orgId: this.orgId,
    };
  };
  getWorkflowTaskFilter() {
    return {
      'data.tenantId': this.tenantId,
      'assignments.assignee': this.getUid(),
      // 'assignments.assignee': User.getInstance().getUid(),
    };
  }
  getCreateFilter = () => {
    const u = this;
    return {
      tenantId: u.tenantId,
      orgId: u.orgId,
      branchId: u.branchId,
      createdBy: u.uid,
      updatedBy: u.uid,
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
    };
  };
  getUpdateFilter = () => {
    const u = this;
    return {
      updatedBy: u.uid,
      updated: new Date().toISOString(),
    };
  };
  setCurrentTenant(tenantId: number, orgId: number, branchId: number) {
    this.tenantId = tenantId;
    this.orgId = orgId;
    this.branchId = branchId;
  }
  setXorg = (xorg) => {
    try {
      const decodedText: string = Base64URL.decodeText(xorg);
      const x = decodedText.includes('/')
        ? decodedText.split('/')
        : decodedText.split('-');

      const x1 = Number(x[0]);
      const x2 = Number(x[1]);
      const x3 = Number(x[2]);
      if (x.length == 3 && !isNaN(x1) && !isNaN(x2) && !isNaN(x3)) {
        const u = this;
        u.tenantId = x1;
        u.orgId = x2;
        u.branchId = x3;
      } else {
        throw new BadRequestException('invalidXorg');
      }
    } catch (err) {
      throw new BadRequestException(err);
    }
  };

  async getUserInfo() {
    // obtain basic user info
    const userinfo = {
      _id: this.getId(),
      sessionId: this.sessionId,
      tenantId: this.getTenantId(),
      orgId: this.getOrgId(),
      orgRecordId: this.orgRecordId,
      branchRecordId: this.branchRecordId,
      branchId: this.getBranchId(),
      branchCode: this.branchCode,
      branchName: this.branchName,
      orgCode: this.orgCode,
      orgName: this.orgName,
      timeZone: this.getTimeZone(),
      currency: this.getCurrency(),
      country: this.getCountry(),
      offsetMinute: this.getOffsetMinute(),
      email: this.getEmail(),
      uid: this.getUid(),
      fullName: this.getFullname(),
      groups: this.groups,
      roles: this.getRoles(),
      branches: this.getBranches(),
      invites: await this.getInvites(),
      moreProps: this.getMoreProps(),
    };
    this.logger.debug(userinfo, 'init getUserInfo()');

    if (this.getId() != '') {
      this.logger.debug(userinfo, 'obtain permissions and invitations');
      const filter: PipelineStage = {
        $match: {
          uid: this.uid,
          tenantId: this.tenantId,
        },
      } as PipelineStage;
      const permission: PipelineStage = {
        $lookup: {
          from: 'permission',
          localField: '_id',
          foreignField: 'userId',
          as: 'permissions',
          pipeline: [
            // {$match:{userId: this.getId(),},},
            {
              $lookup: {
                from: 'branch',
                localField: 'branchId',
                foreignField: 'branchId',
                as: 'branch',
              },
            },
          ],
        },
      };
      const lookupinvitation: PipelineStage = {
        $lookup: {
          from: 'user',
          localField: 'email',
          foreignField: 'email',
          as: 'invites',
          pipeline: [
            { $match: { uid: '' } },
            {
              $lookup: {
                from: 'tenant',
                localField: 'tenantId',
                foreignField: 'tenantId',
                as: 'tenant',
              },
            },
          ],
        },
      };

      const pipeline: PipelineStage[] = [filter, permission, lookupinvitation];
      this.logger.debug(pipeline, 'getUserInfo');
      // // // const users = await usermodel.find(filter)
      const users = await this.usermodel.aggregate(pipeline);
      this.logger.debug(users, 'users from aggregate');

      this.invites = users[0].invites;
      this.branches = users[0].permissions;
      this.logger.verbose(users, 'getUserInfo');
      userinfo.branches = this.getBranches();
      userinfo.invites = this.getInvites();
      // this.logger.debug(`getUserInfo result ${userinfo}`)
    } else if (this.getTenantId() > 0) {
      throw new ForbiddenException(`userNotExistInTenant`, 'access deny');
    }

    return userinfo;
  }
  async decideInvitation(id: string, decision: string): Promise<boolean> {
    // const usermodel = model<User>('user',UserMongoSchema,'user')
    const res = await this.usermodel.findById(id);
    // console.log("find invitation:",res)
    if (!res.uid) {
      res.uid = this.getUid();
      res.fullName = this.fullname;
      res.active = true;

      if (decision == 'accept') {
        const result = await res.save({ session: this.dbsession });
        this.logger.log(result, 'accept invitation 1');
        //set permission of all user under this.user_id
        const updateresult = await this.permmodel
          .updateMany({ uid: '', user_id: res._id }, { uid: this.getUid() })
          .session(this.dbsession);
        this.logger.log(updateresult, 'update all permission');
        return true;
      } else {
        const deleteresult = await this.usermodel
          .deleteOne({ _id: id })
          .session(this.dbsession);
        await this.permmodel
          .deleteMany({ uid: '', user_id: res._id })
          .session(this.dbsession);
        return true;
      }
    } else {
      throw new BadRequestException(`${id} not found.`);
    }
  }

  isRealmAdmin = () => {
    const o = this.ssoACL;
    const ssoclient = process.env.OAUTH2_CLIENTID;
    const adminRole = process.env.OAUTH2_ADMINROLE;
    const adminemails = process.env.ADMIN_EMAIL.split(',');
    // return false
    if (adminemails.includes(this.getEmail())) {
      return true;
    } else if (
      o[ssoclient] &&
      o[ssoclient]['roles'] &&
      o[ssoclient]['roles'] == adminRole
    ) {
      return true;
    } else {
      return false;
    }
  };

  searchInsertedRecordId(collection: string, _id: string) {
    return this.modifiedRecords.createds[collection].find(
      (item) => item === _id,
    );
  }
  searchDeletedRecordId(collection: string, _id: string) {
    console.log('check is deleted: ', collection, _id);
    const deletedlist = this.modifiedRecords.deleteds[collection];

    if (deletedlist) {
      return this.modifiedRecords.deleteds[collection].find(
        (item) => item === _id,
      );
    } else {
      return undefined;
    }
  }
  addInsertedRecordId(collection: string, _id: string) {
    if (this.modifiedRecords.createds[collection]) {
      this.modifiedRecords.createds[collection].push(_id);
    } else {
      this.modifiedRecords.createds[collection] = [_id];
    }
  }
  addUpdatedRecordId(collection: string, _id: string) {
    if (this.modifiedRecords.updateds[collection]) {
      this.modifiedRecords.updateds[collection].push(_id);
    } else {
      this.modifiedRecords.updateds[collection] = [_id];
    }
  }
  addDeletedRecordId(collection: string, _id: string) {
    if (this.modifiedRecords.deleteds[collection]) {
      this.modifiedRecords.deleteds[collection].push(_id);
    } else {
      this.modifiedRecords.deleteds[collection] = [_id];
    }
  }

  async getAllTenants() {
    const results = [];
    if (this.getId() != '') {
      const filteruser: PipelineStage = {
        $match: {
          uid: this.uid,
          tenantId: { $gt: 0 },
        },
      } as PipelineStage;

      const getTenantData: PipelineStage = {
        $lookup: {
          from: 'tenant',
          localField: 'tenantId',
          foreignField: 'tenantId',
          as: 'tenant',
        },
      };

      const permission: PipelineStage = {
        $lookup: {
          from: 'permission',
          localField: '_id',
          foreignField: 'userId',
          as: 'permissions',
          pipeline: [
            {
              $lookup: {
                from: 'organization',
                localField: 'orgId',
                foreignField: 'orgId',
                as: 'org',
              },
            },
            {
              $lookup: {
                from: 'branch',
                localField: 'branchId',
                foreignField: 'branchId',
                as: 'branch',
              },
            },
          ],
        },
      };

      const pipelines: PipelineStage[] = [
        filteruser,
        getTenantData,
        permission,
      ];
      // const users=[]
      this.logger.warn(pipelines, 'pipelines');
      const users = await this.usermodel.aggregate(pipelines);

      if (users) {
        const activeusers = users.filter((u) => {
          // console.log(u.active,'===',true, ' && ',u.tenant[0].active,'===',true)
          return u.active === true && u.tenant[0].active === true;
        });
        // return activeusers
        activeusers.forEach((u) => {
          const permissions = u.permissions
            .filter((item: any) => {
              return item.org[0].active && item.branch[0].active;
            })
            .map((item: any) => {
              return {
                _id: item._id,
                orgId: item.orgId,
                branchId: item.branchId,
                groups: item.groups,
                orgCode: item.org[0].orgCode,
                orgName: item.org[0].orgName,
                branchCode: item.branch[0].branchCode,
                branchName: item.branch[0].branchName,
                xOrg: this.generateXorg(u.tenantId, item.orgId, item.branchId),
              };
            });

          results.push({
            _id: u._id,
            fullname: u.fullname,
            tenantId: u.tenantId,
            tenantName: u.tenant[0].tenantName,
            permissions: permissions,
          });
        });
      }
    }
    return results;
  }

  setAsStaticUser = (
    uid: string,
    uname: string,
    name: string,
    email: string,
  ) => {
    //define token info
    this.token = '';
    this.uid = uid;
    this.email = email;
    this.uname = uname;
    this.fullname = name;
    this.ssoACL = '';
    this.roles = [Role.Everyone, Role.User];
  };

  /**
   * define additional properties from user into moreProps
   */
  setMoreProps(userinfo: any) {
    const allprops = Object.keys(userinfo);
    const excludekeys = [
      'created',
      'createdBy',
      'updated',
      'updatedBy',
      '_id',
      'email',
      'fullName',
      'permissions',
      'roles',
      'branchCode',
      'branchId',
      'branchName',
      'orgCode',
      'orgId',
      'orgName',
      'timeZone',
      'currency',
      'country',
      'offsetMinute',
      'tenantId',
      'lastActivity',
      'group',
      '__v',
      'uid',
      'orgRecordId',
    ];
    let data: any = {};
    for (let i = 0; i < allprops.length; i++) {
      const key = allprops[i];
      if (!excludekeys.includes(key)) {
        data[key] = userinfo[key];
      }
    }
    return data;
  }
}
