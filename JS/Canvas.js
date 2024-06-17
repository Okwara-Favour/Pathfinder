class Color
{
	constructor(r = 255, g = 255, b = 255, a = 255)
	{
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;
	}
	
	ColorCode = function()
	{
		return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a / 255})`;
	}
}

class Canvas
{
	constructor({id, type = "2d", width = 300, height = 300} = {})
	{
		if (typeof id !== 'string') {
		  throw new TypeError(`Expected id to be a string, but got ${typeof id}`);
		}
		if (typeof type !== 'string') {
		  throw new TypeError(`Expected type to be a string, but got ${typeof type}`);
		}
		if (!Number.isInteger(width)) {
		  throw new TypeError(`Expected width to be an integer, but got ${typeof width}`);
		}
		if (!Number.isInteger(height)) {
		  throw new TypeError(`Expected height to be an integer, but got ${typeof height}`);
		}
		this.c = document.getElementById(id);
		if (!this.c) {
		  throw new Error(`No canvas found with id: ${id}`);
		}
		
		this.c.width = width;
		this.c.height = height;
		
		this.ctx = this.c.getContext(type);
		
		if (!this.ctx) {
		  throw new Error(`Context type: ${type} is not supported`);
		}
	}
	
	Clear = function({x = 0, y = 0, width = this.c.width, height = this.c.height} = {})
	{
		this.ctx.clearRect(x,y,width,height);
	}
	
	Fill = function({x = 0, y = 0, width = this.width, height = this.width, color = new Color()} = {})
	{
		this.ctx.fillStyle = color.ColorCode();
		this.ctx.fillRect(x,y,width,height);
	}
}

class Shape
{
	constructor({x = 0, y = 0, thickness = 0, fillColor = new Color(), strokeColor = new Color()} = {})
	{
		this.x = x;
		this.y = y;
		this.thickness = thickness;
		this.fillColor = fillColor;
		this.strokeColor = strokeColor;
	}
	
	setPosition = function(x, y)
	{
		this.x = x;
		this.y = y;
	}

	move = function(vx = 0, vy = 0)
	{
		this.x += vx;
		this.y += vy;
	}
}

class Circle extends Shape
{
	constructor({x, y, radius = 0, thickness, fillColor, strokeColor} = {})
	{
		super({x,y,thickness,fillColor, strokeColor});
		this.radius = radius;
	}
	
	Draw = function(canvas)
	{
		if (!(canvas instanceof Canvas)) {
		  throw new TypeError('Expected an instance of Canvas');
		}
		canvas.ctx.beginPath();
		canvas.ctx.arc(this.x, this.y, this.radius,0,2*Math.PI);
		canvas.ctx.fillStyle = this.fillColor.ColorCode();
		canvas.ctx.fill();
		canvas.ctx.lineWidth = this.thickness;
		canvas.ctx.strokeStyle = this.strokeColor.ColorCode();
		canvas.ctx.stroke();
		canvas.ctx.closePath();
	}
}

class Rectangle extends Shape
{
	constructor({x, y, width = 0, height = 0, thickness, fillColor, strokeColor} = {})
	{
		super({x,y,thickness,fillColor, strokeColor});
		this.width = width;
		this.height = height;
	}
	
	Draw = function(canvas)
	{
		if (!(canvas instanceof Canvas)) {
		  throw new TypeError('Expected an instance of Canvas');
		}
		canvas.ctx.beginPath();
		canvas.ctx.rect(this.x, this.y, this.width, this.height);
		canvas.ctx.fillStyle = this.fillColor.ColorCode();
		canvas.ctx.fill();
		canvas.ctx.lineWidth = this.thickness;
		canvas.ctx.strokeStyle = this.strokeColor.ColorCode();
		canvas.ctx.stroke();
		canvas.ctx.closePath();
	}
}

