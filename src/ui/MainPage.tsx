import React from "react";
import CanvaOutput from "./CanvaOutput";
import CodeInput from "./CodeInput";
import ResponseWidget from "./ResponseWidget";
import Button from 'react-bootstrap/Button';

export default class MainPage extends React.Component {
    render () {
        return (
                <div className="mainPage">
                    <div style={{marginTop: 10}}>
                    <Button variant="outline-success">Compile</Button></div>
                    <div className="flexRow">
                        <CodeInput code='' setCode={() => {}}/>
                        <CanvaOutput shapes=''/>

                    </div>
                    <ResponseWidget errors={'Oj nie dobrze'} showMessage={false}/>
                </div>
        );
    }
}