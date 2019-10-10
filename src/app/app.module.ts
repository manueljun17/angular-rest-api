import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ArticleCreateComponent } from './article-create/article-create.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { ArticleUpdateComponent } from './article-update/article-update.component';
import { ArticleListComponent } from './article-list/article-list.component';

import { JwtInterceptor } from './_helpers/jwt.interceptor.service';
import { ErrorInterceptor } from './_helpers/error.interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AlertComponent } from './_components/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticleCreateComponent,
    ArticleDetailsComponent,
    ArticleUpdateComponent,
    ArticleListComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
