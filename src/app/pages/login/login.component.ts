import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    pinNo: new FormControl(''),
  });

  formModal: any;

  returnUrl: string = '';
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.authenticationService.signOut();
    this.form = this.formBuilder.group({
      pinNo: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.authenticationService.signOut();
  }

  get myForm(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  login() {
    this.submitted = true;

    if (!this.form.invalid) {
      this.authenticationService.login(this.form.value.pinNo).subscribe(
        (data) => {
          this.authenticationService.saveToken(data.id, data.token);
          this.router.navigate([this.returnUrl]);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
