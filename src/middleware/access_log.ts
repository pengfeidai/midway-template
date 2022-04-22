import { App } from '@midwayjs/decorator';

import {
  IMidwayWebNext,
  IMidwayWebApplication,
} from '@midwayjs/web';
import { IMiddleware } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { Context } from 'egg';

@Middleware()
export class AccessLogMiddleware implements IMiddleware<Context, IMidwayWebNext> {
  @App()
  app: IMidwayWebApplication;

  resolve() {
    return async (ctx: Context, next: IMidwayWebNext) => {
      const requestBody =
        ctx.request.method === 'GET'
          ? ctx.request.query
          : ctx.request.body || {};
      // 输出请求日志
      ctx.logger.info('requestQuery %j', requestBody);
      await next();
      const { body } = ctx;
      ctx.logger.info('responseBody %j', body);
    };
  }

  ignore(ctx: Context): boolean {
    const regExp = /\/swagger-u.*/u;
    return regExp.test(ctx.path);
  }

  static getName(): string {
    return 'accessLog';
  }
}
