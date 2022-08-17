
const errorLogging = require("../helpers/errorLog");

const errValidator = (err) => {
    if(err&&err.errors.length){
        return err.errors[0].message;
    }else{
        return 'internal server error';
    }
};

const errorHandler = (err, req, res, next) => {
    let status = err.status || 500;
    let message = err.message || "Internal Server Error";
    switch(err.name) {
        case "SequelizeForeignKeyConstraintError":
            res.status(404).json({ message: `${err.table||'data in db'} not found` });
            break;
        case "TokenExpiredError":
            res.status(401).json({ message: "token expired" });
            break;
        case "JsonWebTokenError":
            if(err.message == "invalid signature") {
                res.status(401).json({ message: "invalid access token" });
                break;
            }else if(err.message == "invalid token") {
                res.status(401).json({ message: "invalid access token" });
                break;
            }else{
                res.status(401).json({ message: "access token cannot be empty" });
                break;
            }
        case "SequelizeUniqueConstraintError":
            message = errValidator(err);
            res.status(400).json({ message });
            break;
        case "SequelizeValidationError":
            message = errValidator(err);
            res.status(400).json({ message });
            break;
        case "Cannot read property 'salt' of undefined":
            res.status(400).json({ message: "Missing jwt to be decoded" });
            break;
        default:
            res.status(status).json({ message });
            // errorLogging('internal server error', 'errorHandler', { status, message })
            break;
    }
}
module.exports = errorHandler