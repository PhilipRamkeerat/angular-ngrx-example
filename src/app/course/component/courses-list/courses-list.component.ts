import { Component, OnInit } from '@angular/core';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAllCourses } from '../../selectors/course.selectors';
import { CourseService } from '../../service/course.service';
import { courseActionTypes } from '../../store/course.action';
import { AppState } from './../../../store/reducers/index';
import { Course } from './../../model/course.model';
@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

  courses$!: Observable<Course[]>;

  courseToBeUpdated?: Course | null;

  isUpdateActivated = false;

  constructor(private courseService: CourseService, private store: Store<AppState>) { }

  ngOnInit() {
    this.courses$ = this.store.select(getAllCourses);
  }

  deleteCourse(courseId: string) {
    this.store.dispatch(courseActionTypes.deleteCourse({ courseId }));
  }

  showUpdateForm(course: Course) {
    this.courseToBeUpdated = { ...course };
    this.isUpdateActivated = true;
  }

  updateCourse(updateForm: any) {
    if (this.courseToBeUpdated) {

      const update: Update<Course> = {
        id: this.courseToBeUpdated.id,
        changes: {
          ...this.courseToBeUpdated,
          ...updateForm.value
        }
      };

      this.store.dispatch(courseActionTypes.updateCourse({ update }));

      this.isUpdateActivated = false;
      this.courseToBeUpdated = null;
    }
  }
}
