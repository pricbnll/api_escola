const { DataTypes } = require("sequelize")
const {connection} = require("../database/connection")

const User = require("./User")
const Role = require("./Role")

const UserRole = connection.define("usersRole", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    roleId: {
        type: DataTypes.INTEGER,
        references: {
            model: Role,
            key: 'id'
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        default: Date.now()
    },
    updatedAt: {
        type: DataTypes.DATE
    }
})

module.exports = UserRole