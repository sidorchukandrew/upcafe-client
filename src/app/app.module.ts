import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./routing/app-routing.module";
import { AppComponent } from "./app-component/app.component";

import {
  SocialLoginModule,
  AuthServiceConfig,
  FacebookLoginProvider,
} from "angularx-social-login";
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

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.googleAppId),
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(environment.facebookAppId),
  },
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [AppComponent, SignInComponent, LoadingComponent, NoAccountDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
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
      provide: AuthServiceConfig,
      useFactory: provideConfig,
    },
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
