import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from '../user-list/user-list.component';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { UserAddComponent } from '../user-add/user-add.component';

const routes: Routes = [
  {
    path: '', 
    redirectTo:'user/list',
    pathMatch: 'full'
  },
  {
    path: 'user/list',
    component: UserListComponent
  },
  {
    path: 'user/detail/:id',
    component: UserDetailComponent
  },
  {
    path: 'user/add',
    component: UserAddComponent
  }
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
