import React from 'react';
import { connect } from 'react-redux';
import './App.scss';
import { DeploymentStatus } from './DeploymentStatus';
import { ReactComponent as GitLabLogo } from './gitlab-logo.svg';
import Input from './Input';
import Menu from './Menu';
import Tree from './Tree';

interface AppState {
  networkStatus: 'offline' | 'online';
}

export class App extends React.Component<void, AppState> {
  state: AppState = {
    networkStatus: window.navigator.onLine ? 'online' : 'offline',
  };

  componentDidMount() {
    window.addEventListener('offline', () =>
      this.setState({ networkStatus: 'offline' }),
    );
    window.addEventListener('online', () =>
      this.setState({ networkStatus: 'online' }),
    );
  }

  render() {
    return (
      <div
        className={`app px-3 pt-2 d-flex w-100 min-vh-100 position-absolute flex-column ${this.state.networkStatus}`}
      >
        <div className="flex-grow-0 flex-shrink-0 d-flex align-items-center mb-2">
          <div className="flex-even d-flex align-items-center flex-column flex-sm-row">
            <h1 className="mr-4 mb-0">tree.nathanfriend.io</h1>
            <a
              className="my-2 my-sm-0 hide-offline"
              href="https://gitlab.com/nfriend/tree-online#what-is-this"
            >
              What is this?
            </a>
          </div>
          <Menu className="flex-even pl-4 d-none d-lg-flex" />
        </div>
        <div className="flex-grow-1 d-flex flex-column flex-lg-row">
          <div className="flex-even d-flex mr-0 mr-lg-2">
            <Input className="flex-grow-1" />
          </div>
          <div className="flex-even">
            <Tree className="flex-grow-1" />
          </div>
          <Menu className="d-flex d-lg-none pt-2 pb-5" />
        </div>
        <div className="flex-grow-0 flex-shrink-0 d-flex align-items-center align-items-sm-start mt-2 flex-column flex-md-row">
          <p className="text-muted text-center text-sm-left mb-2 pr-0 pr-sm-4 mr-auto">
            <DeploymentStatus />
          </p>
          <div className="d-flex flex-column flex-sm-row align-items-center align-items-sm-start mb-2 mt-md-0">
            <a
              className="pr-0 pr-sm-4 view-source-on-gitlab-link no-wrap hide-offline"
              href="https://gitlab.com/nfriend/tree-online"
            >
              View the source on Gitlab
              <GitLabLogo />
            </a>
            <a
              className="pipeline-status-link mt-2 mt-sm-0 mb-4 mb-md-0 hide-offline"
              href="https://gitlab.com/nfriend/tree-online/pipelines"
            >
              <img
                src="https://gitlab.com/nfriend/tree-online/badges/master/pipeline.svg"
                alt="GitLab build status"
              />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(App);
