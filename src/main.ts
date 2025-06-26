//import { platformBrowser } from '@angular/platform-browser';
//import { AppModule } from './app/app.module';

//platformBrowser().bootstrapModule(AppModule, {
//  ngZoneEventCoalescing: true,
//})
//  .catch(err => console.error(err));

// ✅ Import Bootstrap JavaScript for dropdowns, modals, etc.
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
