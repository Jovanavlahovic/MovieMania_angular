
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/service/movie.service';
import { Genre } from '../model/genre.model';
import { Movie } from '../model/movie.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
newMovie: Movie;
movieId: number;
formValidator: FormGroup;
genres: Genre[] = [];
showMore: boolean = false;
newGenre: Genre;
movieGenre: string;

  constructor(private route: ActivatedRoute, private service: MovieService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.newMovie = new Movie();
    this.movieId = this.route.snapshot.params['id'];
    this.generateFormValidator();
    

    if(this.movieId){
      this.service.getMovie(this.movieId).subscribe(x => {
        this.newMovie = x;
        this.formValidator.patchValue(this.newMovie);
      })
    }
    this.getGenres();
  }


  generateFormValidator():void{
    this.formValidator = this.fb.group({
      'name': ['', Validators.required],
      'year': ['', [Validators.required, Validators.min(1000)]],
      'description': ['', [Validators.required, Validators.minLength(30), Validators.maxLength(230)]],
      'rating': [''],
      'duration': [''],
      'director': [''],
      'genre': ['']
    })
  }

  getGenres():void{
    this.service.getGenres().subscribe(x => {
    this.genres = x;
    console.log(this.genres)
    });
  }

  onSubmit():void{
    this.newMovie.genre = this.formValidator.get('genre').value.name;

    if(this.movieId){
      this.newMovie._id = this.movieId;
      this.service.updateMovie(this.newMovie).subscribe(x=> {
        this.newMovie = x;
        console.log(this.newMovie)
      })
    } else{
      this.service.addMovie(this.newMovie).subscribe(x => {
        this.newMovie = x;
        console.log(this.newMovie);
      })
    }
  }

  showGenreForm():void{
    this.showMore = !this.showMore;
    this.newGenre = new Genre();
  }

  addGenre():void{
    this.service.addGenre(this.newGenre).subscribe(x => {
      this.newGenre = x;
      this.getGenres();})
  }
}
