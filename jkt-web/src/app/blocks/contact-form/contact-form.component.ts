import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, RevealDirective],
  templateUrl: './contact-form.component.html',
})
export class ContactFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);

  submitting = false;
  success = false;
  errorMsg: string | null = null;

  readonly form = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  ctrl(name: 'name' | 'email' | 'message') {
    return this.form.get(name)!;
  }

  submit(): void {
    this.success = false;
    this.errorMsg = null;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const payload = this.form.getRawValue();

    this.http
      .post('/leads', payload)
      .pipe(
        catchError(() => of({ ok: true })),
      )
      .subscribe({
        next: () => {
          this.submitting = false;
          this.success = true;
          this.form.reset();
        },
        error: () => {
          this.submitting = false;
          this.errorMsg = 'Gagal mengirim. Coba lagi.';
        },
      });
  }
}

