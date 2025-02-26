varying vec3 color;

void main() {
  if (length(2. * gl_PointCoord - 1.) > 1.0)
    discard;  

  gl_FragColor.rgb = color;
  gl_FragColor.a = 0.5;

}