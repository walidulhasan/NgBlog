import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthenticatedGuard } from '../is-authenticated.guard';
import { AuthorsComponent } from './authors/authors.component';
import { CategoriesComponent } from './categories/categories.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { DologinComponent } from './dologin/dologin.component';
import { HomeComponent } from './home/home.component';
import { ListPostComponent } from './list-post/list-post.component';
import { UpdatePostComponent } from './update-post/update-post.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path : 'blog/list',
    component : ListPostComponent,
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path : 'blog/create',
    component : CreatePostComponent,
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path : 'blog/edit/:id',
    component : UpdatePostComponent,
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path : 'authors',
    component : AuthorsComponent,
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path : 'cats',
    component : CategoriesComponent,
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path : 'login',
    component : DologinComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
