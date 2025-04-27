# GitHub Activity CLI

A command-line application that fetches and displays a GitHub user's recent activity.

## Project Overview

This CLI tool allows developers to quickly view a GitHub user's recent activity directly from the terminal. It's built entirely with Node.js core modules (no external dependencies) and demonstrates practical implementation of asynchronous JavaScript in a real-world application.

## Features

- Fetch recent GitHub activity for any public user
- Display activity in a human-readable format
- Handle different types of GitHub events (commits, pull requests, issues, etc.)
- Graceful error handling

## Technical Implementation

### Core Technologies

- **Node.js**: Server-side JavaScript runtime
- **Core Modules**: Only built-in Node.js modules (no external dependencies)
  - `readline`: For terminal interaction
  - `https`: For making API requests

### Architecture

The application follows a modular architecture with clear separation of concerns:

1. **User Input**: The readline interface handles user interaction by prompting for a GitHub username.

2. **API Integration**: The application communicates with GitHub's public API using Node's native HTTPS module, functioning similarly to a cURL request but with the power of JavaScript.

3. **Data Processing**: Raw JSON data from GitHub is processed and transformed into readable formats based on event types.

4. **Output Formatting**: Different GitHub events (pushes, PRs, issues, etc.) are formatted according to their type for clear, concise output.

### Key Implementation Details

#### API Request Handling

The application uses Node.js's `https` module to make requests to GitHub's API. The implementation:

- Creates a request with proper headers and configuration
- Handles streaming data in chunks
- Aggregates response data as it arrives
- Processes complete responses with appropriate error handling

#### Event Processing

A core feature is the event processor that translates GitHub's API responses into human-readable activity summaries:

```javascript
// Example of the switch statement handling different event types
switch (event.type) {
  case "PushEvent":
    activityDescription = `Pushed ${
      event.payload.commits?.length || 0
    } commit(s) to ${event.repo.name}`;
    break;
  case "PullRequestEvent":
    activityDescription = `${event.payload.action} pull request in ${event.repo.name}`;
    break;
  // Additional event types...
}
```

This implementation demonstrates:

- Pattern matching with switch statements
- Object destructuring for data access
- Template literals for string formatting
- Null coalescing for defensive programming

## Skills Demonstrated

This project showcases several important software development skills:

- **API Integration**: Working with RESTful APIs and processing JSON responses
- **Asynchronous Programming**: Managing event-driven code with callbacks and events
- **Error Handling**: Implementing robust error handling for network requests and data processing
- **Command Line Interface Design**: Creating intuitive terminal-based user experiences
- **Event-Driven Architecture**: Using Node.js's event emitter pattern for handling streaming data
- **Data Transformation**: Converting complex API responses into user-friendly formats
- **Clean Code Practices**: Modular code with clear separation of concerns

## Future Enhancements

Potential areas for expansion include:

- Colored terminal output for better readability
- Filtering options for specific event types
- Interactive navigation through paginated results
- Authentication for accessing private repositories
- Extended data visualization options

## Usage

```bash
# Run the application
node index.js

# When prompted, enter a GitHub username
Enter a GitHub username: octocat
```
