var tree = {
    name: 'Mr. Tree',
    health: 100,
    cuttingActions: 0
}

function draw(obj){
    var template = `
        <div class="col-xs-12">
            <h3>Name: <span id="status-name">${obj.name}</span></h3>
            <h3>Health: <span id="status-health">${obj.health}</span></h3>
            <h3>Cutting Actions: <span id="status-cuttingActions">${obj.cuttingActions}</span></h3>
        </div>
    
    `
    document.getElementById('tree').innerHTML = template
}

function scissors(){
    tree.health --
    tree.cuttingActions ++
    draw(tree)
}

function handSaw(){
    tree.health -= 5
    tree.cuttingActions ++
    draw(tree)
}

function chainSaw(){
    tree.health -= 10
    tree.cuttingActions ++
    draw(tree)
}






draw(tree)