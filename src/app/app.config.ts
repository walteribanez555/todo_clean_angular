import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngxs/store';
import { TodoState } from './core/state/todo/todo/todo.state';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TodoRepository } from './core/services/TodoRepository';
import { TodoApiService } from './infraestructure/api/todo-api.service';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: TodoRepository, useClass: TodoApiService },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore([
      TodoState
    ]),
    provideHttpClient(), provideAnimationsAsync(),
  ],
};
