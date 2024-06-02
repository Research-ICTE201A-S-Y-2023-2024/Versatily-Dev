import { DataTypes } from 'sequelize';
import database from '../../config/db.js'; // Adjust the path as necessary

// Define the Post model
const Post = database.define('post', {
  post_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  post_title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  post_content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createdBy: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  post_tag: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'Post', // Specify the table name
  timestamps: true, // Disable the generation of createdAt and updatedAt fields
});

// Sync the model with the database
database.sync()
  .then(() => {
    console.log('Post table synced successfully');
  })
  .catch(err => {
    console.error('Error syncing Post table:', err);
  });

export default Post;