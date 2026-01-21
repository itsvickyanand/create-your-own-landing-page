const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");
const Page = require("./Page");

const Component = sequelize.define(
  "Component",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    pageId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "page_id",
      references: {
        model: "pages",
        key: "id",
      },
      onDelete: "CASCADE",
    },

    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    styles: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  },
  {
    tableName: "components",
    timestamps: true,
    underscored: true,
  }
);

Page.hasMany(Component, { foreignKey: "pageId" });
Component.belongsTo(Page, { foreignKey: "pageId" });

module.exports = Component;
