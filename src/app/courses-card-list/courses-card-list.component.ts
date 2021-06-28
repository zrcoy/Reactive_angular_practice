import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

import { Course } from "../model/course";
import { CourseDialogComponent } from "../course-dialog/course-dialog.component";

import { filter, tap } from "rxjs/operators";

@Component({
  selector: "courses-card-list",
  templateUrl: "./courses-card-list.component.html",
  styleUrls: ["./courses-card-list.component.scss"],
})
export class CoursesCardListComponent implements OnInit {
  @Input() courses: Course[];

  @Output()
  private courseChanged = new EventEmitter();

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  editCourse(course: Course) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "1000px";
    dialogConfig.closeOnNavigation = true;

    dialogConfig.data = course;

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);

    dialogRef
      .afterClosed()
      .pipe(
        //this filter means only the successful save finished, then do the next
        filter((val) => !!val),
        //tap() is used for side effects, like local storage, here we are using to emit the courseChanged event
        tap(() => {
          this.courseChanged.emit();
        })
      )
      .subscribe();
  }
}
