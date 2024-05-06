import Sequelize from "sequelize";
import database from "../config/dbConfig.js";

const Workbench = database.define('workbench', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    workbenchID: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
}, {
    freezeTableName: true,
});

(async () => {
    await database.sync();
})();

export default Workbench;