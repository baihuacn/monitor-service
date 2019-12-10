'use strict';

const Controller = require('egg').Controller;

class AccountController extends Controller {
  async token() {
    const { ctx } = this;
    ctx.body = await ctx.model.Account.findAll();
  }
  async detail() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    ctx.body = await ctx.model.Account.findByPk(id);
  }
  async create() {
    const { ctx } = this;
    const { name, email, phone, password } = ctx.request.body;
    try {
      const account = await ctx.model.Account.create({ name, email, phone, password });
      ctx.body = account;
    } catch ({ errors }) {
      const body = errors.map(item => item.message).join(', ');
      ctx.body = body;
    }
  }
  async update() {
    const { ctx } = this;
    const { id, name, email, phone, password } = ctx.request.body;
    const account = await ctx.model.Account.findByPk(id);
    if (!account) {
      ctx.status === 404;
      return;
    }
    await account.update({ name, email, phone, password });
    ctx.body = account;
  }
  async delete() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    const account = await ctx.model.Account.findByPk(id);
    if (!account) {
      ctx.status === 404;
      return;
    }
    await account.destroy();
    ctx.body = 'success';
  }
}

module.exports = AccountController;
