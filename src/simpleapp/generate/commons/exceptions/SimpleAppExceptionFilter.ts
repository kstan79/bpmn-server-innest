/**
 * This file was automatically generated by simpleapp generator. Every
 * MODIFICATION OVERRIDE BY GENERATEOR
 * last change 2023-10-28
 * Author: Ks Tan
 */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ClientSession } from 'mongoose';
@Catch()
export class SimpleAppExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  async catch(exception, host: ArgumentsHost) {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();

    if (request['sessionuser']) {
      const session: ClientSession = request['sessionuser'].getDBSession();
      if (session.inTransaction()) {
        await session.abortTransaction(); //.then(()=>session.endSession());
        session.endSession();
      }
    }
    // console.log('exceptionexception',typeof exception,Object.keys(exception),exception)
    let errordata;
    let finalstatus;
    let msg;
    if (Object.keys(exception).length > 0) {
      msg = exception.message;
      errordata =
        exception.response && exception.response.options
          ? exception.response.options
          : exception.options;
      finalstatus =
        exception.response && exception.response.status
          ? exception.response.status
          : exception.status;
    } else {
      msg = String(exception);
      finalstatus = 500;
    }

    const responseBody = {
      message: msg,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      error: errordata,
    };

    const eventObj = request['eventObj'];
    if (eventObj) {
      eventObj.statusCode = finalstatus;
      eventObj.errMsg = responseBody.message;
      const endtime = new Date();
      eventObj.updated = endtime.toISOString();
      eventObj.data = request.body;
      eventObj.errData = responseBody.error;
      eventObj.status = 'NG';
      eventObj.duration =
        endtime.getTime() - new Date(eventObj.created).getTime();
      eventObj.save();
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, finalstatus);
  }
}
