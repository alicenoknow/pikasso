import React from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";

interface Props {
  setCode: (code: string) => void;
}

interface State {
  code: string;
}

export default class CodeInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { code: "" };
  }

  render() {
    const { setCode } = this.props;

    return (
      <CodeEditor
        value={this.state.code}
        placeholder="Please enter your code here..."
        onChange={(evn) => setCode(evn.target.value)}
        padding={15}
        style={{
          margin: 10,
          width: window.innerWidth * 0.5 - 20,
          fontSize: 15,
          backgroundColor: "#f5f5f5",
          fontFamily:
            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
        }}
      />
    );
  }
}
