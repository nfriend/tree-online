import React from 'react';
import { connect } from 'react-redux';
import Editor from 'react-simple-code-editor';
import { bindActionCreators, Dispatch } from 'redux';
import { updateSource } from '../store/tree/actions';
import { TreeState } from '../store/tree/types';

interface InputProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  source: string;
  updateSource: typeof updateSource;
}

export class Input extends React.Component<InputProps> {
  /**
   * Applies no syntax highlighting.
   * Required for TypeScript compilation.
   */
  highlight = (code: string) => code;

  render() {
    return (
      <div className={`bg-dark p-2 rounded-sm ${this.props.className}`}>
        <Editor
          value={this.props.source}
          onValueChange={this.props.updateSource}
          highlight={this.highlight}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ tree }: { tree: TreeState }) => ({
  source: tree.source,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ updateSource }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Input);
