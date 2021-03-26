//order
const processCartOrderPartner = require("./order/cart");
const processOrderPartner = require('./order/process')
const payOrderPartner = require('./order/pay')
const confirmOrderPartner = require('./order/confirm')
const closeOrderPartner = require('./order/close')

// //revision
const revisionOrderPartner = require('./revisi/revision')
const processRevisionOrder = require('./revisi/process')
const payRevisionOrder = require('./revisi/pay')
const confirmRevisionOrder = require('./revisi/confirm')

// //expire
// const expireOrderPartner = require('./revision/expire/expire')
// const processExpireOrder = require('./revision/expire/process')
// const payExpireOrder = require('./revision/expire/pay')
// const confirmExpireOrder = require('./revision/expire/confirm')
// const { isLogged, isSupport } = require('../../../../../helpers/validation')

const update = async (_, args, context) => {
  // isLogged()
  if (args.id) {
    if (args.expire) {
      if (args.status_orderid == 0) {
        return closeOrderPartner(_, args, context);
      } else if (args.status_orderid == 2 && args.leaseid) {
        // return expireOrderPartner(_, args, context);
      } else if (args.status_orderid == 3) {
        //support
        // isSupport()
        // return processExpireOrder(_, args, context);
      } else if (args.status_orderid == 4) {
        // return payExpireOrder(_, args, context);
      } else if (args.status_orderid == 5) {
        //support
        // return confirmExpireOrder(_, args, context);
      }
    }
    if (args.revision) {
      if (args.status_orderid == 2 && args.packageid && args.leaseid) {
        return revisionOrderPartner(_, args, context);
      } else if (args.status_orderid == 3) {
        // isSupport()
        return processRevisionOrder(_, args, context);
      } else if (args.status_orderid == 4) {
        return payRevisionOrder(_, args, context);
      } else if (args.status_orderid == 5) {
        // isSupport()
        return confirmRevisionOrder(_, args, context);
      }
    }
    if (args.status_orderid == 2 && args.packageid && args.leaseid) {
      return processCartOrderPartner(_, args, context);
    } else if (args.status_orderid == 3) {
      //support
      // isSupport()
      return processOrderPartner(_, args, context);
    } else if (args.status_orderid == 4) {
        return payOrderPartner(_, args, context);
    } else if (args.status_orderid == 5) {
      //support
      // isSupport()
        return confirmOrderPartner(_, args, context);
    }
  } else {
    console.log("Proses failed!");
    return [];
  }
};

module.exports = update;
