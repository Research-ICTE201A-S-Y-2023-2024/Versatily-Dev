import { Sequelize, DataTypes } from 'sequelize';

// MySQL connection pool
const database = new Sequelize('PostsDB', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
});

export default database;