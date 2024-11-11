import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { tokenHttpInterceptor } from './core/token-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(),provideHttpClient(withInterceptors([tokenHttpInterceptor])),provideZoneChangeDetection({eventCoalescing:true})]
};
