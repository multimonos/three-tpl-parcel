import * as Util from "../Util";

export const WindowResized = renderer => camera => event => {
        camera.aspect = Util.aspectRatio()
        camera.updateProjectionMatrix()
        renderer.setSize( Util.width(), Util.height() )
}