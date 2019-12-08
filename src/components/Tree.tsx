import React from 'react';
import { connect } from 'react-redux';
import { AppState, getTree } from '../store';
import './Tree.scss';

interface TreeProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  tree: string;
}

export class Tree extends React.Component<TreeProps> {
  render() {
    return (
      <div className={`tree p-2 rounded-sm ${this.props.className}`}>
        {this.props.tree}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  tree: getTree(state),
});

export default connect(mapStateToProps)(Tree);
