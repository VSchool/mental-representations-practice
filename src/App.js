import React, { Component } from 'react';
import './App.css';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/solarized_dark';

class App extends Component {
  state = {
    code: "",
    codeArray: [],
    deleted: [],
    hasStarted: false
  }

  onChange = (newValue) => {
    console.log('change',newValue);
    const codeArray = newValue.split("\n");
    this.setState({codeArray, code:newValue});
  }

  removeLine = () => {
    if (this.state.hasStarted){

    } else {
      const arrayLength = this.state.codeArray.length
      const whichLine = Math.floor(Math.random(arrayLength) * arrayLength)
      const oneLineRemoved = [...this.state.codeArray.splice(whichLine, 1, "\n")]
      const newCode = oneLineRemoved.join("\n")
      this.setState({code:newCode})
    }
  }

  render() {
    return (
      <div>
        <h1>Paste Code Here</h1>
        <AceEditor
          value={this.state.code}
          mode="javascript"
          theme="solarized_dark"
          fontSize={14}
          onChange={this.onChange}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          name="ace-editor"
          editorProps={{$blockScrolling: true}}
        />
        {!this.state.hasStarted && <button onClick={this.removeLine}>Start</button>}
      </div>
    );
  }
}

export default App;
