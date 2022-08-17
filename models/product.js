module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('product', {
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_guid : {
            type: DataTypes.STRING
        },
        product_name : {
            type: DataTypes.STRING
        },
        sku : {
            type: DataTypes.STRING
        },
        product_slug : {
            type: DataTypes.STRING
        },
        product_stock : {
            type: DataTypes.FLOAT
        },
        currency : {
            type: DataTypes.STRING
        },
        created_date: {
            type: DataTypes.DATE
        }
    }, {
        freezeTableName: true,
        timestamps: false,
        createdAt: false,
        updatedAt: false
    });
    return Product;
};
