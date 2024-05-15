import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js'
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js'

/*
    SCENE, CAMERA, ETC.
*/
const clock = new THREE.Clock()
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 15

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

new OrbitControls(camera, renderer.domElement)

/*
    LIGHTS
*/
RectAreaLightUniformsLib.init()
const rectLight = new THREE.RectAreaLight(0xffffff, 7,  15, 15)
rectLight.position.set(5, 5, 0)
rectLight.lookAt(0, 0, 0)
scene.add(rectLight)
// rectLight.add(new RectAreaLightHelper(rectLight))

const rectLight2 = new THREE.RectAreaLight(0xffffff, 7,  15, 15)
rectLight2.position.set(-5, -5, 0)
rectLight2.lookAt(0, 0, 0)
scene.add(rectLight2)
// rectLight2.add(new RectAreaLightHelper(rectLight2))

/*
    LOAD SCENE & ANIMATION FROM FILE
*/
let mixer
new GLTFLoader().load(
    'demo.glb',
    (gltf) => {
        mixer = new THREE.AnimationMixer(gltf.scene)
        mixer.clipAction(gltf.animations[0]).play()
        
        scene.add(gltf.scene)
        
        renderLoop()
    },
    undefined,
    (error) => { console.error(error) }
)

/*
    MAIN LOOP
*/
const renderLoop = () => {
	requestAnimationFrame(renderLoop)
	renderer.render(scene, camera)

    mixer.update(clock.getDelta())
}

