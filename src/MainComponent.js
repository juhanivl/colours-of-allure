import React from 'react';
import FileLoader from './FileLoader.js'
import ImageAnalyser from './ImageAnalyser.js';
import utils from './utility.js';

export default class MainComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fileLoaded: false,
    };
    this.fileData;
    this.listOfColors;
  }

  handleFileData(fileData){
    console.log("handleFileData: ", fileData);
    this.fileData = fileData;
    this.setState({
      fileLoaded: true
    })
    console.log("hmmm " , utils);
    utils.sayHello()
  }

  handleImageAnalysed(listOfColors){
    console.log("handleImageAnalysed" , listOfColors);
    this.listOfColors = listOfColors;
  }



  render() {
    return (

      <div>
        <FileLoader
          onFileLoaded={this.handleFileData.bind(this)}
        />
        <ImageAnalyser
          fileData={this.fileData}
          onImageAnalysed={this.handleImageAnalysed.bind(this)}/>
      </div>
    );
  }

  handle

}
