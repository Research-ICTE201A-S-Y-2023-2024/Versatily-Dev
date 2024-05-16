import { Sequelize } from 'sequelize'

// MySQL connection pool
const database = new Sequelize('VersatilyDB', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
});

export default database;