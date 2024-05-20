import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UtilService } from '../../../shared/util/util.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent implements OnInit {
  public hide: boolean = false;
  public remember: boolean = false;
  public loginForm: FormGroup = {} as FormGroup;
  public errorValue: string = '';

  constructor(
    private builder: FormBuilder,
    private api: AuthService,
    private util: UtilService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.setForm();
  }

  changeHind(): void {
    this.hide = !this.hide;
  }
  changeRemember(): void {
    this.remember = !this.remember;
  }

  alert(val: string) {
    console.log(val);
    alert(val);
  }

  setForm() {
    this.loginForm = this.builder.group({
      user: [null, Validators.required],
      password: [null, [Validators.minLength(8), Validators.required]],
    });
  }

  checkLogin() {
    const data = this.loginForm.value;
    this.checkError("user")
    this.api.sendData(data, '/auth/login').subscribe({
      next: (resp) => {
        const logged = resp.success;
        const val = resp.response.key
        this.util.processResponse(resp);
        this.api.setLoggedIn(logged);
        if(logged) {
          this.api.setCookieValue(val)
          this.router.navigate(["/books"])
        }
      },
      error: (err) => {
        this.util.processResponse(err.error);
        console.error(err.error);
      },
    });
  }

  checkError(nameControl: string) {
    const data = this.loginForm.get(nameControl);
    if (data?.hasError('required')) {
      this.errorValue = 'You must enter a value';
    } else if (data?.hasError('email')) {
      this.errorValue = 'Not a valid email';
    } else if (data?.hasError('minlength')) {
      this.errorValue = `The min length is ${
        data.errors!['minlength']['requiredLength']
      }`;
    }
  }
}
