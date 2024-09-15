"use strict";

/**
 * user-information-company controller
 */

const yup = require("yup");

const createUserSchema = yup.object().shape({
  username: yup.string().required("username: gereklidir"),
  email: yup
    .string()
    .email("Geçerli bir email adresi gereklidir")
    .required("email: gereklidir"),
  password: yup.string().required("password: gereklidir"),

  name: yup.string().required("name: gereklidir"),
  vkn: yup
    .string()
    .length(11, "vkn 11 haneli olmalıdır")
    .required("vkn: gereklidir"),
});

const { createCoreController } = require("@strapi/strapi").factories;

const api = "api::user-information-company.user-information-company";
const roleName = "Company";

module.exports = createCoreController(api, ({ strapi }) => ({
  /**
   * `create` fonksiyonu, kullanıcı bilgilerini kaydeder.
   * @param {Object} ctx
   */

  async createUserCompany(ctx) {
    await createUserSchema.validate(ctx.request.body, {
      abortEarly: false,
    });

    const { username, email, password, name, vkn } = ctx.request.body;

    const role = await strapi.query("plugin::users-permissions.role").findOne({
      where: { name: roleName },
    });

    if (!role) {
      ctx.throw(400, "Role bulunamadı.");
    }

    const user = await strapi.plugins["users-permissions"].services.user.add({
      username,
      email,
      password,
      role: role.id,
      confirmed: true,
      provider: "local",
    });

    const userInformation = await strapi.query(api).create({
      data: {
        name,
        vkn,
        userId: user.id,
      },
    });

    const jwt = await strapi.plugins["users-permissions"].services.jwt.issue({
      id: user.id,
    });

    return {
      jwt: jwt,
      user: user,
      userInformation: userInformation,
    };
  },
}));
