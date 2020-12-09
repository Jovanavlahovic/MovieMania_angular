import { Component, Input, OnInit } from '@angular/core';
import { MovieService } from 'src/app/service/movie.service';
import { Movie, MovieList } from '../model/movie.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
@Input() movies: Movie[];

  constructor(private service: MovieService) { }

  ngOnInit(): void {
    
  }



}
