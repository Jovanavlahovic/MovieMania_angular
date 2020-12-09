import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Genre } from '../movies/model/genre.model';

import { Movie, MovieList } from '../movies/model/movie.model';

const baseUrl = 'http://localhost:3000/api/movies';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getMovies(params?):Observable<MovieList>{
     let queryParams = {};

    if(params){
      queryParams = { params: new HttpParams()
        .set('page', params.page && params.page.toString() || '1')
        .set('pageSize', params.pageSize && params.pageSize.toString() || '1')
        .set('sort', params.sort && params.sort.toString() || '')
        .set('sortDirection', params.sortDirection && params.sortDirection.toString() || '')
      }
    }
    return this.http.get(baseUrl, queryParams).pipe(map(x => new MovieList(x)))
  }

  getMovie(id:number): Observable<Movie>{
    return this.http.get(`${baseUrl}/${id}`).pipe(map(x => new Movie(x)));
  }

  addMovie(newMovie: Movie): Observable<Movie>{
    return this.http.post(baseUrl, newMovie).pipe(map(x => new Movie(x)))
  }

  updateMovie(updatedMovie: Movie): Observable<Movie>{
    return this.http.put(`${baseUrl}/${updatedMovie._id}`, updatedMovie).pipe(map(x => new Movie(x)));
  }

  getGenres(): Observable<Genre[]>{
    return this.http.get('http://localhost:3000/api/genres').pipe(map(x => x as Array<Genre>))
  }

  addGenre(genre: Genre): Observable<Genre>{
    return this.http.post('http://localhost:3000/api/genres', genre).pipe(map(x => new Genre(genre)))
  }
}
