# xoGame
**Project Name: XO Game**

## Introduction
This is a simple XO game implemented as a web application using HTML, CSS, and JavaScript. The game allows players to choose the board size (3x3, 4x4, or 5x5) and play against each other on a grid. This README provides instructions on how to set up the project, run the program, and an overview of the program's design and algorithms.

## Table of Contents
1. [Setup](#setup)
2. [Run the Program](#run-the-program)
3. [Program Design](#program-design)
4. [Algorithm](#algorithm)

## Setup
To set up the xo game on your local machine, follow these steps:

1. Install Node.js and npm:
   - Visit the Node.js website (https://nodejs.org) and download the appropriate installer for your operating system.
   - Double-click the downloaded installer and follow the installation instructions to install Node.js and npm.

2. Install MongoDB:
### MongoDB Setup Guide

#### MongoDB Atlas Account Creation:
1. Go to the MongoDB Atlas website (https://www.mongodb.com/cloud/atlas) and sign up for a new account if you don't have one.
2. Log in to your MongoDB Atlas account.

#### Create a Cluster in MongoDB Atlas:
1. Once logged in, click "Build a Cluster" and configure the settings according to your requirements.
2. After the cluster is created, click "Connect" to proceed.

#### Add IP Address to Access the Cluster:
1. In the "Cluster" section, click "Security" and select "IP Whitelist."
2. Click "Add IP Address" to allow access to the cluster from your IP address (you can choose to make it public or specific to your machine).

#### Create Database User:
1. In the "Cluster" section, click "Database Access" and select "ADD NEW DATABASE USER."
2. Provide a username and password for your user, then click "Add User."

#### Get MongoDB URI:
1. In the "Cluster" section, click "Connect" and select "Connect your application."
2. Choose the Node.js version you want to use and copy the MongoDB URI.

### MongoDB Compass Setup

1. Download MongoDB Compass:
   - Go to the MongoDB Compass website (https://www.mongodb.com/try/download/compass) and download MongoDB Compass for your operating system.
   - Double-click the downloaded installer and follow the installation instructions for MongoDB Compass.

2. Connect to MongoDB Atlas:
   - Open MongoDB Compass and click "Connect" to establish a connection with MongoDB Atlas.
   - Enter the MongoDB URI you obtained from MongoDB Atlas and click "Connect."

### Set Up MongoDB URI in server.js

1. In project, locate the "server.js" file or the file responsible for connecting to the MongoDB database.

2. Edit the URI in "server.js":
   - Find the part where the MongoDB URI is set, e.g., `const MONGO_URI = "YOUR_MONGODB_URI";`
   - Replace "YOUR_MONGODB_URI" with the MongoDB URI you obtained from MongoDB Atlas.

Once you complete these steps, you can run the Tic-Tac-Toe program on your computer and enjoy the game!

3. Clone the Repository:
   ```
   git clone https://github.com/KSdesu06/xoGame.git
   cd your folder
   ```

4. Install Dependencies:
   ```
   npm install
   ```

## Run the Program
To run the xo game, execute the following command:

```
go to terminal in your folder.
then type node server.js
```

click file `chooseboard.html` to play the game.

## Program Design
The xo game is designed as a web application using HTML, CSS, and JavaScript. The game allows players to select the board size and play the game on the chosen grid.

The main components of the program are:
- `chooseboard.html`: This HTML file presents the user interface to select the board size.
- `board3x3.html`, `board4x4.html`, `board5x5.html`: These HTML files represent the game boards for 3x3, 4x4, and 5x5 grids, respectively.
- `styles.css`: This CSS file provides styling for the user interface.
- `TableGame3x3.js` `TableGame4x4.js` `TableGame5x5.js` v: These JavaScript file contains the game logic, including functions to check the game status, determine the winner, and handle player moves.

## Algorithm
The algorithm used in the Tic-Tac-Toe game is straightforward and based on simple checks to determine the game status. The main algorithms used in the game include:
1. Check Winner: A function that checks the grid to determine if there is a winner after each move.
2. Move Selection: A function that handles player moves and selects the appropriate position on the grid.
3. Check Empty Grid: A function that checks if the grid cell is empty before allowing a move.
4. Check Game Status: A function that checks if the game has ended in a win or a draw after each move.

## Conclusion
You have successfully set up the xo game on your local machine and learned about the program's design and algorithms. Have fun playing xo game! If you encounter any issues or have suggestions for improvements, feel free to contribute to the repository. Happy gaming!
