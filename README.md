# OlympicGamesStarter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.3.

1. First install node.js(LTS) if you don't have it already on your computer.
2. Then clone or download the project from https://github.com/wil1708/Developpez-le-front-end-en-utilisant-Angular.git .
3. Don't forget to install your node_modules before starting (`npm install`).
4. Run the project with the command ng serve inside the project folder using a terminal of your choice.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Where to start

As you can see, an architecture has already been defined for the project. It is just a suggestion, you can choose to use your own. The predefined architecture includes (in addition to the default angular architecture) the following:

- `components` folder: contains every reusable components
- `pages` folder: contains components used for routing
- `core` folder: contains the business logic (`services` and `models` folders)

I suggest you to start by understanding this starter code. Pay an extra attention to the `app-routing.module.ts` and the `olympic.service.ts`.

Once mastered, you should continue by creating the typescript interfaces inside the `models` folder. As you can see I already created two files corresponding to the data included inside the `olympic.json`. With your interfaces, improve the code by replacing every `any` by the corresponding interface.

You're now ready to implement the requested features.

Good luck!

## Content and Architecture 

The app is composed of a Home component showing a pie chart showing datas about JOs and countries. 
Clicking on a country in the pie chart will redirect you to a detailed page using a line chart about the countrys's JOs data.
Clicking the Home button will redirect you back to the pie chart.
The app is configured with a not-found component, that will redirect you to a 404 page in case of wrong url.
The two main components use a service Olympic.service.ts (HttpClient requests) to get their data.
Olympic.json is used to store the data used by the service.
App is fully responsive desktop + mobile.
