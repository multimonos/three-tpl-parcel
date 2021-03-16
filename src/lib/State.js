import { set, assoc, identity, lens, pipe, prop, view } from "ramda";
import { AmbientLight, BoxGeometry, Camera, DirectionalLight, Mesh, MeshPhongMaterial, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { aspectRatio, height, width } from "./Util";

const Lens = {
    camera: lens( prop( "camera" ), assoc( "camera" ) ),
    lights: lens( prop( "lights" ), assoc( "lights" ) ),
    meshes: lens( prop( "meshes" ), assoc( "meshes" ) ),
    renderer: lens( prop( "renderer" ), assoc( "renderer" ) ),
    scene: lens( prop( "scene" ), assoc( "scene" ) ),
}

export const getLights = view( Lens.lights )
export const getMeshes = view( Lens.meshes )
export const getRenderer = view( Lens.renderer )
export const getScene = view( Lens.scene )
export const getCamera = view( Lens.camera)

export const create = defaults => pipe(
    set( Lens.renderer, createRenderer() ),
    set( Lens.camera, createCamera() ),
    set( Lens.meshes, createMeshes() ),
    set( Lens.scene, createScene() ),
    set( Lens.lights, createLights() ),
)( defaults )

export const next = state =>
    state

const createCamera = () => {
    const cam = new PerspectiveCamera(
        75,
        aspectRatio(),
        0.1,
        1000,
    )
    cam.position.z = 3
    return cam
}

const createScene = () =>
    new Scene()

const createRenderer = () => {
    const rnd = new WebGLRenderer()
    rnd.setSize( width(), height() )
    return rnd
}

const createLights = () => {
    const directional = new DirectionalLight( 0xffffff )
    directional.position.set( 0, 20, 10 )

    const ambient = new AmbientLight( 0x707070 )

    return [
        directional,
        ambient,
    ]
}

const createMeshes = () => {
    const geo = new BoxGeometry()
    const mat = new MeshPhongMaterial( { color: 0x00aaff } )
    const box = new Mesh( geo, mat )
    return [
        box,
    ]
}