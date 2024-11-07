"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserBalance = exports.getUser = void 0;
const database_1 = require("../database");
const getUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const database = yield database_1.db;
    return database.get(`SELECT * FROM users WHERE id = 1`);
});
exports.getUser = getUser;
const updateUserBalance = (balance, hasWonOnce) => __awaiter(void 0, void 0, void 0, function* () {
    const database = yield database_1.db;
    return database.run(`UPDATE users SET balance = ?, hasWonOnce = ? WHERE id = 1`, [balance, hasWonOnce]);
});
exports.updateUserBalance = updateUserBalance;
