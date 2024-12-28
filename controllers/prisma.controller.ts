import { PrismaClient } from "@prisma/client";

export class PrismaController{

    private static prisma = new PrismaClient();

    constructor(){}

    public static init(){        
        return this.prisma.$connect();
    }

    public static deinit(){        
        return this.prisma.$disconnect();
    }
}