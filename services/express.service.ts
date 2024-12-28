import express from "express";
import bodyParser from "body-parser";
import * as useragent from "express-useragent";
import cors from "cors";
import * as path from 'path';
import serveindex from "serve-index";
import usersRouter from "./../routes/users";

export class ExpressService{

    private static app = express();
    private static router = express.Router();

    constructor(){}

    public static init(port:number){
        this.initJSONMiddleware();
        this.initBodyParser();
        this.initCORS();
        this.initUserAgent();
        this.initLogs();
        this.initDefaultRoutes();
        this.initAPIRoutes();
        this.initServer(port);
    }

    private static initJSONMiddleware(){
        this.app.use(express.json());
    }

    private static initBodyParser(){
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
    }

    private static initCORS(){
        this.app.use(cors());
    }

    private static initUserAgent(){
        this.app.use(useragent.express());
    }

    private static initLogs(){
        this.app.use(`/${process.env.APPLICATION_NAME}/logs`, express.static(path.resolve(process.cwd(), "logs")), serveindex(path.resolve(process.cwd(), "logs"), {'icons': true}));      
    }

    private static initDefaultRoutes(){  
        this.app.use(`/${process.env.APPLICATION_NAME}`, this.router);
    }

    private static initAPIRoutes(){  
        this.app.use(`/v1/users`, usersRouter);
    }

    private static initServer(port: number){
        this.app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    }

}