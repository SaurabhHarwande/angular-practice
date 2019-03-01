import { Injectable } from '@angular/core';
import { Hero } from './../../hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './../message/message.service';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';
  private log(message: string) {
    this.messageService.add("HeroService: ${message}");
  }
  private handleError<T> (operation:string = "operation", result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log("${operation} failed: ${error.message}");
      return of(result as T);
    }
  }
  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    return this.httpClient.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError('getHeroes', [])));
  }
  getHero(id: Number): Observable<Hero> {
    const heroUrl = "${getHeroes}/${id}";
    this.messageService.add('HeroService: fetched Hero by id');
    return this.httpClient.get<Hero>(heroUrl)
      .pipe(
        tap(_ => this.log('fetched hero id=${id}')),
        catchError(this.handleError<Hero>("getHero id=${id}"))
      );
  }

  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService) { }
}
