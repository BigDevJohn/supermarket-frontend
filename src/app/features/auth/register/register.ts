import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink],
  selector: 'app-register',
  styleUrl: './register.scss',
  templateUrl: './register.html',
})
export class Register {
  private readonly authService = inject(AuthService);
  private readonly fb = inject(NonNullableFormBuilder);

  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  registerForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const credentials = this.registerForm.getRawValue();

    this.authService.register(credentials).subscribe({
      next: (response) => {
        this.isLoading.set(false);

        console.log('Registration successful:', response);
      },

      error: (error) => {
        this.isLoading.set(false);
        this.errorMessage.set(error?.error?.message ?? 'Falha ao se registrar. Tente novamente por favor');

      }
    })

  }
}
