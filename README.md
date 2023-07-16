# assignment2

# News-aggregator-api

# News API Integration

This project integrates with the News API to fetch news sources and articles based on user preferences. It provides functionality to fetch news sources, fetch news articles;

## Prerequisites

Before running the project, make sure you have the following prerequisites:

- Node.js installed on your machine
- API key for the News API

## Installation

1.  Navigate to the project directory:

    ```bash
    cd news-api-integration
    ```

2.  Install the dependencies:

    ```bash
    npm install
    ```

3.  Set up environment variables:

    - Create a `.env` file in the root directory of the project.
    - Add the following environment variables to the `.env` file:

           ```plaintext

      CONNECTIONSTRING=<Mongo Connection string>
      PORT=3000
      API_SECRET=<Secret String for JWT tokens>
      API_KEY_NEWSAPI=<Your News API key>

           ```

## Usage

The project provides the following functions for interacting with the News API:

- registers a new user
- logins an already registered user
- /preference routes provides key word preferences via get method and via put method we can change our preferences
- `fetchNewsArticlesByKeyword(keyword)`: Fetches news articles from the News API based on the specified keyword.
- `markArticleAsRead(articleId, userId, cachedArticles)`: Marks an article as read for a user.
- `markArticleAsFavorite(articleId, userId, cachedArticles)`: Marks an article as favorite for a user.
- `fetchReadArticlesForUser(userId, cachedArticles)`: Fetches the read articles for a user.
- `fetchFavoriteArticlesForUser(userId, cachedArticles)`: Fetches the favorite articles for a user.
- `filterSourcesByUserPreferences(articleSources, userPreferences)`: Filters article sources based on user preferences.

## API Routes

The project also includes the following API routes for users:

### Routes

- `POST /register`: Register a new user.
- `POST /login`: Log in an existing user.
- `GET /news`: Fetch all available news sources.
- `GET /preferences`: Get the news preferences for the currently logged-in user.
- `PUT /preferences`: Update the news preferences for the currently logged-in user.
