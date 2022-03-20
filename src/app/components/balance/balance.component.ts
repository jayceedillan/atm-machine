import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent implements OnInit {
  currentBalance: number = 0;
  constructor(private store: Store<{ user: User }>) {}

  ngOnInit(): void {
    this.store.select('user').subscribe((x) => {
      this.currentBalance = x.currentBalance;
    });
  }
}
