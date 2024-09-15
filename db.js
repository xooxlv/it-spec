const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres',
});


const Appeal = sequelize.define('Appeal', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    task: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        notEmpty : true,
      }
    },
    attachment: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    tableName: 'appeals',
    createdAt: 'created_at',
    updatedAt: false,
  });
  
  Appeal.sync();
  
  Appeal.associate = (models) => {
  };
  
  module.exports = { sequelize, Appeal };