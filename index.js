import readline from "readline";
import https from "https";

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Prompt user for GitHub username
rl.question("Type a GitHub user: ", (username) => {
  console.log(`Fetching GitHub activity for user: ${username}`);

  // Set up the request options
  const options = {
    hostname: "api.github.com",
    path: `/users/${username}/events`,
    method: "GET",
    headers: {
      "User-Agent": "Node.js GitHub Activity CLI",
    },
  };

  // Make the request to the GitHub API
  const req = https.request(options, (res) => {
    let data = "";

    // A chunk of data has been received
    res.on("data", (chunk) => {
      data += chunk;
    });

    // The whole response has been received
    res.on("end", () => {
      if (res.statusCode === 200) {
        try {
          const events = JSON.parse(data);
          displayEvents(events);
        } catch (e) {
          console.error("Error parsing response:", e.message);
        }
      } else {
        console.error(`Error: ${res.statusCode} - ${res.statusMessage}`);
        if (res.statusCode === 404) {
          console.error(
            "User not found. Please check the username and try again."
          );
        }
      }
      rl.close();
    });
  });

  // Handle request errors
  req.on("error", (e) => {
    console.error(`Problem with request: ${e.message}`);
    rl.close();
  });

  req.end();
});
