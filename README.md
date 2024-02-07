# Cloud Native Web Application

## Overview

This web application is a backend API developed using Node.js and Express, with PostgreSQL as the chosen database. Below are the steps to download, set up, and run the application.

## Prerequisites

Before getting started, make sure you have the following installed on your system:

- Node.js
- npm (Node Package Manager)
- PostgreSQL

## Installation and Setup

1. **Download and Unzip**

    Download the application from the Canvas platform and unzip the provided ZIP file.

2. **Install Dependencies**

    Open a terminal in the root folder of the application and run the following command:

    ```bash
    npm install
    ```

3. **Create .env file**

    Create a file named `.env` in the root folder and add the following content:

    ```env
    PG_USER=your_postgres_user
    PG_PASSWORD=your_postgres_password
    PG_DB=your_database_name
    PG_HOST=your_postgres_host
    ```

    Replace `your_postgres_user`, `your_postgres_password`, `your_database_name`, and `your_postgres_host` with your PostgreSQL credentials.

4. **Start PostgreSQL**

    - Run the following command to start the PostgreSQL server:

        ```bash
        sudo systemctl start postgresql
        ```

5. **Start the Application**

    In the root folder of the application, run the following command to start accepting requests:

    ```bash
    npm start
    ```

6. **Test the Application**

    Use a tool like Postman to test the functionality of the application. Send requests to the defined API endpoints.

## Additional Notes

- Ensure that the PostgreSQL server is running before starting application.
- The application is now ready to handle requests. Make sure to test thoroughly using Postman or a similar tool.
