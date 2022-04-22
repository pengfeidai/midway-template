import { App, Configuration } from '@midwayjs/decorator';
import { ILifeCycle } from '@midwayjs/core';
import { Application } from 'egg';
import { join } from 'path';
import * as task from '@midwayjs/task';
import * as jaeger from '@mw-components/jaeger';
import * as koid from '@mw-components/koid';
import * as egg from '@midwayjs/web';
import * as redis from '@midwayjs/redis';
import * as orm from '@midwayjs/orm';
import * as validate from '@midwayjs/validate';

import { AccessLogMiddleware } from './middleware/access_log';
import { ErrorHandlerMiddleware } from './middleware/error_handler';
import { RequestIdMiddleware } from './middleware/request_id';


@Configuration({
  imports: [egg, validate, orm, jaeger, koid, redis, task],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;

  async onReady() {
    this.app.useMiddleware([RequestIdMiddleware, AccessLogMiddleware, ErrorHandlerMiddleware])
  }
}
