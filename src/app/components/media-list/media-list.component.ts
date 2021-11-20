import { MediaService } from '../../service/media/media.service';
import { CompleteMedia, iCompleteMedia } from './../../models/complete-media.models';
import { Playlist } from '../../models/playlist.models';

import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.css']
})
export class MediaListComponent implements OnInit, AfterViewInit {

  playlist!: Playlist;

  constructor(
    private activatedRoute: ActivatedRoute,
    private mediaService: MediaService,
    private router: Router,
    private elementRef: ElementRef
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

  list(){
    this.router.navigate(['playlists']);
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
        .body.style.backgroundImage = 'url("assets/img/screen_wide.png")';
}
}
