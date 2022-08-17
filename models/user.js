module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_guid: {
            type: DataTypes.STRING
        },
        user_type: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        full_name: {
            type: DataTypes.STRING
        }, 
        username: {
            type: DataTypes.STRING
        },
        provinsi: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        email: {
            type: DataTypes.STRING
        }, 
        password: {
            type: DataTypes.STRING
        }, 
        user_category: {
            type: DataTypes.STRING
        }, 
        kabupaten: {
            type: DataTypes.STRING
        }, 
        kecamatan: {
            type: DataTypes.STRING
        }, 
        village: {
            type: DataTypes.STRING
        }
    }, {
        hooks: {
          beforeCreate(el) {
            el.password = hashPassword(el.password)
          }
        },
        freezeTableName: true,
        timestamps: false,
        createdAt: false,
        updatedAt: false
    });
    return User;
};