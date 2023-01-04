import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { AuthG } from './services/auth-g.service';

const routes: Routes = [
  {
    path:'',
    component: HomePageComponent
  },
  {
    path:'Login',
    component: LoginFormComponent
  },
  {
    path:'Register',
    component: RegisterFormComponent
  },
  {
    path:'CreatePost', // needs auth
    component: CreatePostComponent,
    canActivate:[AuthG]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
