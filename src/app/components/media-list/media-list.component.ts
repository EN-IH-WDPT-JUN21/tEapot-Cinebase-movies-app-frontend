import { CompleteMedia } from './../../models/complete-media.models';
import { Playlist } from '../../models/playlist.models';
import { DataTransferService } from '../../services/data-transfer/data-transfer.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from 'src/app/service/movie-service/movies.service';

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

  movieList: CompleteMedia[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataTransferService: DataTransferService,
  ) { }

  ngOnInit(): void {
    const playlistId: number = this.activatedRoute.snapshot.params['playlistId'];
    this.dataTransferService.currentPlaylist.subscribe(playlist => this.playlist = playlist);
    for (let index = 0; index < this.playlist.movies.length; index++) {
      let media = this.movieList.find(m => m.imdbId === this.playlist.movies[index].imdbId);
      if (media === null) {
        this.movieList.push(this.getCompleteMediaByImdbId(this.playlist.movies[index].imdbId));
      }
    }
    console.log(this.playlist);
  }

  getCompleteMediaByImdbId(imdbId: string): CompleteMedia {
    /*let movie: CompleteMedia;
    this.movieService.getMovieById(imdbId).subscribe(
      result => {
        movie = {
          imdbId: result.imdbId,
          title: result.title,
          fullTitle: result.fullTitle,
          type: result.type,
          year: result.year,
          image: result.image,
          releaseDate: result.releaseDate,
          runtimeMins: result.runtimeMins,
          runtimeStr: result.runtimeStr,
          plot: result.plot,
          awards: result.awards,
          directors: result.directors,
          writers: result.writers,
          stars: result.stars,
          genres: result.genres,
          imdbRating: result.imDbRating,
          tvSeriesInfo: {
            yearEnd: result.tvSeriesInfo.yearEnd,
            creators: result.tvSeriesInfo.creators,
            seasons: result.tvSeriesInfo.seasons
          }
        }
      }
    )*/
    let media = this.playlist.movies.find(m => m.imdbId === imdbId);
    if (media == null) {
      media = {
        imdbId: "a1",
        title: "Some title"
      }
    }
    return {
      imdbId: imdbId,
      title: media.title,
      fullTitle: "fullTitle",
      type: "type",
      year: 0,
      image: "https://saopaulo.startupsafari.com/wp-content/uploads/sites/6/2018/10/logo_ironhack_blue.png",
      releaseDate: new Date(),
      runtimeMins: "runtimeMins",
      runtimeStr: "runtimeStr",
      plot: "plot",
      awards: "awards",
      directors: "directors",
      writers: "writers",
      stars: "stars",
      genres: "genres",
      imdbRating: "imDbRating",
      tvSeriesInfo: {
        yearEnd: 0,
        creators: "creators",
        seasons: []
      }
    };
  }

  removeMedia(mediaPosition: number): void {
    this.playlist.movies.splice(mediaPosition, 1);
    this.movieList.splice(mediaPosition, 1);
  }

  addMedia(movie: CompleteMedia) {
    this.playlist.movies.push(
      {
        imdbId: movie.imdbId,
        title: movie.title
      }
    )

    this.movieList.push(movie);
  }
}
