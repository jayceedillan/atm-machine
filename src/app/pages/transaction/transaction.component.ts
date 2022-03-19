import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/transaction.model';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit {
  transactions: Transaction[] = [];

  currentBalance: number = 0;
  selectedAlbumId = -1;

  constructor(
    private authenticationService: AuthenticationService,
    private store: Store<{ user: User }>
  ) {}

  ngOnInit(): void {
    let id = Number(this.authenticationService.getUserToken());

    this.authenticationService.getTransactions(id).subscribe((data) => {
      this.transactions = data;
    });

    this.store.select('user').subscribe((x) => {
      this.currentBalance = x.currentBalance;
    });
  }
}
