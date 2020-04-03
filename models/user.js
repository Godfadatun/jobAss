'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  user.associate = function(models) {
    // associations can be defined here
    user.hasMany(models.job, {foreignKey: 'user_id', as: 'job'})
  };
  return user;
};
