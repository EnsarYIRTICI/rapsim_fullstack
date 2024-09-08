module.exports = {
  routes: [
    {
      method: "GET",
      path: "/custom/custom",
      handler: "user-information.customEndpoint",
    },
    {
      method: "POST",
      path: "/custom/example",
      handler: "user-information.exampleAction",
    },

    {
      method: "POST",
      path: "/custom/user/create",
      handler: "user-information.createUser",
    },
  ],
};
