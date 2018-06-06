import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {ValidationService} from '../services/validation.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  wrongPassword = false;
  wrongEmail = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      console.log('user:', user);
      // tslint:disable-next-line:curly
      if (user) this.router.navigate(['/list']);
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, ValidationService.emailValidator]],
      password: ['', [Validators.required]],
    });
  }

  loginWithUsernameAndPassword() {
    this.wrongPassword = false;
    this.wrongEmail = false;
    console.log(this.loginForm.value.email, this.loginForm.value.password);
    this.auth
      .emailLogin(this.loginForm.value.email, this.loginForm.value.password)
      .then(() => this.router.navigate(['list']))
      .catch(err => {
        console.log('err:', err.code);
        if (err.code === 'auth/user-not-found') {
          this.wrongEmail = true;
        }
        if (err.code === 'auth/wrong-password') {
          this.wrongPassword = true;
        }
      });
  }

  clearErrors() {
    this.wrongPassword = false;
    this.wrongEmail = false;
  }
}
