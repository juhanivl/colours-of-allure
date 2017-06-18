import React from 'react';
import FileLoader from './FileLoader.js'
import ImageAnalyser from './ImageAnalyser.js';
import ColorPalette from './ColorPalette.js';


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
    console.log("handleFileData: ");
    this.fileData = fileData;
    //ImageAnalyser.iterateThroughData(fileData)
     this.refs.imageAnalyser.iterateThroughData(this.fileData )
  }

  handleImageAnalysed(listOfColors){
    console.log("handleImageAnalysed");
    this.listOfColors = listOfColors;
    this.refs.colorPalette.startSortingColors(this.listOfColors);
  }

  handlePaletteCreated(palette){
    console.log("handlePaletteCreated");
  }



  render() {
    return (

      <div>
        <FileLoader
          onFileLoaded={this.handleFileData.bind(this)}
          ref="fileLoader" />
        <ImageAnalyser
          fileData={this.fileData}
          onImageAnalysed={this.handleImageAnalysed.bind(this)}
          ref="imageAnalyser" />
        <ColorPalette
          listOfColors={this.listOfColors}
          onPaletteCreated={this.handlePaletteCreated.bind(this)}
          ref="colorPalette"/>
      </div>
    );
  }

  handle

}
