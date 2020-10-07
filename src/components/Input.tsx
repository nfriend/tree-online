import React, { createRef, RefObject } from 'react';
import { connect } from 'react-redux';
import Editor from 'react-simple-code-editor';
import { bindActionCreators, Dispatch } from 'redux';
import { updateSource } from '../store/source/actions';
import { SourceState } from '../store/source/types';
import './Input.scss';

interface InputProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  source: string;
  updateSource: typeof updateSource;
}

export class Input extends React.Component<InputProps> {
  editorRef: RefObject<HTMLDivElement>;

  constructor(props: Readonly<InputProps>) {
    super(props);
    this.editorRef = createRef();
  }

  componentDidMount() {
    // Ideally, it would be possible to just call
    // a .focus() method on the Editor instance instead:
    // https://github.com/satya164/react-simple-code-editor/issues/25
    if (this.editorRef.current) {
      const editorTextarea = this.editorRef.current.querySelector('textarea');
      if (editorTextarea) {
        // focus the code editor
        editorTextarea.focus();

        // move the cursor to the end
        editorTextarea.setSelectionRange(
          editorTextarea.value.length,
          editorTextarea.value.length,
        );
      }
    }
  }

  /**
   * Applies no syntax highlighting.
   * Required for TypeScript compilation.
   */
  highlight = (code: string) => <React.Fragment>{code}</React.Fragment>;

  render() {
    return (
      <div
        ref={this.editorRef}
        className={`input p-2 d-flex rounded-sm ${this.props.className}`}
      >
        <Editor
          className="flex-grow-1"
          value={this.props.source}
          onValueChange={this.props.updateSource}
          highlight={this.highlight}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ source }: { source: SourceState }) => ({
  source: source.source,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ updateSource }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Input);
