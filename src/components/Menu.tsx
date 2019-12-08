import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { connect } from 'react-redux';
import Toggle from 'react-toggle';
import { bindActionCreators, Dispatch } from 'redux';
import { AppState, getTree } from '../store';
import {
  updateFancy,
  updateFullPath,
  updateTrailingSlash,
} from '../store/options/actions';
import './Menu.scss';

const COPY = 'Copy';
const COPIED = 'Copied!';

interface MenuState {
  copyButtonText: string;
}

interface MenuProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  tree: string;
  fancy: boolean;
  fullPath: boolean;
  trailingSlash: boolean;
  updateFancy: (newValue: boolean) => void;
  updateFullPath: (newValue: boolean) => void;
  updateTrailingSlash: (newValue: boolean) => void;
}

export class Menu extends React.Component<MenuProps, MenuState> {
  state: MenuState = {
    copyButtonText: COPY,
  };

  onCopy = () => {
    this.setState({ copyButtonText: COPIED });
    setTimeout(() => {
      this.setState({ copyButtonText: COPY });
    }, 1200);
  };

  onFancyChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.updateFancy(event.target.checked);
  };

  onFullPathChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.updateFullPath(event.target.checked);
  };

  onTrailingSlashChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.updateTrailingSlash(event.target.checked);
  };

  render() {
    return (
      <div className={`menu d-flex align-items-center ${this.props.className}`}>
        <CopyToClipboard text={this.props.tree} onCopy={this.onCopy}>
          <button className="btn btn-success copy-button mr-4">
            <b>{this.state.copyButtonText}</b>
          </button>
        </CopyToClipboard>

        <label className="d-flex align-items-center mb-0 mr-4 ml-1">
          <Toggle
            className="mr-1 options-toggle"
            defaultChecked={this.props.fancy}
            onChange={this.onFancyChanged}
            icons={false}
          />
          <span>Fancy</span>
        </label>

        <label className="d-flex align-items-center mb-0 mr-4">
          <Toggle
            className="mr-1 options-toggle"
            defaultChecked={this.props.fullPath}
            onChange={this.onFullPathChanged}
            icons={false}
          />
          <span>Full path</span>
        </label>

        <label className="d-flex align-items-center mb-0">
          <Toggle
            className="mr-1 options-toggle"
            defaultChecked={this.props.trailingSlash}
            onChange={this.onTrailingSlashChanged}
            icons={false}
          />
          <span>Trailing /</span>
        </label>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  tree: getTree(state),
  fancy: state.options.fancy,
  fullPath: state.options.fullPath,
  trailingSlash: state.options.trailingSlash,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    { updateFancy, updateFullPath, updateTrailingSlash },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
