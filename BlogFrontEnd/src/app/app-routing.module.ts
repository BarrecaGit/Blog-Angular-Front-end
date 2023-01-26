import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ListPostsComponent } from './components/list-posts/list-posts.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ManagePostsUIComponent } from './components/manage-posts-ui/manage-posts-ui.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { ViewPostComponent } from './components/view-post/view-post.component';
import { AuthG } from './services/auth-g.service';


const routes: Routes = [
  {
    path:'',
    component: HomePageComponent
  },
  {
    path:'PostList',
    component: ListPostsComponent
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
  },
  {
    path: 'EditPost/:postId', // needs auth
    component: EditPostComponent,
    canActivate:[AuthG]
  },
  {
    path: 'postDetails/:postId', // needs auth
    component: PostDetailsComponent,
    canActivate:[AuthG]
  },
  {
    path: 'viewPost/:postId', // needs auth
    component: ViewPostComponent
  },
  {
    path: 'ManagePosts/User/:userId', // needs auth
    component: ManagePostsUIComponent,
    canActivate:[AuthG]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
