"use strict";

/**
 * user-information controller
 */

const yup = require("yup");

const createExampleSchema = yup.object().shape({
  username: yup.string().required("Kullanıcı adı gereklidir"),
  email: yup
    .string()
    .email("Geçerli bir email adresi gereklidir")
    .required("Email gereklidir"),
  password: yup.string().required("Şifre gereklidir"),
});

const createUserSchema = yup.object().shape({
  username: yup.string().required("username: gereklidir"),
  email: yup
    .string()
    .email("Geçerli bir email adresi gereklidir")
    .required("email: gereklidir"),
  password: yup.string().required("password: gereklidir"),

  name: yup.string().required("name: gereklidir"),
  lastname: yup.string().required("lastname: gereklidir"),
  tckn: yup
    .string()
    .length(11, "TCKN 11 haneli olmalıdır")
    .required("tckn: gereklidir"),
});

const { createCoreController } = require("@strapi/strapi").factories;

const api = "api::user-information.user-information";
const roleId = 6;

module.exports = createCoreController(api, ({ strapi }) => ({
  async customEndpoint(ctx) {
    try {
      ctx.send({
        message: "This is a custom endpoint for user-information!",
      });
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  /**
   * `create` fonksiyonu, kullanıcı bilgilerini kaydeder.
   * @param {Object} ctx
   */

  async exampleAction(ctx) {
    try {
      await createExampleSchema.validate(ctx.request.body, {
        abortEarly: false,
      });

      const { data } = ctx.request.body;

      console.log("Validated data:", data);

      ctx.body = { message: "User created", data };
    } catch (error) {
      ctx.status = 400;
      ctx.body = error.errors;
    }
  },

  /**
   * `create` fonksiyonu, kullanıcı bilgilerini kaydeder.
   * @param {Object} ctx
   */

  async createUser(ctx) {
    await createUserSchema.validate(ctx.request.body, {
      abortEarly: false,
    });

    const { username, email, password, name, lastname, tckn } =
      ctx.request.body;

    const user = await strapi.plugins["users-permissions"].services.user.add({
      username,
      email,
      password,
      role: roleId,
      confirmed: true,
      provider: "local",
    });

    const userInformation = await strapi.query(api).create({
      data: {
        name,
        lastname,
        tckn,
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
