module.exports = (sequelize, DataTypes) => {
  // Req 07
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
  } , {
    tablename: DataTypes.STRING,
    timestamps: false,
  });
  return Category;
};