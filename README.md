# Syncano Socket for Slack

[![Syncano Socket](https://img.shields.io/badge/syncano-socket-blue.svg)](https://syncano.io)
[![CircleCI branch](https://img.shields.io/circleci/project/github/eyedea-io/syncano-socket-slack/master.svg)](https://circleci.com/gh/eyedea-io/syncano-socket-slack/tree/master)
![Codecov branch](https://img.shields.io/codecov/c/github/eyedea-io/syncano-socket-slack/master.svg)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![npm](https://img.shields.io/npm/dw/@eyedea-sockets/slack.svg)](https://www.npmjs.com/package/@eyedea-sockets/)
![license](https://img.shields.io/github/license/eyedea-io/syncano-socket-slack.svg)

Main Socket features:

* **slack/invite** — handle invitations
* **slack/list** — list all Slack users

## Getting Started

Install package in your project:

```sh
cd my_project
npm install @syncano/cli --save-dev
npm install @eyedea-sockets/slack --save
npx s deploy
```

Use it:

```js
import Syncano from @syncano/core

const s = new Syncano(<instaneName>)

// Invitation
const params = {
  email: 'john@doe.com',
  token: 'xoxp-17802080787-17802080963-23787252214-e634269418'
}
const invitationStatus = await s.get('slack/invite', params)

// Listing users 
const params = {
  token: 'xoxp-17802080787-17802080963-23787252214-e634269418'
}
const usersList = await s.get('slack/list', params)
```

## Endpoints

### slack/list

#### Input:

No input parameters.

#### Outputs:

**success** - **Opertaion Successful**

- Code: 200
- Mimetype: application/json
  
| Parameter | Type   | Description           | Example                                     |
|-----------|--------|-----------------------|---------------------------------------------|
| users     | array  | List of users         | `[{"id": "1234", "username": "mkucharz"}]`  |


**fail** - **Opertaion failed**

- Code: 400
- Mimetype: application/json

| Parameter | Type   | Description            | Example              |
|-----------|--------|------------------------|----------------------|
| message   | string | Invitation failed      | `Internal error.`    |

### slack/invite

#### Input:

|Parameter | Type | Required  | Example               |
|----------|------|-----------|-----------------------|
|email     |string|       Yes | `john.snow@eyedea.io` |

#### Outputs:

**success** - **Opertaion Successful**

- Code: 200
- Mimetype: application/json

| Parameter | Type   | Description           | Example                    |
|-----------|--------|-----------------------|----------------------------|
| message   | string | Invitation successful | `User invited sucessfuly!` |


**fail** - **Opertaion failed**

- Code: 400
- Mimetype: application/json

| Parameter | Type   | Description            | Example                 |
|-----------|--------|------------------------|-------------------------|
| message   | string | Invitation failed      | `User already invited!` |
