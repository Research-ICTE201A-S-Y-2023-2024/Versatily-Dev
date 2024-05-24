const { Sequelize, DataTypes } = require("sequelize")

const Database = new Sequelize("db_feedbacksystem", "user_dbadmin", "1234", {
  host: "localhost",
  dialect: "mysql",
  define: {
    freezeTableName: true,
    timestamps: false,
  },
})

const Form = Database.define(
  "Form",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    form_name: {
      type: new DataTypes.STRING(512),
      allowNull: false,
    },
    msforms_form_id: {
      type: new DataTypes.STRING(512),
      allowNull: false,
    },
  },
  { tableName: "tbl_fs_forms" }
)
const FormResponse = Database.define(
  "FormResponse",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    msforms_form_id: {
      type: new DataTypes.STRING(512),
      allowNull: false,
    },
    msforms_response_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    submit_timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    submit_respondent_email: {
      type: new DataTypes.STRING(512),
      allowNull: false,
    },
    submit_response_questions: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    tableName: "tbl_fs_formresponses",
  }
)

FormResponse.belongsTo(Form, {
  foreignKey: "msforms_form_id",
  targetKey: "msforms_form_id",
})

module.exports = {
  Form,
  FormResponse,
}
