# ParsFood

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.17.

## Development server

Install the locked dependencies with `npm ci`, then run `npm start`.
This starts both Angular at http://localhost:4200 and the JSON development API at http://localhost:3000.
Stop both with Ctrl+C. Ports 3000 and 4200 must be free.

To run the services separately, use `npm run start:api` and `npm run start:web` in two terminals.
Users, menus, and new orders are persisted in `db.json`. Carts and the current login stay in browser storage.
Older browser-only order history is still displayed in the browser where it was created.

The API uses json-server and is intended for local development. Login and role guards are demo behavior;
deployments need server-side authentication, authorization, password hashing, and order validation.

Run `npm run build` for production compilation. For manual checks, follow restaurant selection,
cart, registration/login and checkout on mobile and desktop, then check account and management views with their corresponding roles.

## Code scaffolding

Run `ng generate component component-name --skip-tests` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
