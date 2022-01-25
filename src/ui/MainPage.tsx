import React from "react";
import { parse, SyntaxError } from "../compiler/grammar2";
import CanvaOutput from "./CanvaOutput";
import CodeInput from "./CodeInput";
import ResponseWidget from "./ResponseWidget";
import Button from "react-bootstrap/Button";
import { CompilationStatus } from "./utils/CompilationStatus";
import { Compiler } from "../compiler/Compiler";
import InfiniteLoopError from "./utils/InfiniteLoopError";

interface Props {}

interface State {
  rawCode: string | undefined;
  compilationsStatus: CompilationStatus;
  errorMessage: string | undefined;
  instructions: (() => JSX.Element)[];
}

export default class MainPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      rawCode: undefined,
      compilationsStatus: CompilationStatus.None,
      errorMessage: undefined,
      instructions: [],
    };
  }

  parseRawCode = () => {
    const { rawCode } = this.state;
    if (rawCode) {
      try {
        const result = parse(rawCode);
        const compiler = new Compiler();
        const instructions = compiler.compile(result);
        this.setState({
          instructions: instructions,
          compilationsStatus: CompilationStatus.Success,
        });
      } catch (err: any) {
        let errorMessage;
        if (err instanceof SyntaxError) {
          errorMessage = err.format([{ source: rawCode, text: rawCode }]);
        } else if (err instanceof InfiniteLoopError) {
          errorMessage = "Infinite loop! Max number of iterations exceeded.";
        } else {
          errorMessage = "Sorry, something went wrong :c";
        }
        console.warn(err);
        this.setState({
          errorMessage: errorMessage,
          compilationsStatus: CompilationStatus.Error,
        });
      }
    }
  };

  render() {
    const { compilationsStatus, instructions, errorMessage } = this.state;
    return (
      <div className="mainPage">
        <div className="buttonContainer">
          <Button variant="outline-success" onClick={() => this.parseRawCode()}>
            Compile
          </Button>
        </div>
        <div className="flexRow">
          <CodeInput setCode={(code) => this.setState({ rawCode: code })} />
          <CanvaOutput shapes={instructions} />
        </div>
        <ResponseWidget
          errors={errorMessage}
          compilationStatus={compilationsStatus}
        />
      </div>
    );
  }
}
