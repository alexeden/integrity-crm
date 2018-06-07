"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
exports.updateBalance = functions.firestore
    .document(`customers/{cid}/{collectionid}/{txid}`)
    .onWrite((change, context) => __awaiter(this, void 0, void 0, function* () {
    if (context.params.collectionid === 'transactions') {
        const txCollection = change.after.ref.parent;
        const snapshot = yield txCollection.get();
        const transactions = snapshot.docs.map(doc => doc.data());
        const newBalance = transactions
            .map(tx => tx.type === 'payment' ? +tx.amount : -tx.amount)
            .filter(a => !isNaN(a))
            .reduce((sum, a) => sum + a, 0);
        const customerDoc = yield txCollection.parent.get();
        const currentBalance = customerDoc.get('balance');
        if (currentBalance !== newBalance) {
            return customerDoc.ref.set({ updatedDate: Date.now(), balance: newBalance }, { merge: true });
        }
    }
    return null;
}));
//# sourceMappingURL=index.js.map