import { MediaListComponent } from './media-list/media-list.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllMediaListComponent } from './all-media-list/all-media-list.component';

const routes: Routes = [
  {
    path: 'playlists/:userId',
    component: AllMediaListComponent
  },
  {
    path: 'playlist/:playlistId',
    component: MediaListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
