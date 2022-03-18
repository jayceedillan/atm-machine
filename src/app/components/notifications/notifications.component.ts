import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  @Input() notifyMessage: string = '';
  @Input() alertType: string = 'alert-primary';

  constructor() {}

  ngOnInit(): void {}

  getClass(): string {
    switch (this.alertType) {
      case 'success':
        return 'alert-success';
      default:
        return '';
    }
  }
}
