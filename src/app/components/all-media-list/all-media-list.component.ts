import { Playlist } from '../../models/playlist.models';
import { MediaService } from '../../service/media/media.service';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-media-list',
  templateUrl: './all-media-list.component.html',
  styleUrls: ['./all-media-list.component.css']
})
export class AllMediaListComponent implements OnInit, AfterViewInit {

  playlistList: Playlist[] = [];

  constructor( 
    private router: Router,
    private mediaService: MediaService,
    private elementRef: ElementRef
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
    this.mediaService.deletePlaylist(this.playlistList[playlistPosition].id).subscribe(
      result => this.playlistList = result
    );
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

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
        .body.style.backgroundImage = 'url("assets/img/screen_wide.png")';
}
}
