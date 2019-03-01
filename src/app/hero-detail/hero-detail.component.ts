import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Hero } from '../hero';
import { HeroService } from '../services/hero/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location) {}

  ngOnInit() {
    this.getHero();
  }

  getHero(): void {
    const id: Number = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id);
  }

  save(){
    this.heroService.updateHero(this.hero);
  }
  
  goBack() {
    this.location.back();
  }

}
