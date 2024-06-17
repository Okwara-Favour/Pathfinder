class Hrecord
{
    constructor({map, algorithm, start, end, foundPath, runtime} = {})
    {
        this.map = map;
        this.algorithm = algorithm;
        this.start = start;
        this.end = end;
        this.foundPath = foundPath;
        this.runtime = runtime;
    }

    equals(hrecord)
    {
        return this.map == hrecord.map && this.algorithm == hrecord.algorithm &&
               this.start.equals(hrecord.start) && this.end.equals(hrecord.end) &&
               this.foundPath == hrecord.foundPath && this.runtime == hrecord.runtime;
    }
}

class Pathhistory
{
    constructor()
    {
        this.book = [];
        this.maxRecord = 5;
    }

    addToHistory = function(hrecord)
    {
        if(this.book.length >= 5)
        {
            this.book.pop();
        }
        this.book.unshift(hrecord);
    }
    getFromHistory = function(index)
    {
        return this.book[index];
    }
}