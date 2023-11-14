# Forkify - Recipe Search Application

FForkify is a recipe search application that allows users to search for various recipes. It's built following the Model-View-Controller (MVC) architecture for better organization and maintainability of code. To improve the efficiency of the application, the createContextualFragment() web API has been used to create a Document fragment, thus enhancing DOM manipulation.

## Overview

This application uses JavaScript, HTML, and SCSS for frontend development. It leverages the Parcel bundler for managing dependencies, building the project, and transpiling SCSS into CSS. The architecture ensures a clear separation of concerns using the MVC design pattern.

## Project Structure

- `index.html`: Entry point of the application
- `src/` directory:

  - `img/`: All the images being used in the application

  - `js/` directory:
    - `views/`: Directory with multiple files handling the UI and user Interactions
    - `config.js`: contains constant values used throughout the application, providing centralized configuration settings for key parameters.
    - `helpers.js`: helper functions
    - `controller.js`: Manages the application logic and acts as a bridge between models and views.
    - `model.js`: responsible for fetching and persisting data. Manages a state object and provides a list of methods for updating the state object to the controller.

  -`sass/`: contains all the Sass(syntactically awesome stylesheets) files used for styling the application.

### About the MVC Architecture

The MVC (Model-View-Controller) architecture is a software design pattern used to structure applications by separating their concerns into three interconnected components: Model, View, and Controller. This separation helps in organizing code, improving maintainability, and facilitating easier modifications and updates.

### Live Link

[Forkify](https://faheem-forkify.netlify.app/)
