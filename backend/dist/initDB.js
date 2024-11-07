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
exports.initDB = void 0;
const database_1 = require("./database");
const initDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const database = yield database_1.db;
    yield database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      balance INTEGER,
      hasWonOnce BOOLEAN
    );

    CREATE TABLE IF NOT EXISTS bets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      betAmount INTEGER,
      betNumber INTEGER,
      diceResult INTEGER,
      result TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(userId) REFERENCES users(id)
    );
  `);
    const user = yield database.get(`SELECT * FROM users WHERE id = 1`);
    if (!user) {
        yield database.run(`INSERT INTO users (balance, hasWonOnce) VALUES (1000, 0)`);
    }
});
exports.initDB = initDB;
