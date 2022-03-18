import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { TransactionComponent } from './pages/transaction/transaction.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  // { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'transaction',
    component: TransactionComponent,
    canActivate: [AuthGuard],
  },
  { path: 'transaction', component: TransactionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
