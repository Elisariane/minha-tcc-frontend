import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

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

  constructor(private fb: FormBuilder) {
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
      console.log('Formulário válido:', this.form.value);
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
