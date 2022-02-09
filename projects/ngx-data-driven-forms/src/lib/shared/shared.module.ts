import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFieldDirective } from './directives';
import {QuestionErrorsComponent} from './components/question-errors/question-errors.component';



@NgModule({
  declarations: [
    QuestionErrorsComponent,
    DynamicFieldDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    QuestionErrorsComponent,
    DynamicFieldDirective,
  ]
})
export class SharedModule { }
