module.exports = (sequelize, DataTypes) => {
    const ConfigMarketplace = sequelize.define('config_marketplace', {
        marketplace_id: {
            type: DataTypes.INTEGER
        },
        marketplace_name: {
            type: DataTypes.STRING
        },
        api_key: {
            type: DataTypes.STRING
        },
        client_id: {
            type: DataTypes.STRING
        },
        client_secret : {
            type: DataTypes.STRING
        },
        marketplace_endpoint: {
            type: DataTypes.STRING
        },
        marketplace_api_live: {
            type: DataTypes.STRING
        },
        marketplace_api: {
            type: DataTypes.STRING
        },
        path_api: {
            type: DataTypes.STRING
        },
        marketplace_api_auth: {
            type: DataTypes.STRING
        },
        path_api_auth: {
            type: DataTypes.STRING
        },
        app_id: {
            type: DataTypes.INTEGER
        },
        marketplace_image: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.INTEGER
        },
    }, {
        freezeTableName: true,
        timestamps: false,
        createdAt: false,
        updatedAt: false
    });
    ConfigMarketplace.removeAttribute('id');
    return ConfigMarketplace;
};