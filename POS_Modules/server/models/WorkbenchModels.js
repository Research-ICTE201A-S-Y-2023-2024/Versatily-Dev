import { DataTypes } from "sequelize";
import database from "../config/dbConfig.js";

const Workbench = database.define('workbench', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    workbenchID: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
}, {
    // Define additional configurations for the 'Workbench' model
    freezeTableName: true,
    timestamps: true // This line adds createdAt and updatedAt fields
});

(async () => {
    await database.sync();
})();

export default Workbench;