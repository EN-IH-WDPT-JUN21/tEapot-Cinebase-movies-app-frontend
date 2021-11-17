import { Playlist } from './../models/playlist.models';
import { DataTransferService } from './../data-transfer.service';
import { SimplifiedMedia } from './../models/simplified-media.models';
import { CompleteMedia } from './../models/complete-media.models';

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.css']
})
export class MediaListComponent implements OnInit {

  playlist: Playlist = {
    id: 0,
    userId: 0,
    name: "",
    movies: []
  };

  completeMediaList: CompleteMedia[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dataTransferService: DataTransferService
  ) { }

  ngOnInit(): void {
    const playlistId: number = this.activatedRoute.snapshot.params['playlistId'];
    this.dataTransferService.currentPlaylist.subscribe(playlist => this.playlist = playlist);
    for (let index = 0; index < this.playlist.movies.length; index++) {
      let media = this.completeMediaList.find(m => m.imdbId === this.playlist.movies[index].imdbId);
      if (media === null) {
        
      }
      
    }
  }

  removeMedia(mediaPosition: number): void {
    this.playlist.movies.splice(mediaPosition, 1);
    this.completeMediaList.splice(mediaPosition, 1);
  }

  addMedia(media: CompleteMedia) {
    this.playlist.movies.push(
      {
        imdbId: media["imdbId"],
        title: media["title"]
      }
    )

    this.completeMediaList.push(media);
  }
}
