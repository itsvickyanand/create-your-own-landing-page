const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");
const Organization = require("./Organization");

const Project = sequelize.define(
  "Project",
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

    organizationId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "organization_id",
      references: {
        model: "organizations",
        key: "id",
      },
      onDelete: "CASCADE",
    },

    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "active",
    },
  },
  {
    tableName: "projects",
    timestamps: true,
    underscored: true,
  }
);

Organization.hasMany(Project, { foreignKey: "organizationId" });
Project.belongsTo(Organization, { foreignKey: "organizationId" });

module.exports = Project;
