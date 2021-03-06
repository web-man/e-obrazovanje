import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SubjectInterface, User, PassingExamsInterface, PassedExamInterface } from '../common.models';
import { SubjectService } from '../main/subject.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../main/user.service';

@Component({
  selector: 'app-exam-results',
  templateUrl: './exam-results.component.html',
  styleUrls: ['./exam-results.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ExamResultsComponent implements OnInit {
  id: number;
  private sub: any;
  subject: SubjectInterface;
  isDataAvailable: boolean;
  public user: User;
  public passingExam: PassingExamsInterface;
  grade: number;
  public passedExam: PassedExamInterface;

  constructor(private userService:  UserService, private subjectService: SubjectService, private route: ActivatedRoute) {
    this.loadData();
  }

  private loadData(){
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.isDataAvailable = false;
    this.userService.getUser(currentUser.username)
      .subscribe((user: User) => {
        this.user = user;
        this.sub = this.route.params.subscribe(params => {
          this.isDataAvailable = false;
          for (let index = 0; index < user.passingExams.length; index++) {
            const element = user.passingExams[index];
            if (element.id == params['id']) {
              this.passingExam = element;
            }
          }
        });
        this.isDataAvailable = true;
      })
  }

  ngOnInit() {

  }

  saveResults(passingExam, student): void {
    this.passedExam = {
      grade: this.grade,
      passing_exams: this.passingExam
    };
    this.subjectService.saveResults(this.passedExam, student)
    .subscribe(() => {
      var index = passingExam.students.indexOf(student);
      if (index > -1) {
        this.passingExam.students.splice(index, 1);
      }
    });
  }
}
