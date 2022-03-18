import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/transaction.model';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit {
  transactions: Transaction[] = [];

  currentBalance: number = 0;
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    let id = Number(this.authenticationService.getUserToken());

    this.authenticationService.getTransactions(id).subscribe((data) => {
      this.transactions = data;
    });

    this.currentBalance = Number(this.authenticationService.getCurrentBal());
  }
}
