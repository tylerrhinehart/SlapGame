var id = 1

var targets = []

var tar1 = new Target('Mr. Tree')
targets.push(tar1)

var items = {
    metalBark: new Item('Metal Bark', .3, 'Gives the tree metal bark and makes your tools less effective'),
    diamondTools: new Item('Diamond tools', 3, 'Makes your tools much stronger'),
    steroids: new Item('Steroids', 1.5, 'Makes your stronger so your tools are slightly more effective')
}

var attacks = {
    scissors: new Attacks('scissors', 1),
    handSaw: new Attacks('handSaw', 5),
    chainSaw: new Attacks('chainSaw', 10)
}

function Target(name) {
    this.id = id
    this.name = name
    this.health = 100
    this.cuttingActions = 0
    this.mods = []
    this.images = ['https://openclipart.org/image/2400px/svg_to_png/263892/Colorful-Natural-Tree.png', 'http://diysolarpanelsv.com/images/clipart-fallen-tree-1.png']

    id++
}

function Item(name, modifier, description) {
    this.name = name
    this.modifier = modifier
    this.description = description
}

function Attacks(name, strength) {
    this.name = name
    this.strength = strength
}

function draw(arr) {
    var template = ''

    for (var i = 0; i < arr.length; i++) {
        var target = arr[i]
        var image = 0
        if (target.health == 0) {
            image = 1
        }

        template +=
            `
            <div class="row">
                <div class="col-xs-12">
                    <img id="tree-pic${target.id}" src="${target.images[image]}" alt="animated tree">
                </div>
            </div>
            <div>
            <div class="row">
                    <div class="col-xs-12">
                        <h3>Name: <span id="tree-name">${target.name}</span></h3>
                        <h3>Health: <span id="tree-health">${target.health}</span></h3>
                        <div class="progress" id="health-PB">
                            <div class="progress-bar" role="progressbar" aria-valuenow="${target.health}" aria-valuemin="0" aria-valuemax="100" style="width: ${target.health}%;">
                            </div>
                        </div>
                        <h3>Cutting Actions: <span id="tree-cuttingActions">${target.cuttingActions}</span></h3>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        <button type="button" onclick="attack(${target.id}, 'scissors')">Scissors</button>
                        <button type="button" onclick="attack(${target.id}, 'handSaw')">Hand Saw</button>
                        <button type="button" onclick="attack(${target.id}, 'chainSaw')">Chain Saw</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        <button type="button" onclick="addMods(${target.id}, 'metalBark')">Metal Bark</button>
                        <button type="button" onclick="addMods(${target.id}, 'diamondTools')">Diamond Tools</button>
                        <button type="button" onclick="addMods(${target.id}, 'steroids')">Steroids</button>
                    </div>
                </div>
            </div>
    `
    }
    document.getElementById('tree').innerHTML = template
}

// function addButton(obj, funcName, targetId){
//     var props = Object.keys(obj)
//     var btnTemplate = ''
//     for(var i = 0; i < props.length; i++){
//         tarId = targetId
//         specific = props[i]
//         btnTemplate += `

//             <button type="button" onclick="${funcName}(${tarId}, ${specific})">${props[i]}</button>

//         `
//     }
//     return btnTemplate
// }


function addMods(tarId, specific) {
    var tar = findTargetById(targets, tarId)
    var mod = items[specific].modifier
    tar.mods.push(mod)
}

function calcMods(tarId) {
    var tar = findTargetById(targets, tarId)
    var total = 0
    if (tar.mods.length == 0) {
        return total = 1
    }
    for (var i = 0; i < tar.mods.length; i++) {
        total += tar.mods[i]
    }
    return total
}

// var attackFunc = attack(tarId, specific)
function attack(tarId, specific) {
    var tar = findTargetById(targets, tarId)
    var damage = attacks[specific].strength
    if (tar.cuttingActions % 3 == 2) {
        alert('Tree grew and gained health')
        tar.health += 5
        tar.cuttingActions++
        draw(targets)
    } else {
        tar.health -= damage * calcMods(tarId)
        tar.cuttingActions++
        health(tarId)
        draw(targets)
        animate()
    }
}
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

function findTargetById(tarArr, tarId) {
    for (var i = 0; i < tarArr.length; i++) {
        var target = tarArr[i]
        if (target.id == tarId) {
            return target
        }
    }
}

function health(tarId) {
    var tar = findTargetById(targets, tarId)
    if (tar.health < 0) {
        alert('You chopped down the tree')
        return tar.health = 0
    }
}

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

draw(targets)