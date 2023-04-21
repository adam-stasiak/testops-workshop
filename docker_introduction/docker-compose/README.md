# Docker usage exercices

## cheat-sheet
```

docker ps: wyświetla listę aktywnych kontenerów.
docker-compose build:
docker-compose up: uruchamia aplikację składającą się z wielu kontenerów.
```


- [ ] Step 1: In folders web and api create Dockerfiles. Please verify whether images can be built and run.

    - [ ] **Web**
    * installs original python 3.9 image python:3.9-slim-buster
    FROM python:3.9-slim-buster
    * sets workdir for /app
    * copies app.py, templates/index.html, requirements.txt to /app folder
    * installs requirements using pip command
    * exposes port 8000
    * calls python with app.py argument
        <details>
        <summary><b>Solution</b></summary>

            FROM python:3.9-slim-buster
            WORKDIR /app
            COPY app.py /app
            COPY templates/index.html /app/templates/
            COPY requirements.txt /app
            RUN pip install --no-cache-dir -r requirements.txt 
            EXPOSE 8000
            CMD ["python", "app.py"]
    
        </details>

    - [ ] **Api**
    * installs original node:14
    * sets workdir for /app
    * copies package.json, index.js to /app folder
    * installs requirements using npm install command
    * exposes port 3000
    * calls node with start argument
        <details>
        <summary><b>Solution</b></summary>

            FROM node:14
            WORKDIR /app
            COPY package.json /app
            COPY index.js /app
            RUN npm install
            EXPOSE 3000
            CMD ["npm", "start"]

        </details>

- [ ] Step 2: In docker-compose folder create ```docker-compose.yaml```.
    - [ ] Define default template with two services. In place of variables place correct values matching project files.
        ```
        services:
            api:
                build:
                    context: ${backend_folder_name}
                    dockerfile: Dockerfile
                ports:
                    - "${api_host_port}:${api_container_port}"
                networks:
                    - default
            web:
                build:
                    context: ${web_folder_name}
                    dockerfile: Dockerfile
                ports:
                    - "${web_host_port}:${web_container_port}"
                networks:
                    - default
        ```
        <details>
            <summary><b>Solution</b></summary>

            services:
                api:
                    build:
                        context: backend
                        dockerfile: Dockerfile
                    ports:
                        - "3000:3000"
                    networks:
                        - default
                web:
                    build:
                        context: web
                        dockerfile: Dockerfile
                    ports:
                        - "8000:8000"
                    networks:
                        - default
        </details>
    - [ ] Build containers with docker-compose matching command and run containers. Verify you can curl api ```/hello``` endpoint from your machine and visit frontend. Use ```localhost:${web_host_port}``` for frontend and ```localhost:${api_host_port}/hello``` for api. 

         <details>
            <summary><b>Solution</b></summary>

            docker-compose build && docker-compose up

            You should see output in console like:
            api_1  | 
            api_1  | > my-api@1.0.0 start /app
            api_1  | > node index.js
            api_1  | 
            api_1  | Server listening on port 3000
            web_1  |  * Serving Flask app 'app'
            web_1  |  * Debug mode: on
            web_1  | WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
            web_1  |  * Running on all addresses (0.0.0.0)
            web_1  |  * Running on http://127.0.0.1:8000
            web_1  |  * Running on http://172.25.0.3:8000
            web_1  | Press CTRL+C to quit
            web_1  |  * Restarting with stat
            web_1  |  * Debugger is active!
            web_1  |  * Debugger PIN: 597-877-487
        </details>