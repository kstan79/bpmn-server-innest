/**
 * This file was automatically generated by simpleapp generator. Every
 * MODIFICATION OVERRIDE BY GENERATEOR
 * last change 2024-02-23
 * Author: Ks Tan
 */
import {
  Controller,
  Get,
  Put,
  Patch,
  Post,
  Delete,
  Body,
  Query,
  Param,
  Type,
  Res,
  Req,
  HttpStatus,
  HttpCode,
  NotFoundException
} from '@nestjs/common';
import { SimpleAppAbstractController } from './simpleapp.controller';
import { PermissionService } from '../../services/perm.service';
// import * as permtype from '../types/perm.type';
import * as types from '../types';
import * as schemas from '../apischemas';
//import * as permapischema from '../apischemas/perm.apischema';
import { ApiTags, ApiBody, ApiResponse,ApiOperation,ApiQuery } from '@nestjs/swagger';
import {Roles} from '../commons/roles/roles.decorator'
import {Role} from '../commons/roles/roles.enum'
import { Response } from 'express';
import {AppUser} from '../commons/decorators/appuser.decorator'
import {UserContext} from '../commons/user.context'

const doctype = 'perm'.toUpperCase();
@ApiTags(doctype)
@Controller(doctype.toLowerCase())
export class PermissionController extends SimpleAppAbstractController<
  PermissionService,  
  schemas.Permission,
  types.Permission> {
  constructor(service: PermissionService) {
    super(service);
  }
  
  @Get()
    @Roles(Role.SuperAdmin,Role.SuperUser,Role.Permission_search)
    @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Found',
    type: String 
  })
  @ApiResponse({ status: 500, description: 'Internal error' })
  @ApiOperation({ operationId: 'runHello', description:"Say hello only" })
  async hello(@AppUser() appuser: UserContext) {
    return `Hello, welcome to ${ this.service.getDocumentName()}`//this._list(appuser);
  }
  //autocomplete shall above :id
  @Post('/autocomplete')
    @Roles(Role.SuperAdmin,Role.SuperUser,Role.User)
    
  @ApiResponse({
    status: 200,
    description: 'Found',
    type: ()=>[{id:'100',label:'label1'}],
  })
  @ApiResponse({ status: 500, description: 'Internal error' })
  @ApiQuery({ name: 'keyword', type:String})
  @ApiBody({ description: 'Data', type: ()=>Object})
  @ApiOperation({ operationId: 'autoComplete',description:"retrieve array of {_id, code, name}" })
  async autoComplete(@AppUser() appuser: UserContext,
  @Query('keyword') keyword:string,
  @Body() data: types.Permission,
  ) {
    return this._autocomplete(appuser, keyword,data);
  }



  @Post()
    @Roles(Role.SuperAdmin,Role.SuperUser,Role.Permission_create)
    
  @ApiResponse({
    status: 201,
    description: 'success',
    type: schemas.Permission  })
  @ApiResponse({ status: 400, description: 'bad request' })
  @ApiResponse({ status: 500, description: 'internal error' })
  @ApiBody({ description: 'Data',type:schemas.Permission })
  @ApiOperation({ operationId: 'runCreate' })
  async create(@AppUser() appuser: UserContext,@Body() data: schemas.Permission) {    
    return await this._create(appuser,data)
  }

  @Post('/search')
  @HttpCode(200)
    @Roles(Role.SuperAdmin,Role.SuperUser,Role.Permission_search)
    @ApiResponse({
    status: 200,
    description: 'success',
    type: [schemas.Permission]
  })
  @ApiResponse({ status: 400, description: 'bad request' })
  @ApiResponse({ status: 500, description: 'internal error' })
  @ApiBody({ description: 'Data', type: schemas.ApiSearchBody })
  @ApiOperation({ operationId: 'runSearch' })
  async search(@AppUser() appuser: UserContext,@Body() data: types.SearchBody) {
    return await this._search(appuser,data)
  }


/***************************** begin additionalAPI definations *****************************************/

@Get('listuser')    @Roles(Role.SuperAdmin,Role.SuperUser,Role.Permission_listUser,
              Role.SuperAdmin,            )
      
  @ApiResponse({status: 200,description: 'Get current permissionlist lookup user info' 
      ,type: Object  })  
  @ApiOperation({ operationId: 'runListUser' })
    
  async ListUser(
    @AppUser() appuser: UserContext,
                         ){
    
      return await this.service.runListUser(appuser,                        )
      
   
  } 
/***************************** end additionalAPI definitions *****************************************/

/***************************** start status control api definitions *****************************************/
/***************************** end status control api definitions *****************************************/

  @Get(':id')  
    @Roles(Role.SuperAdmin,Role.SuperUser,Role.Permission_search)
    @ApiResponse({
    status: 200,
    description: 'Founds',
    type: schemas.Permission  })
  @ApiResponse({ status: 404, description: 'Document not found' })
  @ApiResponse({ status: 500, description: 'Internal error' })
  @ApiOperation({ operationId: 'runFindOne' })
  async findOne(@AppUser() appuser: UserContext,@Param('id') id: string) {    
    const data = await this._findOne(appuser, id);
     if(!data ){
        throw new NotFoundException(`${id} not found`,"not found")
     }else{
      return data
     }
  }
  

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'success',
  })
    @Roles(Role.SuperAdmin,Role.SuperUser,Role.Permission_update)
    
  @ApiResponse({ status: 404, description: 'Document not found' })
  @ApiResponse({ status: 500, description: 'Internal error' })
  @ApiBody({ description: 'Data',type: schemas.Permission })
  @ApiOperation({ operationId: 'runUpdate' })
  async update(@AppUser() appuser: UserContext,@Param('id') id: string, @Body() data: schemas.Permission) {    
    return await this._update(appuser,id, data) ;
  }
  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'success',
  })
    @Roles(Role.SuperAdmin,Role.SuperUser,Role.Permission_update)
    
  @ApiResponse({ status: 404, description: 'Document not found' })
  @ApiResponse({ status: 500, description: 'Internal error' })
  @ApiBody({ description: 'Data',type: schemas.Permission })
  @ApiOperation({ operationId: 'runPatch' })
  async patch(@AppUser() appuser: UserContext,@Param('id') id: string, @Body() data: schemas.Permission) {    
    return await this._patch(appuser,id, data) ;
  }

  @Delete(':id')
    @Roles(Role.SuperAdmin,Role.SuperUser,Role.Permission_delete)
    
  @ApiResponse({
    status: 200,
    description: 'success',
    type: schemas.Permission  })
  @ApiResponse({ status: 404, description: 'Document not found' })
  @ApiResponse({ status: 500, description: 'Internal error' })
  @ApiOperation({ operationId: 'runDelete' })
  async delete(@AppUser() appuser: UserContext,@Param('id') id: string) {
    return this._delete(appuser,id);
  }
 

   
 
}