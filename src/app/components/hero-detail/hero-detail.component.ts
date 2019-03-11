import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Hero } from './../../hero';
import { HeroService } from './../../services/hero/hero.service';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  counterValue$:Observable<Number>;
  
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private store:Store<{count: number}>) {

    this.counterValue$ = this.store.pipe(select('count'));
  }

  ngOnInit() {
    this.getHero();
  }

  getHero(): void {
    const id: number = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => {
        console.log(hero);
        this.hero = hero;
      });
  }

  save(){
    this.heroService.updateHero(this.hero);
  }
  
  goBack() {
    this.location.back();
  }

}
