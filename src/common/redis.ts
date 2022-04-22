import { Provide, Inject } from '@midwayjs/decorator';
import { RedisService } from '@midwayjs/redis';

@Provide()
class RedisUtils {
  @Inject()
  redisService: RedisService;

  async setValue(key: string, value: string, expireTime?: number) {
    if (!expireTime) {
      await this.redisService.set(key, value);
    } else {
      await this.redisService.setex(key, expireTime, value);
    }
  }

  async getString(key: string) {
    if (!key) {
      return null;
    }

    return await this.redisService.get(key);
  }
}

export default RedisUtils;
