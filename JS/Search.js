class Node
{
    constructor(state, parent = null, action = null, cost = 0, hcost = 0)
    {
        this.state = state;
        this.parent = parent;
        this.action = action;
        this.cost = cost;
        this.hcost = hcost;
        this.fcost = cost + hcost;
    }

    copy()
    {return new Node(this.state, this.parent, this.action, this.cost, this.hcost);}
}

class Search
{
    constructor(grid, config)
    {
        this.grid = grid;
        this.config = config;
        this.searching = false;
        this.start = null;
        this.end = null;
        this.path = [];
        this.open = [];
        this.closed = [];
    }

    setSearchPoints = function(start, end)
    {
        this.searching = true;
        this.start = start;
        this.end = end;
        this.path = [];
        if(!this.grid.notInBounds(this.start.x, this.start.y, this.config.size))
        {this.open = [new Node(this.start)]};
        this.closed = [];
    }

    canMove(a, b, size)
    {
        if(this.grid.notInBounds(a.x, a.y, size)){return false;}
        for(var i=0; i<size; i++)
        {
            for(var j=0; j<size; j++) {
                
                if(this.grid.get(a.x+i,a.y+j) != this.grid.get(b.x, b.y)) {return false;}   
            }
        }
        return true;
    }

    isLegalAction = function(state, actionType)
    {
        let nx = state.x + (actionType.x);
        let ny = state.y + (actionType.y);
        return this.canMove(new Vec2(nx,ny), state, this.config.size);
    }
    isNotStartEndSameColor = function()
    {
        if(this.start == null || this.start.length == 0) {return false;}
        return this.grid.get(this.start.x,this.start.y) != this.grid.get(this.end.x, this.end.y);
    }
    
    solutionFinder = function()
    {
        if(this.open == null || this.open.length == 0) {this.searching = false;}
        if(!this.searching) {return;}
        var node;
        if     (this.config.strategy == "bfs") {node = this.open.shift();}
        else if(this.config.strategy == "dfs") {node = this.open.pop();}
        else if(this.config.strategy == "dijikstra") {node = dequeue(this.open);}
        else if(this.config.strategy == "astar") {node = dequeue(this.open);}
        else if(this.config.strategy == "gbefs") {node = dequeue(this.open);}
        else   {throw new Error(`Unknown type: ${this.config.strategy}`);}

        if(node.state.equals(this.end))
        { 
            this.searching = false;
            this.solution(node); 
        }
        if (!this.closed.some(closedNode => closedNode.equals(node.state))) {
            this.closed.push(node.state);
            this.expand(this.open, node);
        }
    }

    solution = function(node)
    {
        while(node.parent != null)
        {
            this.path.unshift(node.state);
            node = node.parent;
        }
    }
    expand = function(fringe, node)
    {
        for(const key in this.config.action)
        {
            var value = this.config.action[key];
            var cost = this.config.actionCost[key];
            if(this.isLegalAction(node.state, value.multiplyScalar(this.config.size))) 
            {
                let nVec = node.state.copy().add(value.multiplyScalar(this.config.size));
                let gCost = node.cost + cost;
                let hCost = this.estimateCost(nVec, this.end) * 100;
                let newNode = new Node(nVec, node, value, gCost, hCost);
                if(this.config.strategy == "bfs" || this.config.strategy == "dfs") {fringe.push(newNode);}
                else if(this.config.strategy == "gbefs") {
                    enqueue(fringe, new Node(nVec, node, value, 0, hCost));
                }
                else {enqueue(fringe, newNode);}
            }
        }
    }

    estimateCost(a, b)
    {
        if(this.config.distanceType == "CMC") {return this.estimateCardManhattanCost(a,b);}
        else if(this.config.distanceType == "EC") {return this.estimateEuclideanCost(a, b);}
        else if(this.config.distanceType == "DMC") {return this.estimateDiagManhattanCost(a, b);}
        else {return 0;}
    }
    estimateEuclideanCost(a, b) {return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));}
    estimateCardManhattanCost(a, b) {return Math.abs(b.x - a.x) + Math.abs(b.y - a.y);}
    estimateDiagManhattanCost(a, b) {return Math.max(Math.abs(b.x - a.x), Math.abs(b.y - a.y));}
}