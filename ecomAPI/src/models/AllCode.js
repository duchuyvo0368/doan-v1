'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AllCode extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            AllCode.hasMany(models.User, { foreignKey: 'genderId', as: 'genderData' })
            AllCode.hasMany(models.User, { foreignKey: 'roleId', as: 'roleData' })
            AllCode.hasMany(models.Product, { foreignKey: 'categoryId', as: 'categoryData' })
            AllCode.hasMany(models.Product, { foreignKey: 'brandId', as: 'brandData' })
            AllCode.hasMany(models.Product, { foreignKey: 'statusId', as: 'statusData' })
            AllCode.hasMany(models.Blog, { foreignKey: 'subjectId', as: 'subjectData' })
            AllCode.hasMany(models.TypeVoucher, { foreignKey: 'typeVoucher', as: 'typeVoucherData' })
            AllCode.hasMany(models.ProductDetailSize, { foreignKey: 'sizeId', as: 'sizeData' })
            AllCode.hasMany(models.OrderProduct, { foreignKey: 'statusId', as: 'statusOrderData' })

        }
    };
    AllCode.init({
        type: DataTypes.STRING,
        value: DataTypes.STRING,
        code: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'AllCode',
    });
    return AllCode;
};