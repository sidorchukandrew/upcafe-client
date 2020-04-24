import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";

export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(retry(1), catchError(this.displayError));
  }

  private displayError(response: HttpErrorResponse) {
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
