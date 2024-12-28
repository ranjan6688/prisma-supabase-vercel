import { ExpressService } from "../services/express.service";

export class ExpressController{

    constructor(){}

    public static init(){
        ExpressService.init(parseInt(process.env.PORT as any) || 8080);
    }
}