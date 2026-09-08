import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonModalService } from '@brisanet/ion';
import { finalize } from 'rxjs/operators';

import { CreateUserPayload, User } from '../../../../core/models/user.model';
import { UsersApiService } from '../../../../core/services/users-api.service';

interface DepartmentOption {
  label: string;
  value: string;
  selected?: boolean;
}

interface CheckboxEvent {
  state: string;
}

@Component({
  selector: 'app-user-form-modal',
  templateUrl: './user-form-modal.component.html',
  styleUrls: ['./user-form-modal.component.scss'],
})
export class UserFormModalComponent {
  readonly departments: DepartmentOption[] = [
    { label: 'Atendimento', value: 'atendimento' },
    { label: 'Engenharia', value: 'engenharia' },
    { label: 'Operações', value: 'operacoes' },
  ];

  readonly form: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    department: ['', Validators.required],
    sendInvite: [true],
  });

  saving = false;
  submitError = '';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly api: UsersApiService,
    private readonly modal: IonModalService
  ) {}

  setTextValue(controlName: 'name' | 'email', value: string): void {
    const control = this.form.get(controlName);
    control.setValue(value);
    control.markAsTouched();
  }

  setDepartment(selected: Array<{ value?: string }>): void {
    const selectedDepartment = selected[0];
    this.form.get('department').setValue(selectedDepartment ? selectedDepartment.value || '' : '');
    this.form.get('department').markAsTouched();
  }

  setInvite(event: CheckboxEvent): void {
    this.form.get('sendInvite').setValue(event.state === 'checked');
    this.form.get('sendInvite').markAsTouched();
  }

  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return control.invalid && (control.touched || this.form.touched);
  }

  getErrorMessage(controlName: 'name' | 'email'): string {
    const control = this.form.get(controlName);
    if (control.hasError('required')) {
      return 'Este campo é obrigatório.';
    }
    return controlName === 'email' ? 'Informe um e-mail válido.' : 'Informe ao menos 3 caracteres.';
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid || this.saving) {
      return;
    }

    const payload = this.form.value as CreateUserPayload;
    this.saving = true;
    this.submitError = '';
    this.api
      .createUser(payload)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe(
        (response) => {
          const user = this.normalizeCreatedUser(response, payload);
          this.modal.emitValueAndCloseModal({ user, invited: payload.sendInvite });
        },
        () => (this.submitError = 'Não foi possível salvar. Tente novamente.')
      );
  }

  cancel(): void {
    this.modal.closeModal();
  }

  private normalizeCreatedUser(response: User, payload: CreateUserPayload): User {
    return {
      id: response.id || Date.now(),
      name: payload.name,
      email: payload.email,
      username: response.username || this.createUsername(payload.name),
      company: response.company,
      department: payload.department,
      sendInvite: payload.sendInvite,
    };
  }

  private createUsername(name: string): string {
    return name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '.')
      .replace(/[^a-z0-9.]/g, '');
  }
}
