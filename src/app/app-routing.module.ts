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
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}