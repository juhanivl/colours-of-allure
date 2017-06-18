var pixelConverter = {
  componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1
      ? "0" + hex
      : hex;
  },

  rgbToHex(r, g, b) {
    return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
  },


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
  },
};

export default pixelConverter;
