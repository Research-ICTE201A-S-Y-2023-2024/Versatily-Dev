import { DataTypes } from 'sequelize';
import database from '../../../config/db.js';

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
        allowNull: true
    },
    account_lastName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    account_pass: {
        type: DataTypes.STRING,
        allowNull: false
    },
    account_email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    account_contactNo: {
        type: DataTypes.INTEGER, // Changed to INTEGER, assuming it's a phone number
        allowNull: false
    },
    isAccountVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Accounts', // Specify the table name
    timestamps: true
});

// Sync the model with the database
database.sync()
    .then(() => {
        console.log('Accounts table synced successfully');
    })
    .catch(err => {
        console.error('Error syncing Accounts table:', err);
    });

export default Accounts;