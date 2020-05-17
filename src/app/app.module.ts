import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./routing/app-routing.module";
import { AppComponent } from "./app-component/app.component";

import { GoogleLoginProvider } from "angularx-social-login";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import {
  MatRippleModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatDialogModule
} from "@angular/material";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { LoadingComponent } from "./components/loading/loading.component";
import { HttpErrorInterceptor } from "./interceptors/HttpErrorInterceptor";
import { NoAccountDialogComponent } from './components/no-account-dialog/no-account-dialog.component';
import { SignInOptionsComponent } from './components/sign-in-options/sign-in-options.component';
import { SignInResultComponent } from './components/sign-in-result/sign-in-result.component';


@NgModule({
  declarations: [AppComponent, SignInComponent, LoadingComponent, NoAccountDialogComponent, SignInOptionsComponent, SignInResultComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatRippleModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
  entryComponents: [
    NoAccountDialogComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
