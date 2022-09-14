import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState, selectAll } from "../store/course.reducers";


export const courseFeatureSelector = createFeatureSelector<CourseState>('courses');

// select all get all entities an a array
export const getAllCourses = createSelector(
  courseFeatureSelector,
  selectAll
);

// used to check whether the courses have been already loaded into state
export const areCoursesLoaded = createSelector(
  courseFeatureSelector,
  state => state.coursesLoaded
);

