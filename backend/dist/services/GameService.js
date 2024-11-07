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
exports.resetGame = exports.playGame = void 0;
const UserModel_1 = require("../models/UserModel");
const BetModel_1 = require("../models/BetModel");
const BetModel_2 = require("../models/BetModel");
const playGame = (betAmount, betNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, UserModel_1.getUser)();
    if (betAmount > user.balance) {
        throw new Error('Insufficient balance.');
    }
    let diceResult = Math.floor(Math.random() * 6) + 1;
    let finalResult = diceResult;
    let didWin = diceResult === betNumber;
    // Rigged dice logic
    if (user.balance >= 10000 && didWin) {
        if (Math.random() < 0.5) {
            finalResult = Math.floor(Math.random() * 6) + 1;
            didWin = finalResult === betNumber;
        }
    }
    else if (user.balance >= 5000 && didWin) {
        if (Math.random() < 0.3) {
            finalResult = Math.floor(Math.random() * 6) + 1;
            didWin = finalResult === betNumber;
        }
    }
    let newBalance = user.balance - betAmount;
    let hasWonOnce = user.hasWonOnce;
    let winnings = -betAmount; // Default to loss
    if (didWin) {
        winnings = betAmount * 4; // Net gain is 4 times the bet amount
        newBalance += winnings + betAmount; // Add back the bet amount and winnings
        hasWonOnce = true;
    }
    yield (0, UserModel_1.updateUserBalance)(newBalance, hasWonOnce);
    yield (0, BetModel_1.addBet)({
        userId: user.id,
        betAmount,
        betNumber,
        diceResult: finalResult,
        result: didWin ? 'Win' : 'Lose',
    });
    if (newBalance <= 0) {
        yield (0, exports.resetGame)();
    }
    return {
        diceResult,
        finalResult,
        winnings,
        didWin,
        newBalance,
    };
});
exports.playGame = playGame;
const resetGame = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, UserModel_1.updateUserBalance)(1000, false);
    yield (0, BetModel_2.deleteAllBets)();
});
exports.resetGame = resetGame;
