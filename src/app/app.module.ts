import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app-component/app.component';

import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatRippleModule, MatButtonModule } from '@angular/material';
import { TestComponent } from './components/test/test.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(" ")
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, SocialLoginModule, BrowserAnimationsModule, MatRippleModule, MatButtonModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
