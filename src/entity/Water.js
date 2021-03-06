Water = function(startX, startY, endX, endY, height, level, solidSurface){
	this.startX = startX;
	this.startY = startY;
	this.endX = endX;
	this.endY = endY;
	this.level = level;
	this.height = height;
	this.solidSurface = solidSurface

	this._construct();
}

Water.prototype = {
	points: null,
	springs: null,
	droplets: null,
	length: null,
	segmentLength: 32,
	segmentCount: null,

	_construct: function(){
		this.points =  [];
		this.springs =  [];
		var diffX = Math.abs(this.startX - this.endX);
		this.length = diffX
		this.segmentCount = Math.ceil(this.length/this.segmentLength);
			
		this.droplets = game.add.physicsGroup(Phaser.Physics.P2JS);
		this.reuseIndex = 0;

		
		var lastPoint = null;
		for(var i = 0; i <= this.segmentCount + 1; i++){
			var point = game.add.sprite(this.startX + (diffX/this.segmentCount)*i, this.startY, game.cache.getBitmapData('dot'));
			point.scale.setTo(0.01);
			game.physics.p2.enable(point);
			if(this.level && !this.solidSurface){
				point.body.setCollisionGroup(this.level.waterCollisionGroup);
				point.body.mass = 0.5;
				point.body.collides([this.level.hero.blobCollisionGroup, this.level.blockCollisionGroup]);
				point.body.onBeginContact.add(this.pointContactListener, this);
			}
			point.alpha = 0;
			
			
			if(i%2 == 0){
				point.body.data.gravityScale = 0;
			}

			if(i == 0 || i == this.segmentCount + 1){
				point.body.dynamic = false;
			}

			if(this.solidSurface){
				point.body.dynamic = false;
			}

			if(lastPoint){
				this.springs.push(game.physics.p2.createSpring(point, lastPoint, 12, 500, 2));
			}

			this.points.push(point);
			lastPoint = point;
		}


		for(var i = 0; i < this.segmentCount - 1; i++){
			//this.springs.push(game.physics.p2.addSpring(this.points[i], this.points[i+1], this.segmentLength, 50, 2));
		}
	},

	pointContactListener: function(bodyA, bodyB, c, d){
		if(bodyA && bodyA.sprite){
			var x = bodyA.sprite.x;
			var y = bodyA.sprite.y;

			for(var i = 0; i < 10; i++){
				var drop;

				if(this.droplets.length >= 50){
					this.reuseIndex++;
					drop = this.droplets.getAt(this.reuseIndex%50);
					drop.body.data.position[0] = x/-20;
					drop.body.data.position[1] = y/-20;
					drop.x = x;
					drop.y = y;
				}else{
					var drop = this.droplets.create(x, y, 'water-drop');
				}
						
				drop.body.velocity.y = -200 + game.rnd.integerInRange(-50, 50);
				drop.body.velocity.x = game.rnd.integerInRange(-50, 50)
			}
		}
	},

	update: function(){
		var bmd = game.cache.getBitmapData('water');
		bmd.context.beginPath();
		bmd.context.moveTo(this.points[0].x - game.camera.x, this.points[1].y - game.camera.y);
		for(var i = 1; i < this.points.length; i++){
			bmd.context.lineTo(this.points[i].x - game.camera.x, this.points[i].y - game.camera.y);
		}
		bmd.context.lineTo(this.points[this.points.length -1].x - game.camera.x, this.points[this.points.length -1].y - game.camera.y + this.height);
		bmd.context.lineTo(this.points[0].x - game.camera.x, this.points[0].y + this.height - game.camera.y);
		bmd.context.closePath();
		bmd.context.fill();
		bmd.dirty = true;

	}
}