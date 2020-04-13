import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loading$: Observable<boolean> = this.loadingSubject.asObservable();

  constructor() { }

  public setLoadingFor(observable: Observable<any>): Observable<any> {
    this.loadingSubject.next(true);
    observable.subscribe(() => this.loadingSubject.next(false));
    return null;
  }
}
