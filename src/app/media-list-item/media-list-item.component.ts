import { CompleteMedia } from '../models/complete-media.models';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-media-list-item',
  templateUrl: './media-list-item.component.html',
  styleUrls: ['./media-list-item.component.css']
})
export class MediaListItemComponent implements OnInit {

  @Input()
  media!: CompleteMedia;

  @Output() mediaRemoved: EventEmitter<number> = new EventEmitter();

  @Output() mediaAdded: EventEmitter<number> = new EventEmitter();

  @Input() position!: number;


  constructor() { }

  ngOnInit(): void {
  }

  removeMedia(position: number): void {
    this.mediaRemoved.emit(position);
  }

  addMedia(position: number): void {
    this.mediaAdded.emit(position);
  }

}
