# UserSignUp

User Sign-Up, the User Interface provides the user to sign up by providing first name, last name, email and password. There are validations on all the field for the user to signed up.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

##### Used Frameworks and technologies

ES6 | Bootstrap 4.6.0 | Node JS 15.11.0 | HTML 5

##### Plugins and libraries

ngx-toastr

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

Structuring of this package ,

weather-app
├── src
│ └── app
│ │ ├── nav-bar
│ │ │ ├── nav-bar.component.ts|html|css|spec
│ │ ├── shared
│ │ │ │ └── services
│ │ │ │ │ └── toast-message.service.ts|spec
│ │ │ │ └── utilities
│ │ │ │ │ └── generic-validator.ts
│ │ │ │ │ └── password-validator.ts
│ │ │ ├── app.component.ts|html|css|spec
│ │ ├── sign-up
│ │ │ ├── components
│ │ │ │ ├── sign-up.component.ts|html|css|spec  
│ │ │ ├── models
│ │ │ ├── services
│ │ ├── app.component.ts|html|css|spec
│ ├── index.html

Provides a reusable code,loosely coupled for future enhancements.
Focused on standards, naming conventions and maintainability.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

This package is tested with Angular Testbeds, Jasmine and Karma.
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Responsiveness

Application is responsive to all the devices including mobile, tablet, laptop.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
