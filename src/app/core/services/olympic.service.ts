import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new Subject<Olympic[]>();

  constructor(private http: HttpClient) {}

  loadInitialData() {
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

  getOlympic(id: number): Observable<Olympic | undefined> {
    return this.getOlympics().pipe(
      map((olympics) => olympics.find((olympic) => olympic.id === id))
    );
  }
}
