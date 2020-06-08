import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject, concat, noop } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VerseService {

  private versesSubject: BehaviorSubject<Array<string>> = new BehaviorSubject<Array<string>>(new Array<string>());
  public verses$: Observable<Array<string>> = this.versesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getWeekOfVerseImageUrls();
   }

  public getWeekOfVerseImageUrls(): void {
    const NUMBER_OF_DAYS_IN_YEAR: number = 366;

    let dayNumber: number = NUMBER_OF_DAYS_IN_YEAR - this.getTodaysDayNumber() + 1;

    let imageUrls: Array<string> = new Array<string>();

    let dayOne$: Observable<Promise<Response>> = this.getVerseByDayNumber(dayNumber)
      .pipe(
        tap(response => {
          response.then(response => {
            response.json().then(body => imageUrls.push(body.image.url))
          });
        })
      );

    let dayTwo$: Observable<Promise<Response>> = this.getVerseByDayNumber(dayNumber + 1)
      .pipe(
        tap(response => {
          response.then(response => {
            response.json().then(body => imageUrls.push(body.image.url))
          });
        })
      );

    let dayThree$: Observable<Promise<Response>> = this.getVerseByDayNumber(dayNumber + 2)
      .pipe(
        tap(response => {
          response.then(response => {
            response.json().then(body => imageUrls.push(body.image.url))
          });
        })
      );
    let dayFour$: Observable<Promise<Response>> = this.getVerseByDayNumber(dayNumber + 3)
      .pipe(
        tap(response => {
          response.then(response => {
            response.json().then(body => imageUrls.push(body.image.url))
          });
        })
      );
    let dayFive$: Observable<Promise<Response>> = this.getVerseByDayNumber(dayNumber + 4)
      .pipe(
        tap(response => {
          response.then(response => {
            response.json().then(body => imageUrls.push(body.image.url))
          });
        })
      );
    let daySix$: Observable<Promise<Response>> = this.getVerseByDayNumber(dayNumber + 5)
      .pipe(
        tap(response => {
          response.then(response => {
            response.json().then(body => imageUrls.push(body.image.url))
          });
        })
      );
    let daySeven$: Observable<Promise<Response>> = this.getVerseByDayNumber(dayNumber + 6)
      .pipe(
        tap(response => {
          response.then(response => {
            response.json().then(body => imageUrls.push(body.image.url))
          });
        })
      );
    let days$ = concat(dayOne$, dayTwo$, dayThree$, dayFour$, dayFive$, daySix$, daySeven$);

    days$.subscribe(noop, noop, () => this.versesSubject.next(imageUrls));

  }

  private getVerseByDayNumber(day: number): Observable<Promise<Response>> {
    return of(fetch("https://developers.youversionapi.com/1.0/verse_of_the_day/"
      + day + "?version_id=1",
      {
        headers:
        {
          'X-YouVersion-Developer-Token': 'ZSsQvHoiBjTuu_jTt9S55BfjWIg',
          'Accept-Language': 'en',
          'Accept': 'application/json'
        }
      }));
  }

  private getTodaysDayNumber(): number {
    var now: any = new Date();
    var start: any = new Date(now.getFullYear(), 0, 0);
    var diff: any = now - start;
    var oneDay = 1000 * 60 * 60 * 24;
    var day: number = Math.floor(diff / oneDay);

    return day;
  }
}
