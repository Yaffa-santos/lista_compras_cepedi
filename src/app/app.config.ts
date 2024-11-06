import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    // provideHttpClient(), // <-- tá congelando o programa
    provideAuth0({
      domain: "yaffasantos.us.auth0.com",
      clientId: "ru4Sk1ZVTojwNYorf7trmLT5ozaUjvcW",
      authorizationParams: {
        audience: "https://yaffasantos.us.auth0.com/api/v2/",
        redirect_uri: window.location.origin,
        scope: "openid profile email",
      }
    }),
  ],
};
