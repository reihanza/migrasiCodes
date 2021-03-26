const {
  Order,
  Rolenav_codew,
  Rolenav_codei,
  Rolenav_codev,
  Level,
  Account,
  PartnerLevel,
} = require("../../");
const { generateRandomString } = require("../../../../../utils/character");
const { sendMailVerivy } = require("../../../../../utils/email");
const {
  signForVerification,
  verifyForVerification,
} = require("../../../../../utils/token");
const { schmeaTablePartner } = require("../../../../../config/database/schema");
const bcrypt = require("bcrypt");

const confirm = async (_, args, { user }) => {
  var result;
  var order = await Order.query()
    .where({ ids: args.id })
    .withGraphFetched("partner")
    .withGraphFetched("product")
    .withGraphFetched("package")
    .withGraphFetched("lease")
    .first();
  if (order) {
    var end_date = new Date();
    end_date.setMonth(end_date.getMonth() + parseInt(order.lease.desc));
    const update = {
      start_date: Date.now().toString().substring(0, Date.now().toString()),
      end_date: Date.parse(end_date)
        .toString()
        .substring(0, Date.now().toString()),
      status_orderid: 5,
      updatedAt: Date.now().toString().substring(0, Date.now().toString()),
    };
    if (await Order.query().where({ id: order.id }).update(update)) {
      const account = await Account.query()
        .where({ email: order.partner.email })
        .first();
      //   console.log(account);
      if (!account) {
        var password = await generateRandomString();
        var passwordHash = bcrypt.hashSync(password, 12);
        const insertAccount = {
          name: "Admin " + order.partner.name,
          email: order.partner.email,
          password: passwordHash,
          logintype: 1,
          status: 1,
          levelid: 1,
          deptid: 0,
          partnerid: order.partner.id,
          createdAt: Date.now().toString().substring(0, Date.now().toString()),
          updatedAt: Date.now().toString().substring(0, Date.now().toString()),
        };
        var newAccount = await Account.query().insertAndFetch(insertAccount);
        if (newAccount) {
          const token = await signForVerification(newAccount.id);
          const verifyToken = await verifyForVerification(token);
          await sendMailVerivy(newAccount.email, token, password, "account");
          //   const insertControl = {
          //     partnerid: partner.id,
          //     format: 0,
          //     partnerlabel: 0,
          //     country: 0,
          //     project: 0,
          //     pool: 0,
          //     division: 0,
          //     createdAt: Date.now()
          //       .toString()
          //       .substring(0, Date.now().toString()),
          //     updatedAt: Date.now()
          //       .toString()
          //       .substring(0, Date.now().toString()),
          //   };
          //   await codew("nuc_control_po").insert(insertControl);
          //   await codew("nuc_control_req").insert(insertControl);

          const level = await Level.query()
            .where({ id: newAccount.levelid })
            .first();
          if (
            !(await PartnerLevel.query()
              .where({
                partnerid: user.id,
                levelid: level.id,
              })
              .first())
          ) {
            const insertLevelPartner = await PartnerLevel.query().insertAndFetch(
              {
                partnerid: user.id,
                levelid: level.id,
              }
            );
          }
          let insertMenu = {
            levelid: level.id,
            partnerid: user.id,
            menuid: "1",
            createdAt: Date.now()
              .toString()
              .substring(0, Date.now().toString()),
            updatedAt: Date.now()
              .toString()
              .substring(0, Date.now().toString()),
          };
          //   const actionMenu = await codew("mer_acc_rolemenu").insert(
          //     insertMenu
          //   );
          //
          let insertNav = {
            levelid: level.id,
            navid: 4,
            partnerid: order.partner.id,
            permid: 1,
            createdAt: Date.now()
              .toString()
              .substring(0, Date.now().toString()),
            updatedAt: Date.now()
              .toString()
              .substring(0, Date.now().toString()),
          };
          var newRoleNav;
          switch (order.productid) {
            case 1:
              newRoleNav = await Rolenav_codew.query().insertAndFetch(
                insertNav
              );
              await schmeaTablePartner(order.partner, 1);
              break;
            case 2:
              newRoleNav = await Rolenav_codei.query().insertAndFetch(
                insertNav
              );
              await schmeaTablePartner(order.partner, 2);
              break;
            case 3:
              newRoleNav = await Rolenav_codev.query().insertAndFetch(
                insertNav
              );
              await schmeaTablePartner(order.partner, 3);
              break;
            default:
              break;
          }
          result = await Order.query()
            .where({ id: order.id })
            .withGraphFetched("partner")
            .withGraphFetched("product")
            .withGraphFetched("package")
            .first();
          //   const levelPartner = await convertStringArray(level.partnerid);
          //   if (
          //     await codew("nuc_acc_level")
          //       .where({ id: account.levelid })
          //       .update({ partnerid: levelPartner + "," + partner.id })
          //   ) {
          //     let insertMenu = {
          //       levelid: account.levelid,
          //       partnerid: partner.id,
          //       menuid: "1",
          //       createdAt: Date.now()
          //         .toString()
          //         .substring(0, Date.now().toString()),
          //       updatedAt: Date.now()
          //         .toString()
          //         .substring(0, Date.now().toString()),
          //     };
          //     const actionMenu = await codew("mer_acc_rolemenu").insert(
          //       insertMenu
          //     );

          //     let insertNav = {
          //       levelid: account.levelid,
          //       navid: 4,
          //       partnerid: partner.id,
          //       permid: 1,
          //       createdAt: Date.now()
          //         .toString()
          //         .substring(0, Date.now().toString()),
          //       updatedAt: Date.now()
          //         .toString()
          //         .substring(0, Date.now().toString()),
          //     };
          //     const actionNav = await codew("mer_acc_rolenav").insert(insertNav);
          //     if (actionNav && actionMenu) {
          //       console.log("Create level succes to save!");
          //       data = await codes("mer_partner_order")
          //         .where({ id: order.id })
          //         .first();
          //       result = data;
          //     }
          //   await schmeaTablePartner(partner);
          //     var lease = await codew("mer_lease")
          //       .where({ id: order.leaseid })
          //       .first();
          //     var end_date = new Date();
          //     end_date.setMonth(end_date.getMonth() + parseInt(order.lease.desc));
          //     await codes("nuc_partner")
          //       .where({ id: partner.id })
          //       .update({
          //         expire_date: Date.parse(end_date)
          //           .toString()
          //           .substring(0, Date.now().toString()),
          //       });
          //   } else {
          //     console.log("Gagal di confirm");
          //   }
        }
      } else {
        result = await Order.query()
          .where({ id: order.id })
          .withGraphFetched("partner")
          .withGraphFetched("product")
          .withGraphFetched("package")
          .withGraphFetched("lease")
          .withGraphFetched("bill")
          .withGraphFetched("status_order")
          .first();
      }
    }
  }
  return result;
};

module.exports = confirm;
