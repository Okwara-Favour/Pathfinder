class GridMap
{
    constructor(mapInput, canvas)
    {
        this.mapInput = mapInput;
        this.canvas = canvas;
        this.mapGrid = new Grid(this.mapInput);
        this.size = new Vec2(this.canvas.c.width,this.canvas.c.height);
        this.cellSize = new Vec2(this.size.x/this.mapGrid.width, this.size.y/this.mapGrid.height);
        this.mousePos = new Vec2(0,0);
        this.clicker = 0;
        this.path = [new Vec2(0,0), new Vec2(0,0)];
        this.pathChecker = [new Vec2(0,0), new Vec2(0,0)];
        this.actionType = "UDLR";
        this.searchStrategy = "bfs";
        this.distanceType = "None";
        this.solutionType = "instant";
        this.searchSize = 1;
        this.search = new Search(this.mapGrid, new Config(this.actionType, this.searchStrategy, this.distanceType, this.searchSize));
        this.toggleGrid = true;
        this.runtime = 0.0;
        this.pathFindingEnded = false;
        this.inputGiven = false;
        this.next = false;
    }

    resetSearch()
    {
        this.path = [new Vec2(0,0), new Vec2(0,0)];
        this.pathChecker = [new Vec2(0,0), new Vec2(0,0)];
        this.search = new Search(this.mapGrid, new Config(this.actionType, this.searchStrategy, this.distanceType, this.searchSize));
        this.clicker = 0;
        this.runtime = 0;
        this.pathFindingEnded = false;
    }
    setPath = function()
    {
        if(this.clicker == 1) {
            this.path[0] = this.mousePos;
            this.path[1] = this.mousePos;
        }
        if(this.clicker == 2) {
            this.path[1] = this.mousePos;
            if(!(this.pathChecker[0].equals(this.path[0]) && this.pathChecker[1].equals(this.path[1])))
            {
                this.search.setSearchPoints(this.path[0],this.path[1]);
                this.pathChecker = [this.path[0].copy(), this.path[1].copy()];
            }
        }
        if(this.clicker == 3) {
            this.resetSearch();
        }
        this.clicker = this.clicker % 3;
    }
    setPosition = function(pos) {this.mousePos = pos;}
    instantSearchRunner = function()
    {
        if(this.path[0].equals(this.path[1])) {return;}
        if(this.search.isNotStartEndSameColor())
        {this.search.searching = false;}
        while(this.search.searching)
        {
            this.search.solutionFinder();
        }
    }
    animatedSearchRunner = function()
    {
        if(this.path[0].equals(this.path[1])) {return;}
        if(this.search.isNotStartEndSameColor())
        {this.search.searching = false;}
        if(this.search.searching)
        {
            this.search.solutionFinder();
        }
    }
    solutionSet = function()
    {
        this.matrixSet = function(x, y, char, size)
        {
            for(var i = 0; i<size; i++)
            {
                for(var j = 0; j < size; j++)
                    {
                        this.mapGrid.set(x + i, y + j, char);
                    }
            }
        }
        for(let searchNode of this.search.open)
        {
            let elem = searchNode.state;
            this.matrixSet(elem.x, elem.y, '5', this.searchSize);
        }
        for(let elem of this.search.closed) {
            this.matrixSet(elem.x, elem.y, '4', this.searchSize);
        }
        for(let elem of this.search.path) {
            this.matrixSet(elem.x, elem.y, '1', this.searchSize);
        }
    }
    
    controls = function()
    {
        var start, end;
        var sprev = this.search.searching;
        if(this.solutionType == "instant")
        {
            var searchPrev = this.search.searching;
            start = performance.now();
            this.instantSearchRunner();
            end = performance.now();
            this.solutionSet();
            if(searchPrev && !this.search.searching) {this.runtime = end - start;}
        }
        else if(this.solutionType == "animate")
        {
            var closedprevlen = this.search.closed.length;
            start = performance.now();
            if(this.search.searching)
            {while(closedprevlen == this.search.closed.length && this.search.searching)
            {
                if(this.path[0].equals(this.path[1])) {break;}
                this.animatedSearchRunner();}
            }
            else if(!this.search.searching) {this.animatedSearchRunner();}
            end = performance.now();
            this.solutionSet();
            if(closedprevlen != this.search.closed.length) {this.runtime += end - start;}
        }
        else if(this.solutionType == "debug")
        {
            var closedprevlen = this.search.closed.length;
            start = performance.now();
            if(this.next)
            {
                if(this.search.searching)
                {
                    while(closedprevlen == this.search.closed.length && this.search.searching)
                    {
                        if(this.path[0].equals(this.path[1])) {break;}
                        this.animatedSearchRunner();
                    }
                }
                else if(!this.search.searching) {this.animatedSearchRunner();}
                this.next = false;
            }
            end = performance.now();
            this.solutionSet();
            if(closedprevlen != this.search.closed.length) {this.runtime += end - start;}
            this.next = false;
        }
        if(sprev && !this.search.searching) {this.pathFindingEnded = true;}
        else {this.pathFindingEnded = false;}
    }
    gridReset = function() 
    {
        this.mapGrid = new Grid(this.mapInput);   
    }
    render = function()
    {
        this.colorPalette = function(value)
        {
            switch (value) {
                case '1': return new Color(255,255,255);
                case '2': return new Color(0,0,255);
                case '3': return new Color(0,255,0);
                case '4': return new Color(255,0,0);
                case '5': return new Color(255,255,0);
                default :  return new Color(100,100,100);
            }
        }
        this.make2dArray = function(pos, size)
        {
            var temp = [];
            for(var i = 0; i<size; i++)
            {
                for(var j = 0; j < size; j++)
                    {
                        temp.push(new Vec2(pos.x + i, pos.y + j));
                    }
            }
            return temp;
        }
        var mousePosArr = this.make2dArray(this.mousePos, this.searchSize);
        var startPosArr = this.make2dArray(this.path[0], this.searchSize);
        var endPosArr = this.make2dArray(this.path[1], this.searchSize);

        for(var i = 0; i<this.mapGrid.width; i++)
        {
            for(var j = 0; j<this.mapGrid.height; j++)
            {
                var x = i * this.cellSize.x;
                var y = j * this.cellSize.y;
                var rectangle = new Rectangle({x: x, y: y, width: this.cellSize.x, height: this.cellSize.y});
                if(mousePosArr.some(pos => pos.equals(new Vec2(i,j))))
                { rectangle.fillColor = this.colorPalette('1');
                  rectangle.strokeColor = this.toggleGrid? this.colorPalette('1') : new Color(0,0,0);
                }
                else if(this.clicker > 0 && (startPosArr.some(pos => pos.equals(new Vec2(i,j))) || endPosArr.some(pos => pos.equals(new Vec2(i,j)))))
                { rectangle.fillColor = this.colorPalette('1');
                  rectangle.strokeColor = this.toggleGrid? this.colorPalette('1') : new Color(0,0,0);
                }
                else 
                { rectangle.fillColor = this.colorPalette(this.mapGrid.get(i,j));
                  rectangle.strokeColor = this.toggleGrid? this.colorPalette(this.mapGrid.get(i,j)) : new Color(0,0,0);
                }
                rectangle.Draw(this.canvas);
            }
        }
    }
    update = function()
    {
        this.controls();
        this.render();
        this.gridReset();
    }
}

