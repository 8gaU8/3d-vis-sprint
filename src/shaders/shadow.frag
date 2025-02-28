uniform float alpha;

void main() {
  if (length(2. * gl_PointCoord - 1.) > 1.0)
    discard;  

  gl_FragColor.rgb = vec3(0.0, 0.0, 0.0);
  gl_FragColor.a = alpha;

}