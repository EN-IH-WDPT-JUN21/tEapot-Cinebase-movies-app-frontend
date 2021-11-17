import { MovieModalComponent } from './components/movie-modal/movie-modal.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { DatabaseApiComponent } from './pages/database-api/database-api.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';


import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [

  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app-database-api',
    component: DatabaseApiComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'movies',
    component: MovieListComponent,
  },
  {
    path: 'movies/:movieId',
    component: MovieModalComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}