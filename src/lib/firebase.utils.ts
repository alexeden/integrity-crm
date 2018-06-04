/* tslint:disable prefer-object-spread */
import { Observable, from } from 'rxjs';
import { AngularFirestoreCollection, DocumentChangeAction } from 'angularfire2/firestore';
import { concatMap, scan, startWith } from 'rxjs/operators';
import { Id } from '@crm/lib';


export class FirebaseUtils {
  static collectionToData<T extends object>(
    collection: AngularFirestoreCollection<T>
  ): Observable<Array<Id<T>>> {
    return collection.stateChanges().pipe(
      concatMap(changes => from(changes)),
      scan<DocumentChangeAction<T>, Array<Id<T>>>(
        (list, change) => {
          const id = change.payload.doc.id;
          const data = change.payload.doc.data();
          /**
           * TODO: Would prefer to use object spread operator here, but
           * bug in TS prevents this: https://github.com/Microsoft/TypeScript/pull/13288
           */
          const newC = Object.assign({}, { id }, data);
          switch (change.type) {
            case 'added': return [ ...list, newC ];
            case 'removed': return list.filter(c => c.id !== id);
            case 'modified': return list.map(c => c.id === id ? newC : c);
          }
        },
        []
      ),
      startWith([])
    );
  }
}
