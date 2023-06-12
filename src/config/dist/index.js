"use strict";
exports.__esModule = true;
var dotenv_1 = require("dotenv");
var path_1 = require("path");
dotenv_1["default"].config({ path: path_1["default"].join(process.cwd(), '.env') });
exports["default"] = {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    default_user_pass: process.env.DEFAULT_USER_PASS
};
