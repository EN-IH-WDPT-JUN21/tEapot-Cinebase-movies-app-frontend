import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MovieItemComponent } from './components/movie-item/movie-item.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { AuthModule } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { SignupButtonComponent } from './components/signup-button/signup-button.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { AuthenticationButtonComponent } from './components/authentication-button/authentication-button.component';
import { AuthNavComponent } from './components/auth-nav/auth-nav.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MediaListComponent } from './components/media-list/media-list.component';
import { MediaListItemComponent } from './components/media-list-item/media-list-item.component';
import { AllMediaListComponent } from './components/all-media-list/all-media-list.component';
import { AddPlaylistModal } from './modal/add-playlist.modal';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MovieItemComponent,
    MovieListComponent,
    MovieDetailComponent,
    LoginButtonComponent,
    SignupButtonComponent,
    LogoutButtonComponent,
    AuthenticationButtonComponent,
    AuthNavComponent,
    NavBarComponent,
    MainNavComponent,
    LoadingComponent,
    ProfileComponent,
    HomeComponent,
    PageNotFoundComponent,
    MediaListComponent,
    MediaListItemComponent,
    AllMediaListComponent,
    AddPlaylistModal
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule.forRoot({
      ...env.auth,
      httpInterceptor: {
        allowedList: [`${env.dev.serverUrl}/api*`],
      },
    }),
    NgbModule,
  ],
  entryComponents: [
    MovieDetailComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
    HttpClientModule

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
