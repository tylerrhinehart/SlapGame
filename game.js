
var app = {
    controllers: {
        gameController: new GameController()
    }
}

app.controllers.gameController

// function addButton(obj, funcName, targetId){
//     var props = Object.keys(obj)
//     var btnTemplate = ''
//     for(var i = 0; i < props.length; i++){
//         tarId = targetId
//         specific = props[i]
//         btnTemplate += 

//             <button type="button" onclick="${funcName}(${tarId}, ${specific})">${props[i]}</button>

        
//     }
//     return btnTemplate
// }




// var attackFunc = attack(tarId, specific)

// function scissors(tarId) {
//     var tar = findTargetById(targets, tarId)
//     tar.health -= 1 * calcMods(tarId)
//     tar.cuttingActions++
//     health(tarId)
//     draw(targets)
// }

// function handSaw(tarId) {
//     var tar = findTargetById(targets, tarId)
//     tar.health -= 5 * calcMods(tarId)
//     tar.cuttingActions++
//     health(tarId)
//     draw(targets)
// }

// function chainSaw(tarId) {
//     var tar = findTargetById(targets, tarId)
//     tar.health -= 10 * calcMods(tarId)
//     tar.cuttingActions++
//     health(tarId)
//     draw(targets)
// }





// function animate(tarId){
//     var elem = document.getElementById(`tree-pic${tarId}`)
//     var pos = 0
//     var time = setInterval(jiggle, 10)
//     function jiggle(){
//         elem.style.left = pos + '10px'
//         elem.style.right = pos - '20px'
//         elem.style.left = pos + '10px'
//     }
// }