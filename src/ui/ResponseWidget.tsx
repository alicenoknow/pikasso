import React from "react";
import { Card } from "react-bootstrap";
import { CompilationStatus } from "./utils/CompilationStatus";

interface Props {
  compilationStatus: CompilationStatus;
  errors: string | undefined;
}

export default class CodeInput extends React.Component<Props> {
  render() {
    const { errors, compilationStatus } = this.props;
    if (compilationStatus === CompilationStatus.None) {
      return null;
    }
    const isError = compilationStatus === CompilationStatus.Error;
    const title = isError ? "Error 🥶\n" : "Success\n";
    const body = isError ? errors : "Compiled successfully! 🙌";
    return (
      <div className={isError ? "error" : "success"}>
        <span className="title">{title}</span>
        <span className="body">{body}</span>
      </div>
    );
  }
}
