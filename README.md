# Fastify Unkey Template

This project is a Fastify-based API template integrated with Unkey for API key management and rate-limiting. It uses OpenAI API to generate facts, and implements user authentication and request-limiting features.

## Features

- Fastify setup with TypeScript
- User authentication with API key generation (via Unkey)
- Rate-limiting with daily credit limits
- Facts generation using OpenAI API
- Turso as the database for storage
- Organized services, controllers, and middleware

## Prerequisites

Ensure you have the following installed:

- Git
- Bun >= 1.x
- Turso database credentials (or any supported database, configurable in `src/db/index.ts`)
- [Unkey](https://app.unkey.com/) Acount for API key management
- [OpenAI API Key](https://platform.openai.com/account/api-keys) for facts generation

## Setup Instructions

### 1. Clone the repository:

```bash
git clone https://github.com/Vardhaman619/fastify-unkey.git
cd fastify-unkey
```

### 2. Install dependencies:

```bash
bun install
```

### 3. Configure environment variables:

Copy the `.env.example` file and create a `.env` file:

```bash
cp .env.example .env
```

Ensure you fill in all the required environment variables such as:

```dotenv
SERVER_PORT=3000
OPENAI_API_KEY=your_openai_api_key
UNKEY_API_KEY=your_unkey_api_key
UNKEY_API_ID=your-unkey-api-id
TURSO_DATABASE_URL=your-turso-database-url
TURSO_AUTH_TOKEN=your-turso-auth-token
```

### 4. Database setup:

```bash
bun db:generate
bun db:migrate
```

### 5. Start the server:

```bash
bun start
```

## Usage Instructions

### 1. Authentication

To use the API, you need to generate an API key using [Unkey](https://app.unkey.com/settings/root-keys). Once you have the API key, you can make requests to the API using the following format:

#### Request:

`POST /signup`

- Description: Registers a new user and provides them with an API key.
- Example Request Body:

```json
{
  "email": "your_email@example.com",
  "password": "your_password"
}
```

#### Response:

```json
{
  "apiKey": "your_api_key"
}
```

### 2. Facts API

#### Request:

`GET /fact`

- Description: Description: Fetches a random fact. The user must be authenticated with an API key, and rate-limited to 10 requests per day.
- Pre-requisites: Add API Key in headers: `Authorization: Bearer your-api-key`

#### Request:

```json
{
  "headers": {
    "Authorization": "Bearer your-api-key"
  }
}
```

#### Response:

```json
{
  "fact": "Did you know...?"
}
```

#### Rate Limiting

Each user is limited to 10 requests per day.
Once the limit is reached, the API will return a 429 (Too Many Requests) status code.

### 3. Get all facts

#### Request:

`GET /facts`

- Description: Description: Returns all facts generated for today by the authenticated user.

- Pre-requisites: Add API Key in headers: `Authorization: Bearer your-api-key`

#### Request:

```json
{
  "headers": {
    "Authorization": "Bearer your-api-key"
  }
}
```

#### Response:

```json
[
  {
    "fact": "Did you know...?",
    "createdAt": "dd-mm-yyyy"
  },
  {
    "fact": "Did you know...?",
    "createdAt": "dd-mm-yyyy"
  }
]
```

## Project Structure

- `src/`
  - `controllers/`: Manages API request handling (auth and facts).
  - `services/`: Business logic related to authentication and facts.
  - `middleware/`: Implements rate limiting and authentication middleware.
  - `plugins/`: Fastify plugins for authentication and facts handling.
  - `db/`: Contains the database schema, migrations, and configuration.
  - `lib/`: Library functions for interacting with Unkey and OpenAI.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
