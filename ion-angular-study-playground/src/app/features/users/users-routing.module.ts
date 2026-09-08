import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserDetailPageComponent } from './pages/user-detail-page/user-detail-page.component';
import { UserPostsPageComponent } from './pages/user-posts-page/user-posts-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';

const routes: Routes = [
  { path: '', component: UsersPageComponent },
  { path: ':id/posts', component: UserPostsPageComponent },
  { path: ':id', component: UserDetailPageComponent },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class UsersRoutingModule {}
