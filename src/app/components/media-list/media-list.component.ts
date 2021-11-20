import { MediaService } from '../../service/media/media.service';
import { CompleteMedia, iCompleteMedia } from './../../models/complete-media.models';
import { Playlist } from '../../models/playlist.models';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.css']
})
export class MediaListComponent implements OnInit {

  playlist!: Playlist;

  constructor(
    private activatedRoute: ActivatedRoute,
    private mediaService: MediaService
  ) { }

  ngOnInit(): void {
    const playlistId: number = this.activatedRoute.snapshot.params['playlistId'];
    this.mediaService.getPlaylist(playlistId).subscribe(result => {
      this.playlist = result
    });
  }

  removeMedia(mediaPosition: number): void {
    this.mediaService.deleteMovie(this.playlist.id, this.playlist.movies[mediaPosition].imdbId).subscribe(
      result => this.playlist = result
    );
    console.log(mediaPosition);
  }
}
