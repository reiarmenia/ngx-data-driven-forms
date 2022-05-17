import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import {
  RenderRepeatDataDirective,
  RenderRepeatInputDirective,
} from '../../directives';
import { Section } from '../../forms';
import {
  CrossFieldValidatorRegistryService,
  FieldValidatorRegistryService,
  RepeatDataRendererRegistryService,
  RepeatInputRendererRegistryService,
} from '../../services';
import { RenderRepeatDataBaseComponent } from '../render-repeat-data-base';
import { RenderRepeatInputBaseComponent } from '../render-repeat-input-base';

@Component({
  template: ``,
  styles: [],
})
export abstract class RenderSectionRepeatBaseComponent
  implements OnInit, OnDestroy
{
  @Input() section!: Section;
  @Input() control!: AbstractControl;
  @Input() rendererArgs?: any[];

  @ViewChild(RenderRepeatInputDirective, { static: true })
  private inputHost!: RenderRepeatInputDirective;

  @ViewChild(RenderRepeatDataDirective, { static: true })
  private dataHost!: RenderRepeatDataDirective;

  inputForm?: AbstractControl;

  constructor(
    private _repeatDataRegistry: RepeatDataRendererRegistryService,
    private _repeatInputRegistry: RepeatInputRendererRegistryService,
    private _fieldValidators: FieldValidatorRegistryService,
    private _crossFieldValidators: CrossFieldValidatorRegistryService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.renderElements();
  }

  ngOnDestroy(): void {
    this.clearElements();
  }

  private renderElements(): void {
    this.clearElements();

    this.renderRepeatData();
    this.renderRepeatInput();
  }

  private clearElements(): void {
    if (this.inputHost && this.inputHost.viewContainerRef) {
      this.inputHost.viewContainerRef.clear();
    }

    if (this.dataHost && this.dataHost.viewContainerRef) {
      this.dataHost.viewContainerRef.clear();
    }
  }

  private renderRepeatInput(): void {
    if (!this.inputHost) return;
    const inputView = this.inputHost.viewContainerRef;
    if (!inputView) return;

    if (!this.inputForm) {
      this.inputForm = this.section.asFormGroup(
        null,
        this._fieldValidators.getRegistry(),
        this._crossFieldValidators.getRegistry()
      );
    }

    const rendererConfig =
      this.section.rendererConfig?.renderers['repeatInput'] ?? undefined;

    const target = this._repeatInputRegistry
      .getRegistry()
      .get(rendererConfig?.target ?? 'default');
    if (!target) return;

    const componentRef =
      inputView.createComponent<RenderRepeatInputBaseComponent>(target);
    componentRef.instance.inputForm = this.inputForm;
    componentRef.instance.section = this.section;

    this._cdr.detectChanges();
  }

  private renderRepeatData(): void {
    if (!this.dataHost) return;
    const dataView = this.inputHost.viewContainerRef;
    if (!dataView) return;

    const rendererConfig =
      this.section.rendererConfig?.renderers['repeatData'] ?? undefined;

    const target = this._repeatDataRegistry
      .getRegistry()
      .get(rendererConfig?.target ?? 'default');
    if (!target) return;

    const componentRef =
      dataView.createComponent<RenderRepeatDataBaseComponent>(target);

    componentRef.instance.data = this.control;
    componentRef.instance.section = this.section;

    this._cdr.detectChanges();
  }
}
