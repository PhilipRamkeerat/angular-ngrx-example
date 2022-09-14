import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { CoursesListComponent } from './course/component/courses-list/courses-list.component';
import { CreateCourseComponent } from './course/component/create-course/create-course.component';
import { CourseModule } from './course/course.module';
import { CourseResolver } from './course/course.resolver';
import { metaReducers, reducers } from './store/reducers';

const routes = [
  {
    path: 'courses',
    component: CoursesListComponent,
    resolve: {
      courses: CourseResolver
    }
  },
  { path: 'create-course', component: CreateCourseComponent },
  { path: '**', redirectTo: 'courses' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CourseModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    EffectsModule.forRoot([]),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: { // Os runtime checkers são alertas em tempo de execução quando uma regra é violada
        strictStateImmutability: true, // Verifica se o estado não está alterado
        strictActionImmutability: true // Verifica se as ações não foram alteradas
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 25 }) : []
  ],
  providers: [CourseResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
