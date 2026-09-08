import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
//import { IonModule } from '@brisanet/ion';

import { UserFormModalComponent } from './components/user-form-modal/user-form-modal.component';
import { UserDetailPageComponent } from './pages/user-detail-page/user-detail-page.component';
import { UserPostsPageComponent } from './pages/user-posts-page/user-posts-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [
    UsersPageComponent,
    UserDetailPageComponent,
    UserPostsPageComponent,
    UserFormModalComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, UsersRoutingModule],
  entryComponents: [UserFormModalComponent],
})
export class UsersModule {}
