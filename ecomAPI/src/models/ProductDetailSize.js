'use strict';

const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ProductDetailSize extends Model {
        static associate(models) {
            ProductDetailSize.belongsTo(models.AllCode, { foreignKey: 'sizeId', targetKey: 'code', as: 'sizeData' })
        }
    };
    ProductDetailSize.init({
        productDetailId: DataTypes.INTEGER,
        width: DataTypes.STRING,
        height: DataTypes.STRING,
        weight: DataTypes.STRING,
        sizeId: DataTypes.STRING,
       
    }, {
        sequelize,
        modelName: 'ProductDetailSize',
    });
    return ProductDetailSize;
};