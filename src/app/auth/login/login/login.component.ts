import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  isNewUser = false;
  email = '';
  password = '';
  errorMessage = '';
  error: { name: string, message: string } = { name: '', message: '' };

  resetPassword = false;

  constructor(public authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }  

  checkUserInfo() {
    if (this.authService.isUserEmailLoggedIn) {
      this.router.navigate(['/panel'])
    }
  }

  clearErrorMessage() {
    this.errorMessage = '';
    this.error = { name: '', message: '' };
  }

  changeForm() {
    this.isNewUser = !this.isNewUser
  }

  onSignUp(): void {
    this.clearErrorMessage()

    if (this.validateForm(this.email, this.password)) {
      this.authService.signUpWithEmail(this.email, this.password)
        .then(() => {
          this.router.navigate(['/panel'])
        }).catch(_error => {
          this.error = _error
          this.router.navigate(['/'])
        })
    }
  }

  onLoginEmail(): void {
    this.clearErrorMessage()

    if (this.validateForm(this.email, this.password)) {
      this.authService.loginWithEmail(this.email, this.password)
        .then(() => this.router.navigate(['/panel']))
        .catch(_error => {
          this.error = _error
          this.router.navigate(['/'])
        })
    }
  }

  validateForm(email: string, password: string): boolean {
    if (email.length === 0) {
      this.errorMessage = 'Ingrese Email'
      return false
    }

    if (password.length === 0) {
      this.errorMessage = 'Ingrese Contraseña'
      return false
    }

    if (password.length < 6) {
      this.errorMessage = 'Contraseña debe tener minimo 6 caracteres'
      return false
    }

    this.errorMessage = ''

    return true
  }

  isValidMailFormat(email: string) {
    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    if ((email.length === 0) && (!EMAIL_REGEXP.test(email))) {
      return false;
    }

    return true;
  }

  sendResetEmail() {
    this.clearErrorMessage()

    /*this.authService.resetPassword(this.email)
      .then(() => this.resetPassword = true)
      .catch(_error => {
        this.error = _error
      })*/
  }
}
