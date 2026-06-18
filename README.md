# Pokémon Battle Strategy

A web application that helps Pokémon trainers build, organize, and manage Pokémon teams while exploring detailed Pokédex information powered by PokéAPI.

## Live Demo

https://pbs-xlzr.onrender.com

## Features

### Team Management

- Create and manage multiple Pokémon teams
- Store teams using LocalStorage
- Select and maintain a Main Team
- Prevent duplicate team names
- Delete non-main teams
- Dynamic team rendering
- Team roster management
- URL synchronization for team selection
- Toast notifications for user feedback
- Responsive team header with Main Team roster

### Pokémon Search

- Search all Pokémon from PokéAPI
- Search begins after 3 characters
- Search results limited for performance
- Popular Pokémon quick-access section
- Navigation to Pokémon Detail pages

### Pokémon Detail

- Dynamic Pokémon detail pages
- Pokémon sprite, types, height, and weight
- Base experience information
- Generation, habitat, and color data
- Pokédex entries from Species API
- Ability and hidden ability display
- Base stat breakdown
- Evolution chains with sprites
- Evolution navigation links
- Team selection and Add To Team functionality
- Team validation and duplicate prevention
- Responsive Pokédex-style layout

## Technologies

- Vite
- Vanilla JavaScript (ES Modules)
- CSS
- PokéAPI
- LocalStorage

## APIs Used

### PokéAPI

- Pokémon Endpoint
- Pokémon Species Endpoint
- Evolution Chain Endpoint

## Project Structure

```text
src/
├── js/
│   ├── modules/
│   │   ├── TeamManager.mjs
│   │   ├── PokemonData.mjs
│   │   ├── templates.mjs
│   │   └── utils.mjs
│   ├── main.js
│   ├── team.js
│   ├── pokemon.js
│   └── pokemon-detail.js
├── css/
├── images/
└── partials/
```

## Architecture

### TeamManager

Responsible for team creation, validation, Pokémon roster management, and LocalStorage persistence.

### PokemonData

Responsible for all communication with PokéAPI and retrieval of Pokémon, species, and evolution data.

### templates.mjs

Contains reusable UI templates and rendering functions.

### Controllers

- main.js
- team.js
- pokemon.js
- pokemon-detail.js

Controllers coordinate application state, data retrieval, events, and rendering.

## Team Rules

- Main Team cannot be deleted
- Teams may contain up to 6 Pokémon
- Duplicate Pokémon are not allowed within the same team
- Team selection is synchronized with the URL
- Team data is persisted using LocalStorage
- The header always displays the Main Team roster

## Learning Objectives Demonstrated

- ES Modules
- Async/Await
- Fetch API
- Third-Party API Integration
- JSON Processing
- LocalStorage
- Event Handling
- Dynamic Rendering
- Responsive Design
- Component-Based Architecture

## Future Enhancements

- Team analysis tools
- Battle strategy recommendations
- Type matchup analysis
- Team strength evaluation

## Author

Jared Huayta

Trainer, Developer & Pokémon Master
