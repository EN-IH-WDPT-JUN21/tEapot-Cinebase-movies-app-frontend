import { DataTransferService } from '../../services/data-transfer/data-transfer.service';
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

  playlistList: Playlist[] = [
      {
        id: 1,
        userId: 1,
        name: "Studio Ghibli",
        movies: [
          {
            imdbId: "tt0245429",
            title: "Spirited Away"
          },
          {
            imdbId: "tt0096283",
            title: "My Neighbour Totoro"
          },
          {
            imdbId: "tt0347149",
            title: "Howl's Moving Castle"
          }
        ]
      },
      {
        id: 2,
        userId: 1,
        name: "Leonardo DiCaprio",
        movies: [
          {
            imdbId: "tt1375666",
            title: "Inception"
          },
          {
            imdbId: "tt0407887",
            title: "The Departed"
          },
          {
            imdbId: "tt1130884",
            title: "Shutter Island"
          }
        ]
      }
    ];

  constructor( 
    private router: Router,
    private dataTransferService: DataTransferService
    /*private mediaService: MediaService*/
    ) { }

  ngOnInit(): void {
    this.updateList();
  }

  updateList() {
    /* this.mediaService.getMediaLists().subscribe(
      result => {
        this.playlistList = result
      }
    ) */
  }

  removePlaylist(playlistPosition: number): void {
    this.playlistList.slice(playlistPosition, 1);

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
    this.selectPlaylist(id);
    this.router.navigate(['/playlist/' + id]);
  }

  selectPlaylist(id: number) {
    let playlist = this.playlistList.find(p => p.id === id);
    this.dataTransferService.changePlaylist(playlist!);
  }

}
