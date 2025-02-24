import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth.service';
import { IUser } from '../../../interfaces/IUser';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
      this.form = this.fb.group(
        {
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]]
        }
      );
    }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      const user: IUser = this.form.value;

      this.authService.login(user).subscribe({
        next: (user) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.router.navigate(['/home'])
        },
        error: (error) => {
          console.error('Error no cadastro: ', error)
        }
      });
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);

    if (control?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (control?.hasError('email')) {
      return 'Não está no formato de e-mail';
    }

    return '';
  }

}
