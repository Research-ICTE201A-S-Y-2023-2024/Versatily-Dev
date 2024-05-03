import { DataTypes } from 'sequelize'
import database from "../../config/dbconfig.js"

const Accounts = database.define('accounts', {
    account_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    account_username:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    account_firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    account_lastName: {
    type: DataTypes.STRING,
    allowNull: false
    },
    account_pass: {
      type: DataTypes.STRING,
      allowNull: false
    },
    account_role: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    tableName: 'Accounts', // Specify the table name
    timestamps: true
  });

  database.sync()
  .then(() => {
    console.log('Accounts table synced successfully');
  })
  .catch(err => {
    console.error('Error syncing Accounts table:', err);
  });

  export default Accounts