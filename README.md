# Configuration & Deployment

## Installation

### 1. Clone the repository

There are 2 ways to download the repository from GitHub:

1. **Download as a ZIP file**: Navigate to the main page of the repository on GitHub, click the "Code" button, and then click "Download ZIP". You will then extract the ZIP file to access the project files.
2. **Clone with Git:** If you have Git installed on your device, you can log the following command into your terminal to clone the repository:
   `git clone https://github.com/1uoyuuu/deco3200-reefstore.git`

### 2. Download Node.js

Make sure you have downloaded node.js on your machine, if you are not sure, you can check your node verision with `node --version`. You can download node.js from [Node.js Download](https://nodejs.org/en/download). I have used Node.js **version 16.x** for this project, so make sure your Node.js version is compatible.

### 3. Install necessary dependencies

Once you have opened the project folder in your code editor (such as Visual Studio Code) and have a terminal open, follow these steps to install the necessary packages and run the web app:

1. In your terminal, type `npm install` and hit Enter. This command will initiate the installation process for all the required packages needed to run the web app.
2. Depending on your internet connection and the size of the packages, the installation may take some time, especially if it's your first time running the app. Please be patient and let the process complete.

Once the installation is finished, you can proceed with running the web app.

### 4. Start the server and play around

To start the web server on your local host, follow these steps:

1. In your terminal, type `npm run dev` and hit Enter. This command will initiate the web server and begin the application's execution.
2. Wait for the process to complete. Once it finishes, you will see a message displaying **`Local: http://localhost:5173`**.
3. To open the application, simply click on the provided link. If you're using a Mac, you can use the shortcut (cmd+click) to open the link or simply press `o`.
4. For the optimal experience, it is recommended to adjust your browser window size to match the provided optimal screen sizes (Optional).

## Optimal Screen Size

This web application primarily focuses on the desktop version. During the design and testing phase, specific window sizes were used as the basis for ensuring a seamless user experience. These sizes are as follows:

- Desktop: **1440 x 900** (Macbook Pro 13")

While the application has been primarily optimized for these specific screen sizes, the use of relative units like rem ensures that it should adapt reasonably well to other popular screen sizes. However, due to time constraints, comprehensive testing across all possible screen sizes may not have been conducted.
