uniform sampler2D tex;
uniform int type;
uniform float pointSize;

varying vec3 color;

#define f(t) t > 0.00885645 ? pow(t, 1./3.) : t / 0.12841854 + 0.13793103

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

vec3 XYZ2xyY(vec3 XYZ) {

  return vec3(
    XYZ.x / (XYZ.x + XYZ.y + XYZ.z),
    XYZ.y / (XYZ.x + XYZ.y + XYZ.z),
    XYZ.y
  );
}

void main() {
  color = texture2D ( tex, position.xy ).rgb;

  gl_PointSize = pow(1.-length(position.xy - .5), 2.)  * pointSize;
  vec3 pointPosition = COLOR_SPACE(color.rgb);
  pointPosition.y = 0.0;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pointPosition, 1.0);

}