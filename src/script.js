import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Loading
const textureLoader = new THREE.TextureLoader()


const normalTexture = textureLoader.load('/textures/NormalMap.png')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry(.5, 64, 64)

// Materials
const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.4
material.normalMap = normalTexture

material.color = new THREE.Color(0x292929)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights
const directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
directionalLight.position.set(10, 10, 10)
scene.add( directionalLight );

// Light 1
const pointLight1 = new THREE.PointLight(0xe3c458, 0.1)
pointLight1.position.set(-3, 6, -3)
pointLight1.intensity = 2.03
scene.add(pointLight1)

const light1 = gui.addFolder('Light 1')

light1.add(pointLight1.position, 'x').step(0.01)
light1.add(pointLight1.position, 'y').step(0.01)
light1.add(pointLight1.position, 'z').step(0.01)
light1.add(pointLight1, 'intensity').min(0).max(10).step(0.01)

const light1Color = {
    color: 0xe3c458
}

light1.addColor(light1Color, 'color')
    .onChange(() => {
        pointLight1.color.set(light1Color.color)
    })
const pointLight1Helper = new THREE.PointLightHelper(pointLight1, 1)
// scene.add(pointLight1Helper)

// Light 2
const pointLight2 = new THREE.PointLight(0xed3dc4, 2)
pointLight2.position.set(-4.02, 1.99, -0.33)
pointLight2.intensity = 3.68
scene.add(pointLight2)

const light2 = gui.addFolder('Light 2')

light2.add(pointLight2.position, 'x').step(0.01)
light2.add(pointLight2.position, 'y').step(0.01)
light2.add(pointLight2.position, 'z').step(0.01)
light2.add(pointLight2, 'intensity').min(0).max(10).step(0.01)

const light2Color = {
    color: 0xed3dc4
}

light2.addColor(light2Color, 'color')
    .onChange(() => {
        pointLight2.color.set(light2Color.color)
    })

const pointLight2Helper = new THREE.PointLightHelper(pointLight2, 1)
// scene.add(pointLight2Helper)


// Light 3
const pointLight3 = new THREE.PointLight(0x169aed, 2)
pointLight3.position.set(-2.4, -.12, -1.4)
pointLight3.intensity = 10
scene.add(pointLight3)

const light3 = gui.addFolder('Light 3')

light3.add(pointLight3.position, 'x').step(0.01)
light3.add(pointLight3.position, 'y').step(0.01)
light3.add(pointLight3.position, 'z').step(0.01)
light3.add(pointLight3, 'intensity').min(0).max(10).step(0.01)

const light3Color = {
    color: 0x169aed
}

light3.addColor(light3Color, 'color')
    .onChange(() => {
        pointLight3.color.set(light3Color.color)
    })

const pointLightHelper2 = new THREE.PointLightHelper(pointLight3, 1)
// scene.add(pointLightHelper2)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener('mousemove', onDocumentMouseMove)
let mouseX = 0
let mouseY = 0
let targetX = 0
let targetY = 0

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)
}

window.addEventListener('scroll', updateSphere)

function updateSphere(event) {
    sphere.position.z = window.scrollY * .002
}

const clock = new THREE.Clock()

const tick = () => {

    targetX = mouseX * .01
    targetY = mouseY * .01
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // sphere.rotation.y = 0.5 * elapsedTime

    sphere.rotation.x += 0.05 * (targetY - sphere.rotation.x)
    sphere.rotation.y += 0.05 * (targetX - sphere.rotation.y)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()