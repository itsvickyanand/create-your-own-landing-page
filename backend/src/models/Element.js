const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");
const Component = require("./Component");

const Element = sequelize.define(
  "Element",
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

    componentId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "component_id",
      references: {
        model: "components",
        key: "id",
      },
      onDelete: "CASCADE",
    },

    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    content: {
      type: DataTypes.JSONB,
      allowNull: true,
    },

    styles: {
      type: DataTypes.JSONB,
      allowNull: true,
    },

    animations: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  },
  {
    tableName: "elements",
    timestamps: true,
    underscored: true,
  }
);

Component.hasMany(Element, { foreignKey: "componentId" });
Element.belongsTo(Component, { foreignKey: "componentId" });

module.exports = Element;
