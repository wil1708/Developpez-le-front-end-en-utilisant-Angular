import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss'
})
export class CountryComponent {

  olympic$!: Observable<Olympic>;

  // objets pour afficher les données de ngx-charts-pie-chart
  entriesCount: number = 0;
  medalsCount: number = 0;
  athletesCount: number = 0;
  chartData: { name: string, series: { name: string, value: number }[] }[] = [];


  // objet de destruction des observables pour éviter les fuites mémoires
  private destroy$ = new Subject<void>();

  // line chart options utilisées en par ngx-charts-pie-chart
  view: [number, number] = [700, 300];
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Years of participation';
  yAxisLabel: string = 'Medals';
  timeline: boolean = true;
  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#956065', '#B8CBE7', '#89A1DB', '#793d52', '#9780A1']
  };

  constructor(private olympicService: OlympicService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    //responsive
    this.updateViewSize();

    // methode pour récupérer le paramètre nom du country dans l'url de la route du composant countryComponent
    // et hydrater l'objet chartData pour remplir les donnée de la line chart
    this.getOlympic();

    // entriesCount : objet iterable sur le nombre de participations aux JOs
    this.olympic$.pipe(
      map(olympic => olympic ? olympic.participations.length : 0),
      takeUntil(this.destroy$)
    ).subscribe(count => {
      this.entriesCount = count;
    });

    // medalsCount = objet iterable sur le nombre de pays
    this.olympic$.pipe(
      map(olympic => ({
        value: olympic.participations.reduce((sum: number, p: Participation) => sum + p.medalsCount, 0)
      })),
      takeUntil(this.destroy$)
    ).subscribe(count => {
      this.medalsCount = count.value;
    });

    // athletesCount = objet iterable sur le nombre de pays
    this.olympic$.pipe(
      map(olympic => ({
        value: olympic.participations.reduce((sum: number, p: Participation) => sum + p.athleteCount, 0)
      })),
      takeUntil(this.destroy$)
    ).subscribe(count => {
      this.athletesCount = count.value;
    });
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

  private getOlympic() {
    const olympicCountry = this.route.snapshot.params['country'];
    this.olympic$ = this.olympicService.getOlympicByCountry(olympicCountry);
    this.olympic$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (olympic) => {
        this.chartData = [{
          name: olympic.country,
          series: olympic.participations.map(participation => ({
            name: participation.year.toString(),
            value: participation.medalsCount
          }))
        }];
        console.log('Chart Data:', this.chartData);
      },
      error: (err) => {
        console.error('Error loading Olympic:', err);
      }
    });
  }

  // méthode de la line chart (inutilisée ici)
  onSelect(olympic$: Observable<Olympic>): void {
    console.log('Item clicked', olympic$);
  }

  // méthode de la line chart (inutilisée ici)
  onActivate(olympic$: Observable<Olympic>): void {
    console.log('Activate', olympic$);
  }

  // méthode de la line chart (inutilisée ici)
  onDeactivate(olympic$: Observable<Olympic>): void {
    console.log('Deactivate', olympic$);
  }

  // methode utilisée pour le bouton de retour à l'accueil : homeComponent
  navigateToHome(): void {
    this.router.navigateByUrl('');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }




}


