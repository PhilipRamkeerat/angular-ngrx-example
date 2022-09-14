import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoursesListComponent } from './component/courses-list/courses-list.component';
import { CreateCourseComponent } from './component/create-course/create-course.component';
import { CourseEffects } from './effects/course.effects';
import { CourseService } from './service/course.service';
import { courseReducer } from './store/course.reducers';



@NgModule({
  declarations: [
    CoursesListComponent,
    CreateCourseComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    //  creates a dedicated slice (courses) in the application state for the course module and attaches the reducers to it.
    StoreModule.forFeature('courses', courseReducer),
    // The following code line registers the effects in the course module state.
    EffectsModule.forFeature([CourseEffects])
  ],
  providers: [CourseService],
  exports: [CoursesListComponent, CreateCourseComponent]
})
export class CourseModule { }
