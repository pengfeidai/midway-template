import { EggAppConfig, PowerPartial } from 'egg';
// import { MidwayConfig } from '@midwayjs/core';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default {
  keys: '_1650605785137_503',
  egg: {
    port: 8001,
  },
  security: {
    csrf: false,
  },
  midwayLogger: {
    clients: {
      appLogger: {
        contextFormat: (info) => {
          const ctx = info.ctx;
          const userId = (ctx.userId as string) || '-';
          const traceId = ctx.reqId || '-';
          const use = Date.now() - ctx.startTime;
          const ret =
            userId +
            '/' +
            ctx.ip +
            '/' +
            traceId +
            '/' +
            use.toString() +
            'ms ' +
            ctx.method +
            ' ' +
            ctx.url;
          return ret;
        },
      },
    },
  },
} as DefaultConfig;
