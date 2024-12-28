import { PrismaClient } from "@prisma/client";
import { User } from "./../models/user.model";

export class UserController{

    private static prisma = new PrismaClient();

    constructor(){}

    public static getAllUsers(){
        return this.prisma.users.findMany({
            where: {
                status: 1,
            }
        });
    }

    public static getUser(id: number){
        return this.prisma.users.findUnique({
            where: {
                id: Number(id),
                status: 1
            }
        });
    }

    public static create(user: User){
        return this.prisma.users.create({
            data: user
        });
    }

    public static update(id: number, user: User){
        return this.prisma.users.update({
            where: {
                id: Number(id),
                status: 1,
            },
            data: user
        });
    }

    public static delete(id: number){
        return this.prisma.users.update({
            where: {
                id: Number(id),
                status: 1
            },
            data: {
                status: 0
            }
        });
    }
}