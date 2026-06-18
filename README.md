# Pokémon Battle Strategy

A web application that helps Pokémon trainers create and manage battle teams, organize team rosters, and prepare strategies using data from PokéAPI.

## Live Demo

https://pbs-xlzr.onrender.com

## Features

- Create and manage multiple Pokémon teams
- Store teams using LocalStorage
- Select and maintain a Main Team
- Prevent duplicate team names
- Delete non-main teams
- Dynamic team rendering
- Team roster management
- Responsive Team Management page
- URL synchronization for team selection
- Toast notifications for user feedback
- Responsive team header with team information

## Technologies

- Vite
- Vanilla JavaScript (ES Modules)
- CSS
- PokéAPI
- LocalStorage

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
│   └── team.js
├── css/
├── images/
└── partials/
```

## Architecture

### TeamManager

Handles team creation, updates, validation, and LocalStorage persistence.

### PokemonData

Handles communication with PokéAPI.

### templates.mjs

Contains UI templates and rendering functions.

### main.js / team.js

Page controllers that coordinate data and rendering.

## Current Team Rules

- Main Team cannot be deleted
- Teams can contain up to 6 Pokémon
- Teams can be created and managed dynamically
- Team selection is synchronized with the URL
- The header always displays the Main Team roster

## Future Enhancements

- Pokémon search
- Add Pokémon to teams
- Pokémon detail page
- Battle strategy tools
- Team analysis and recommendations

## Author

Jared Huayta

Trainer, Developer & Pokémon Master
