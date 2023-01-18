import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlogCardComponent } from './components/blog-card/blog-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MatCardModule } from '@angular/material/card'; 
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { JwtModule, JwtHelperService  } from "@auth0/angular-jwt";
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { ManagePostsUIComponent } from './components/manage-posts-ui/manage-posts-ui.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    BlogCardComponent,
    NavbarComponent,
    HomePageComponent,
    LoginFormComponent,
    FooterComponent,
    RegisterFormComponent,
    CreatePostComponent,
    EditPostComponent,
    ManagePostsUIComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSnackBarModule,
    JwtModule,
    MatInputModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
