# node-base-project-hexagonal

- Base project in nest js with hexagonal architecture for nodejs.
- This base project supports migrations and seeders with TypeOrm.
- Auto documentation with swagger.
- Unit test & test e2e.


# Collaborators

- Gonzalo Patricio Telesio

# Install

Pre requirements : Make sure you have already installed both Docker Engine and Docker Compose.

- https://docs.docker.com/get-docker/
- https://docs.docker.com/compose/install/

MacOs Requirements: if compose throws FileNotFound error o similar, update Docker preferences:

- Go to Docker preferences and add the folder path in 'File Sharing' section:
  /var/lib/postgresql/data

- Click 'Apply and Restart' and run docker-compose again

# Initialization with docker

```bash
npm run initialize:docker:develop
```

# Start project with docker

```bash
npm run start:docker:develop
```

# Start project without docker

```bash
npm run start:dev
```

# Test

```bash
npm run test
```

# Documentation

Pre requirements : It is necessary to have the project running to be able to raise the swagger

To be able to see the swagger with all the api documentation enter the path

```bash
<BASE_URL>/api/docs
```

# Technologies

## Lenguajes

Javascript

## Frameworks & Library

- NestJS
- Jest
