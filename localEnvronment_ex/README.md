# Local environment

## Prerequisities

Before your start with CI/CD areas please make sure that on your machine you have an access to:

- git
- docker desktop
- docker compose
- Visual Studio Code / other IDE
- node

Make sure that commands like it here are working:

- git pull <>
- docker build .
- docker-compose up
- npm install
- npx run test

## Build docker-compose

We need to create docker-compose file built with these services:

- jenkins
- db
- testlink

That means our docker-compose file would require definition of three services. Create docker-compose.yaml file.

### Jenkins details

Please make this container using these parameters:

```
image: jenkins/jenkins:lts-jdk11
restart: unless-stopped
priviliged: true
user: root
container_name: jenkins/jenkinsLocal/whatever:)
volumes:
      - ~/jenkins:/var/jenkins_home
      - /var/run/docker.sock:/var/run/docker.sock
      - /usr/local/bin/docker:/usr/local/bin/docker

```

Don't forget about exposing ports. We need to expose port 8080 to any local port (for example 8089) and 5000 to any local port.

### DB

For testlink we need to setup database. Let's use 'bitnami/mariadb:latest' image.
We need to specify some environment variables:

```
ALLOW_EMPTY_PASSWORD=yes
MARIADB_ROOT_PASSWORD=admin
MARIADB_USER=admin
MARIADB_PASSWORD=admin
MARIADB_DATABASE=bitnami_testlink
```

For physical storage we need to mount volume. Let's make it under './mysql_db:/bitnami' directory.

### Testlink

For testlink let's use image 'bitnami/testlink:1.9.20-debian-10-r301'. Define environment variables:

```
     TESTLINK_USERNAME=admin
     TESTLINK_PASSWORD=admin
     TESTLINK_API_ENABLED=true
     TESTLINK_EMAIL=admin@admin.com
     TESTLINK_DATABASE_USER=admin
     TESTLINK_DATABASE_PASSWORD=admin
     TESTLINK_SMTP_HOST=smtp.gmail.com
     TESTLINK_SMTP_PORT=587
     TESTLINK_SMTP_USER=aaa@aaa.com
     TESTLINK_SMTP_PASSWORD=your_password
```

Add also parameters:

```
  user: root
  volumes:
    - './testlink_data:/bitnami'
```

You need to expose 8080 and 8443 to any local (for example 80 and 443).

To make Testlink service working properly please specify additional option to depend on db container (depends_on: container_name).

## Final docker-compose

As you configured your docker-compose you can verify service is working with `docker-compose up` command.

Sometimes you can see issues with Private File Sharing. In order to fix that open Docker Application and go to Preferences. Under Resources / File Sharing section you can add realted folder like for example: `/Users/<username>/testops-workshop`.

## Testlink Configuration

- visit service at localhost:80 (if you followed suggested port)
- login as admin/admin
- Create new project – for example `TestProject` with test identifiers `TP`
- Create new Suite – Smoke Suite
- Add new test cases
- Create test plan
- Assign test cases to new test plan
- Create new build
- Try to execute testcases ( test execution result is set in bottom section of UI with :) :( icons – it is not obvious)

## Jenkins configuration

Once you trigger docker-compose environment you should be able to retrieve admin secret (password). Connect to jenkins container and using bash command `cat /var/jenkins_home/secrets/initialAdminPassword` retrieve password.

- Visit localhost:8089
- login as admin/yourSecret
- install suggested plugins (we would add some other later)
- add new project – use type: Multibranch pipeline
- set parameters like display name, description as you wish
- add Branch sources (github address to your fork or my repo)
- Setup build configuration. Mode – by Jenkinsfile. Script Path: Jenkinsfile
- Verify you are able to trigger build option
- Connect to your jenkins container and install docker and docker-compose.
  `apt-get update && apt-get install docker docker-compose`.
