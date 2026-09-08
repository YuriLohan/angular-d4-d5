import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { Post } from '../../../../core/models/user.model';
import { UsersApiService } from '../../../../core/services/users-api.service';

@Component({
  selector: 'app-user-posts-page',
  templateUrl: './user-posts-page.component.html',
  styleUrls: ['./user-posts-page.component.scss'],
})
export class UserPostsPageComponent implements OnInit, OnDestroy {
  userId = 0;
  posts: Post[] = [];
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
      this.loadPosts();
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  loadPosts(): void {
    if (!this.userId || this.userId < 1) {
      this.loading = false;
      this.errorMessage = 'O identificador do usuário é inválido.';
      return;
    }
    this.loading = true;
    this.errorMessage = '';
    this.posts = [];
    this.api
      .getUserPosts(this.userId)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (posts) => (this.posts = posts),
        () => (this.errorMessage = 'Não foi possível carregar as publicações deste usuário.')
      );
  }

  backToUser(): void {
    this.router.navigate(['/users', this.userId]);
  }

  trackByPostId(_: number, post: Post): number {
    return post.id;
  }
}
