# Mooncascade time tracker API

## Requirements

* Node (tested on version 8.9.4)
* Docker
* Docker-compose

## Getting started

Docker and docker-compose are required to spin up the container containing the db (postgres). Sequelize is used to manage models, perform migrations and seed the db. Useful sequelize script are available in [package.json file](./package.json) under `scripts` property.

```
npm i
npm run docker:dev-db
npm start
```

API is now available on <http://localhost:3000/>.

## Documentation
Documentation for REST endpoints available under <http://localhost:3000/docs> route.

Server is also using [Socket.io](https://socket.io/) for real time, event-based communication.

Events that the client can listen to

| name | description | returns |
| ---- | ----------- | ------- |
| new entry | emitted whenever new time entry is added to the db | [TimeEntryPayload](#TimeEntryPayload) |

<h3 name="TimeEntryPayload">TimeEntryPayload schema</h3>

```
{
    Participant: {
        id,
        chipId,
        startNumber,
        firstName,
        lastName,
        createdAt,
        updatedAt
    },
    id,
    chipId,
    location,
    createdAt,
    updatedAt
}
```

