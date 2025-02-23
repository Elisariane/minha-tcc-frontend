import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        passwordConfirmed: ['', [Validators.required, Validators.minLength(6)]]
      },
      { validators: this.passwordMatchValidator(), updateOn: 'change' } // Validador personalizado no nível do FormGroup
    );
  }

  passwordMatchValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get('password')?.value;
      const passwordConfirmed = group.get('passwordConfirmed')?.value;

      if (password && passwordConfirmed && password !== passwordConfirmed) {
        group.get('passwordConfirmed')?.setErrors({ mismatchPassword: true });
        return { mismatchPassword: true }; 
      }

      group.get('passwordConfirmed')?.setErrors(null);
      return null; 
    };
  }

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);

    if (control?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (control?.hasError('minlength')) {
      return 'Mínimo de 6 caracteres';
    }

    if (control?.hasError('mismatchPassword')) {
      return 'As senhas não coincidem';
    }

    return '';
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      const user = this.form.value;

      this.authService.register(user).subscribe({
        next: (response) => {
          this.router.navigate(['/signin'])
        },
        error: (error) => {
          console.error('Error no cadastro: ', error)
        }
      })
    }
  }
}