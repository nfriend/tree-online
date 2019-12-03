# Tree Online

<a href="https://gitlab.com/nfriend/tree-online/pipelines" target="_blank"><img src="https://gitlab.com/nfriend/tree-online/badges/master/pipeline.svg" alt="GitLab build status"></a>

An online [tree](http://mama.indstate.edu/users/ice/tree/)-like utility for generating ASCII folder structure diagrams. Written in [TypeScript](https://www.typescriptlang.org/) and [React](https://reactjs.org/).

<img alt="The Tree Online logo" src="public/tree-logo.png" width="200"/>

## `tree` implementation

If you're curious about this project's implementation of `tree`, check out [src/lib/](src/lib/), and more specifically, [src/lib/generate-tree.ts](src/lib/generate-tree.ts).

## Developing

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), so it contains all the scripts you know and love:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Deploying

This project is deployed automatically using Gitlab CI/CD to GitLab Pages, so simply `git push` on `master` to trigger a new deployment.
