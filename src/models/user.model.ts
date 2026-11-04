import { truncate } from "fs/promises";
import { Model, Table, DataType, Column } from "sequelize-typescript";
import { noTrueLogging } from "sequelize/lib/utils/deprecations";

export enum UserRoles {
    ADMIN = 'ADMIN',
    CUSTOMER = 'CUSTOMER',
}

@Table
export class User extends Model<User> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.ENUM(...Object.values(UserRoles)),
        allowNull: false,
        defaultValue: UserRoles.CUSTOMER,
    })
    role: String;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    email: string;

     @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

     @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    avatar: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    phone: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    provider: string;
}
