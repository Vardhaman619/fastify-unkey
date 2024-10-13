# Fastify + Unkey Template

This is a starter template for building APIs using **Fastify** and **Unkey**. It provides a simple framework to manage user authentication, rate limiting, and fact generation using the Vercel AI SDK.

## Features

- User authentication with Unkey
- Rate limiting for API requests
- Generate random facts using the Vercel AI SDK
- Store user facts in an SQLite database using Drizzle ORM
- TypeScript support for type safety

## Getting Started

Follow these steps to set up the project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vardhaman619/fastify-unkey-starter.git
   cd fastify-unkey-starter
   ```
2. Install dependencies:
   ```bash
   bun i
   ```
3. Create a `.env` file in the root directory and add your API keys and other configuration details:
   ```bash
   cp .env.example .env
   ```
4. Start the server:
   ```bash
   bun start
   ```
