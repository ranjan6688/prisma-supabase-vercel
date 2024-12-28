export class LogStack {
    method!: string;
    relativePath!: string;
    line!: string;
    pos!: string;
    file!: string;
    stack!: string;
  }
  
  export class LogFormat{
    level!: string;
    message!: string;
    timestamp!: string;
    metadata!: any;
  }
  
  export enum LogType{
    Console,
    File,
    Multi
  }
  
  export const LogLevel = {
    emerg: "emerg",
    alert: "alert",
    crit: "crit",
    error: "error",
    warning: "warning",
    notice: "notice",
    info: "info",
    debug: "debug"
  }
  
  export class LogConfig{
    type!: LogType;
    options!: LogOptions;
    customFormat: boolean = true;
  }
  
  export class LogOptions{
    console!: ConsoleLogOptions;
    file!: FileLogOptions;
  }
  
  export class ConsoleLogOptions{
    level: string = LogLevel.debug;
    handleexceptions: boolean = true;
    json: boolean = false;
    colorize: boolean = true;
  }
  
  export class FileLogOptions {
    level: string = LogLevel.debug;
    filename!: string;
    handleexceptions: boolean = true;
    json: boolean = false;
    maxsize!: number;
    maxfiles!: number;
    colorize: boolean = false;
    timestamp: boolean = true;
  }
  
  export class LogAppender {
      rollingFileAppender!: RollingFileAppender;
      consoleAppender!: ConsoleAppender;
  }
  
  export class RollingFileAppender {    
      type!: string;
      filename!: string;
      maxLogSize!: number;
      backups!: number;
      compress!: boolean;
      layout!: AppenderLayout;
  }
  
  export class ConsoleAppender {
      enabled!: boolean;
      type!: string;
      layout!: AppenderLayout;
  }
  
  export class AppenderLayout {
      type!: string;
      pattern!: string;
  }