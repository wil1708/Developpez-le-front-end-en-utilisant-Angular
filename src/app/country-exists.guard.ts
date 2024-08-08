import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Injectable({
  providedIn: 'root'
})
export class CountryExistsGuard implements CanActivate {

  constructor(private olympicService: OlympicService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const country = route.paramMap.get('country');
    console.log('Country parameter:', country); // Log the country parameter

    return this.olympicService.getOlympicByCountry(country!).pipe(
      map(olympic => {
        console.log('Olympic data:', olympic); // Log the olympic data
        return true;
      }),
      catchError((error) => {
        if (error.message === 'Olympic not found') {
          console.warn('Country not found, redirecting to /not-found'); // Log a warning instead of an error
        } else {
          console.error('Error in guard:', error); // Log any other errors
        }
        this.router.navigate(['/not-found']);
        return of(false);
      })
    );
  }
}
