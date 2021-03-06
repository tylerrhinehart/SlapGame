function GameService() {

    var gameService = this

    var id = 1

    var targets = []

    // var tar1 = new Target('Mr. Tree')
    // targets.push(tar1)

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
        this.cutts = 0
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

    this.setTarget = function(name) {
        var target = new Target(name)
        targets.push(target)
    }

    this.getTarget = function getTarget() {
        var targetCopy = JSON.parse(JSON.stringify(targets))
        return targetCopy
    }

    // this.getItems = function getItems() {
    //     var itemsCopy = JSON.parse(JSON.stringify(items))
    //     return itemsCopy
    // }

    function calcMods(tarId) {
        var tar = findTargetById(targets, tarId)
        var total = 0
        if (tar.mods.length == 0) {
            return total = 1
        }
        for (var i = 0; i < tar.mods.length; i++) {
            total += tar.mods[i].modifier
        }
        return total
    }

    function health(tar) {
        if (tar.health < 0) {
            alert('You chopped down the tree')
            return tar.health = 0
        }
    }

    function slapPlayer(tar, cb1, cb2) {
        if (tar.cutts == 7) {
            alert('You Lose! The tree gained consciousness and broke all your tools with its tree powers')
            cb2(tar.id)
            cb1(tar, tar.id)
        }
    }

    this.addMods = function addMods(tarId, specific, cb) {
        var tar = findTargetById(targets, tarId)
        if (tar.mods.length > 2) {
            alert('You can only equip 3 items')
            return
        } else {
            var mod = items[specific]
            tar.mods.push(mod)
            cb(items[specific], tarId)
        }
    }

    this.attack = function attack(tarId, specific, cb1, cb2) {
        var tar = findTargetById(targets, tarId)
        var damage = attacks[specific].strength
        if (tar.cutts % 3 == 2) {
            alert('Tree grew and gained health')
            tar.health += 5
            tar.cutts++
        } else {
            tar.health -= damage * calcMods(tarId)
            tar.cutts++
            slapPlayer(tar, cb1, cb2)
            health(tar)
        }
        return JSON.parse(JSON.stringify(tar))
    }

    this.reset = function reset(tarId) {
        var tar = findTargetById(targets, tarId)
        tar.health = 100
        tar.cutts = 0
        tar.mods = []
    }

}