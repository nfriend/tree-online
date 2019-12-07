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
      <div className="app p-3 d-flex w-100 h-100 position-absolute flex-column">
        <div className="flex-grow-0 flex-shrink-0 d-flex align-items-end mb-2">
          <h1 className="flex-even">tree.nathanfriend.io</h1>
          <Menu className="flex-even pl-4" />
        </div>
        <div className="flex-grow-1 d-flex">
          <div className="flex-even d-flex mr-2">
            <Input className="flex-grow-1" />
          </div>
          <div className="flex-even">
            <Tree className="flex-grow-1" />
          </div>
        </div>
        <div className="flex-grow-0 flex-shrink-0 d-flex align-items-start mt-2">
          <p className="text-muted text-right mb-0 pr-4 mr-auto">
            {this.state.deploymentStatus}
          </p>
          <a
            className="pr-4 view-source-on-gitlab-link"
            href="https://gitlab.com/nfriend/tree-online"
          >
            View the source on GitLab
            <GitLabLogo />
          </a>
          <a
            className="pipeline-status-link"
            href="https://gitlab.com/nfriend/tree-online/pipelines"
          >
            <img
              src="https://gitlab.com/nfriend/tree-online/badges/master/pipeline.svg"
              alt="GitLab build status"
            />
          </a>
        </div>
      </div>
    );
  }
}

export default connect()(App);
