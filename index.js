var Matrix = require('matrixmath/Matrix');

var color = {
  R: 17,
  G: 108,
  B: 214
}

function convert(color) {
  var color_linear = [];
  for(var i in color){
    color_linear.push(linear(color[i]))
  }
  var matrix3x3 = new Matrix(3, 3);
  matrix3x3.setData([0.4124, 0.3576, 0.1805, 0.2126, 0.7152, 0.0722, 0.0193, 0.1192, 0.9505]);
  var matrix3x1 = new Matrix(3, 1);
  matrix3x1.setData(color_linear)
  var xyzObj = Matrix.multiply(matrix3x3, matrix3x1);
  var result = xyzObj.toArray()
  return {X: result[0], Y: result[1], Z: result[2]};
}

function linear(item){
  item = item/255;
  var item_linear;
  var alpha = 0.055;
  if(item <= 0.04045){
    return item_linear = (item/12.92);
  }
  else{
    return item_linear = Math.pow(((item + alpha)/(1 + alpha)), 2.4);
  }
}

var color_result = convert(color);


function toROMM(color){
  var colorArr = [];
  var rgb = {};
  for(var i in color){
    colorArr.push(color[i])
  }
  var matrix3x3 = new Matrix(3, 3);
  matrix3x3.setData([1.3460, -0.2556, -0.0511, -0.5446, 1.5082, 0.0205, 0.0, 0.0, 1.2123]);
  var matrix3x1 = new Matrix(3, 1);
  matrix3x1.setData(colorArr)
  var rgbObj = Matrix.multiply(matrix3x3, matrix3x1);
  rgbObj = rgbObj.toArray()
  for(var j in rgbObj){
    rgb[j] = check(rgbObj[j]);
  }

  return {R: rgb[0], G: rgb[1], B: rgb[2]};
}


function check(item){
  var gamma = 1.8;
  var k = (1/gamma);
  var res = 0;
  if(item >= 0.001953){
    res = Math.pow(item, k);
  }
  else{
    res =  item * 16;
  }
  return parseInt(res * 255)
}
console.log(color,'RGB');
console.log(toROMM(color_result),'RGB');
