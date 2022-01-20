import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormArray} from '@angular/forms';
import {Section} from '../../../forms-config';

@Component({
  selector: 'ddforms-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.scss']
})
export class SectionListComponent implements OnInit {

  @Input() config: Section | null = null;
  @Input() control: AbstractControl | null = null;

  constructor() {
  }

  public get isFormArray(): boolean {
    if (!this.control) return false;
    return (this.control instanceof FormArray);
  }

  public get formControls(): AbstractControl[] {
    return this.control ? (this.control as FormArray).controls : [];
  }

  ngOnInit(): void {
  }

}
