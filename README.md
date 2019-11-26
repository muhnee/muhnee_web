# muhnee_site

The Web Version of Muhnee

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

### Environment Variables

To run this app setup `.env` file with your app details

```
REACT_APP_FIREBASE_PROJECT=<google-cloud-project-id>
```
