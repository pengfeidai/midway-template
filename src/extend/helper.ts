export = {
  /**
   * 处理成功响应
   * @method Helper#success
   * @param {any} result Return data, Default null
   * @param {String} message Error message, Default '请求成功'
   * @param {Number} status Status code, Default '200'
   *
   * @example
   * ```js
   * ctx.helper.success({}, null, 201);
   * ```
   */
  success(this: any, result = null, message = 'success', status = 200) {
    this.ctx.body = {
      code: status,
      message,
      data: result,
    };
    this.ctx.status = status;
  },

  /**
   * 处理失败响应
   * @param ctx
   * @param code
   * @param message
   */
  error(this: any, code: number, message: string) {
    this.ctx.body = {
      code,
      message,
      data: null,
    };
    this.ctx.status = code;
  },
};
