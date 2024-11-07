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
exports.deleteAllBets = exports.getBetHistory = exports.addBet = void 0;
const database_1 = require("../database");
const addBet = (bet) => __awaiter(void 0, void 0, void 0, function* () {
    const database = yield database_1.db;
    return database.run(`INSERT INTO bets (userId, betAmount, betNumber, diceResult, result) VALUES (?, ?, ?, ?, ?)`, [bet.userId, bet.betAmount, bet.betNumber, bet.diceResult, bet.result]);
});
exports.addBet = addBet;
const getBetHistory = () => __awaiter(void 0, void 0, void 0, function* () {
    const database = yield database_1.db;
    return database.all(`SELECT * FROM bets WHERE userId = 1 ORDER BY timestamp DESC`);
});
exports.getBetHistory = getBetHistory;
const deleteAllBets = () => __awaiter(void 0, void 0, void 0, function* () {
    const database = yield database_1.db;
    return database.run(`DELETE FROM bets`);
});
exports.deleteAllBets = deleteAllBets;
