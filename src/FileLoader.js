import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class FileLoader extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
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

        //5. get image data
        var data = ctx.getImageData(0, 0, firstWidth, firstHeight).data;
        //6. Callback
        this.props.onFileLoaded(data);
      }
      img.src = event.target.result;
    }
    //2
    reader.readAsDataURL(e.target.files[0]);
  }

  render() {
    var canvasStyle = {
      width: "25px",
      height: "25px",
      backgroundColor: "#fafafa"
    }

    return (
      <div>
        <div>
          <input onChange={this.handleChange} type="file" id="imageLoader" name="imageLoader"/>
          <canvas style={canvasStyle} id="imageCanvas"></canvas>
        </div>
      </div>
    )
  }
}
/*

*/
