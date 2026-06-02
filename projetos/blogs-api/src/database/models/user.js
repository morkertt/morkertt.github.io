module.exports = (sequelize, DataTypes) => {
  // Req 02 - Create a model for Users
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    displayName: DataTypes.STRING,
    image: DataTypes.STRING,
  } , {
    timestamps: false,
    tableName: 'Users',
  });
  
  User.associate = (models) => {
    User.hasMany(models.BlogPost, {foreignKey: 'userId', as: 'blogPosts'})
  }
  return User;
};