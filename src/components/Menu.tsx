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
const SHARE = 'Share';
const COPIED = 'Copied!';
const URL_COPIED = 'URL copied!';
const BUTTON_TEXT_TIMEOUT = 1200;

interface MenuState {
  copyButtonText: string;
  shareButtonText: string;
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
    shareButtonText: SHARE,
  };

  onCopy = () => {
    this.setState({ copyButtonText: COPIED });
    setTimeout(() => {
      this.setState({ copyButtonText: COPY });
    }, BUTTON_TEXT_TIMEOUT);
  };

  onShare = () => {
    this.setState({ shareButtonText: URL_COPIED });
    setTimeout(() => {
      this.setState({ shareButtonText: SHARE });
    }, BUTTON_TEXT_TIMEOUT);
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
      // 'd-flex' class is applied by parent to allow for responsive behavior
      <div
        className={`menu align-items-center ${this.props.className} flex-column flex-sm-row`}
      >
        <div
          className="btn-group mr-4 align-self-stretch align-self-md-center"
          role="group"
          aria-label="Copy and share buttons"
        >
          <CopyToClipboard text={this.props.tree} onCopy={this.onCopy}>
            <button className="btn btn-success copy-button py-3 py-sm-0">
              <b>{this.state.copyButtonText}</b>
            </button>
          </CopyToClipboard>

          <CopyToClipboard text={window.location.href} onCopy={this.onShare}>
            <button className="btn btn-secondary share-button">
              {this.state.shareButtonText}
            </button>
          </CopyToClipboard>
        </div>

        <div className="d-flex align-items-center flex-wrap mt-4 mt-sm-0">
          <label className="d-flex align-items-center my-1 mr-3">
            <Toggle
              className="mr-1 options-toggle"
              defaultChecked={this.props.fancy}
              onChange={this.onFancyChanged}
              icons={false}
            />
            <span className="no-wrap">Fancy</span>
          </label>

          <label className="d-flex align-items-center my-1 mr-3">
            <Toggle
              className="mr-1 options-toggle"
              defaultChecked={this.props.fullPath}
              onChange={this.onFullPathChanged}
              icons={false}
            />
            <span className="no-wrap">Full path</span>
          </label>

          <label className="d-flex align-items-center my-1">
            <Toggle
              className="mr-1 options-toggle"
              defaultChecked={this.props.trailingSlash}
              onChange={this.onTrailingSlashChanged}
              icons={false}
            />
            <span className="no-wrap">Trailing /</span>
          </label>
        </div>
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
