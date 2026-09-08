import { Component, OnInit } from '@angular/core';
import {
  IonModalService,
  IonNotificationService,
} from '@brisanet/ion';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

import { User } from '../../../../core/models/user.model';
import { UsersApiService } from '../../../../core/services/users-api.service';
import { UserFormModalComponent } from '../../components/user-form-modal/user-form-modal.component';

interface ModalResult {
  user?: User;
  invited?: boolean;
}

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
})
export class UsersPageComponent implements OnInit {
  users: User[] = [];
  loading = true;
  errorMessage = '';
  deletingId: number | null = null;

  constructor(
    private readonly api: UsersApiService,
    private readonly modal: IonModalService,
    private readonly notification: IonNotificationService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.errorMessage = '';
    this.api
      .getUsers()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (users) => (this.users = users),
        () =>
          (this.errorMessage =
            'Não foi possível carregar os usuários. Confira sua conexão e tente novamente.')
      );
  }

  openCreateModal(): void {
    this.modal
      .open(UserFormModalComponent, {
        title: 'Adicionar novo usuário',
        width: 560,
        footer: { hide: true },
      })
      .subscribe((response) => {
        const result = response as ModalResult;
        if (!result || !result.user) {
          return;
        }

        this.users = [result.user].concat(this.users);
        const inviteMessage = result.invited
          ? 'O convite por e-mail foi marcado para envio.'
          : 'Usuário adicionado à lista local.';
        this.notification.success('Usuário adicionado', inviteMessage);
      });
  }

  goToUser(id: number): void {
    this.router.navigate(['/users', id]);
  }

  deleteUser(user: User): void {
    this.deletingId = user.id;
    this.api
      .deleteUser(user.id)
      .pipe(finalize(() => (this.deletingId = null)))
      .subscribe(
        () => {
          this.users = this.users.filter((item) => item.id !== user.id);
          this.notification.success('Usuário removido', user.name + ' foi removido da lista local.');
        },
        () => this.notification.error('Não foi possível excluir', 'Tente novamente em alguns instantes.')
      );
  }

  trackByUserId(_: number, user: User): number {
    return user.id;
  }
}
