'use strict';

const Controller = require('egg').Controller;
const uuid = require('uuid/v1');
const moment = require('moment');

class AccountController extends Controller {
  // 登录
  async login() {
    const { ctx, app } = this;
    const { phone, password } = ctx.request.body;
    if (!phone || !password) {
      ctx.body = { code: 1000, message: '手机号或密码不能为空', data: null };
      return;
    }
    const account = await ctx.model.Account.findOne({ phone, password });
    if (!account) {
      ctx.body = { code: 1000, message: '手机号或密码错误', data: null };
      return;
    }
    const token = uuid();
    const loginInfo = { id: account.id, createdAt: moment().format() };
    await app.redis.set(token, JSON.stringify(loginInfo), 'EX', 60);
    ctx.body = { code: 0, message: '成功', data: token };
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
