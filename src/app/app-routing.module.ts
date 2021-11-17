import { MediaListComponent } from './components/media-list/media-list.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllMediaListComponent } from './components/all-media-list/all-media-list.component';

const routes: Routes = [
  {
    path: 'playlists',
    component: AllMediaListComponent
  },
  {
    path: 'playlist/:playlistId',
    component: MediaListComponent
  },
  /*{
    path: 'playlist/public/:playlistId',
    component: Add Here Component For Public Playlists
  }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
