import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';
import { AppState } from './../store/reducers/index';
import { areCoursesLoaded } from './selectors/course.selectors';
import { loadCourses } from './store/course.action';

@Injectable()
export class CourseResolver implements Resolve<Observable<any>> {

  constructor(private store: Store<AppState>) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store
      .pipe(
        select(areCoursesLoaded),
        tap((coursesLoaded) => {
          console.log('cursos loaded', coursesLoaded);
          if (!coursesLoaded) {
            this.store.dispatch(loadCourses());
          }

        }),
        filter(coursesLoaded => coursesLoaded),
        first()
      );
  }
}