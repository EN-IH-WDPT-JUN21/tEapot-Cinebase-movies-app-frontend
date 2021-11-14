import { MediaListService } from './../media-list.service';
import { Component, OnInit } from '@angular/core';
import { Media } from '../models/media.models';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.css']
})
export class MediaListComponent implements OnInit {

  mediaList: Media[];

  constructor(private service: MediaListService) { }

  ngOnInit(): void {
    this.service.getMovieList().subscribe(
      result => {
        this.mediaList = result
      }
    )
  }

}
