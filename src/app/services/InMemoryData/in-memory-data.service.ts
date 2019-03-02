import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './../../hero';
@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {
  createDb() {
    const heroes: Hero[] = [
      { id: 1, name: "Admiral Kunka" },
      { id: 2, name: "Bounty Hunter" },
      { id: 3, name: "Windrunner" },
      { id: 4, name: "Earth Shaker" },
      { id: 5, name: "Juggernaut" },
      { id: 6, name: "Lina" },
      { id: 7, name: "Earth Spirit" },
      { id: 8, name: "Ember Spirit" },
      { id: 9, name: "Storm Spirit" }
    ];
    return { heroes };
  }
  genId(heroes: Hero[]): Number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
  constructor() { }
}
