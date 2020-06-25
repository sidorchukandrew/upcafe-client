import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  private isPhoneSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private isTabletSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private isDesktopSubject: BehaviorSubject<boolean> = new BehaviorSubject(true);

  public isPhone$: Observable<boolean> = this.isPhoneSubject.asObservable();
  public isTablet$: Observable<boolean> = this.isTabletSubject.asObservable();
  public isDesktop$: Observable<boolean> = this.isDesktopSubject.asObservable();

  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      if (result.matches) {
        this.isPhoneSubject.next(true);
        this.isTabletSubject.next(false);
        this.isDesktopSubject.next(false);
      }
    });

    breakpointObserver.observe([Breakpoints.Tablet]).subscribe(result => {
      if (result.matches) {
        this.isPhoneSubject.next(false);
        this.isTabletSubject.next(true);
        this.isDesktopSubject.next(false);
      }
    });

    breakpointObserver.observe([Breakpoints.Medium]).subscribe(result => {
      if (result.matches) {
        this.isPhoneSubject.next(false);
        this.isTabletSubject.next(false);
        this.isDesktopSubject.next(true);
      }
    });
  }
}
