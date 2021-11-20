
import { HomeComponent } from './home/home.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';

import { AuthGuard } from '@auth0/auth0-angular';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AllMediaListComponent } from './components/all-media-list/all-media-list.component';
import { MediaListComponent } from './components/media-list/media-list.component';

const routes: Routes = [

  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'movies',
    component: MovieListComponent,
   },
  {
    path: 'playlists',
    component: AllMediaListComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'playlist/:playlistId',
    component: MediaListComponent,
    canActivate: [AuthGuard],
  },
  {

    path: '**',
    component: PageNotFoundComponent,
   }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}