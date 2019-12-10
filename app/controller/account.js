'use strict';

const Controller = require('egg').Controller;

class AccountController extends Controller {
  // 获取token
  async token() {
    const { ctx } = this;
    const data = await ctx.model.Account.findAll();
    ctx.body = { code: 0, message: '成功', data };
  }
  // 获取详情
  async detail() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    const account = await ctx.model.Account.findByPk(id);
    if (!account) {
      ctx.body = { code: 1000, message: '数据不存在，无法获取详情', data: null };
      return;
    }
    ctx.body = { code: 0, message: '成功', data: account };
  }
  // 新增账户
  async create() {
    const { ctx } = this;
    const { name, email, phone, password } = ctx.request.body;
    try {
      const account = await ctx.model.Account.create({ name, email, phone, password });
      ctx.body = { code: 0, message: '成功', data: account };
    } catch ({ errors }) {
      const message = errors.map(item => item.message).join(', ');
      ctx.body = { code: 1000, message, data: null };
    }
  }
  // 更新账户
  async update() {
    const { ctx } = this;
    const { id, name, email, phone, password } = ctx.request.body;
    const account = await ctx.model.Account.findByPk(id);
    if (!account) {
      ctx.body = { code: 1000, message: '数据不存在，无法更新', data: null };
      return;
    }
    try {
      await account.update({ name, email, phone, password });
      ctx.body = { code: 0, message: '成功', data: account };
    } catch ({ errors }) {
      const message = errors.map(item => item.message).join(', ');
      ctx.body = { code: 1000, message, data: null };
    }
  }
  // 删除账户
  async delete() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    const account = await ctx.model.Account.findByPk(id);
    if (!account) {
      ctx.body = { code: 1000, message: '数据不存在，无法删除', data: null };
      return;
    }
    await account.destroy();
    ctx.body = { code: 0, message: '成功', data: null };
  }
}

module.exports = AccountController;
