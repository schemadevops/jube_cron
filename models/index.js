const dbConfig = require("../config/config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  logging: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Product = require("./product")(sequelize, Sequelize);
db.ProductMarketplace = require("./productMarketplace")(sequelize, Sequelize);
db.User = require("./user")(sequelize, Sequelize);
db.UserMarketplace = require("./userMarketplace")(sequelize, Sequelize);
db.ConfigMarketplace = require("./configMarketplace")(sequelize, Sequelize);
db.ErrorLog = require("./errorLog")(sequelize, Sequelize);

db.Product.hasMany(db.ProductMarketplace, {
    foreignKey: "product_id"
});

// db.ProductMarketplace.belongsTo(db.Product, {
//     foreignKey: "product_id"
// });

module.exports = db;