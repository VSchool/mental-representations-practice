import React, { Component } from 'react';
import './App.css';
import brace from 'brace';
import AceEditor from 'react-ace';

import {isThereAnyError, removeOneLine} from "./functions"

import 'brace/mode/javascript';
import 'brace/theme/solarized_dark';

class App extends Component {
  state = {
    code: "",
    codeArray: [],
    deletedLines: [],
    hasStarted: false
  }

  onChange = (newValue) => {
    console.log('change',newValue);
    if (!this.state.hasStarted){
      const codeArray = newValue.split("\n");
      this.setState({codeArray, code:newValue});
    }
  }

  removeLine = () => {
    const arrayLength = this.state.codeArray.length
    let whichLine = Math.floor(Math.random(arrayLength) * arrayLength)
    while (this.state.deletedLines.includes(whichLine)){
      whichLine = Math.floor(Math.random(arrayLength) * arrayLength)
    }
    const oneLineRemoved = removeOneLine(this.state.deletedLines, this.state.codeArray, whichLine)
    const newCode = oneLineRemoved.join("\n")
    this.setState(prevState => {
      return {
        code:newCode,
        deletedLines: [...prevState.deletedLines, whichLine],
        hasStarted: true
      }
    })
  }

  checkCode = () => {
    const positionOfLastDeletedLine = this.state.deletedLines[this.state.deletedLines - 1]
    if(this.state.code.split("\n")[positionOfLastDeletedLine] !== this.state.codeArray[positionOfLastDeletedLine]){
      this.setState(prevState => {
        const deletedLines = prevState.deletedLines.filter((item, i) => {
          return i < prevState.deletedLines.length - 2            
        }) 
        return {
          deletedLines,
          code: prevState.codeArray.map((line, i) => {
            if(deletedLines.includes(i)){
              return "// code goes here"
            } else {
              return line
            }
          })
        }
      })
    } else {
      if (isThereAnyError(this.state.code.split("\n"), this.state.codeArray)){
        this.setState(prevState => {
          const deletedLines = prevState.deletedLines.filter((item, i) => {
            if (i === positionOfLastDeletedLine || i === prevState.deletedLines.length - 1){
              return false
            } else {
              return true
            }
          }) 
          return {
            deletedLines,
            code: prevState.codeArray.map((line, i) => {
              if(deletedLines.includes(i)){
                return "// code goes here"
              } else {
                return line
              }
            })
          }
        })
      } else {
        this.removeLine()
      }
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
        {this.state.hasStarted ? 
        <button onClick={this.checkCode}>Check Code</button> : 
        <button onClick={this.removeLine}>Start</button>}
      </div>
    );
  }
}

export default App;
