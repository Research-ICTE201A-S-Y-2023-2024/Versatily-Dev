import { Sequelize } from 'sequelize';

const database = new Sequelize('posdb', 'root', 'delgado04', {
    host: 'localhost',
    dialect: 'mysql',
});

export default database;