function GameController() {

    var gameService = new GameService()
    var itemTemplate = ''

    function draw() {

        var targetArr = gameService.getTarget()
        var template = ''

        for (var i = 0; i < targetArr.length; i++) {
            var target = targetArr[i]
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
                    <button type="button" onclick="app.controllers.gameController.attackTarget(${target.id}, 'scissors')">Scissors</button>
                    <button type="button" onclick="app.controllers.gameController.attackTarget(${target.id}, 'handSaw')">Hand Saw</button>
                    <button type="button" onclick="app.controllers.gameController.attackTarget(${target.id}, 'chainSaw')">Chain Saw</button>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <button type="button" onclick="app.controllers.gameController.giveMod(${target.id}, 'metalBark')">Metal Bark</button>
                    <button type="button" onclick="app.controllers.gameController.giveMod(${target.id}, 'diamondTools')">Diamond Tools</button>
                    <button type="button" onclick="app.controllers.gameController.giveMod(${target.id}, 'steroids')">Steroids</button>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <button type="button" onclick="app.controllers.gameController.reset(${target.id}, 'metalBark')">Reset Game</button>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <table>
                        <thead>
                            <tr>
                                <th>Items equiped   </th>
                                <th>Modifier</th>
                            </tr>
                        </thead>
                        <tbody id="mod-table-${target.id}">
                        ${itemTemplate}
                        </tbody>
                    </table>
                </div>
            </div>
    `

        }
        document.getElementById('tree').innerHTML = template
    }

    function drawMods(obj, tarId) {
        var listItem = obj
        var id = 'mod-table-' + tarId
        itemTemplate += `
        <tr>
            <td>${listItem.name}</td>
            <td>${listItem.modifier}</td>
        </tr>
        `
        document.getElementById(id).innerHTML = itemTemplate
    }

    this.attackTarget = function attackTarget(tarId, specific) {
        gameService.attack(tarId, specific)
        draw()
    }

    this.giveMod = function giveMod(tarId, specific) {
        gameService.addMods(tarId, specific, drawMods)
    }

    this.reset = function reset(tarId) {
        itemTemplate = ''
        gameService.reset(tarId)
        draw()
    }

    this.clearItemTemplate = function clearItemTemplate(){
        itemTemplate = ''
    }


    draw()

}