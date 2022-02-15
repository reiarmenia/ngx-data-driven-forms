import { Component, OnInit } from '@angular/core';
import {IApplication} from '../../../../../ngx-data-driven-forms/src/lib/shared';
import {
  ApplicationStateManagerService,
  DataDrivenFormsService
} from '../../../../../ngx-data-driven-forms/src/lib/ddforms';

@Component({
  selector: 'app-application-example',
  templateUrl: './application-example.component.html',
  styles: [
  ]
})
export class ApplicationExampleComponent implements OnInit {

  private _config: IApplication = {
    id: 'exampleApplication',
    description: 'An application example to show off some of the basic functions.',
    pages: [
      {
        id: 'namePage',
        sections: [
          {
            id: 'name',
            questions: {
              first: {
                id: 'first',
                type: 'text',
                label: 'First Name',
                validation: {
                  required: true,
                },
              },
              middle: {
                id: 'middle',
                type: 'text',
                label: 'Middle Name'
              },
              last: {
                id: 'last',
                type: 'text',
                label: 'Last Name'
              },
            },
            questionOrder: [
              'first',
              'middle',
              'last',
            ]
          }
        ]
      },
      {
        id: 'contactPage',
        sections: [
          {
            id: 'phone',
            questions: {
              number: {
                id: 'number',
                type: 'tel',
                label: 'Phone Number',
              },
              type: {
                id: 'type',
                type: 'radio',
                label: 'Phone Type',
                fieldConfig: {
                  options: [
                    {display: 'Mobile', value: 'M'},
                    {display: 'Landline', value: 'L'}
                  ],
                },
              },
              allowTexts: {
                id: 'allowTexts',
                type: 'radio',
                label: 'Allow Text Messages',
                fieldConfig: {
                  options: [
                    {display: 'Yes', value: 'Y'},
                    {display: 'No', value: 'N'}
                  ]
                },
                shouldAsk: {
                  statements: [
                    {
                      sibling: 'type',
                      expectedParentLevel: 1,
                      conditions: {
                        valueMatches: 'M'
                      },
                    }
                  ]
                }
              }
            },
            questionOrder: ['number', 'type', 'allowTexts']
          }
        ]
      }
    ]
  }

  constructor(
    private ddforms: DataDrivenFormsService,
    private appStateSvc: ApplicationStateManagerService,
  ) { }

  ngOnInit(): void {
    this.appStateSvc.setup(null, this._config)
  }

}