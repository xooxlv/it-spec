const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('your_database_name', 'your_username', 'your_password', {
  host: 'localhost',
  dialect: 'postgres',
});

const Appeal = sequelize.define('Appeal', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'appeals',
});

// Associate the model with the form fields
Appeal.associate = (models) => {
  // No associations in this case
};

module.exports = { sequelize, Appeal };