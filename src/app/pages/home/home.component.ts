import { Component, HostListener, OnInit, TemplateRef } from '@angular/core';
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
  olympics$!: Observable<Olympic[]>;

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

  //Objet itérable utilisé dans la pie charts
  chartData: { name: string, value: number }[] = [];

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {

    this.updateViewSize();

    //code initialisant l'observable olymics$
    this.olympics$ = this.olympicService.getOlympics();
    
    //code initialisant chartData
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

  // trackById(index: number, item: Olympic): number {
  //   return item.id;
  // }

  updateViewSize(): void {
    const width = window.innerWidth * 0.9; // Adjust the multiplier as needed
    const height = window.innerHeight * 0.5; // Adjust the multiplier as needed
    this.view = [width, height];
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.updateViewSize();
  }



}
