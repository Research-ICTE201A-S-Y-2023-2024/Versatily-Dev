import { DataTypes } from 'sequelize';
import database from '../../../config/db.js';

const systemRoles = database.define('systemRoles', {
    role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    role_customID: {
      type: DataTypes.STRING,
      unique: true  
    },
    role_name: {
        type: DataTypes.STRING,
        unique: true
    },
    role_prefix: {
        type: DataTypes.STRING,
        unique: true
    }
}, {
    tableName: 'systemRoles', // Specify the table name
    timestamps: true,
});

// Function to generate formatted custom ID
async function generateRoleFormattedId() {
    const roles = await systemRoles.findAll({
        order: [['role_id', 'DESC']],
        limit: 1
    });

    let newId = 'SR0001';
    if (roles.length > 0) {
        const lastId = roles[0].role_customID;
        const lastIdNumber = parseInt(lastId.replace('SR', ''), 10);
        const newIdNumber = lastIdNumber + 1;
        newId = `SR${newIdNumber.toString().padStart(4, '0')}`;
    }

    return newId;
}

// Hook to set custom ID before creating a new record
systemRoles.addHook('beforeCreate', async (role) => {
    if (!role.role_customID) { // Check if role_customID is not provided
        role.role_customID = await generateRoleFormattedId();
    }
});

// Sync the model with the database
database.sync()
    .then(() => {
        console.log('systemRoles table synced successfully');
    })
    .catch(err => {
        console.error('Error syncing Accounts table:', err);
    });

export default systemRoles