import { Component, OnInit } from '@angular/core';
import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import { map, Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$!: Observable<Olympic[]>;

  view: [number, number] = [700, 400];
  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  gradient: boolean = true;
  showLegend: boolean = true;
  legendPosition: LegendPosition = LegendPosition.Below;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  public chartData: { name: string, value: number }[] = [];

  constructor(private olympicService: OlympicService) {
    Object.assign(this, { olympics$: this.olympics$ });
  }

  ngOnInit(): void {

    this.olympics$ = this.olympicService.getOlympics();
    console.log(this.olympics$);
    
    this.olympics$.pipe(
      map(olympics => olympics.map(olympic => ({
        name: olympic.country,
        value: olympic.participations.reduce((sum: number, p: Participation) => sum + p.medalsCount, 0)
      })))
    ).subscribe(data => {
      this.chartData = data;
      console.log('Chart Data:', this.chartData);
    });
  }

  onSelect(olympics$: Olympic): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(olympics$)));
  }

  onActivate(olympics$: Olympic): void {
    console.log('Activate', JSON.parse(JSON.stringify(olympics$)));
  }

  onDeactivate(olympics$: Olympic): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(olympics$)));
  }

  trackById(index: number, item: Olympic): number {
    return item.id;
  }

}
