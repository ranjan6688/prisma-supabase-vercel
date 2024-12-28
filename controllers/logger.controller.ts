import path from "path";
import { LogAppender, ConsoleAppender, AppenderLayout, RollingFileAppender, LogConfig, ConsoleLogOptions, FileLogOptions, LogOptions, LogType } from "../models/logger.model";
import { LoggerService } from "../services/logger.service";

export var LOGGER: any;

export class LoggerController{

    private static LOG_FILE_NAME: string = `app.log`;

    constructor(){}

    private static getLogAppender(): LogAppender{
        var logAppender: LogAppender = new LogAppender();
        logAppender.consoleAppender = this.getConsoleAppender();
        logAppender.rollingFileAppender = this.getRollingFileAppender();

        return logAppender;
    }

    private static getConsoleAppender(): ConsoleAppender{
        var consoleAppender: ConsoleAppender = new ConsoleAppender();
        consoleAppender.type = 'stdout';
        consoleAppender.layout = new AppenderLayout();
        consoleAppender.layout.pattern = `[%d] [%p] [%f{1}] [%l] - %m`;
        consoleAppender.layout.type = 'pattern';   
        return consoleAppender;
    }

    private static getRollingFileAppender(): RollingFileAppender{
        var rollingFileAppender: RollingFileAppender = new RollingFileAppender();
        rollingFileAppender.filename = path.join(process.cwd(), `logs/${this.LOG_FILE_NAME}`);
        rollingFileAppender.maxLogSize = 10485760;
        rollingFileAppender.backups = 30;
        rollingFileAppender.type = 'file';
        rollingFileAppender.compress = true;
        rollingFileAppender.layout = new AppenderLayout();
        rollingFileAppender.layout.pattern = `[%d] [%p] [%f{1}] [%l] - %m`;
        rollingFileAppender.layout.type = 'pattern';   

        return rollingFileAppender;
    }

    public static init(customFormat: boolean = true) {
        var logAppender = this.getLogAppender();
        var config: LogConfig = new LogConfig();
        config.customFormat = customFormat;
        config.type = LogType.Multi;
        config.options = new LogOptions();
        config.options.console = new ConsoleLogOptions();
        config.options.file = new FileLogOptions();
        config.options.file.filename = logAppender.rollingFileAppender.filename;
        config.options.file.maxfiles = logAppender.rollingFileAppender.backups;
        config.options.file.maxsize = logAppender.rollingFileAppender.maxLogSize;

        if(LoggerService.configure(config))
            LOGGER = LoggerService.getLoggerInstance();
    }
}