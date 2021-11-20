import { MoviesService } from 'src/app/service/movie-service/movies.service';
import { CompleteMedia } from './../../models/complete-media.models';
import { SimplifiedMedia } from './../../models/simplified-media.models';
import { Component, Input, OnInit, Output, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-media-list-item',
  templateUrl: './media-list-item.component.html',
  styleUrls: ['./media-list-item.component.css']
})
export class MediaListItemComponent implements OnInit, AfterViewInit {

  @Input()
  simpleMedia!: SimplifiedMedia;

  media$!: Observable<CompleteMedia>

  @Output() mediaRemoved: EventEmitter<number> = new EventEmitter();

  @Input()
  position!: number;

  isLoaded: boolean = false;


  constructor(private movieService: MoviesService, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.getCompleteMediaByImdbId(this.simpleMedia.imdbId);
  }

  getCompleteMediaByImdbId(imdbId: string): void {
    this.media$ = this.movieService.getMovieById(imdbId);
  }

  removeMedia(position: number): void {
    this.mediaRemoved.emit(position);
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
        .body.style.backgroundImage = 'url("assets/img/screen_wide.png")';
}

}
