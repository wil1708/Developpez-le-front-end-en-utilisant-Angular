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

  participationsCount: number = 0;
  countriesCount: number = 0;

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
        name: olympic.country,
        value: olympic.participations.reduce((sum: number, p: Participation) => sum + p.medalsCount, 0)
      }))),
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.chartData = data;
    });

  }

  // onSelect(olympics$: Olympic): void {
  //   console.log('Item clicked', olympics$);
  // }

  onSelect(olympics$: Observable<Olympic>): void {
    olympics$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(olympic => {
      this.router.navigateByUrl(`home/${olympic.id}`);
    });
  }

  onActivate(olympics$: Olympic): void {
    console.log('Activate', olympics$);
  }

  onDeactivate(olympics$: Olympic): void {
    console.log('Deactivate', olympics$);
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
