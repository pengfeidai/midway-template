import { IMidwayWebNext } from '@midwayjs/web';
import { IMiddleware } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { Context } from 'egg';
import SysError from '../common/sys_error';

@Middleware()
export class ErrorHandlerMiddleware
  implements IMiddleware<Context, IMidwayWebNext>
{
  resolve() {
    return async (ctx: Context, next: IMidwayWebNext) => {
      try {
        await next();
        if (ctx.status === 404) {
          ctx.throw(404, `path '${ctx.path}' not found`);
        }
      } catch (err) {
        // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
        ctx.app.emit('error', err, ctx);
        const sysErr = err as SysError;
        const [message, messageStatus] = sysErr.message?.split(' &>');
        let status = sysErr.status || parseInt(messageStatus) || 500;
        if (
          sysErr.name === 'ValidationError' ||
          message === 'ValidationError'
        ) {
          status = 422;
        }

        ctx._internalError = sysErr;

        // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
        const error =
          status === 500 && ctx.app.config.env === 'prod'
            ? 'Internal Server Error'
            : message;

        // 从 error 对象上读出各个属性，设置到响应中
        ctx.body = {
          code: status,
          data: null,
          message: error,
        };
        if (status === 422) {
          ctx.body.data = sysErr.errors || sysErr.details;
        }
        ctx.status = status;
      }
    };
  }

  static getName(): string {
    return 'errorHandler';
  }
}
