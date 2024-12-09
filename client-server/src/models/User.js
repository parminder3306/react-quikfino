import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConfig.js";
import bcryptjs from "bcryptjs";

const { hash } = bcryptjs;

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    language: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: "en",
    },
    currency: {
      type: DataTypes.CHAR(3),
      allowNull: true,
      defaultValue: "USD",
    },
    profile_image: {
      type: DataTypes.STRING(2083),
      allowNull: true,
    },
    email_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    phone_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    two_factor_enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    is_status: {
      type: DataTypes.ENUM("active", "inactive", "suspended", "deleted"),
      allowNull: true,
      defaultValue: "active",
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "users", // Ensure the table name matches exactly
    timestamps: false, // Enables `createdAt` and `updatedAt` automatically
    paranoid: false, // Enables soft delete by managing `deletedAt`
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await hash(user.password, 10);
        }
      },
    },
  }
);

export default User;
