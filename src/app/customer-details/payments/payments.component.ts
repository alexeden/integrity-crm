import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { Payment } from '@crm/lib';
import { switchMap, filter, map } from 'rxjs/operators';

@Component({
  selector: 'crm-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit, OnChanges {
  @Input() readonly cid: string;

  private readonly cid$ = new BehaviorSubject<string | null>(null);
  readonly payments: Observable<Payment[]>;
  readonly noPayments: Observable<boolean>;

  constructor(
    private store: AngularFirestore
  ) {
    this.payments = this.cid$.pipe(
      filter<string>(cid => cid !== null),
      switchMap(cid => {
        return this.store.collection<Payment>(`customers/${cid}/payments`).valueChanges();
      })
    );

    this.noPayments = this.payments.pipe(map(ps => ps.length < 1));
  }

  ngOnChanges(changes: SimpleChanges) {
    this.cid$.next(changes.cid.currentValue);
  }

  ngOnInit() {
    //
  }

}
