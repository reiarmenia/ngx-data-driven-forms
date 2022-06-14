import { Component } from '@angular/core';
import {
  Application,
  FormGenerationService,
} from 'ngx-data-driven-forms/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  testApplication = new Application({
    id: 'testApplication',
    description: 'Test Application.',
    pages: [
      {
        id: 'test1',
        title: 'Test Page Title',
        narrative: 'Test Page Narrative',
        sections: [
          {
            id: 'testSection1',
            title: 'Test Section Title',
            narrative: 'Test Section Narrative',
            questions: {
              testQuestion1: {
                id: 'testQuestion1',
                type: 'text',
                label: 'Test Question 1',
                hint: 'test question',
              },
            },
            layout: ['testQuestion1'],
          },
          {
            id: 'testSection2',
            title: 'Test Repeat Section Title',
            narrative: 'Test Repeat Section Narrative',
            questions: {
              testQuestion2: {
                id: 'testQuestion2',
                type: 'text',
                label: 'Test Question 2',
                hint: 'test question',
              },
            },
            layout: ['testQuestion2'],
            repeat: {
              handler: 'default',
            },
          },
        ],
      },
    ],
  });

  testControl = this.formGenerator.buildApplicationControl(
    null,
    this.testApplication
  );

  title = 'info-ngx-ddforms-web';

  constructor(private formGenerator: FormGenerationService) {}
}
