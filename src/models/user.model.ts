import {DataTypes, DATE, Sequelize, DATEONLY} from "sequelize";
import sequelize from "../configs/database.config";
import moment from 'moment';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    birthDate: {
        type: DATEONLY,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('seller', 'buyer', 'delivery', 'admin'),
        allowNull: false
    },
    createdAt: {
        type: DataTypes.STRING,
        defaultValue: () => Sequelize.literal('CURRENT_TIMESTAMP'),
        get() {
            return moment.utc(this.getDataValue('datetimeField')).format('YYYY-MM-DD HH:mm:ss');
        },
          set(val) {
            this.setDataValue('datetimeField', moment.utc(val, 'YYYY-MM-DD HH:mm:ss').toDate());
        },
    },
    updatedAt: {
        type: DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
}, {
    tableName: 'users',
});

export default User;