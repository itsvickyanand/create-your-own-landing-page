const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");
const Project = require("./Project");

const Page = sequelize.define(
  "Page",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    projectId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "project_id",
      references: {
        model: "projects",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "pages",
    timestamps: true,
    underscored: true,
  }
);

Project.hasMany(Page, { foreignKey: "projectId" });
Page.belongsTo(Project, { foreignKey: "projectId" });

module.exports = Page;
