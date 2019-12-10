import moment from 'moment';
import React from 'react';

interface DeploymentStatusState {
  deploymentStatus: JSX.Element | string;
}

interface DeploymentStatusProps
  extends React.HtmlHTMLAttributes<HTMLSpanElement> {}

export class DeploymentStatus extends React.Component<
  DeploymentStatusProps,
  DeploymentStatusState
> {
  state: DeploymentStatusState = {
    deploymentStatus: '',
  };

  constructor(props: DeploymentStatusProps) {
    super(props);

    const formatString = 'Y/MM/DD \\a\\t HH:mm:ss ZZ';

    if (process.env.NODE_ENV === 'production') {
      const buildMoment = moment('%%%GITLAB_CI_TIMESTAMP%%%');
      const deployedTimestamp = buildMoment.format(formatString);
      const deployedAgo = buildMoment.fromNow();
      const commitSha = '%%%CI_COMMIT_SHORT_SHA%%%';
      const commitLink = `%%%CI_PROJECT_URL%%%/commit/${commitSha}`;

      this.state.deploymentStatus = (
        <span>
          Last deployed on {deployedTimestamp} ({deployedAgo}) for commit{' '}
          <a className="hide-offline" href={commitLink}>
            {commitSha}
          </a>
          <b className="hide-online">{commitSha}</b>
        </span>
      );
    } else {
      this.state.deploymentStatus = `Running locally. The current date is ${moment().format(
        formatString,
      )}`;
    }
  }

  render() {
    return this.state.deploymentStatus;
  }
}
