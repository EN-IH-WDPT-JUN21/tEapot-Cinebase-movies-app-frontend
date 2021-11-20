import { Playlist } from '../../models/playlist.models';
import { MediaService } from '../../services/media/media.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-media-list',
  templateUrl: './all-media-list.component.html',
  styleUrls: ['./all-media-list.component.css']
})
export class AllMediaListComponent implements OnInit {

  playlistList: Playlist[] = [];

  constructor( 
    private router: Router,
    private mediaService: MediaService
    ) { }

  ngOnInit(): void {
    this.updateList();
  }

  updateList() {
    this.mediaService.getPlaylistByUserEmail(JSON.parse(localStorage.getItem('profile')!).email).subscribe(
      result => {
        this.playlistList = result
      }
    ) 
  }

  removePlaylist(playlistPosition: number): void {
    this.mediaService.deletePlaylist(this.playlistList[playlistPosition].id);
    //this.playlistList.slice(playlistPosition, 1);
  }

  addPlaylist(userId: number, name: string): void {
    let playlist: Playlist = {
      id: 0,
      userId: userId,
      name: name,
      movies: []
    };
    /*this.mediaService.createPlaylist(playlist);*/

    this.updateList();
  }

  goToOwnedList(id: number){
    this.router.navigate(['/playlist', id]);
  }
}
