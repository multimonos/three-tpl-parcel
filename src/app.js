import * as State from "./lib/State"
import { addMeshesToScene, addRendererToDom, addLightsToScene } from "./lib/Util";
import { head, pipe } from "ramda";

export const App = () => {

    const setup = () => {
        const state = State.create()
        addMeshesToScene( state.scene )( state.meshes )
        addLightsToScene( state.scene )( state.lights )
        addRendererToDom( document.body )( state.renderer )
        console.log( { state } )
        return state
    }

    const update = state => {
        const mesh = head( state.meshes )
        mesh.rotation.x += 0.01
        mesh.rotation.y += 0.01
        return state
    }

    const run = () => {
        const state = setup()
        animate( state )
    }

    const animate = state => {
        const nextState = pipe(
            State.next,
            update,
        )( state )

        requestAnimationFrame( () => animate( nextState ) )

        nextState.renderer.render( state.scene, state.camera )
    }

    return {
        run,
    }
}
