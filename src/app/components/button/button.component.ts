import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Output() transactionChange: EventEmitter<string> =
    new EventEmitter<string>();

  @Input() typeOfTransaction: string = 'withdrawal';
  @Input() title: string = 'Withdraw';
  constructor() {}

  ngOnInit(): void {}

  addTransaction() {
    this.transactionChange.emit(this.typeOfTransaction);
  }
}
