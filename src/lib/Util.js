import { cond, map, mapObjIndexed, pipe, type, equals, prop } from "ramda"

export const aspectRatio = () =>
    width() / height()

export const width = () =>
    prop( "innerWidth", window )

export const height = () =>
    prop( "innerHeight", window )

export const isObject =
    pipe( type, equals( "Object" ) )

export const isArray =
    pipe( type, equals( "Array" ) )

export const addRendererToDom = target => renderer =>
    target.appendChild( renderer.domElement )

export const addLightsToScene = scene => lights =>
    cond( [
        [isArray, map( v => scene.add( v ) )],
        [isObject, mapObjIndexed( ( v, k, o ) => scene.add( v ) )],
    ] )( lights )

export const addMeshesToScene = scene => meshes =>
    cond( [
        [isArray, map( v => scene.add( v ) )],
        [isObject, mapObjIndexed( ( v, k, o ) => scene.add( v ) )],
    ] )( meshes )

export const addEvent = name => target => callback =>
    window.addEventListener( name, callback )