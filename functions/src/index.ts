import * as functions from 'firebase-functions';

export const updateBalance = functions.firestore
  .document(`customers/{cid}/{collectionid}/{txid}`)
  .onWrite(async (change, context) => {
    if (context.params.collectionid === 'transactions') {
      const txCollection = change.after.ref.parent;
      const snapshot = await txCollection.get();
      const transactions = snapshot.docs.map(doc => doc.data());
      const newBalance = transactions
        .map(tx => tx.type === 'payment' ? +tx.amount : -tx.amount)
        .filter(a => !isNaN(a))
        .reduce((sum, a) => sum + a, 0);
      const customerDoc = await txCollection.parent!.get();
      const currentBalance = customerDoc.get('balance');
      if (currentBalance !== newBalance) {
        return customerDoc.ref.set(
          { updatedDate: Date.now(), balance: newBalance },
          { merge: true }
        );
      }
    }
    return null;
  });
