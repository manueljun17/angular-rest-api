import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleCreateComponent } from './article-create/article-create.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { ArticleUpdateComponent } from './article-update/article-update.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_helpers/auth.guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'create-article', component: ArticleCreateComponent, canActivate: [AuthGuard] },
  { path: 'article-details/:id', component: ArticleDetailsComponent },
  { path: 'update-article/:id', component: ArticleUpdateComponent, canActivate: [AuthGuard] },
  { path: 'article-list', component: ArticleListComponent , canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
