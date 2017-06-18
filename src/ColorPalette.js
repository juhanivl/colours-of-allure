import React from 'react';

export default class ColorPalette extends React.Component {

  constructor(props) {
    super(props);
    this.palette;
  }

  startSortingColors(listOfColors){
    console.log("startSortingColors" , listOfColors);

  }


  render() {
    return (
      <div>
        <p>ColorPalette</p>
      </div>
    );
  }

}
/*WHEN DONE CALL THIS
this.props.onPaletteCreated(this.palette)*/
