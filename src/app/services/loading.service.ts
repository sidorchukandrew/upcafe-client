import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, concatMap, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loading$: Observable<boolean> = this.loadingSubject.asObservable();

  constructor() { }

  public showLoadingUntilComplete<T>(obs$: Observable<T>): Observable<T> {

    return of(null)
      .pipe(
        tap(() => this.toggleLoading()),
        concatMap(() => obs$),
        finalize(() => this.toggleLoading())
      );
  }

  public toggleLoading(): void {
    this.loadingSubject.next(!this.loadingSubject.value);
  }
}
