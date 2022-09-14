
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map, tap } from 'rxjs/operators';
import { CourseService } from '../service/course.service';
import { courseActionTypes } from '../store/course.action';


@Injectable()
export class CourseEffects {

  /**
    loadCourses$ has a special behavior. It accepts the actions of type loadCourses and once
    the courses are retrieved via the REST API, it maps the response to a new action type called coursesLoaded.
 */
  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(courseActionTypes.loadCourses),
      concatMap(() => this.courseService.getAllCourses()),
      map(courses => courseActionTypes.coursesLoaded({ courses }))
    )
  );

  // invoke the corresponding REST endpoint and perform the operation
  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(courseActionTypes.createCourse),
      concatMap((action) => this.courseService.createCourse(action.course)),
      tap(() => this.router.navigateByUrl('/courses'))
    ),
    { dispatch: false } // These effects do not map the incoming action to a new action type because uses dispatch : false
  );

  // invoke the corresponding REST endpoint and perform the operation
  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(courseActionTypes.deleteCourse),
      concatMap((action) => this.courseService.deleteCourse(action.courseId))
    ),
    { dispatch: false }
  );

  // invoke the corresponding REST endpoint and perform the operation
  updateCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(courseActionTypes.updateCourse),
      concatMap((action) => this.courseService.updateCourse(action.update.id, action.update.changes))
    ),
    { dispatch: false }
  );


  constructor(private courseService: CourseService, private actions$: Actions, private router: Router) { }
}
