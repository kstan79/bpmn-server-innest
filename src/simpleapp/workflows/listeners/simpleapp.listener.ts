/**
 * This file was automatically generated by simpleapp generator during initialization. It is changable.
 * --remove-this-line-to-prevent-override--
 * last change 2024-02-22
 * author: Ks Tan
 */
import { Injectable,Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserContext } from "src/simpleapp/generate/commons/user.context";
import { User } from "src/simpleapp/services/user.service";
import { Permission } from "src/simpleapp/services/perm.service";

@Injectable()
export class SimpleAppListenerService {
    logger = new Logger()
    @InjectModel('User') private readonly usermodel: Model<User>
    @InjectModel('Permission') private readonly permmodel: Model<Permission>
    
    prepareAppUser(data:any){
        const appuser = new UserContext(this.usermodel, this.permmodel);             
        appuser.setAsStaticUser('000-00-00-00','bpmn','bpmn workflow user', 'bpmn@bpmn.org')        
        appuser.setCurrentTenant(data.tenantId??0,data.orgId??0,data.branchId??0)
        return appuser
    }
}