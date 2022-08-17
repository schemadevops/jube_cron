const { ErrorLog } = require("../models/index");

async function errorLogging(error_message, error_function, data) {
    ErrorLog.create({
        marketplace_id: 0,
        error_message : error_message,
        error_function : error_function,
        user_id : 0,
        created_date : null,
        data : JSON.stringify(data),
    })

    return 'success'
}

module.exports = errorLogging