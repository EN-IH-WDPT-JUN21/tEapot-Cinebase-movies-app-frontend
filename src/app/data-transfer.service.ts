import { Playlist } from './models/playlist.models';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  private playlist = new BehaviorSubject<Playlist>(
    {
      id: 0,
      userId: 0,
      name: "",
      movies: []
    }
  )

  currentPlaylist = this.playlist.asObservable();

  constructor() { }

  changePlaylist(playlist: Playlist) {
    this.playlist.next(playlist);
  }
}
