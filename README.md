# Stock Recommendation App

Unlock the Power of Informed Investing with Our Stock Recommendation App!

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
    - [For General Users](#for-general-users)
    - [For Developers](#for-developers)
      - [Installation](#installation-for-developers)
        - [Run with npm](#run-with-npm)
        - [Run with Docker image](#run-with-docker-image)
- [Usage](#usage)
- [Architecture](#architecture)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Before you begin using or contributing to the Stock Recommendation App, ensure that you have the following prerequisites in place:

#### For General Users

<strong>Web Browser</strong> : Ensure you have a modern web browser like Google Chrome, Mozilla Firefox, or Safari to access the app.

#### For Developers

<strong>Node.js</strong> : The app is built using Node.js, so you need to have it installed on your system. You can download it from <a href="https://nodejs.org/en">nodejs.org</a>.

<strong>Redis</strong> : The app uses Redis as the primary database. Make sure you have a Redis server up and running. You can download and install Redis from <a href="https://redis.io/docs/getting-started/installation/">redis.io</a>.

<strong>Git</strong> : You'll need Git to clone the app's repository. You can download Git from <a href="https://git-scm.com/book/en/v2/Getting-Started-Installing-Git">git-scm.com</a>.

<strong>Docker (only if you are running with Docker image)</strong> : If you want to run the app in a Docker container, make sure you have Docker installed. You can download Docker from <a href="https://docs.docker.com/get-docker/">docker.com</a>.

##### Installation

###### Run with npm

<strong>Step 1: Clone the Repository</strong>

To get started, open your terminal and run the following command to clone your repository:

```
git clone https://github.com/ShinanTc/stock-recommender-redis.git
```

<strong>Step 2: Enter the Project Folder</strong>

Navigate into the project folder using the `cd` command:

```
cd stock-recommender-redis
```

<strong>Step 3: Install Dependencies</strong>

Use npm to install the required project dependencies:

```
npm install
```

<strong>Step 4: Start the App</strong>

To start the app, run one of the following commands, depending on whether you want to run it in production mode or development mode:

- For production mode:

```
npm start
```

- For development mode:

When developing and testing our Stock Recommendation App, it's recommended to use the following command:

```
npm run dev
```

Using npm run dev leverages the nodemon package, which monitors your codebase for changes. With nodemon, you don't have to manually restart the server after each code modification; it will automatically restart the server whenever you save your files. This can significantly streamline your development workflow and help you focus on writing code.

<strong>Step 5: Verify App Startup</strong>

After running the appropriate command, check the terminal for a log message similar to this:

```
Listening on port: 3000
```

This message indicates that the app has started successfully and is now running on port 3000 by default.

<strong>Step 6: Customize Port (Optional)</strong>

If you want to run the app on a different port, you can create a `.env` file in the project root directory and specify the desired port number. For example, to run the app on port 8080, create a ``.env` file with the following content:

```
PORT=8080
```

The app will now run on port 8080 when you start it.

That's it! Your Stock Recommendation App should now be up and running. Users or developers can access it by opening a web browser and navigating to http://localhost:3000 (or the custom port you specified).

###### Run with Docker image

<strong> Building the Docker image </strong>

1. Open your terminal and navigate to the project directory:

```
cd /path/to/stock-recommender-redis
```

2. Build the Docker image using the following command (replace <your-image-name> with your desired image name):

```
docker build -t <your-image-name>:<your-image-tag-name> .
```

For example:

```
docker build -t stock-recommender-app:latest .
```

3. Wait for Docker to download dependencies and build the image. This may take some time depending on your internet connection and system performance.

<strong>Running the Docker Container</strong>

Once you have built the Docker image, you can run the Stock Recommendation App in a Docker container:

```
docker run -p <desired-port>:3000 -d stock-recommender:latest
```

* desired-port : Specify the port on your host machine where you want to access the app.
* your-image-name : Provide the image name you used when building the Docker image in the previous step.
* your-image-tag-name : An optional label that you attach to the image to indicate a specific version, build, or variation. Tags are usually in the format :tag-name. If you don't specify a tag, Docker uses the default latest tag.

The app will be accessible in your web browser at http://localhost:<desired-port> (e.g., http://localhost:8080 if you chose port 8080).

That's it! You've successfully run the Stock Recommendation App using a Docker image.