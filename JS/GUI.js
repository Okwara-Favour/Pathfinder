document.addEventListener('DOMContentLoaded', () => {
    canvas = new Canvas({id: "canvas", width: Math.round(window.innerWidth/2) - 20, height: window.innerHeight - 20});
    
    Env = {
        mapSelector : document.getElementById("mapSelector"),
        toggleGrid : document.getElementById("toggleGrid")
    }
    Alg = {
        algorithmSelector : document.getElementById("algorithmSelector"),
        distanceFinder : document.getElementById("distanceFinder")
    }
    Vis = {
        visual : document.getElementById("visual"),
        toggleNext : document.getElementById("toggleNext")
    }
    Ack = {
        action : document.getElementById("action"),
        toggleDrag : document.getElementById("toggleDrag")
    }
    Mck = {
        dwidth : document.getElementById("dwidth"),
        dheight : document.getElementById("dheight"),
        dcreate : document.getElementById("dcreate")
    }
    Mis = {
        size : document.getElementById("size"),
        colors : document.getElementById("colors"),
        pmode : document.getElementById("pmode")
    }
    Ste = {
        start : document.getElementById("start"),
        end : document.getElementById("end"),
        run : document.getElementById("run")
    }
    
    
    mapString = document.getElementById("BasicMap").value;

    hasToggleDrag = false;
    developerMode = false;
    dragDraw = false;
    placeMode = false;

    Alg.distanceFinder.disabled = true;
    Mck.dwidth.disabled = true;
    Mck.dheight.disabled = true;
    Mck.dcreate.disabled = true;
    Mis.colors.disabled = true;
    Mis.pmode.disabled = true;
    Vis.toggleNext.disabled = true;

    Env.toggleGrid.addEventListener('click', () => {gridMap.toggleGrid = !gridMap.toggleGrid;});
    Ack.toggleDrag.addEventListener('click', () => {hasToggleDrag = !hasToggleDrag;});
    Vis.toggleNext.addEventListener('click', () => {gridMap.next = true;});
    Mis.pmode.addEventListener('click', () => {
        gridMap.resetSearch();
        dragDraw = false;
        placeMode = !placeMode;
        if(placeMode) {Ste.run.disabled = true;}
        else {Ste.run.disabled = false;}
    })

    gridMap = new GridMap(mapString, canvas);
    gridMaker = new GridMaker(3, 3);
    gridMaker.makeGrid();
    pathhistory = new Pathhistory();

    let selectedMap = Env.mapSelector.value;
    let selectedAlgorithm = Alg.algorithmSelector.value;
    let selectedDType = Alg.distanceFinder.value;
    let selectedSType = Vis.visual.value;
    let actionType = Ack.action.value;
    let startValue = Ste.start.value;
    let endValue = Ste.end.value;
    let dwidthValue = Mck.dwidth.value;
    let dheightValue = Mck.dheight.value;
    let colorType = '0';
    let selectedSize = parseInt(Mis.size.value, 10);

    function loadMap(mapId) {
        mapString = document.getElementById(mapId).value.trim();
        if(developerMode)
        {gridMap = new GridMap(gridMaker.gridString, canvas);}
        else{gridMap = new GridMap(mapString, canvas);}
        gridMap.searchStrategy = selectedAlgorithm;
        gridMap.solutionType = selectedSType;
        gridMap.actionType = actionType;
        gridMap.distanceType = selectedDType;
        gridMap.searchSize = selectedSize;
        gridMap.resetSearch();
    }

    Env.mapSelector.addEventListener('change', (event) => {
        selectedMap = event.target.value;
        if(selectedMap == "DeveloperMaze")
        {
            developerMode = true;
            Mck.dwidth.disabled = false;
            Mck.dheight.disabled = false;
            Mck.dcreate.disabled = false;
            Mis.colors.disabled = false;
            Mis.pmode.disabled = false;
        }
        else{
            developerMode = false;
            placeMode = false;
            dragDraw = false;
            Mck.dwidth.disabled = true;
            Mck.dheight.disabled = true;
            Mck.dcreate.disabled = true;
            Mis.colors.disabled = true;
            Mis.pmode.disabled = true;
            Ste.run.disabled = false;
        }
        loadMap(event.target.value);
    });

    Alg.algorithmSelector.addEventListener('change', (event) => {
        selectedAlgorithm = event.target.value;
        if (selectedAlgorithm == 'astar' || selectedAlgorithm == 'gbefs') {Alg.distanceFinder.disabled = false;} 
        else {Alg.distanceFinder.disabled = true;}
        gridMap.searchStrategy = selectedAlgorithm;
        gridMap.resetSearch();
    });

    Alg.distanceFinder.addEventListener('change', (event) => {
        selectedDType = event.target.value;
        gridMap.distanceType = selectedDType;
        gridMap.resetSearch();
    })

    Vis.visual.addEventListener('change', (event) => {
        selectedSType = event.target.value;
        if(selectedSType == 'debug') {Vis.toggleNext.disabled = false;}
        else {Vis.toggleNext.disabled = true;}
        gridMap.solutionType = selectedSType;
        gridMap.resetSearch();
    });

    Ack.action.addEventListener('change', (event) => {
        actionType = event.target.value;
        gridMap.actionType = actionType;
        gridMap.resetSearch();
    });

    Mis.size.addEventListener('change', (event) => {
        selectedSize = parseInt(event.target.value, 10);
        gridMap.searchSize = selectedSize;
        gridMap.resetSearch();
    });

    Mis.colors.addEventListener('change', (event) => {
        if(event.target.value == "blue") {colorType = '2';}
        else if(event.target.value == "green") {colorType = '3';}
        else{colorType = '0';}
    });

    Ste.start.addEventListener('change', (event) => {startValue = event.target.value;});
    Ste.end.addEventListener('change', (event) => {endValue = event.target.value;});
    Mck.dwidth.addEventListener('change', (event) => {dwidthValue = event.target.value;});
    Mck.dheight.addEventListener('change', (event) => {dheightValue = event.target.value;});

    Ste.run.addEventListener('click', () => {
        gridMap.resetSearch();

        const startArr = startValue.split(",");
        const endArr = endValue.split(",");

        var startPos = new Vec2(0,0);
        var endPos = new Vec2(0,0);

        if(startArr.length == 2)
        {
            const sA = parseInt(startArr[0], 10);
            const sB = parseInt(startArr[1], 10);
            if (!isNaN(sA) && !isNaN(sB)) {
                startPos = new Vec2(sA, sB);
                if(!gridMap.mapGrid.notInBounds(startPos.x, startPos.y, 1))
                {
                    gridMap.setPosition(startPos);
                    gridMap.clicker = 1;
                    gridMap.setPath();
                }
                
            }
        }
        if(endArr.length == 2)
        {
            const eA = parseInt(endArr[0], 10);
            const eB = parseInt(endArr[1], 10);
            if (!isNaN(eA) && !isNaN(eB)) {
                endPos = new Vec2(eA, eB);
                if(!gridMap.mapGrid.notInBounds(endPos.x, endPos.y, 1))
                {
                    gridMap.setPosition(endPos);
                    gridMap.clicker = 2;
                    gridMap.setPath();
                    gridMap.gridReset();
                }
            }
        }
    });

    Mck.dcreate.addEventListener('click', () => {
        const W = parseInt(dwidthValue, 10);
        const H = parseInt(dheightValue, 10);
        if (!isNaN(W) && !isNaN(H) && developerMode) {
            gridMaker = new GridMaker(W, H);
            gridMaker.makeGrid();
            gridMap = new GridMap(gridMaker.gridString, canvas);
            gridMap.searchStrategy = selectedAlgorithm;
            gridMap.solutionType = selectedSType;
            gridMap.actionType = actionType;
            gridMap.distanceType = selectedDType;
            gridMap.searchSize = selectedSize;
            gridMap.resetSearch();
        }
    });

    gridMap.canvas.c.addEventListener('mousemove', (event) => {
        const rect = gridMap.canvas.c.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        var mousecol = Math.floor(mouseX / gridMap.cellSize.x);
        var mouserow = Math.floor(mouseY / gridMap.cellSize.y);
        gridMap.setPosition(new Vec2(mousecol,mouserow));
        if(hasToggleDrag)
        {
            if(!placeMode && gridMap.clicker == 2)
            {gridMap.setPath();}
            else if(placeMode && dragDraw) {
                if(gridMap.mousePos.x >= 0 && gridMap.mousePos.y >= 0 &&
                    gridMap.mousePos.x < gridMaker.width && gridMap.mousePos.y < gridMaker.height
                )
                {
                    gridMaker.modifyGridString(gridMap.mousePos.x, gridMap.mousePos.y, colorType, selectedSize);
                    gridMap.mapInput = gridMaker.gridString;
                }
            }    
        }
    });

    gridMap.canvas.c.addEventListener('click', (event) => {
        if(!placeMode)
        {
            gridMap.clicker++;
            gridMap.setPath();
        }
        else
        {
            dragDraw = !dragDraw;
            if(gridMap.mousePos.x >= 0 && gridMap.mousePos.y >= 0 &&
               gridMap.mousePos.x < gridMaker.width && gridMap.mousePos.y < gridMaker.height
            )
            {
                gridMaker.modifyGridString(gridMap.mousePos.x, gridMap.mousePos.y, colorType, selectedSize);
                gridMap.mapInput = gridMaker.gridString;
            }
        }
    });

    var historyTable = document.getElementById("historyTable");
    var pathTrArr = [];
    var pathTd2dArr = [];
    var hr = new Hrecord();
    for(var i = 0; i < pathhistory.maxRecord; i++)
    {
        pathTrArr.push(document.createElement("tr"));
        var pathTdArr = [];
        for(var j = 0; j < Object.keys(hr).length; j++)
        {
            pathTdArr.push(document.createElement("td"));
            pathTrArr[i].appendChild(pathTdArr[j]);
        }
        pathTd2dArr.push(pathTdArr);
        historyTable.appendChild(pathTrArr[i]);
    }
    
    const recordLength = {map: "100px", algorithm: "60px", start: "120px", end: "120px", foundPath: "50px", runtime: "100px"};

    let autoFPS = true;
    const fps = 60; 

    function animate() {
        if(autoFPS) {requestAnimationFrame(animate);}
        gridMap.canvas.Clear();
        gridMap.update();
        if(gridMap.pathFindingEnded) {
            var hrecord = new Hrecord({map: selectedMap, algorithm: selectedAlgorithm, start: gridMap.path[0],
                                    end: gridMap.path[1], foundPath: gridMap.search.path.length > 0,
                                    runtime: gridMap.runtime});
            pathhistory.addToHistory(hrecord);
            for(var i = 0; i<pathhistory.book.length; i++)
            {
                var prec = pathhistory.book[i];
                pathTd2dArr[i][0].textContent = prec.map;
                pathTd2dArr[i][0].style.width = recordLength.map;
                pathTd2dArr[i][1].textContent = prec.algorithm;
                pathTd2dArr[i][1].style.width = recordLength.algorithm;
                pathTd2dArr[i][2].textContent = prec.start;
                pathTd2dArr[i][2].style.width = recordLength.start;
                pathTd2dArr[i][3].textContent = prec.end;
                pathTd2dArr[i][3].style.width = recordLength.end;
                pathTd2dArr[i][4].textContent = prec.foundPath;
                pathTd2dArr[i][4].style.width = recordLength.foundPath;
                pathTd2dArr[i][5].textContent = prec.runtime.toFixed(3);
                pathTd2dArr[i][5].style.width = recordLength.runtime;
            }
        }
    }
    
    function startAnimation(fps) {
        const interval = 1000 / fps;
        setInterval(animate, interval);
    }
    if(!autoFPS) {
        startAnimation(fps)
    }
    else{animate();}
});