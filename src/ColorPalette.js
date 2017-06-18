import React from 'react';

export default class ColorPalette extends React.Component {

  constructor(props) {
    super(props);
    this.listOfColors;
    this.paletteCandidates = [];
    this.palette;

  }

  startSortingColors(listOfColors){
    this.paletteCandidates = [];
    console.log("startSortingColors " , this.paletteCandidates);
    this.listOfColors = listOfColors;

    //1. Check spectrum with highest amount of pixels for paletteCandidates
    this.checkForCandidates(this.listOfColors);
    console.log("this.paletteCandidates " , this.paletteCandidates);


    //2. Move on the saturation and light business


    /*


    if(amounts.red>amounts.green && amounts.red>amounts.blue){
      console.log("1. red");
      if(amounts.green>amounts.blue){
        console.log("2. Green and 3. Blue");
      }else if(amounts.blue>amounts.green) {
        console.log("2. Blue and 3. Green");
      }else{
        console.log("something else red");
      }
    }else if(amounts.green>amounts.red && amounts.green>amounts.blue){
      console.log("1. green");
      if(amounts.red>amounts.blue){
        console.log("2. red and 3.blue");
      }else if(amounts.blue>amounts.red){
        console.log("2. blue and 3. red");
      }else{
        console.log("something else greeen");
      }
    }else if(amounts.blue>amounts.red && amounts.blue>amounts.green){
      console.log("1. Blue");
      if(amounts.red>amounts.green){
        console.log("2. red and 3. green");
      }else if(amounts.green>amounts.red){
        console.log("2. green and 3. red");
      }else{
        console.log("something else blue");
      }
    }


    /*
    for (var color in listOfColors) {
      if (listOfColors.hasOwnProperty(color)) {
        //console.log(color + " -> " + listOfColors[color].length);
        if(!this.previousColor){
          console.log("first");
          this.previousColor = listOfColors[color]
        }
        if(listOfColors[color].length > this.previousColor.length){
          console.log("bigger");
          this.previousColor = listOfColors[color];
        }else{
          console.log("smaller");
        }
      }
    }
    console.log("after: " , this.previousColor.length);
    */

  }

  checkForCandidates(listOfColors){
    var amounts = {
      red: {
        amount: 0
      },
      green: {
        amount: 0
      },
      blue:{
        amount: 0
      }
    }

    for (var colorInSpectrum in listOfColors.redSpectrum) {
      amounts.red.amount +=  listOfColors.redSpectrum[colorInSpectrum].length
    }

    for (var colorInSpectrum in listOfColors.greenSpectrum) {
      amounts.green.amount +=  listOfColors.greenSpectrum[colorInSpectrum].length
    }

    for (var colorInSpectrum in listOfColors.blueSpectrum) {
      amounts.blue.amount +=  listOfColors.blueSpectrum[colorInSpectrum].length
    }

    if(amounts.red.amount>amounts.green.amount &&
      amounts.red.amount>amounts.blue.amount){
      this.addCandidate("red" ,  listOfColors.redSpectrum);
      this.checkForAlternative("red" , amounts);
    }
    else if(amounts.green.amount>amounts.red.amount &&
            amounts.green.amount>amounts.blue.amount){
      this.addCandidate("green", listOfColors.greenSpectrum);
      this.checkForAlternative("green" , amounts);
    }
    else if(amounts.blue.amount>amounts.red.amount &&
            amounts.blue.amount>amounts.green.amount){
      this.addCandidate("blue", listOfColors.blueSpectrum);
      this.checkForAlternative("blue" , amounts);
    }

    //Check for alternative candidate
  }

  //check for alternative palette candidate from rest of the spectrum
  checkForAlternative(primaryCandidateKey,amounts){
    //get the amount of primaryCandidate and delete from the dict of amounts
    var primaryCandidate = amounts[primaryCandidateKey];
    delete amounts[primaryCandidateKey];

    //check for ratio of alternative palette candidates
    for (var alternative in amounts) {
      var ratio = amounts[alternative].amount/primaryCandidate.amount;
      //if ratio is higher than 50% it's siffucient enough for palette candidate
      console.log("checkForAlternative " , alternative, ratio);
      if(ratio>0.5){
        var alternativeString = alternative.toString();
        var spectrumString = alternativeString+"Spectrum"
        this.addCandidate(alternativeString , this.listOfColors[spectrumString])
      }
    }
  }

  addCandidate(whichColor , spectrum){
    var candidate = {
      color: whichColor,
      spectrum: spectrum
    }
    this.paletteCandidates.push(candidate);
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
