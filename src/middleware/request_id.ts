import { IMidwayWebNext } from '@midwayjs/web';
import { IMiddleware } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { Context } from 'egg';
import { HeadersKey } from '@mw-components/jaeger';
import { KoidComponent } from '@mw-components/koid';

@Middleware()
export class RequestIdMiddleware
  implements IMiddleware<Context, IMidwayWebNext>
{
  resolve() {
    return async (ctx: Context, next: IMidwayWebNext) => {
      const key = HeadersKey.reqId;
      let reqId = ctx.get(key);
      if (reqId) {
        ctx.reqId = reqId;
      } else {
        const koid = await ctx.requestContext.getAsync(KoidComponent);
        reqId = koid.idGenerator.toString();
        ctx.reqId = reqId;
      }
      ctx.set(key, reqId);

      await next();
    };
  }

  static getName(): string {
    return 'errorHandler';
  }
}
