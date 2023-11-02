import winston, { transports } from "winston";
import config from "./config.js";

//Custom logger options:
const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    
};

//Custom Logger:
const devLogger = winston.createLogger({
    //Levels:
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console(
            {
                level: "debug",
                format: winston.format.combine(
                    winston.format.simple()
                )
            }
        ),
        new winston.transports.File(
            {
                filename: './errors.log',
                level: 'error',
                format: winston.format.simple()
            }
        )
    ]
});

//Creating our logger:
const prodLogger = winston.createLogger({
    levels: customLevelsOptions.levels,
    //Declare transports:
    transports: [
        new winston.transports.Console({ level: "info" }),
        new winston.transports.File({ filename: './errors.log', level: 'error' })
    ]
});

//Declare a middleware:
export const addLogger = (req, res, next) => {
    if (config.role === 'admin') {
        req.logger = prodLogger;
        req.logger.info(`modo produccion`)
    } else {
        req.logger = devLogger;
        req.logger.debug(`modo desarollo`);
    }
    next();
};