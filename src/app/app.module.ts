import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { TransactionComponent } from './pages/transaction/transaction.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ExceptionIntercept } from './interceptors/error-catching.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './components/modal/modal.component';
import { ButtonComponent } from './components/button/button.component';
import { NotificationsComponent } from './components/notifications/notifications.component';

import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/user.reducer';
import { BalanceComponent } from './components/balance/balance.component';

import { CardHeaderComponent } from './components/card-header/card-header.component';
import { MaincontentComponent } from './components/maincontent/maincontent.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    TransactionComponent,
    NavbarComponent,
    ModalComponent,
    ButtonComponent,
    NotificationsComponent,
    BalanceComponent,
    CardHeaderComponent,
    MaincontentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    StoreModule.forRoot({ user: userReducer }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ExceptionIntercept,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
