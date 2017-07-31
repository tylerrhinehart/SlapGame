function GameService() {

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

    function findTargetById(tarArr, tarId) {
        for (var i = 0; i < tarArr.length; i++) {
            var target = tarArr[i]
            if (target.id == tarId) {
                return target
            }
        }
    }

    this.getTarget = function getTarget() {
        var targetCopy = JSON.parse(JSON.stringify(targets))
        return targetCopy
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

    function health(tarId) {
        var tar = findTargetById(targets, tarId)
        if (tar.health < 0) {
            alert('You chopped down the tree')
            return tar.health = 0
        }
    }

    this.addMods = function addMods(tarId, specific) {
        var tar = findTargetById(targets, tarId)
        var mod = items[specific].modifier
        tar.mods.push(mod)
    }

    this.attack = function attack(tarId, specific) {
        var tar = findTargetById(targets, tarId)
        var damage = attacks[specific].strength
        if (tar.cuttingActions % 3 == 2) {
            alert('Tree grew and gained health')
            tar.health += 5
            tar.cuttingActions++
        } else {
            tar.health -= damage * calcMods(tarId)
            tar.cuttingActions++
            health(tarId)
        }
        return JSON.parse(JSON.stringify(tar))
    }

}