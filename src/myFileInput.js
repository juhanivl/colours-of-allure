import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class MyFileInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      canvasStyle: {
        width: "25px",
        height: "25px",
        backgroundColor: "#fafafa"
      },
      colors: {
        red: [],
        orange:[],
        yellow: [],
        lime: [],
        green: [],
        mint: [],
        cyan: [],
        navy: [],
        blue: [],
        purple: [],
        magenta: [],
        pink: [],
        white: [],
        black: []
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.iterateThroughData = this.iterateThroughData.bind(this);

    this.componentToHex = this.componentToHex.bind(this);
    this.mapRGBToHex = this.mapRGBToHex.bind(this);
    this.rgbToHsl = this.rgbToHsl.bind(this);

  }

  handleHue(hue, currentPixel){
    /*Primary hues: Red, Green, and Blue.
     *Primary range: 360° / 3 = 120°/hue

     *Secondary Hues: Magenta, Yellow and  Cyan
     *Secondary range: 360° / 6 = 60°/hue
     *
     *Tertiary colors: Orange, Lime, Mint, Navy, Purple and Pink,
     *Tertiary range: 360° / 12 = 30°/hue
     *
     * Total range
     * 0<hue<30 = Red
     * 30<hue<60 = Orange
     * 60<hue<90 = Yellow
     * 90<hue<120 = Lime
     * 120<hue<150 = Green
     * 150<hue<180 = Mint
     * 180<hue<210 = Cyan
     * 210<hue<240 = Navy
     * 240<hue<270 = Blue
     * 270<hue<300 = Purple
     * 300<hue<330 = Magenta
     * 330<hue<360 = Pink
     **/

     if(0<hue&&hue<15){
       console.log("Red");   //0
     }
     else if(15<hue && hue<45){
       console.log("Orange");
     }
     else if(45<hue&&hue<75){
       console.log("Yellow"); //60
     }
     else if(75<hue&&hue<105){
       console.log("Lime");
     }
     else if(105<hue&&hue<135){   //120
       console.log("Green");
     }
     else if(135<hue&&hue<165){
       console.log("Mint");
     }
     else if(165<hue&&hue<195){
       console.log("Cyan"); //180
     }
     else if(195<hue&&hue<225){
       console.log("Navy");
     }
     else if(225<hue&&hue<255){
       console.log("Blue"); //240
     }
     else if(255<hue&&hue<285){
       console.log("Purple");
     }
     else if(285<hue&&hue<315){
       console.log("Magenta"); //300
     }
     else if(315<hue&&hue<345){
       console.log("Pink");
     }
     else if(345<hue&&hue<360){
       console.log("red"); //360
     }

  }

  analyzeListOfHSLValues(listOfHSLValues){
    console.log("analyzeListOfHSLValues " , listOfHSLValues );
    for (var i = 0; i < listOfHSLValues.length; i++) {
      var hue = listOfHSLValues[i][0];
      var saturation = listOfHSLValues[i][1];
      var lightness = listOfHSLValues[i][2];
      console.log("hsl("+hue+","+saturation+"%,"+lightness+"%)");

      /*Start separating pixels into color spectrum by evaluating HSL(Hue, Saturation, Lightness)*/

      /*1. get rid of light and dark pixels*/
      if(lightness<15 || lightness>90 && saturation<20){
        console.log("dark or light");
      }
      /*2. Map colors to spectrum based on their Hue value.*/



      /*3. Map colors in their spectrum based on their saturation and brightness.
       * For example dark Orange color could be mapped to Brown and dark cyan to Teal
       *  */


      /*X. Check which colors are the most dominant.
       * If there's one color above all
       * for example blue=(in image sky colour)
       * might be good idea to ignore it from the palette.*/

       /*Note:
        * The reason why sorting in HSV and HLS colour spaces
        *  produces noisy result is caused by a single factor.
        * HSV believes that hue is more important than luminosity.
        * Two visually different shades of blue are closer,
        * compared two two different colours with the similar intensity.
        * An attempt to compensate for this is by sorting directly for the
        * perceived luminosity of a colour.*/


    }
  }


  iterateThroughData(data) {
    var listOfHexValues = [];
    var listOfHSLValues = [];

    for (var i = 0; i < data.length; i += 4) {
      var red = data[i];
      var green = data[i + 1];
      var blue = data[i + 2];
      var alpha = data[i + 3];

      var hexValue = this.mapRGBToHex(red, green, blue);
      listOfHexValues.push(hexValue);

      var hsvValue = this.rgbToHsl([red, green, blue]);
      listOfHSLValues.push(hsvValue);
    }

    this.analyzeListOfHSLValues(listOfHSLValues);

    //this.analyzeListOfHexValues(listOfHexValues);

  }

  componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1
      ? "0" + hex
      : hex;
  }

  mapRGBToHex(r, g, b) {
    return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
  }

  rgbToHsl(c) {
    var r = c[0]/255
    var g = c[1]/255
    var b = c[2]/255;

    var max = Math.max(r, g, b)
    var min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch(max){
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return new Array(h * 360, s * 100, l * 100);
  }



  handleChange(e) {
    //1
    var canvas = document.getElementById('imageCanvas');
    var ctx = canvas.getContext('2d');
    var reader = new FileReader();
    //3
    reader.onload = (event) => {
      var img = new Image();
      //4
      img.onload = () => {
        var newWidth = 80,
            newHeight = 80,
            firstWidth = 25,
            firstHeight = 25;

        //first set canvas dimensions to be first values
        canvas.width = firstWidth //img.width;
        canvas.height = firstHeight //img.height;

        //draw image based on first values
        ctx.drawImage(img, 0, 0, firstWidth, firstHeight);

        //stretch canvas so that we'll have more pixelated image
        //canvas.style.width = newWidth + "px";
        //canvas.style.height = newHeight + "px";

        //get image data
        var data = ctx.getImageData(0, 0, firstWidth, firstHeight).data;

        //5
        this.iterateThroughData(data);
      }
      img.src = event.target.result;
    }
    //2
    reader.readAsDataURL(e.target.files[0]);
  }

  render() {

    return (
      <div>
        <div>
          <input onChange={this.handleChange} type="file" id="imageLoader" name="imageLoader"/>
          <canvas style={this.state.canvasStyle} id="imageCanvas"></canvas>

        </div>
      </div>
    )
  }
}
/*

*/
