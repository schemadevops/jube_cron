module.exports = (sequelize, DataTypes) => {
    const ErrorLog = sequelize.define('error_log', {
        marketplace_id: {
            type: DataTypes.INTEGER
        },
        error_message : {
            type: DataTypes.STRING
        },
        error_function : {
            type: DataTypes.STRING
        },
        user_id : {
            type: DataTypes.INTEGER
        },
        created_date : {
            type: DataTypes.STRING
        },
        data : {
            type: DataTypes.STRING
        },
    }, {
        freezeTableName: true,
        timestamps: false,
        createdAt: false,
        updatedAt: false
    });
    return ErrorLog;
};