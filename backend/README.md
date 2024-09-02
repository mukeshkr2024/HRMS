To set up the HRM backend project, follow these steps:

1.  **Clone the Repository:**

    ```
    git clone -b dev https://github.com/mukeshkr2024/HRM-backendv1.git
    ```

2.  **Install Dependencies:**

    ```
    cd HRM-backendv1
    npm install
    ```

3.  **Set Up Environment Variables:**

    - Copy the fields from `.env.example` and create a new file named `.env`.
    - Add the necessary environment variables with their respective values. Example:
      ```
      PORT=8000
      ORIGIN=http://localhost:3000 # Frontend URL
      DB_URL=mongodb://admin:password@localhost:27017/hrm_database
      ```

4.  **Set Up MongoDB:**

    - You can either use a local MongoDB instance or run it with Docker.
    - **Local MongoDB:**
      - Set `MONGODB_URL` in `.env` to your local MongoDB URL.
    - **Docker:**
      - Create a Docker network:
        ```
        docker network create mongodb_network
        ```
      - Run MongoDB container:
        ```
        docker run -d \
        --name mongodb \
        --network mongodb_network \
        -p 27017:27017 \
        -e MONGO_INITDB_ROOT_USERNAME=admin \
        -e MONGO_INITDB_ROOT_PASSWORD=password \
        mongo
        ```

5.  **Run the Development Server:**

    ```
    npm run dev
    ```
