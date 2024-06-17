class GridMaker
{
    constructor(width, height)
    {
        this.width = width;
        this.height = height;
        this.gridString = "";
        this.gridArr = [];
    }
    makeGrid()
    {
        this.gridArr = [];
        for(var row = 0; row < this.height; row++)
        {
            var temp = [];
            for(var col = 0; col < this.width; col++)
            {
                temp.push('0');
            }
            this.gridArr.push(temp);
        }
        this.updateGridString();
    }
    updateGridString() {this.gridString = this.gridArr.map(row => row.join('')).join('\n');}
    modifyGridString(x, y, value, size)
    {
        for(var i = 0; i < size; i++)
        {
            for(var j = 0; j < size; j++)
            {
                if(!((x + i) < 0 || (y + j) < 0 || (x + i) >= this.width || (y + j) >= this.height))
                {
                    this.gridArr[y + j][x + i] = value;
                }
            }
        }
        this.updateGridString();
    }
}

class Grid
{
    constructor(mapString)
    {
        this.grid = mapString.split('\n').map(row => row.split(''));
        this.width = this.grid[0].length;
        this.height = this.grid.length;
    }

    set(x,y,value)
    {
        this.grid[y][x] = value;
    }

    get(x,y)
    {
        return this.grid[y][x];
    }

    notInBounds(x,y,size)
    {
        return x < 0 || y < 0 || (x + size) > this.width || (y + size) > this.height; 
    }

    makeNewGrid(width, height)
    {
        this.grid = [];
        for(var row = 0; row < height; row++)
        {
            var temp = [];
            for(var col = 0; col < width; col++)
            {
                temp.push('0');
            }
            this.grid.push(temp);
        }
        this.width = width;
        this.height = height;
    }
}

const UDLR = {UU: new Vec2(0, -1), DD: new Vec2(0, 1), LL: new Vec2(-1, 0),  RR: new Vec2(1, 0)};
const UDLRCost = {UU: 100, DD: 100, LL: 100,  RR: 100};
const DIAG = {UU: new Vec2(0, -1), DD: new Vec2(0, 1), LL: new Vec2(-1, 0),  RR: new Vec2(1, 0),
              UL: new Vec2(-1,-1), DL: new Vec2(-1,1), UR: new Vec2(1, -1),  DR: new Vec2(1, 1)};
const DIAGCost = {UU: 100, DD: 100, LL: 100,  RR: 100,
                  UL: 141, DL: 141, UR: 141,  DR: 141};

class Config
{
    constructor(type = "UDLR", strategy = "bfs", distanceType = "None", size = 1)
    {
        this.type = type;
        this.strategy = strategy;
        this.distanceType = distanceType;
        this.size = size;
        this.init();
    }
    init()
    {
        if     (this.type == "UDLR") {
            this.action = UDLR;
            this.actionCost = UDLRCost;
        }
        else if(this.type == "DIAG") {
            this.action = DIAG;
            this.actionCost = DIAGCost;
        }
        else   {throw new Error(`Unknown type: ${this.type}`);}
    }
}