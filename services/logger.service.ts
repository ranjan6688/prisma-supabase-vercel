import winston, { Logger, format, transports } from 'winston';
import * as winstonLogRotter from 'winston-daily-rotate-file';
import * as path from 'path';
import moment from 'moment';
import { ConsoleLogOptions, FileLogOptions, LogConfig, LogStack, LogType } from '../models/logger.model';
const { combine, splat, timestamp, printf } = format;

export class LoggerService{

  /**
   * COMMON VARIABLES
   */
    private static PROJECT_ROOT: string = path.join(__dirname, '..');
    private static LOGGER: any;
    private static iscustomFormatEnabled: boolean = true;

    constructor(){}

    public static configure(config: LogConfig): boolean{

      this.iscustomFormatEnabled = config.customFormat;

      var flag: boolean = false;

      if(config.type === LogType.Multi){
        if(config.options.console && config.options.file){
          this.configureMultiLogger(config.options.console, config.options.file, config.customFormat);
          flag = true;
        }
      }
      else if(config.type === LogType.Console){
        if(config.options.console){
          this.configureConsoleLogger(config.options.console, config.customFormat);
          flag = true;
        }
      }
      else if(config.type === LogType.File){
        if(config.options.file){
          this.configureFileLogger(config.options.file, config.customFormat);
          flag = true;
        }
      }else{
        if(config.options.console){
          this.configureConsoleLogger(config.options.console, config.customFormat);
          flag = true;
        }
      }

      if(flag === true){
        this.LOGGER.stream = {
          write: function (message: any) {
            this.LOGGER.info(message)
          }
        };
      }

      return flag;
    };

    public static getLoggerInstance(){
      return this;
    }

    private static configureConsoleLogger(logOptions: ConsoleLogOptions, customFormat: boolean = true){
      var logConfig: any = {
        transports: [
          new (winston.transports.Console)(logOptions)
        ],
        exitOnError: false,
      };

      if(customFormat){
        logConfig.format = combine(splat(), timestamp(), this.customFormat);
      }else{
        logConfig.format = combine(this.nocustomFormat);
      }
      this.LOGGER = winston.createLogger(logConfig);
    };

    private static configureFileLogger(logOptions: FileLogOptions, customFormat: boolean = true){
      var logConfig: any = {
        transports: [
          new (winston.transports.File)(logOptions)
        ],
        exitOnError: false,
      };

      if(customFormat){
        logConfig.format = combine(splat(), timestamp(), this.customFormat);
      }else{
        logConfig.format = combine(this.nocustomFormat);
      }
      this.LOGGER = winston.createLogger(logConfig);
    };

    private static configureMultiLogger(consoleLogOptions: ConsoleLogOptions, fileLogOptions: FileLogOptions, customFormat: boolean = true){
      var logConfig: any = {
        transports: [
          new (winston.transports.Console)(consoleLogOptions),
          new (winston.transports.File)(fileLogOptions)
        ],
        exitOnError: false,
      };

      if(customFormat){
        logConfig.format = combine(splat(), timestamp(), this.customFormat);
      }else{
        logConfig.format = combine(this.nocustomFormat);
      }
      this.LOGGER = winston.createLogger(logConfig);
    };

    public static debug = (...args: any[]): void => {
      this.LOGGER.debug(...this.formatLogArguments(args));
    };
    
    public static log = (...args: any[]): void => {
      this.LOGGER.debug(...this.formatLogArguments(args));
    };
    
    public static info = (...args: any[]): void => {
      this.LOGGER.info(...this.formatLogArguments(args));
    };
    
    public static warn = (...args: any[]): void => {
      this.LOGGER.warn(...this.formatLogArguments(args));
    };
    
    public static error = (...args: any[]): void => {
      this.LOGGER.error(...this.formatLogArguments(args));
    };

    private static formatLogArguments(args: any[]): any[] {
      args = Array.prototype.slice.call(args);
    
      var stackInfo: LogStack | undefined = this.getStackInfo(1);
      if (stackInfo) {
        // get file path relative to project root
        var calleeStr = `[${stackInfo.relativePath}] [${stackInfo.line}]`;
    
        if (typeof args[0] === 'string') {
          if(this.iscustomFormatEnabled)
            args[0] = calleeStr + ' - ' + args[0];
        } else {
          args.unshift(calleeStr);
        }
      }
    
      return args;
    };

    private static getStackInfo(stackindex: number): LogStack | undefined {
      // get call stack, and analyze it
      // get all file, method, and line numbers
    
      var _err: Error = new Error();
      var stacklist: any = (_err).stack?.split('\n').slice(3);
    
      // stack trace format:
      // http://code.google.com/p/v8/wiki/javascriptstacktraceapi
      // do not remove the regex expresses to outside of this method (due to a bug in node.js)
      var stackreg: RegExp = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/gi;
      var stackreg2: RegExp = /at\s+()(.*):(\d*):(\d*)/gi;
    
      var s: string = stacklist[stackindex] || stacklist[0];
      var sp: RegExpExecArray | null = stackreg.exec(s) || stackreg2.exec(s);
    
      if (sp && sp.length === 5) {
        return {
          method: sp[1],
          relativePath: path.relative(this.PROJECT_ROOT, sp[2]),
          line: sp[3],
          pos: sp[4],
          file: path.basename(sp[2]),
          stack: stacklist.join('\n')
        };
      }

      return undefined;
    };

    private static customFormat = printf( ({ level, message, timestamp , ...metadata}) => {

      let msg = `[${moment(timestamp as any).format('MMM DD, YYYY hh:mm:ss A')}] [${level.toUpperCase()}] ${message}`  
      if(metadata && Object.keys(metadata).length > 0) {
        msg += JSON.stringify(metadata)
      }
      return msg
    });

    private static nocustomFormat = printf( ({ level, message, timestamp , ...metadata}) => {

      let msg = `${message}`  
      // if(metadata) {
      //   msg += JSON.stringify(metadata)
      // }

      console.log(message);
      return msg
    });
    
}