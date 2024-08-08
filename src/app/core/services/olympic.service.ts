import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);

  constructor(private http: HttpClient) {}

  loadInitialData(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error) => {
        // TODO: improve error handling
        console.error('Erreur de chargement des données', error);
        // can be useful to end loading state and let the user know something went wrong
        // this.olympics$.next({ olympics: [],  error: true, message: 'Erreur de chargement des données' });
        return throwError(() => new Error('Erreur de chargement des données'));
      })
    );
  }

  getOlympics(): Observable<Olympic[]> {
    return this.olympics$.asObservable();
  }

  getOlympic(id: number): Observable<Olympic> {
    return this.getOlympics().pipe(
      map((olympics) => {
        const olympic = olympics.find((olympic) => olympic.id === id);
        if (!olympic) {
          throw new Error('Olympic not found');
        }
        return olympic;
      })
    );
  }

  getOlympicByCountry(country: string): Observable<Olympic> {
    return this.getOlympics().pipe(
      map((olympics) => {
        const olympic = olympics.find((olympic) => olympic.country.toLowerCase() === country.toLowerCase());
        if (!olympic) {
          throw new Error('Olympic not found');
        }
        return olympic;
      }),
      catchError((error) => {
        console.error('Error loading Olympic:', error);
        return throwError(() => new Error('Olympic not found'));
      })
    );
  }
  
}
