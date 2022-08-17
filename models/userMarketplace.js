module.exports = (sequelize, DataTypes) => {
    const UserMarketplace = sequelize.define('user_marketplace', {
        user_id: {
            type: DataTypes.INTEGER
        },
        marketplace_id: {
            type: DataTypes.INTEGER
        },
        token_marketplace: {
            type: DataTypes.STRING
        },
        shop_id: {
            type: DataTypes.INTEGER
        },
        shop_name : {
            type: DataTypes.STRING
        },
        shop_tagline: {
            type: DataTypes.STRING
        },
        shop_deskripsi: {
            type: DataTypes.STRING
        },
        shop_sampul: {
            type: DataTypes.STRING
        },
        shop_url: {
            type: DataTypes.STRING
        },
        etalase_id: {
            type: DataTypes.INTEGER
        },
        status: {
            type: DataTypes.INTEGER
        },
        status_name: {
            type: DataTypes.STRING
        },
        access_token: {
            type: DataTypes.STRING
        },
        refresh_token: {
            type: DataTypes.STRING
        },
        expired: {
            type: DataTypes.DATE
        },
    }, {
        freezeTableName: true,
        timestamps: false,
        createdAt: false,
        updatedAt: false
    });
    UserMarketplace.removeAttribute('id');
    return UserMarketplace;
};