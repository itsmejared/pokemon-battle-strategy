# Pokemon Battle Strategy App

Pokemon Battle Strategy App is a web application designed to help trainers build stronger Pokémon teams through team management, type coverage analysis, Pokémon comparison tools, and Pokémon Trading Card Game integration.

This project was developed as the final project for WDD 330: Web Frontend Development II.

## Live Demo

https://pbs-xlzr.onrender.com

## GitHub Repository

https://github.com/itsmejared/pokemon-battle-strategy

## Features

### Dashboard

* Team overview
* Main Team management
* Saved Teams carousel
* Team analysis preview
* Responsive layout

### Pokemon

* Search Pokémon
* View Pokémon details
* Add Pokémon to teams

### Team

* Main Team management
* Saved Teams management
* Team Builder
* Team Analysis

### Comparison

* Compare Pokémon statistics and attributes

### Cards

* Browse Pokémon Trading Card Game cards
* Pokémon TCG API integration

## Technologies

* HTML5
* CSS3
* JavaScript (ES Modules)
* Vite
* ESLint
* Prettier
* LocalStorage
* Render

## APIs

### PokeAPI

Used for Pokémon information including:

* Pokémon details
* Types
* Stats
* Abilities
* Sprites

https://pokeapi.co/

### Pokémon TCG API

Used for card information including:

* Card images
* Card details
* Sets
* Metadata

https://pokemontcg.io/

## Project Structure

src/
├── css/
│   ├── variables.css
│   └── style.css
│
├── js/
│   ├── modules/
│   │   └── utils.mjs
│   │
│   ├── main.js
│   ├── pokemon.js
│   ├── team.js
│   ├── comparison.js
│   └── cards.js
│
├── public/
│   ├── images/
│   ├── json/
│   └── partials/
│       ├── header.html
│       └── footer.html
│
├── index.html
│
├── pokemon/
│   └── index.html
│
├── team/
│   └── index.html
│
├── comparison/
│   └── index.html
│
└── cards/
└── index.html

## Team Model

The application uses a team management model based on:

* One Main Team
* Multiple Saved Teams
* Teams can contain 0-6 Pokémon
* Teams are persisted using LocalStorage
* Main Team is identified through a flag and can be reassigned

## Learning Objectives Demonstrated

* JavaScript Modules
* API Consumption
* Responsive Design
* Dynamic Rendering
* LocalStorage Persistence
* Component Reuse
* Client-Side Routing Structure
* Modern Frontend Tooling

## Author

Jared Huayta

Trainer, Developer & Pokémon Master