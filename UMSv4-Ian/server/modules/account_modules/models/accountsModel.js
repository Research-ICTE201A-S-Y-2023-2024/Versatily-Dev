import { DataTypes } from 'sequelize';
import database from '../../../config/db.js';

const Accounts = database.define('accounts', {
    account_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    account_customID:{
        type: DataTypes.STRING,
        unique: true,
    },
    account_username: {
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
    account_email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    account_contactNo: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
    tableName: 'Accounts',
    timestamps: true,
});

// Function to generate formatted ID
async function generateFormattedId() {
    const accounts = await Accounts.findAll({
        order: [['account_id', 'DESC']],
        limit: 1
    })

    let newId = '0001'
    if (accounts.length > 0) {
        const lastId = accounts[0].account_customID
        const lastIdNumber = parseInt(lastId, 10)
        const newIdNumber = lastIdNumber + 1
        newId = newIdNumber.toString().padStart(4, '0')
    }

    return newId
}

Accounts.addHook('beforeCreate', async(account) => {
    if (!account.account_customID) { // Check if account_customID is not provided
        account.account_customID = await generateFormattedId()
    }
})


database.sync()
    .then(() => {
        console.log('Accounts table synced successfully')
    })
    .catch(err => {
        console.error('Error syncing Accounts table:', err)
    });

export default Accounts