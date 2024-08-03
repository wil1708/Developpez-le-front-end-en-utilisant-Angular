import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicResponse } from 'src/app/core/models/OlympicResponse';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$!: Observable<Olympic[]>;

  constructor(private olympicService: OlympicService) {
    //Object.assign(this, { olympics$: this.olympics$ })

  }

  ngOnInit(): void {

    this.olympics$ = this.olympicService.getOlympics();
    console.log(this.olympics$);
    // console.log(this.olympics$);
    // this.olympics$.subscribe((response: OlympicResponse) => {
    //   this.olympicsArray = response.olympics;
    //   console.log(this.olympicsArray);
    //   console.log(response.olympics);
    // });
  }

}
