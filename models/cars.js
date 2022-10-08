'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Size, {
        foreignKey: 'size_id',
        as: 'size'
      })
    }
  }
  Cars.init({
    nama: DataTypes.STRING,
    harga: DataTypes.NUMERIC,
    gambar: DataTypes.STRING,
    size_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cars',
  });
  return Cars;
};