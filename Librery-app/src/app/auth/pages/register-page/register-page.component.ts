import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { ErrorMessage } from '../../util/interfaces';
import { comparePasswords } from '../../util/functions';
import { AuthService } from '../../services/auth.service';
import { UtilService } from '../../../shared/util/util.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    ReactiveFormsModule,
    ToastModule,
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
  providers: [MessageService],
})
export class RegisterPageComponent implements OnInit {
  public registerForm: FormGroup = {} as FormGroup;
  public hide1: boolean = true;
  public hide2: boolean = true;
  public validate: boolean = false;
  public showMssg: boolean = false;

  private regExp: any = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{4,})/;
  public errorMessage: ErrorMessage = {
    user: '',
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirmPass: '',
  };

  constructor(
    private builder: FormBuilder,
    private auth: AuthService,
    private util: UtilService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.setForm();
  }

  createAlert() {
    alert('WAJAJAJAJAJ');
  }

  setForm() {
    this.registerForm = this.builder.group(
      {
        name: [null, Validators.required],
        lastName: [null, Validators.required],
        email: [null, [Validators.email, Validators.required]],
        username: [null, Validators.required],
        password: [
          null,
          [
            Validators.minLength(8),
            Validators.required,
            Validators.pattern(this.regExp),
          ],
        ],
        confirmPass: [null, [Validators.minLength(8), Validators.required]],
      },
      {
        validators: comparePasswords,
      }
    );
  }

  sendData() {
    const data = this.registerForm.value;
    this.validateInputs();
    if (this.validate === true) {
      this.auth.sendData(data, '/auth/register').subscribe({
        next: (res) => {
          const registered = res.success
          const val = res.response.key
          this.showMssg = true;
          this.validate = false;
          this.util.processResponse(res);
          this.auth.setLoggedIn(registered);
          if(registered) {
            this.auth.setCookieValue(val)
            this.router.navigate(["/books"])
          }
        },
        error: (err) => {
          this.util.processResponse(err.error);
          this.validate = false;
          console.error(err.error);
        },
      });
    } else {
      console.log('Bad request');
    }
  }

  checkValues(nameControl: string) {
    const data = this.registerForm.get(nameControl);
    if (data?.hasError('required')) {
      this.errorMessage[nameControl] = 'You must enter a value';
      this.validate = false;
    } else if (data?.hasError('email')) {
      this.errorMessage[nameControl] = 'Not a valid email';
      this.validate = false;
    } else if (data?.hasError('minlength')) {
      this.errorMessage[nameControl] = `The min length is ${
        data.errors!['minlength']['requiredLength']
      }`;
      this.validate = false;
    } else if (data?.hasError('pattern')) {
      this.errorMessage[
        nameControl
      ] = `The password must be have: 1 Mayus, 1 minus, and 4 numbers`;
      this.validate = false;
    } else if (data?.hasError('mismatch')) {
      this.errorMessage[nameControl] = `The passwords dont match`;
      this.validate = false;
    } else {
      this.errorMessage[nameControl] = '';
      this.validate = true;
    }
  }

  validateInputs() {
    Object.keys(this.errorMessage).forEach((key) => {
      this.checkValues(key);
    });
  }
}
