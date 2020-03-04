import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ResponsiveService {


  private breakpoints = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
  };

  private isMobile: boolean = true;

  constructor() { }
}
