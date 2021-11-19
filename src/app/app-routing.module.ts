
import { HomeComponent } from './home/home.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { DatabaseApiComponent } from './pages/database-api/database-api.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';


import { AuthGuard } from '@auth0/auth0-angular';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

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
    path: 'app-database-api',
    component: DatabaseApiComponent,
    canActivate: [AuthGuard],
  },

  
  {
    path: 'movies',
    component: MovieListComponent,
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