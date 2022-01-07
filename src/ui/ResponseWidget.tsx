import React from "react";
import { Card } from 'react-bootstrap';


interface Props {
    showMessage: boolean;
    errors: string;
}

export default class CodeInput extends React.Component<Props> {
    render () {
        const { errors, showMessage } = this.props;

        if (showMessage) {
            const isError = errors !== '';
            const title = isError ? 'Error 🥶\n' : 'Success\n';
            const body = isError ? errors : 'Compiled successfully! 🙌'
            return  (
                <div className={isError ? "error" : "success"}>
                <span className="title">{title}</span>
                <span className="body">{body}</span>
                </div>
            );
        } 
        return null;
    }
}