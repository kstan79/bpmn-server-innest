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
  NotFoundException,
} from '@nestjs/common';
import { SimpleAppAbstractController } from './simpleapp.controller';
import { ProductService } from '../../services/prd.service';
// import * as prdtype from '../types/prd.type';
import * as types from '../types';
import * as schemas from '../apischemas';
//import * as prdapischema from '../apischemas/prd.apischema';
import {
  ApiTags,
  ApiBody,
  ApiResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { Roles } from '../commons/roles/roles.decorator';
import { Role } from '../commons/roles/roles.enum';
import { Response } from 'express';
import { AppUser } from '../commons/decorators/appuser.decorator';
import { UserContext } from '../commons/user.context';

const doctype = 'prd'.toUpperCase();
@ApiTags(doctype)
@Controller(doctype.toLowerCase())
export class ProductController extends SimpleAppAbstractController<
  ProductService,
  schemas.Product,
  types.Product
> {
  constructor(service: ProductService) {
    super(service);
  }

  @Get()
  @Roles(Role.SuperAdmin, Role.SuperUser, Role.Product_search)
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Found',
    type: String,
  })
  @ApiResponse({ status: 500, description: 'Internal error' })
  @ApiOperation({ operationId: 'runHello', description: 'Say hello only' })
  async hello(@AppUser() appuser: UserContext) {
    return `Hello, welcome to ${this.service.getDocumentName()}`; //this._list(appuser);
  }
  //autocomplete shall above :id
  @Post('/autocomplete')
  @Roles(Role.SuperAdmin, Role.SuperUser, Role.User)
  @ApiResponse({
    status: 200,
    description: 'Found',
    type: () => [{ id: '100', label: 'label1' }],
  })
  @ApiResponse({ status: 500, description: 'Internal error' })
  @ApiQuery({ name: 'keyword', type: String })
  @ApiBody({ description: 'Data', type: () => Object })
  @ApiOperation({
    operationId: 'autoComplete',
    description: 'retrieve array of {_id, code, name}',
  })
  async autoComplete(
    @AppUser() appuser: UserContext,
    @Query('keyword') keyword: string,
    @Body() data: types.Product,
  ) {
    return this._autocomplete(appuser, keyword, data);
  }

  @Post()
  @Roles(Role.SuperAdmin, Role.SuperUser, Role.Product_create)
  @ApiResponse({
    status: 201,
    description: 'success',
    type: schemas.Product,
  })
  @ApiResponse({ status: 400, description: 'bad request' })
  @ApiResponse({ status: 500, description: 'internal error' })
  @ApiBody({ description: 'Data', type: schemas.Product })
  @ApiOperation({ operationId: 'runCreate' })
  async create(@AppUser() appuser: UserContext, @Body() data: schemas.Product) {
    return await this._create(appuser, data);
  }

  @Post('/search')
  @HttpCode(200)
  @Roles(Role.SuperAdmin, Role.SuperUser, Role.Product_search)
  @ApiResponse({
    status: 200,
    description: 'success',
    type: [schemas.Product],
  })
  @ApiResponse({ status: 400, description: 'bad request' })
  @ApiResponse({ status: 500, description: 'internal error' })
  @ApiBody({ description: 'Data', type: schemas.ApiSearchBody })
  @ApiOperation({ operationId: 'runSearch' })
  async search(
    @AppUser() appuser: UserContext,
    @Body() data: types.SearchBody,
  ) {
    return await this._search(appuser, data);
  }

  /***************************** begin additionalAPI definations *****************************************/

  /***************************** end additionalAPI definitions *****************************************/

  /***************************** start status control api definitions *****************************************/
  /***************************** end status control api definitions *****************************************/

  @Get(':id')
  @Roles(Role.SuperAdmin, Role.SuperUser, Role.Product_search)
  @ApiResponse({
    status: 200,
    description: 'Founds',
    type: schemas.Product,
  })
  @ApiResponse({ status: 404, description: 'Document not found' })
  @ApiResponse({ status: 500, description: 'Internal error' })
  @ApiOperation({ operationId: 'runFindOne' })
  async findOne(@AppUser() appuser: UserContext, @Param('id') id: string) {
    const data = await this._findOne(appuser, id);
    if (!data) {
      throw new NotFoundException(`${id} not found`, 'not found');
    } else {
      return data;
    }
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'success',
  })
  @Roles(Role.SuperAdmin, Role.SuperUser, Role.Product_update)
  @ApiResponse({ status: 404, description: 'Document not found' })
  @ApiResponse({ status: 500, description: 'Internal error' })
  @ApiBody({ description: 'Data', type: schemas.Product })
  @ApiOperation({ operationId: 'runUpdate' })
  async update(
    @AppUser() appuser: UserContext,
    @Param('id') id: string,
    @Body() data: schemas.Product,
  ) {
    return await this._update(appuser, id, data);
  }
  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'success',
  })
  @Roles(Role.SuperAdmin, Role.SuperUser, Role.Product_update)
  @ApiResponse({ status: 404, description: 'Document not found' })
  @ApiResponse({ status: 500, description: 'Internal error' })
  @ApiBody({ description: 'Data', type: schemas.Product })
  @ApiOperation({ operationId: 'runPatch' })
  async patch(
    @AppUser() appuser: UserContext,
    @Param('id') id: string,
    @Body() data: schemas.Product,
  ) {
    return await this._patch(appuser, id, data);
  }

  @Delete(':id')
  @Roles(Role.SuperAdmin, Role.SuperUser, Role.Product_delete)
  @ApiResponse({
    status: 200,
    description: 'success',
    type: schemas.Product,
  })
  @ApiResponse({ status: 404, description: 'Document not found' })
  @ApiResponse({ status: 500, description: 'Internal error' })
  @ApiOperation({ operationId: 'runDelete' })
  async delete(@AppUser() appuser: UserContext, @Param('id') id: string) {
    return this._delete(appuser, id);
  }
}
