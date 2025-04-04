import { LogLevel, LogLevelColors, LogLevelValues } from "../constantes/enum";
import path from 'path';

export class Logger {
    private logFunction: (message: string) => void = console.log;
    private logLevel: number = 0;
    private logClassName: string = '';

    constructor(logLevel: LogLevel = LogLevel.DEBUG) {
        this.setLogLevel(logLevel);
        this.logClassName = this.getCallerFileName();
    }

    public setLogLevel(logLevel: LogLevel): void {
        this.logLevel = LogLevelValues[logLevel];
    }

    private getNowDate(): string {
        const now = new Date();
        return now.toLocaleString();
    }

    private canLog(level: LogLevel): boolean {
        return LogLevelValues[level] >= this.logLevel;
    }

    public log(color: string, level: LogLevel, message: string[]): void {
        if (!this.canLog(level)) return;
        this.logFunction(color + `[${level}] ${this.getNowDate()} [${this.logClassName}] : ${message.join(' ')}` + LogLevelColors.END);
    }

    public info(...message: string[]): void {
        if (!this.canLog(LogLevel.INFO)) return;
        this.log(LogLevelColors.INFO, LogLevel.INFO, message);
    }

    public debug(...message: string[]): void {
        if (!this.canLog(LogLevel.DEBUG)) return;
        this.log(LogLevelColors.DEBUG, LogLevel.DEBUG, message);
    }

    public warn(...message: string[]): void {
        if (!this.canLog(LogLevel.WARN)) return;
        this.log(LogLevelColors.WARN, LogLevel.WARN, message);
    }

    public error(...message: string[]): void {
        if (!this.canLog(LogLevel.ERROR)) return;
        this.log(LogLevelColors.ERROR, LogLevel.ERROR, message);
    }

    private getCallerFileName(): string {
        const error = new Error();
        const stackLines = error.stack?.split('\n') || [];
        const rootDir = path.resolve(__dirname, '..', '..');
        const callerLine = (stackLines.find(line => !line.includes('Logger.ts') && line.includes(rootDir)) || '').split('at ')[1].trim();
        const callerFilePath = callerLine.replace(rootDir, '').split(':')[0].trim();
        return callerFilePath.replaceAll(/\\/g, '/');
    }
}