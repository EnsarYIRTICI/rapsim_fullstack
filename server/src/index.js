module.exports = {
  register() {},

  async bootstrap() {
    // Rol ve izinlerin eklenmesi için yapılandırma

    const rolePermissions = [
      {
        roleName: "Public",
        description: "Public users role",
        actions: [
          "api::user-information.user-information.createUser",
          "api::user-information-organisation.user-information-organisation.createUserOrganisation",
          "api::user-information-company.user-information-company.createUserCompany",
        ],
        actionsToRemove: ["plugin::users-permissions.auth.register"],
      },
      {
        roleName: "Authenticated",
        description: "Authenticated users role",
        actions: [
          "api::user-information.user-information.create",
          "api::user-information.user-information.find",
          "api::user-information.user-information.findOne",
          "plugin::users-permissions.role.find",
          "plugin::users-permissions.role.findOne",
          "plugin::users-permissions.user.find",
          "plugin::users-permissions.user.findOne",
        ],
      },
      {
        roleName: "Organisation",
        description: "Organisation role",
        actions: [
          "api::user-information-organisation.user-information-organisation.create",
          "api::user-information-organisation.user-information-organisation.find",
          "api::user-information-organisation.user-information-organisation.findOne",
          "plugin::users-permissions.role.find",
          "plugin::users-permissions.role.findOne",
          "plugin::users-permissions.user.find",
          "plugin::users-permissions.user.findOne",
          "plugin::users-permissions.user.me",
        ],
      },
      {
        roleName: "Company",
        description: "Company role",
        actions: [
          "api::user-information-company.user-information-company.create",
          "api::user-information-company.user-information-company.find",
          "api::user-information-company.user-information-company.update",
          "plugin::users-permissions.role.find",
          "plugin::users-permissions.role.findOne",
          "plugin::users-permissions.user.find",
          "plugin::users-permissions.user.findOne",
          "plugin::users-permissions.user.me",
        ],
      },
    ];

    // Role oluşturma ve izinleri atama

    for (const rolePermission of rolePermissions) {
      // Role mevcut mu kontrol et, yoksa oluştur

      let role = await strapi.query("plugin::users-permissions.role").findOne({
        where: { name: rolePermission.roleName },
      });

      if (!role) {
        role = await strapi.query("plugin::users-permissions.role").create({
          data: {
            name: rolePermission.roleName,
            description: rolePermission.description,
            type: rolePermission.roleName.toLowerCase(),
          },
        });
        console.log(`${rolePermission.roleName} rolü başarıyla oluşturuldu.`);
      } else {
        console.log(`${rolePermission.roleName} rolü zaten mevcut.`);
      }

      // Her rol için ilgili izinleri ekle

      for (const action of rolePermission.actions) {
        let permission = await strapi
          .query("plugin::users-permissions.permission")
          .findOne({
            where: {
              action: action,
            },
          });

        if (!permission) {
          // İzin yoksa oluştur

          permission = await strapi
            .query("plugin::users-permissions.permission")
            .create({
              data: {
                action: action,
              },
            });
        }

        // Role ile izin ilişkilendirme (up_permission_role_links tablosuna ekleme)

        const existingLink = await strapi.db
          .connection("up_permissions_role_links")
          .where({
            role_id: role.id,
            permission_id: permission.id,
          })
          .first();

        if (!existingLink) {
          // Eğer ilişki yoksa ekle

          await strapi.db.connection("up_permissions_role_links").insert({
            role_id: role.id,
            permission_id: permission.id,
          });
          console.log(
            `Permission ${action} başarıyla ${rolePermission.roleName} rolüne eklendi.`
          );
        } else {
          console.log(
            `${rolePermission.roleName} rolü ile ${action} izni zaten atanmış.`
          );
        }
      }

      // Role ile izin ilişkilendirme (up_permission_role_links tablosundan kaldırma)

      if (rolePermission.actionsToRemove) {
        for (const action of rolePermission.actionsToRemove) {
          let permission = await strapi
            .query("plugin::users-permissions.permission")
            .findOne({
              where: {
                action: action,
              },
            });

          console.log("PERMISSION", permission);

          if (permission) {
            await strapi.db
              .connection("up_permissions_role_links")
              .delete()
              .where({
                role_id: role.id,
                permission_id: permission.id,
              });
          }
        }
      }
    }
  },
};
