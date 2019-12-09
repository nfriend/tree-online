import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import './App.scss';
import { ReactComponent as GitLabLogo } from './gitlab-logo.svg';
import Input from './Input';
import Menu from './Menu';
import Tree from './Tree';

interface AppState {
  deploymentStatus: JSX.Element | string;
}

export class App extends React.Component<void, AppState> {
  state: AppState = {
    deploymentStatus: '',
  };

  componentDidMount() {
    const formatString = 'Y/MM/DD \\a\\t HH:mm:ss ZZ';

    if (process.env.NODE_ENV === 'production') {
      const buildMoment = moment('%%%GITLAB_CI_TIMESTAMP%%%');
      const deployedTimestamp = buildMoment.format(formatString);
      const deployedAgo = buildMoment.fromNow();
      const commitSha = '%%%CI_COMMIT_SHORT_SHA%%%';
      const commitLink = `%%%CI_PROJECT_URL%%%/commit/${commitSha}`;

      this.setState({
        deploymentStatus: (
          <span>
            Last deployed on {deployedTimestamp} ({deployedAgo}) for commit{' '}
            <a href={commitLink}>{commitSha}</a>
          </span>
        ),
      });
    } else {
      this.setState({
        deploymentStatus: `Running locally. The current date is ${moment().format(
          formatString,
        )}`,
      });
    }
  }

  render() {
    return (
      <div className="app px-3 pt-2 d-flex w-100 h-100 position-absolute flex-column">
        <div className="flex-grow-0 flex-shrink-0 d-flex align-items-center mb-2">
          <div className="flex-even d-flex align-items-center flex-column flex-sm-row">
            <h1 className="mr-4 mb-0">tree.nathanfriend.io</h1>
            <a
              className="my-2 my-sm-0"
              href="https://gitlab.com/nfriend/tree-online#tree-online"
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
          <p className="text-muted text-center text-sm-left mb-2 mb-md-0 pr-4 mr-auto">
            {this.state.deploymentStatus}
          </p>
          <div className="d-flex flex-column flex-sm-row align-items-center align-items-sm-start mb-2 mt-md-0">
            <a
              className="pr-4 view-source-on-gitlab-link no-wrap"
              href="https://gitlab.com/nfriend/tree-online"
            >
              View the source on Gitlab
              <GitLabLogo />
            </a>
            <a
              className="pipeline-status-link mt-2 mt-sm-0 mb-4 mb-md-0"
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
