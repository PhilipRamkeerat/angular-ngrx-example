import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Course } from './../model/course.model';
import { courseActionTypes } from './course.action';

/**
 * The below code snippet defines the Course state by extending the EntityState
 * EntityState maintains a list of IDs and a dictionary of entities.
 * Custom property coursesLoaded - used to indicate whether the courses have been
 * already loaded into the state
 */
export interface CourseState extends EntityState<Course> {
  coursesLoaded: boolean;
}

// Entity adapter to provide helper functions
export const adapter: EntityAdapter<Course> = createEntityAdapter<Course>();

// Using entity adapter to create a initial state
export const initialState = adapter.getInitialState({
  coursesLoaded: false
});

export const courseReducer = createReducer(
  initialState,

  on(courseActionTypes.coursesLoaded, (state, action) => {
    return adapter.addAll(
      action.courses,
      { ...state, coursesLoaded: true }
    );
  }),

  on(courseActionTypes.createCourse, (state, action) => {
    return adapter.addOne(action.course, state);
  }),

  on(courseActionTypes.deleteCourse, (state, action) => {
    return adapter.removeOne(action.courseId, state);
  }),

  on(courseActionTypes.updateCourse, (state, action) => {
    return adapter.updateOne(action.update, state);
  })
);

export const { selectAll, selectIds } = adapter.getSelectors();
