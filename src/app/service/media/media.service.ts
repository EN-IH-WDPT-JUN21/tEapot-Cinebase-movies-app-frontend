import { Playlist } from '../../models/playlist.models';
import { SimplifiedMedia } from '../../models/simplified-media.models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private readonly baseUrl = 'http://localhost:8000/api/playlist'

  constructor(private http: HttpClient) { }

  getPlaylists(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(this.baseUrl);
  }

  getPlaylist(id: number): Observable<Playlist> {
    return this.http.get<Playlist>(`${this.baseUrl}/${id}`);
  }

  getPlaylistByUserEmail(email: string): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(`${this.baseUrl}?email=${email}`);
  }

  createPlaylist(playlist: Playlist, email: string): Observable<Playlist[]> {
    return this.http.post<Playlist[]>(`${this.baseUrl}/${email}`, playlist);
  }

  updatePlaylist(id: number, media: SimplifiedMedia): void {
    this.http.put<void>(`${this.baseUrl}/${id}`, media).subscribe();
  }

  deleteMovie(playlistId: number, imdbId: string): Observable<Playlist> {
    console.log("Requesting delete of playlist " + playlistId + " and media " + imdbId);
    console.log(`${this.baseUrl}?playlistId=${playlistId}&imdbId=${imdbId}`);
    return this.http.delete<Playlist>(`${this.baseUrl}?playlistId=${playlistId}&imdbId=${imdbId}`);
  }

  deletePlaylist(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
