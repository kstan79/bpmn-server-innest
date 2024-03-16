/**
 * This file was automatically generated by simpleapp generator. Every
 * MODIFICATION OVERRIDE BY GENERATEOR
 * last change 2023-10-28
 * Author: Ks Tan
 */
import { Controller, Get,Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private logger = new Logger()
  constructor(private readonly appService: AppService) {
    if(process.env.DRYRUN=='true'){
      this.logger.warn("DRY run Mode, transaction will roll back")
    }
      
    
  }

  @Get()
  async getHello() {
    return 'hello'
  }
}