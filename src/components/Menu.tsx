import React from 'react';
import { connect } from 'react-redux';
import CopyToClipboard from 'react-copy-to-clipboard';
import { TreeState } from '../store/tree/types';
import './Menu.scss';

const COPY = 'Copy';
const COPIED = 'Copied!';

interface MenuState {
  copyButtonText: string;
}

interface MenuProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  tree: string;
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

  render() {
    return (
      <div className={`menu d-flex align-items-center ${this.props.className}`}>
        <CopyToClipboard text={this.props.tree} onCopy={this.onCopy}>
          <button className="btn btn-primary copy-button">
            {this.state.copyButtonText}
          </button>
        </CopyToClipboard>
      </div>
    );
  }
}

const mapStateToProps = ({ tree: state }: { tree: TreeState }) => ({
  tree: state.tree,
});

export default connect(mapStateToProps)(Menu);
