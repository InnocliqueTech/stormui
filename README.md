# STORM Project

## Overview

The STORM Project is a React JS-based application designed to monitor and manage data related to Zones, DMAs (District Metered Areas), Gateways, Meters, Users, and other key components of a utility management system. This project provides an intuitive user interface for managing and visualizing various data points.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Project Structure](#project-structure)
    1. [Public Directory](#public)
    2. [Src Directory](#src)
        1. [Assets](#assets)
        2. [Components](#components)
        3. [Config](#config)
        4. [Contexts](#contexts)
        5. [Data](#data)
        6. [Hooks](#hooks)
        7. [Layouts](#layouts)
        8. [Services](#services)
        9. [Store](#store)
        10. [Utils](#utils)
        11. [Views](#views)
    3. [Root Files](#root-files)
3. [Scripts and Commands](#scripts-and-commands)
4. [Deployment Steps](#deployment-steps)
5. [Project Structure](#project-structure)

## Project Overview

This project is a React JS application that helps monitor and manage data related to various components like Zones, DMAs, Gateways, Meters, Users, and other utility management aspects. The application is modular, making it easy to extend and maintain as the requirements evolve.

## Project Structure

The project is organized into several directories that promote modularity, reusability, and maintainability.

### 2.1 Public

The `public` directory contains static files such as:

- `index.html`: The entry HTML file for the app.
- Other static assets that are served directly by the server without being processed by Webpack.

### 2.2 Src

The `src` directory contains the core application codebase. This directory is structured as follows:

#### 2.2.1 Assets

The `assets` folder contains images, fonts, and other static resources used within the application.

#### 2.2.2 Components

The `components` directory houses reusable UI components such as buttons, forms, modals, etc.

#### 2.2.3 Config

This folder contains configuration files such as theme settings, API endpoint configurations, and other global constants used throughout the application.

#### 2.2.4 Contexts

The `contexts` directory stores React Context API implementations that provide a way to share state or functions across components without prop drilling.

#### 2.2.5 Data

The `data` folder holds static data or JSON files for mock data or content that isn't fetched from an API.

#### 2.2.6 Hooks

This directory contains custom React hooks that encapsulate reusable logic for various functionalities.

#### 2.2.7 Layouts

The `layouts` directory contains layout components that define the structure of different pages, including headers, footers, and sidebars.

#### 2.2.8 Services

The `services` directory contains logic for API calls and interactions with external services or data sources.

#### 2.2.9 Store

The `store` folder is used for managing the global state of the application, using state management libraries like Redux, Zustand, etc.

#### 2.2.10 Utils

This folder contains utility functions and helper methods that can be reused throughout the application.

#### 2.2.11 Views

The `views` directory contains the top-level page components corresponding to different routes in the application.

### 2.3 Root Files

- **App.js**: The root component that sets up routing and global providers for the application.
- **Index.js**: The entry point of the React application. Renders the `App` component into the DOM.
- **Index.scss**: The global stylesheet for the application.
- **menu-items.js**: Contains menu configuration or an array of navigation items.
- **reportWebVitals.js**: A utility provided by Create React App for performance measurements.
- **routes.js**: Manages routing and defines how different components are rendered based on the URL.

## Scripts and Commands
Below are the key scripts and commands for this project:

- **To clone the project**: ` ```bash `
   git clone -b main https://github.com/InnocliqueTech/stormui.git

- **To install the required node modules**:` ```bash `
   npm i -f

- **To run the project**:` ```bash `
   npm start

## Deployment Steps
Follow these steps for deploying the project:

1. Once the changes are made, push the code to git using the following commands:
   - `git add .`
   - `git commit -m "{Your commit message}"`
   - `git pull origin main` (Resolve conflicts if any)
   - `git push origin main`

2. Connect to the server using Anydesk credentials and execute the following commands:
   - `tmux attach -t storm-ui`
   - If there isn’t any tmux session running, create a new one using the command: 
       ` ```bash  tmux new -s storm-ui`   
   - Press `Ctrl+C` to ensure any running project is stopped.
   - Pull your changes on the server using:
       ````bash  git pull origin main`     
   - Run the following to install required node modules:
       ````bash npm i -f`
   - Start the project using:
      ````bash PORT=3308 npm start`
   - Detach from the tmux session using `Ctrl+B, D`.

3. The deployment is now complete. Access the server from your browser.

## Project Structure
Here is an overview of the directory structure of the project:
public/
  └── index.html
src/
  ├── assets/
  ├── components/
  ├── config/
  ├── contexts/
  ├── data/
  ├── hooks/
  ├── layouts/
  ├── services/
  ├── store/
  ├── utils/
  ├── views/
  └── App.js
  └── index.js
  └── index.scss
  └── menu-items.js
  └── reportWebVitals.js
  └── routes.js

