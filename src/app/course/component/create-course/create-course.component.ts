import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import * as uuid from 'uuid';
import { Course } from '../../model/course.model';
import { createCourse } from '../../store/course.action';
@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  onSubmit(submittedForm: any) {
    console.log(submittedForm.value);

    if (submittedForm.invalid) {
      return;
    }

    const course: Course = { id: uuid.v4(), name: submittedForm.value.name, description: submittedForm.value.description };
    this.store.dispatch(createCourse({ course }));
  }
}
