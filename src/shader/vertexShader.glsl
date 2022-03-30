uniform float uTime;

varying vec2 vUv;



void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    modelPosition.z += sin(modelPosition.x * 5.0 + uTime * 2.0) * 0.2
                    * sin(modelPosition.y * 4.0 + uTime * 2.0) * 0.3;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;
    vUv = uv;
}