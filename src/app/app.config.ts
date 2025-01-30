import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

import { provideAnimations } from '@angular/platform-browser/animations';

// import { NzInputModule } from 'ng-zorro-antd/input';
// import { NzButtonModule } from 'ng-zorro-antd/button';
// import { NzSelectModule } from 'ng-zorro-antd/select';
// import { NzFormModule } from 'ng-zorro-antd/form';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideNzI18n(en_US), importProvidersFrom(FormsModule), provideAnimationsAsync(), provideHttpClient(), 

    // provideRouter([]),
    // provideAnimations(),
    // importProvidersFrom(
    //   NzInputModule,
    //   NzButtonModule,
    //   NzSelectModule,
    //   NzFormModule
    // )
  ]
};
