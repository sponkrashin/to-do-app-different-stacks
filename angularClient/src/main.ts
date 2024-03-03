import { bootstrapApplication } from '@angular/platform-browser';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
