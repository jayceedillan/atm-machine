import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Transaction } from 'src/app/models/transaction.model';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { getCurrentBalance } from 'src/app/store/user.action';
import { userCurrentBalance } from 'src/app/store/user.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private store: Store<{ user: User }>
  ) {}

  currentBalance: number = 0;

  ngOnInit(): void {
    this.userId = Number(this.authenticationService.getUserToken());
    this.getCurrentBalance();

    this.store.select('user').subscribe((x) => {
      this.currentBalance = x.currentBalance;
    });
  }

  title = 'ATM-Machine';
  tempAmount: string = '0';
  displayAmount: string = '0';

  showModal: boolean = false;
  typeOfTransaction: string = '';
  transaction: Transaction = {
    amount: 0,
    userId: 0,
    typeOfTransaction: '',
    transactionDate: new Date(),
  };
  userId: number = 0;
  notifyMessage: string = '';
  alertyType: string = 'alert-success';

  clickAmount(val: number) {
    this.tempAmount = `${this.tempAmount}${val}`;

    this.displayAmount = Number(this.tempAmount)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  openModal(typeOfTransaction: string) {
    this.showModal = true;
    this.typeOfTransaction = typeOfTransaction;
  }

  isProceed(isYes: boolean) {
    this.showModal = false;

    if (isYes && this.typeOfTransaction === 'clear') {
      this.displayAmount = '0';
      this.tempAmount = '0';
      return;
    }

    const amountTransaction = Number(this.displayAmount.replace(/\,/g, ''));

    if (amountTransaction === 0) {
      this.showNotify('Please input the valid amount', 'alert-danger');
      return;
    }

    if (isYes && this.typeOfTransaction === 'withdrawal') {
      const validAmount = this.validateCurrentBalance(amountTransaction);

      if (!validAmount) {
        this.showNotify(
          'Chosen amount is greater than your current balance.',
          'alert-danger'
        );
        return;
      }
    }
    this.processTransaction(isYes, amountTransaction);
  }

  processTransaction(isYes: boolean, amountTransaction: number) {
    if (isYes) {
      this.transaction.userId = this.userId;
      this.transaction.amount = amountTransaction;
      this.transaction.typeOfTransaction = this.typeOfTransaction;
      this.authenticationService.addTransaction(this.transaction!).subscribe(
        () => {
          this.displayAmount = '0';
          this.tempAmount = '0';
          this.showNotify('Transaction successfully saved.', 'alert-success');
          this.getCurrentBalance();
        },
        (error) => {
          this.showNotify(error, 'alert-danger');
        }
      );
    }
  }

  validateCurrentBalance = (amountTransaction: number) => {
    if (amountTransaction < this.currentBalance) {
      return true;
    }
    return false;
  };

  getCurrentBalance() {
    debugger;
    this.authenticationService
      .getCurrentBalance(this.userId)
      .subscribe((data) => {
        const user: User = { userId: 0, currentBalance: 0 };
        user.userId = this.userId;
        user.currentBalance = data;
        this.store.dispatch(getCurrentBalance({ user: user }));
      });
  }

  showNotify(message: string, alertType: string) {
    this.alertyType = alertType;
    this.notifyMessage = message;

    setTimeout(() => {
      this.notifyMessage = '';
    }, 2000);
  }
}
