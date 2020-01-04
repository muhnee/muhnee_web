# muhnee_site

The Web Version of Muhnee

# Development

## Status

| Workflow                            | Status                                                                                                                                                                                 |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Github Build and Deploy to Firebase | [![build status](https://github.com/muhnee/muhnee_web/workflows/Build%20and%20Deploy/badge.svg)](https://github.com/muhnee/muhnee_web/actions?query=workflow%3A%22Build+and+Deploy%22) |

## Development Setup

### Login to Firebase

To login to firebase you will need to install firebase-tools and login to do this:

```sh
yarn add firebase-tools -g

# or if you like using npm

npm install -g firebase-tools
```

Then login to Firebase

```sh
firebase login
```

### Install Dependencies

To install the application depenencies, run

```sh
yarn

# or if you are not so fancy

npm install
```

### Environment Variables

To run this app setup `.env` file with your app details

```
REACT_APP_FIREBASE_PROJECT=<google-cloud-project-id>
```
