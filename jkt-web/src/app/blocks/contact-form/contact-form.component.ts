import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { RevealDirective } from '../../shared/directives/reveal.directive';
import { environment } from '../../../environments/environment';

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

    // Must be the absolute CMS API URL, not a relative path — a relative
    // '/leads' resolves against this Angular server's own origin (404),
    // not Laravel. Previously also had a catchError() that reported every
    // failure (including that 404) as success — a real bug, since it meant
    // this form could tell a user their lead was submitted when it never
    // reached the CMS. Real failures must surface as errorMsg.
    this.http.post(`${environment.apiUrl}/leads`, payload).subscribe({
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

