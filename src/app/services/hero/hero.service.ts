import { Injectable } from '@angular/core';
import { Hero } from './../../hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './../message/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  private handleError<T> (operation:string = "operation", result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    return this.httpClient.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('Fetched heroes')),
        catchError(this.handleError('getHeroes', [])));
  }
  getHero(id: number): Observable<Hero> {
    const heroUrl = `${this.heroesUrl}/${id}`;
    console.log(heroUrl);
    this.messageService.add('HeroService: fetched Hero by id');
    return this.httpClient.get<Hero>(heroUrl)
      .pipe(
        tap(_ => this.log(`Fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }
  updateHero(hero: Hero) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.httpClient.put(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap(_ => this.log(`Updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      )
  }

  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService) { }
}
