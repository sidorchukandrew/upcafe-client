import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { Injectable } from '@angular/core';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(this.displayError));
  }

  private displayError(response: HttpErrorResponse) {
    console.log(response);
    let errorMessage: string = "";

    if (response.error instanceof ErrorEvent) {
      errorMessage = "Client error: " + response.error.error;
    } else {
      errorMessage = "Server error: " + response.error.error;
    }

    console.log(errorMessage);
    return throwError(response.error);
  }
}
