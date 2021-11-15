import { SimplifiedMedia } from './../models/simplified-media.models';
import { CompleteMedia } from './../models/complete-media.models';

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MediaService } from '../media.service';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.css']
})
export class MediaListComponent implements OnInit {

  @Input()
  mediaList!: SimplifiedMedia[];
 
  @Output() playlistRemoved: EventEmitter<number> = new EventEmitter();

  @Output() playlistAdded: EventEmitter<number> = new EventEmitter();

  @Input()
  playlistPosition!: number;

  completeMediaList: CompleteMedia[] = [];

  constructor(private service: MediaService) { }

  ngOnInit(): void {

  }

  removePlaylist(playlistPosition: number): void {
    this.playlistRemoved.emit(playlistPosition);
  }

  addPlaylist(playlistPosition: number): void {
    this.playlistAdded.emit(playlistPosition);
  }

  removeMedia(mediaPosition: number): void {
    this.mediaList.splice(mediaPosition, 1);
    this.completeMediaList.splice(mediaPosition, 1);
  }

  addMedia(media: CompleteMedia) {
    this.mediaList.push(
      {
        imdbId: media["imdbId"],
        title: media["title"]
      }
    )

    this.completeMediaList.push(media);
  }
}
