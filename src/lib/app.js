import * as State from "./State"
import { addMeshesToScene, addRendererToDom, addLightsToScene } from "./Util";
import { head, pipe } from "ramda";

export const App = () => {

    const setup = () => {
        const state = State.create( {} )
        addMeshesToScene( State.getScene( state ) )( State.getMeshes( state ) )
        addLightsToScene( State.getScene( state ) )( State.getLights( state ) )
        addRendererToDom( document.body )( State.getRenderer( state ) )
        // console.log({ state })
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

        State
            .getRenderer( state )
            .render(
                State.getScene( state ),
                State.getCamera( state )
            )
    }


    return {
        run,
    }
}