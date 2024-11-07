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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const initDB_1 = require("./initDB");
const GameService_1 = require("./services/GameService");
const UserModel_1 = require("./models/UserModel");
const BetModel_1 = require("./models/BetModel");
const app = (0, express_1.default)();
const PORT = 4000;
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(body_parser_1.default.json());
(0, initDB_1.initDB)().then(() => {
    app.listen(PORT, () => {
        console.log(`Backend server is running on http://localhost:${PORT}`);
    });
});
// API Endpoints
app.get('/api/balance', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, UserModel_1.getUser)();
    res.json({ balance: user.balance, hasWonOnce: user.hasWonOnce });
}));
app.post('/api/bet', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { betAmount, betNumber } = req.body;
    try {
        const result = yield (0, GameService_1.playGame)(betAmount, betNumber);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
app.post('/api/withdraw', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, UserModel_1.getUser)();
    if (user.hasWonOnce) {
        yield (0, GameService_1.resetGame)();
        res.json({ message: 'Balance withdrawn successfully.' });
    }
    else {
        res.status(400).json({ error: 'You need to win at least once to withdraw.' });
    }
}));
app.get('/api/history', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const history = yield (0, BetModel_1.getBetHistory)();
    res.json(history);
}));
