import * as State from "./lib/State"
import { addMeshesToScene, addRendererToDom, addLightsToScene } from "./lib/Util";
import { head, pipe } from "ramda";

export const App = () => {

    const setup = () => {
        const state = State.create( {} )
        addMeshesToScene( State.getScene( state ) )( State.getMeshes( state ) )
        addLightsToScene( State.getScene( state ) )( State.getLights( state ) )
        addRendererToDom( document.body )( State.getRenderer( state ) )
        console.log( { state } )

        ///
        const loader = State.getFbxLoader( state )
        console.log( { loader } )
        loader.load( "assets/models/car_2.fbx",
            function( object ) {
                console.log( { object } )
                state.scene.add( object )
                state.controls.target = object.position.clone()
                state.controls.update()

                object.traverse( child =>
                    child.isMesh
                        ? child.castShadow = child.receiveShadow = true
                        : null
                )

            },
            null,
            err => {
                console.error( err )
            }
        )
        ///

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
            .getRenderer( nextState )
            .render(
                State.getScene( nextState ),
                State.getCamera( nextState )
            )
    }


    return {
        run,
    }
}