import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';

interface AppState {
  deploymentStatus: JSX.Element | string;
}

class App extends React.Component {
  state: AppState = {
    deploymentStatus: '',
  };

  componentDidMount() {
    const buildMoment = moment('%%%GITLAB_CI_TIMESTAMP%%%');
    const formatString = 'Y/MM/DD \\a\\t HH:mm:ss ZZ';

    if (buildMoment.isValid()) {
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
      <div className="App p-4">
        <h1>Hello, world!</h1>
        <p>
          Welcome to <b>tree.nathanfriend.io!</b>
        </p>
        <p>
          This site is currently under construction. In the meantime, feel free
          to check out the source at{' '}
          <a href="https://gitlab.com/nfriend/tree-online">GitLab</a>!
        </p>
        <p className="text-muted">{this.state.deploymentStatus}</p>
        <a href="https://gitlab.com/nfriend/tree-online/pipelines">
          <img
            src="https://gitlab.com/nfriend/tree-online/badges/master/pipeline.svg"
            alt="GitLab build status"
          />
        </a>
      </div>
    );
  }
}

export default connect()(App);
