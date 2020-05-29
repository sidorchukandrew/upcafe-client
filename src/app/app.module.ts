import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./routing/app-routing.module";
import { AppComponent } from "./app-component/app.component";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import {
  MatRippleModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatDividerModule
} from "@angular/material";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { LoadingComponent } from "./components/loading/loading.component";
import { HttpErrorInterceptor } from "./interceptors/HttpErrorInterceptor";
import { SignInOptionsComponent } from './components/sign-in-options/sign-in-options.component';
import { WrongProviderDialog } from './components/wrong-provider-dialog/wrong-provider-dialog.component';
import { TokenInterceptor } from './interceptors/TokenInterceptor';


@NgModule({
  declarations: [AppComponent, SignInComponent, LoadingComponent, SignInOptionsComponent, WrongProviderDialog],
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
    MatDividerModule,
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  entryComponents: [
    WrongProviderDialog
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
