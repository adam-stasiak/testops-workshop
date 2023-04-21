# Docker usage exercices

## images

```
docker run: starts container with given image.
docker ps: displays list of available containers.
docker stop: stops the container.
docker rm: removes stopped container.
docker images: displays list of images.
docker rmi: removes unused images.
docker build: builds image from dockerfile.
docker-compose up: launches application built with multiple containers.
docker exec: launches command in running container.
docker logs: displays logs from running container.
docker inspect: shows info about container / image.
```

Exercises:

- [ ] Pull docker image `alpine` and build Dockerfile which would copy local item .txt to container. Set /bin/sh the default action for container.

    <details>
    <summary><b>Solution</b></summary>
    
    ```bash
    FROM alpine
    WORKDIR /app
    COPY file.txt .
    CMD ["/bin/sh"]
    ```
    </details>

  Then it would use bash command in Dockerfile to replace all characters A with B and would save it to file2.txt.

  ```bash
  #Command to use:
  sed "s/A/B/g" file.txt | tee file2.txt
  ```

  Run newly created container with `docker run -it` command. Use command `docker ps` to find latest `container ID` of container using your image.

    <details>
    <summary><b>Solution</b></summary>
    
    ```bash
    docker run -it ImageID
    ```
    </details>

  In seperated terminal try to access logs from this container. Use `docker logs -f ContainerID` command.

  Execute bash command to see file2.txt content on running container to see output. Try to make it in the same terminal window where you used `docker run -it` and try to execute `docker exec containerId cat file2.txt`. Try to explain the observation.
  <details>
    <summary><b>Solution</b></summary>
    `docker logs` shows you only output from CMD/Entrypoint of container and skipping any other output. It is because we are getting information only from one single shell. 
    </details>

TODO - DOCKER MULTI STAGE
