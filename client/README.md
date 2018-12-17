# Mooncascade time tracking client

Angular based client for time entries tracking and testing. App created with [ng cli](https://cli.angular.io/).

## Requirements

* node (tested on 8.9.4)

## Getting started

```
npm i
npm start
```

Application is now listening on <localhost:4200>.

## Documentation

App consists of 2 parts:
* Test helper, which let's you add time entries for participants in given location
* Table displaying participants time entres in real time.

### Test helper

Consists of 2 input fields (selectors) that helps creating time entries for participants.
* `Select participant` includes all of the participants
* `Select location` includes locations of time entry:
    * Beggining of the finish corridor
    * Finish line

There are several restrictions as to how the time entry can be created:
* Has to have both participant and location selected
* Cannot add duplicate location entries
* Cannot add entry in finish line location if no entry in the beginning of the finish corridor exists

### Time entries table

Updates automatically on new time entry. No finish time date means that the user didn't cross the finish line yet.
