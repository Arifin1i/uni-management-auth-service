"use strict";
exports.__esModule = true;
exports.errorLogger = exports.logger = void 0;
var winston_1 = require("winston");
var combine = winston_1.format.combine, timestamp = winston_1.format.timestamp, label = winston_1.format.label, printf = winston_1.format.printf;
var path_1 = require("path");
var winston_daily_rotate_file_1 = require("winston-daily-rotate-file");
var myFormat = printf(function (_a) {
    var level = _a.level, message = _a.message, label = _a.label, timestamp = _a.timestamp;
    var date = new Date(timestamp);
    var day = date.getDay();
    var hour = date.getHours();
    var min = date.getMinutes();
    return date.toString() + " " + day + " " + hour + " " + min + " [" + label + "] " + level + ": " + message;
});
var logger = winston_1.createLogger({
    level: 'info',
    format: combine(label({ label: 'right meow!' }), timestamp(), myFormat),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston_1.transports.Console(),
        new winston_daily_rotate_file_1["default"]({
            filename: path_1["default"].join(process.cwd(), 'logs', 'winston', 'successes', 'PHU-%DATE%-success.log'),
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        }),
    ]
});
exports.logger = logger;
var errorLogger = winston_1.createLogger({
    level: 'error',
    format: combine(label({ label: 'right meow!' }), timestamp(), myFormat),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston_1.transports.Console(),
        new winston_daily_rotate_file_1["default"]({
            filename: path_1["default"].join(process.cwd(), 'logs', 'winston', 'errors', 'PHU-%DATE%-error.log'),
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        }),
    ]
});
exports.errorLogger = errorLogger;
