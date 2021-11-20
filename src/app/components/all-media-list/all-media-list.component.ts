import { Playlist } from './../../models/playlist.models';
import { MediaService } from '../../service/media/media.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-all-media-list',
  templateUrl: './all-media-list.component.html',
  styleUrls: ['./all-media-list.component.css']
})
export class AllMediaListComponent implements OnInit {

  playlistList$!: Observable<Playlist[]>;

  constructor( 
    private router: Router,
    private mediaService: MediaService
    ) { }

  ngOnInit(): void {
    this.playlistList$ = this.mediaService.getPlaylistByUserEmail(JSON.parse(localStorage.getItem('profile')!).email);
  }

  removePlaylist(playlistId: number): void {
    this.mediaService.deletePlaylist(playlistId).subscribe();
    this.reloadPage();
  }

  addPlaylist(name: string): void {
    let playlist: Playlist = {
      id: 0,
      userId: 0,
      name: name,
      movies: []
    };
    this.mediaService.createPlaylist(playlist, JSON.parse(localStorage.getItem('profile')!).email).subscribe();
    this.reloadPage();
  }

  reloadPage(){
    location.reload();
  }

  goToOwnedList(id: number){
    this.router.navigate(['/playlist', id]);
  }
}
