'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.belongsTo(models.AllCode, { foreignKey: 'genderId', targetKey: 'code', as: 'genderData' })
            User.belongsTo(models.AllCode, { foreignKey: 'roleId', targetKey: 'code', as: 'roleData' })
        }
    };
    User.init({
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        address: DataTypes.STRING,
        genderId: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        image: DataTypes.BLOB('long'),
        dob: DataTypes.STRING,
        isActiveEmail: DataTypes.BOOLEAN,
        roleId: DataTypes.STRING,
        statusId: DataTypes.STRING,
        userToken: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};