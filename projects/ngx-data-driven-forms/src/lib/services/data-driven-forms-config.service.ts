import {Inject, Injectable} from '@angular/core';
import {ConditionsFunction, ErrorMessageFunction, NormalizedValidator} from '../types';
import {BehaviorSubject} from 'rxjs';
import {BASE_COMPONENTS_MAP, BASE_CONDITIONS_MAP, BASE_VALIDATORS_MAP} from '../maps';
import {FieldItem} from '../components';
import {DataDrivenFormsConfig} from '../ngx-data-driven-forms.module';

@Injectable({
  providedIn: 'root'
})
export class DataDrivenFormsConfigService {

  private readonly validators: BehaviorSubject<Map<string, NormalizedValidator> | null | undefined> = new BehaviorSubject<Map<string, NormalizedValidator> | null | undefined>(null);
  private readonly conditions: BehaviorSubject<Map<string, ConditionsFunction> | null | undefined> = new BehaviorSubject<Map<string, ConditionsFunction> | null | undefined>(null);
  private readonly components: BehaviorSubject<Map<string, FieldItem> | null | undefined> = new BehaviorSubject<Map<string, FieldItem> | null | undefined>(null);
  private readonly errorMessages: BehaviorSubject<Map<string, ErrorMessageFunction> | null | undefined> = new BehaviorSubject<Map<string, ErrorMessageFunction> | null | undefined>(null);
  private readonly ignoreDefaultStyles: BehaviorSubject<boolean | null | undefined> = new BehaviorSubject<boolean | null | undefined>(false);

  constructor(
    @Inject('dataDrivenFormsConfig') private config: DataDrivenFormsConfig
  ) {

    if (!this.validators.getValue()?.size) {
      this.validators.next(BASE_VALIDATORS_MAP);
    }

    if (!this.conditions.getValue()?.size) {
      this.conditions.next(BASE_CONDITIONS_MAP);
    }

    if (!this.components.getValue()?.size) {
      this.components.next(BASE_COMPONENTS_MAP);
    }

    if (config?.customValidators) {
      this.registerValidators(config.customValidators);
    }

    if (config?.customConditions) {
      this.registerConditions(config.customConditions);
    }

    if (config?.customFieldComponents) {
      this.registerComponents(config.customFieldComponents);
    }

    this.ignoreDefaultStyles.next(config?.ignoreDefaultStyles ?? false);

  }

  public getValidators(): Map<string, NormalizedValidator> {
    const validators = this.validators.getValue();
    return new Map<string, NormalizedValidator>([
      ...validators ? validators.entries() : [],
    ]);
  }

  public getConditions(): Map<string, ConditionsFunction> {
    const conditions = this.conditions.getValue();
    return new Map<string, ConditionsFunction>([
      ...conditions ? conditions.entries() : [],
    ]);
  }

  public getComponents(): Map<string, FieldItem> {
    const components = this.components.getValue();
    return new Map<string, FieldItem>([
      ...components ? components.entries() : [],
    ]);
  }

  public getShouldIgnoreStyles(): boolean {
    return this.ignoreDefaultStyles.getValue() ?? false;
  }

  public registerValidator(key: string, validator: NormalizedValidator): void {
    const validators = this.getValidators();
    this.validators.next(new Map<string, NormalizedValidator>([
      ...validators.entries(),
      [key, validator]
    ]));
  }

  public registerValidators(validators: [string, NormalizedValidator][]): void;
  public registerValidators(validators: Map<string, NormalizedValidator>): void;
  public registerValidators(validators: [string, NormalizedValidator][] | Map<string, NormalizedValidator>): void {
    let toRegister: Map<string, NormalizedValidator>;
    if (Array.isArray(validators)) {
      toRegister = new Map([...validators]);
    } else {
      toRegister = validators;
    }
    this.validators.next(new Map<string, NormalizedValidator>([
      ...this.getValidators(),
      ...toRegister.entries(),
    ]));
  }

  public registerCondition(key: string, condition: ConditionsFunction): void {
    const conditions = this.getConditions();
    this.conditions.next(new Map<string, ConditionsFunction>([
      ...conditions.entries(),
      [key, condition]
    ]));
  }

  public registerConditions(conditions: [string, ConditionsFunction][]): void;
  public registerConditions(conditions: Map<string, ConditionsFunction>): void;
  public registerConditions(conditions: [string, ConditionsFunction][] | Map<string, ConditionsFunction>): void {
    let toRegister: Map<string, ConditionsFunction>;
    if (Array.isArray(conditions)) {
      toRegister = new Map([...conditions]);
    } else {
      toRegister = conditions;
    }
    this.conditions.next(new Map<string, ConditionsFunction>([
      ...this.getConditions(),
      ...toRegister.entries(),
    ]));
  }

  public registerComponent(key: string, component: FieldItem): void {
    const components = this.getComponents();
    this.components.next(new Map<string, FieldItem>([
      ...components.entries(),
      [key, component]
    ]));
  }

  public registerComponents(components: [string, FieldItem][]): void;
  public registerComponents(components: Map<string, FieldItem>): void;
  public registerComponents(components: [string, FieldItem][] | Map<string, FieldItem>): void {
    let toRegister: Map<string, FieldItem>;
    if (Array.isArray(components)) {
      toRegister = new Map([...components]);
    } else {
      toRegister = components;
    }
    this.components.next(new Map<string, FieldItem>([
      ...this.getComponents(),
      ...toRegister.entries(),
    ]));
  }


}


