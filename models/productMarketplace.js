module.exports = (sequelize, DataTypes) => {
    const ProductMarketplace = sequelize.define('product_marketplace', {
        marketplace_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        product_guid: {
            type: DataTypes.STRING,
            allowNull: true
        },
        stock: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        sync: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        product_url: {
            type: DataTypes.STRING,
            allowNull: true
        },
        product_url_image: {
            type: DataTypes.STRING,
            allowNull: true
        },

    }, {
        freezeTableName: true,
        timestamps: false,
        createdAt: false,
        updatedAt: false
    });
    ProductMarketplace.removeAttribute('id');
    return ProductMarketplace;
};