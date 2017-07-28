var id = 1

function Target(name){
    this.id = id
    this.name = name
    this.health = 100
    this.cuttingActions = 0

    id++
}

var targets = []

var tar1 = new Target('Mr. Tree')
targets.push(tar1)

// var tree = {
//     name: 'Mr. Tree',
//     health: 100,
//     cuttingActions: 0
// }

function draw(arr) {
    var template = ''

    for (var i = 0; i < arr.length; i++) {
        var target = arr[i]
        template +=
            `
        <div class="row">
                <div class="col-xs-12">
                    <h3>Name: <span id="tree-name">${target.name}</span></h3>
                    <h3>Health: <span id="tree-health">${target.health}</span></h3>
                    <h3>Cutting Actions: <span id="tree-cuttingActions">${target.cuttingActions}</span></h3>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <button type="button" onclick="scissors(${target.id})">Scissors</button>
                    <button type="button" onclick="handSaw(${target.id})">Hand Saw</button>
                    <button type="button" onclick="chainSaw(${target.id})">Chain Saw</button>
                </div>
            </div>
    
    `
    }
    document.getElementById('tree').innerHTML = template
}

//buttons need to have function to target specific target that invoked it
function scissors(tarId) {
    var tar = findTargetById(targets, tarId)
    tar.health--
    tar.cuttingActions++
    draw(targets)
}

function handSaw(tarId) {
    var tar = findTargetById(targets, tarId)
    tar.health -= 5
    tar.cuttingActions++
    draw(targets)
}

function chainSaw(tarId) {
    var tar = findTargetById(targets, tarId)
    tar.health -= 10
    tar.cuttingActions++
    draw(targets)
}

function findTargetById(tarArr, tarId){
    for(var i = 0; i < tarArr.length; i++){
        var target = tarArr[i]
        if( target.id == tarId){
            return target
        }
    }
}




draw(targets)