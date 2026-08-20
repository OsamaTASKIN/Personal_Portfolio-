export const monolithVertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vec3 p = position;
    float wave = sin(p.y * 2.4 + uTime * .65) * .08 + cos(p.x * 3.1 - uTime * .35) * .045;
    p += normal * wave * (1.0 + length(uPointer) * .5);
    vNormal = normalize(normalMatrix * normal);
    vPosition = p;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

export const monolithFragmentShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vec3 viewDirection = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - abs(dot(viewDirection, normalize(vNormal))), 2.4);
    float bands = smoothstep(.2, .8, sin(vPosition.y * 3.0) * .5 + .5);
    vec3 chrome = mix(vec3(.035), vec3(.78, .8, .76), fresnel);
    chrome += bands * .09;
    gl_FragColor = vec4(chrome, 1.0);
  }
`;

export const particleVertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uVelocity;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    float distanceToPointer = distance(p.xy, uPointer * 3.5);
    float influence = exp(-distanceToPointer * .8);
    p.z += sin(p.x * 1.8 + uTime) * .18 + cos(p.y * 1.5 - uTime * .7) * .14;
    p.xy += normalize(p.xy - uPointer * 3.5 + .0001) * influence * uVelocity * .02;
    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = (2.0 + influence * 3.0) * (7.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
    vAlpha = .35 + influence * .65;
  }
`;

export const particleFragmentShader = /* glsl */ `
  varying float vAlpha;
  void main() {
    float d = distance(gl_PointCoord, vec2(.5));
    float alpha = smoothstep(.5, .08, d) * vAlpha;
    gl_FragColor = vec4(.85, 1.0, .26, alpha);
  }
`;
