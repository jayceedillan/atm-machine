import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/transaction.model';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {}

  title = 'ATM-Machine';
  tempAmount: string = '0';
  displayAmount: string = '0';
  amount: number = 0;
  showModal: boolean = false;
  typeOfTransaction: string = '';
  transaction: Transaction = {
    amount: 0,
    pinNo: 0,
    typeOfTransaction: '',
    transactionDate: new Date(),
  };

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
      return;
    }

    this.processTransaction(isYes);
  }

  processTransaction(isYes: boolean) {
    if (isYes) {
      const amount = Number(this.displayAmount.replace(/\,/g, ''));
      this.transaction.pinNo = 12345;
      this.transaction.amount = amount;
      this.transaction.typeOfTransaction = this.typeOfTransaction;
      this.authenticationService.addTransaction(this.transaction!).subscribe(
        (data) => {
          this.displayAmount = '0';
          this.alertyType = 'alert-success';
          this.notifyMessage = 'Transaction successfully saved.';
        },
        (error) => {
          this.alertyType = 'alert-danger';
          this.notifyMessage = error;
        }
      );

      setTimeout(() => {
        this.notifyMessage = '';
      }, 2000);
    }
  }
}
