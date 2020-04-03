'use strict';
module.exports = (sequelize, DataTypes) => {
  const job = sequelize.define('job', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    expiry_date: DataTypes.DATE
  }, {});
  job.associate = function(models) {
    // associations can be defined here
  };
  return job;
};
