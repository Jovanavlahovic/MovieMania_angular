import { Genre } from './genre.model';

export class Movie{
        _id:number;
        name: string;
        director: string;
        description: string;
        genre: string;
        year: string;
        rating: string;
        duration: string;

        constructor(obj?:any){
            this._id = obj && obj._id || '';
            this.name = obj && obj.name || '';
            this.director = obj && obj.director || '';
            this.description = obj && obj.description || '';
            this.genre = obj && obj.genre || '';
            this.year = obj && obj.year || '';
            this.rating = obj && obj.rating || '';
            this.duration = obj && obj.duration || '';
        }
}

export class MovieList{
    count: number;
    results: Movie[];

    constructor(obj?:any){
        this.count = obj && obj.count || '';
        this.results = obj && obj.results.map(x => new Movie(x));
    }
}