uniform sampler2D tex;
varying vec3 color;
uniform int type;

float f(float t){
  float delta = 6. / 29.;
  if(t > delta*delta*delta){
    return pow(t, 1./3.);
  } else {
    return t / (3. * delta * delta) + 4. / 29.;
  }
}

vec3 XYZ2Lab(vec3 XYZ) {
  // Under D65
  // float Xn = 95.0489;
  // float Yn = 100.;
  // float Zn = 108.8840;

  float fX = f(XYZ.x / 95.0489);
  float fY = f(XYZ.y / 100.); 
  float fZ = f(XYZ.z / 108.8840);
  float L = 116. * fX - 16.;
  float a = 500. * (fX - fY);
  float b = 200. * (fY - fZ);
  return vec3(a, L, b);
}

vec3 rgb2XYZ(vec3 rgb) {
  float r = rgb.r;
  float g = rgb.g;
  float b = rgb.b;
  float X = 0.4124564 * r + 0.3575761 * g + 0.1804375 * b;
  float Y = 0.2126729 * r + 0.7151522 * g + 0.0721750 * b;
  float Z = 0.0193339 * r + 0.1191920 * g + 0.9503041 * b;
  return vec3(X, Y, Z);
}

vec3 rgb2xyY(vec3 rgb) {
  vec3 XYZ = rgb2XYZ(rgb);

  return vec3(
    XYZ.x / (XYZ.x + XYZ.y + XYZ.z),
    XYZ.y / (XYZ.x + XYZ.y + XYZ.z),
    XYZ.y
  );
}

void main() {

  color = texture2D ( tex, position.xy ).rgb;
  gl_PointSize = pow(1.-length(position.xy - .5), 2.)  * 10.;
  vec3 pointPosition;
  if (type == 0) {
    pointPosition = color.rgb;

  } else if(type == 1) {
    // XYZ
    pointPosition = rgb2XYZ(color.rgb);

  } else if(type == 2){
    // xyY
    pointPosition = rgb2xyY(color.rgb);

  } else if(type == 3){
    // Lab
    pointPosition = XYZ2Lab(rgb2XYZ(color.rgb)) / 10.;
  }
  pointPosition.y = 0.;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pointPosition, 1.0);

}