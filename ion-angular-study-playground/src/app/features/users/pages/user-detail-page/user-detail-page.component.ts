import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { User } from '../../../../core/models/user.model';
import { UsersApiService } from '../../../../core/services/users-api.service';

@Component({
  selector: 'app-user-detail-page',
  templateUrl: './user-detail-page.component.html',
  styleUrls: ['./user-detail-page.component.scss'],
})
export class UserDetailPageComponent implements OnInit, OnDestroy {
  user: User | null = null;
  userId = 0;
  loading = true;
  errorMessage = '';
  private routeSubscription: Subscription;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly api: UsersApiService
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe((params) => {
      this.userId = Number(params.get('id'));
      this.loadUser();
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  loadUser(): void {
    if (!this.userId || this.userId < 1) {
      this.loading = false;
      this.errorMessage = 'O identificador do usuário é inválido.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.user = null;
    this.api
      .getUser(this.userId)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (user) => (this.user = user),
        () => (this.errorMessage = 'Não foi possível carregar este usuário.')
      );
  }

  backToUsers(): void {
    this.router.navigate(['/users']);
  }

  openPosts(): void {
    this.router.navigate(['/users', this.userId, 'posts']);
  }
}
