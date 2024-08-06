import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { map, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  olympics$!: Observable<Olympic[]>;

  // objets pour afficher les données de count JOs et countries
  participationsCount: number = 0;
  countriesCount: number = 0;

  // pie chart options utilisées en html par 
  view: [number, number] = [700, 400];
  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#956065', '#B8CBE7', '#89A1DB', '#793d52', '#9780A1']
  };
  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  // objet pour remplir les données de la pie chart
  chartData: { name: string, value: number }[] = [];

  private destroy$ = new Subject<void>();

  constructor(private olympicService: OlympicService, private router: Router) { }

  ngOnInit(): void {
    this.updateViewSize();

    this.olympics$ = this.olympicService.getOlympics();

    // participationsCount : objet iterable sur le nombre de participations aux JOs
    this.olympics$.pipe(
      map(olympics => olympics.length > 0 ? olympics[0].participations.length : 0),
      takeUntil(this.destroy$)
    ).subscribe(count => {
      this.participationsCount = count;
    });

    // countriesCount = objet iterable sur le nombre de pays
    this.olympics$.pipe(
      map(olympics => olympics.length > 0 ? olympics.length : 0),
      takeUntil(this.destroy$)
    ).subscribe(count => {
      this.countriesCount = count;
    });

    // chartData : objet iterable pour remplir les données de la pie chart
    this.olympics$.pipe(
      map(olympics => olympics.map(olympic => ({
        id: olympic.id,
        name: olympic.country,
        value: olympic.participations.reduce((sum: number, p: Participation) => sum + p.medalsCount, 0)
      }))),
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.chartData = data;
    });

  }

  //method qui redirige vers le composant countryComponent via url
  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    let countryName = data.name;
    countryName = countryName.trim();
    console.log(countryName)
    this.router.navigate([`/country/${countryName}`]);
  }
  
  //methode activation pop up médaille au hover sur les pays
  onActivate(data: any): void {
    console.log('Activate', data);
  }

  //methode désactivation pop up médaille au hover sur les pays
  onDeactivate(data: any): void {
    console.log('Deactivate', data);
  }

  // methode utilisée pour la partie responsive de la page
  updateViewSize(): void {
    const width = window.innerWidth * 0.9;
    const height = window.innerHeight * 0.5;
    this.view = [width, height];
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent): void {
    this.updateViewSize();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  
}
