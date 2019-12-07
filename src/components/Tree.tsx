import React from 'react';
import { connect } from 'react-redux';
import { TreeState } from '../store/tree/types';
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

const mapStateToProps = ({ tree: state }: { tree: TreeState }) => ({
  tree: state.tree,
});

export default connect(mapStateToProps)(Tree);
