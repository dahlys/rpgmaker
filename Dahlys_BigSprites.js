/*:
 * @plugindesc Big Sprites
 * @author Dahlys
 * 
 * @param Diagonal Movement
 * @desc Are you using a diagonal movement plugin?
 * @default false
 * 
 * @param Diagonal Block
 * @desc Prevents random sprite overlapping from diagonal movement.
 * @default true
 * 
 * @param Auto Set Comment
 * @desc Automatically set 1st bigSprite comment on event page.
 * @default true
 * 
 * @param Ev All Direction Trigger
 * @desc Big event Event Touch trigger as long as player is next to it, regardless of direction faced.
 * @default false
 * 
 * @param Pl All Direction Trigger
 * @desc Big player can trigger events regardless of direction faced. Applicable to Action Button and Player Touch.
 * @default false
 *
 * @param Boat Size
 * @desc Size of boat
 * 
 * @param Ship Size
 * @desc Size of ship
 * 
 * @param Airship Size
 * @desc Size of airship
 * 
 * @param Enter Vehicle Side
 * @desc Get on only when facing the side of big vehicle instead of from any direction.
 * @default false
 * 
 * @param Exit Vehicle Side
 * @desc Get off the side of big vehicle instead of the front. More visually appealing.
 * @default true
 * 
 * @param Right Hand Drive
 * @desc Because getting off the side of the vehicle is left hand drive by default.
 * @default false
 * 
 * @param Touch Fix B
 * @desc Fix touch input if using type B big player/vehicle. Will overwrite findDirectionTo!
 * @default false
 *
 * @help
 * ==============================================================================
 *                                  BIG SPRITES
 * ==============================================================================
 * 
 * NOTE: I am following the map grid, so partially blocked tiles are not a thing.
 *
 * A 'solid' tile is a tile where the character EXISTS. It inherits the priority 
 * from the main character (below/same/above player) and will be passable the 
 * same way. Only solid tiles are triggerable. The main character tile does not 
 * have to be solid.
 *
 * In this plugin, different kinds of big sprites are treated differently. These 
 * are the categories:
 *
 * A) Draws a rectangle around the base tile. No matter how sprite moves/turns, 
 *    the same tiles remain solid. e.g. A giant mecha
 * B) The middle of the big sprite image is solid and the rest is relative to it.
 *    The sprite must be a square, but doesn't have to be all solid. This is to
 *    facilitate shifting the center of the event to the center of the sprite. 
 *    e.g. A flying spaghetti monster, a large battleship
 * C) Complete customization of big sprite solidity based on direction faced.
 *
 * When a character turns or moves around, its size will be adjusted accordingly. 
 * A bigger character will also have a bigger action button/event touch/player 
 * touch trigger.
 *
 * ------------------------------------------------------------------------------
 *                              PLUGIN PARAMETERS
 * ------------------------------------------------------------------------------
 *
 * Diagonal Movement: Tested with Galv's diagonal movement plugin. Fixes diagonal
 * movement for big player/vehicle sprites.
 *
 * Diagonal Block: Diagonal movement not allowed when blocked by an impassable
 * tile. Player has to move NSEW. This prevents random image overlapping with 
 * impassable tiles.
 *
 * Auto Set Comment: The first bigSprite comment on an event page is executed
 * when a new map is loaded. Turn off if you're using notetags and don't want
 * them overwritten by another comment. Special events (e.g. Galv spawned events)
 * that don't exist on the current map data can only be upsized automatically
 * using the first comment.
 *
 * Ev All Direction Trigger: Because big events cannot turn on a map with many
 * obstacles, you can now make the Event Touch trigger activate the moment the
 * player is adjacent to the event, instead of only when the front of the event
 * hits the player.
 *
 * Pl All Direction Trigger: Same as above, but for the big player. Player Touch
 * and Action Button triggers will fire regardless of the direction the player is
 * facing.
 *
 * Vehicle Size: Fill in parameters for each vehicle. Leave blank for normal 
 * sized vehicles. Big vehicles can only be rectangles/circles/diamonds for now.
 *
 * Parameters for big vehicle Type A: above left right
 * where above = no. of tiles extended upwards
 *       left  = no. of tiles to the left
 *       right = no. of tiles to the right
 * e.g. 1 1 1 draws a solid rectangle 1 tile up, 1 tile left, and 1 tile right 
 * and makes the vehicle always occupy a 3x2 rectangle.
 *
 * Parameters for big vehicle Type B: spritesize front back left right
 * where spritesize = how many tiles is the length/width of the sprite?
 *       front      = no. of tiles to the front of new center
 *       back       = no. of tiles to the back of new center
 *       left       = no. of tiles to the left of new center
 *       right      = no. of tiles to the right of new center
 * e.g. 3 1 1 0 0 Vehicle is 3x3 tiles per sprite. 1 tile is added to the front
 * and 1 to the back (e.g. a ship). Whenever the vehicle turns, the solid tiles
 * will also be rotated accordingly. i.e. When horizontal, only the center 
 * horizontal row is solid. When vertical, only the certer vertical row is solid.
 * 
 * Parameters for big vehicle Type C: [down] [left] [right] [up]
 * where [direction] = [above left right] and above/left/right are the same as 
 * Type A.
 * e.g. [1 0 0] [0 1 1] [0 1 1] [1 0 0] creates a vehicle that is 1x2 tiles when 
 * vertical and 3x1 tiles when horizontal.
 *
 * Parameters for big Circle vehicle Type B: spritesize circle radius
 * where spritesize = how many tiles is the length/width of the sprite?
 *       radius     = radius of the circle.
 * e.g. 7 circle 3 makes the big vehicle a circle of radius 3 tiles around the 
 * center of the big sprite image.
 *
 * Parameters for big Diamond vehicle Type B: spritesize diamond radius
 * where spritesize = how many tiles is the length/width of the sprite?
 *       radius     = radius of the diamond.
 * e.g. 5 diamond 2 makes the big vehicle a diamond of radius 2 tiles around 
 * the center of the big sprite image.
 * 
 * Enter Vehicle Side: Get on the vehicle only when the player is facing the 
 * side of the vehicle.
 * 
 * Exit Vehicle Side: Get off the vehicle when the side is aligned with the
 * landing point and 'ok' is triggered. Looks nicer than crawling over the front
 * of the vehicle. Good for car parking and boat docking on the side.
 *
 * Right Hand Drive: Only effective when Vehicle Side Get Off is true. Left Hand 
 * Drive by default, which means player will prefer to get off the vehicle on the 
 * right side as opposed to the left. Turning on RHD will flip this.
 *
 * Touch Fix B: Fixes touch input pathfinding for Type B player and vehicles by
 * using the new center (sprite image center). Be careful as it overwrites the
 * default findDirectionTo command. Normal-sized player and vehicles should be
 * completely unaffected even if this is on.
 *
 * ------------------------------------------------------------------------------
 *                                  FOR PLAYER
 * ------------------------------------------------------------------------------
 *
 * Player can only be upsized by running an event containing a bigPlayer comment.
 * It's the same as using a plugin command, except it's a comment :) When a new
 * bigPlayer comment is run, the previous one is overwritten.
 * 
 * The commments for each category are:
 *
 * Type A: <bigPlayer: above left right>
 *
 * Type B: <bigPlayer: spritesize front back left right>
 *
 * Type B circle: <bigPlayer: spritesize circle radius>
 *
 * Type B diamond: <bigPlayer: spritesize diamond radius>
 *
 * Type C: <bigPlayer: [down] [left] [right] [up]>
 *
 * Reset to normal size: <bigPlayer: reset>
 *
 * See plugin parameters vehicle size section for what above, left, right,
 * spritesize, front, back, radius, and direction mean.
 * 
 * To go beyond the basic rectangle/circle/diamond shape, use the following
 * comments:
 * 
 * Type A: <bigPlayer: above left right> <bigPlayerSp: dx,dy dx,dy dx,dy> 
 * where dx is the horizontal distance from the main tile, and dy is the vertical
 * distance. If you wish to use Ex without the basic rectangle, input:
 * <bigPlayer: 0 0 0> <bigPlayerSp: dx,dy dx,dy dx,dy> 
 * e.g. <bigPlayer: 0 0 0> <bigPlayerSp: 0,-1 1,-1>
 * Only the tile right above the main tile and the tile to the top-right of the
 * main tile are solid.
 * You can add as many dx,dy pairs as you want.
 *
 * Type B: <bigPlayerSp: dx,dy dx,dy dx,dy>
 * The basic type B bigPlayer command is optional. dx and dy are relative to the
 * new center for the sprite facing down. When the sprite turns around, the extra
 * solid tiles will rotate accordingly.
 *
 * Type C: <bigPlayerSp: [down] [left] [right] [up]>
 * where [direction] = [dx,dy dx,dy dx,dy]
 * Type C can also be used without the bigPlayer command. Type C bigPlayerSp has 
 * the highest level of customization as you determine which tiles are solid for
 * every single direction (Type C bigPlayer always has the main tile solid).
 * e.g. <bigPlayerSp: [0,1] [1,-1] [1,0] [0,-1]>
 *
 * ------------------------------------------------------------------------------
 *                                  FOR EVENTS
 * ------------------------------------------------------------------------------
 * 
 * Events can be upsized using either notetags or comments. Comments always 
 * override notetags. The contents of the comments and notetags are identical.
 * When a new bigEvent comment is run, the previous one is overwritten.
 *
 * Type A: <bigEvent: above left right>
 *
 * Type B: <bigEvent: spritesize front back left right>
 *
 * Type B circle: <bigEvent: spritesize circle radius>
 *
 * Type B diamond: <bigEvent: spritesize diamond radius>
 *
 * Type C: <bigEvent: [down] [left] [right] [up]>
 *
 * Reset to normal size: <bigEvent: reset>
 *
 * See plugin parameters vehicle size section for what above, left, right,
 * spritesize, front, back, radius, and direction mean.
 *
 * And custom shapes as well:
 *
 * Type A: <bigEvent: above left right> <bigPlayerSp: dx,dy dx,dy dx,dy> 
 *
 * Type B: <bigEventSp: dx,dy dx,dy dx,dy>
 *
 * Type C: <bigEventSp: [down] [left] [right] [up]>
 * where [direction] = [dx,dy dx,dy dx,dy]
 *
 * See Player section for what dx and dy mean.
 *
*/

var Dahlys = Dahlys || {};

(function() { 

/* 
----------------------------------------------------------------------------------
		PLUGIN PARAMETERS
----------------------------------------------------------------------------------
*/	
	
	var parameters = PluginManager.parameters('Dahlys_BigSprites');
	Dahlys.diagMovement = eval(parameters['Diagonal Movement']);
	Dahlys.diagBlock = eval(parameters['Diagonal Block']);
	Dahlys.autoSetComment = eval(parameters['Auto Set Comment']);
	Dahlys.Ev_ADT = eval(parameters['Ev All Direction Trigger']);
	Dahlys.Pl_ADT = eval(parameters['Pl All Direction Trigger']);
	Dahlys.bigBoat = String(parameters['Boat Size']) || null;
	Dahlys.bigBoatSp = String(parameters['Boat Sp Size']) || null;
	Dahlys.bigShip = String(parameters['Ship Size']) || null;
	Dahlys.bigShipSp = String(parameters['Ship Sp Size']) || null;
	Dahlys.bigAirship = String(parameters['Airship Size']) || null;
	Dahlys.bigAirshipSp = String(parameters['Airship Sp Size']) || null;
	Dahlys.sideLoad = eval(parameters['Enter Vehicle Side']);
	Dahlys.sideUnload = eval(parameters['Exit Vehicle Side']);
	Dahlys.RHD = eval(parameters['Right Hand Drive']);
	Dahlys.touchFixB = eval(parameters['Touch Fix B']);
	
/* 
-------------------------------------------------------------------------------------------------------------------------------------------
		INITIALIZE NEW VARIABLES
-------------------------------------------------------------------------------------------------------------------------------------------
*/
	
	var _Game_System_initialize = Game_System.prototype.initialize;
	Game_System.prototype.initialize = function() {
		_Game_System_initialize.call(this);
		this.setupBigPlayerSettings();
	};
	
	Game_System.prototype.setupBigPlayerSettings = function() {
		this._bigSprite = {'type': null, 'Y0': null, 'size': null, 'front': null, 'back': null, 'left': null, 'right': null, 'radius': null, 'spCoord': null, 'spType': null, 'occupancy': null};
	};
	
	var _Game_Character_initialize = Game_Character.prototype.initialize;
	Game_Character.prototype.initialize = function() {
		_Game_Character_initialize.call(this);
		this.initializeBigSprite();		
	};
	
	Game_Character.prototype.initializeBigSprite = function() {
		this._bigSprite = {'type': null, 'Y0': this.y, 'size': 1, 'front': 0, 'back': 0, 'left': 0, 'right': 0, 'radius': 0, 'spCoord': null, 'spType': null, 'occupancy': [{'x': this.x, 'y': this.y}]};
	};
		
	var _Game_Vehicle_initialize = Game_Vehicle.prototype.initialize;
	Game_Vehicle.prototype.initialize = function(type) {
		_Game_Vehicle_initialize.call(this, type);
		this.setBigVehicleSize.call(this, type);
	};
	
	var _Game_Event_setupPageSettings = Game_Event.prototype.setupPageSettings;
	Game_Event.prototype.setupPageSettings = function() {
		_Game_Event_setupPageSettings.call(this);
		this.initializeBigSprite();
		this.setupBigSprite();		
	};
	
	Game_Event.prototype.setupBigSprite = function() {
		if (!this.page()) return;
		this.setSpriteSizeFromEventNote();
		this.setSpriteSpSizeFromEventNote();
		if (Dahlys.autoSetComment) this.setSpriteSizeFromPageComment();	
		this.setBigSpriteCoordinates();
	};		
	
/* 
-------------------------------------------------------------------------------------------------------------------------------------------
		SETUP BIG EVENT
-------------------------------------------------------------------------------------------------------------------------------------------
*/		
	
	Game_Event.prototype.setSpriteSizeFromEventNote = function() {
		if (this.isSpawnEvent) return;
		var note = $dataMap.events[this._eventId].meta.bigEvent;
		if (!note) return;		
		this.bigSpriteRegexProcessing(note);
	};
	
	Game_Event.prototype.setSpriteSpSizeFromEventNote = function() {
		if (this.isSpawnEvent) return;
		var note = $dataMap.events[this._eventId].meta.bigEventSp;
		if (!note) return;
		this.bigSpriteSpRegexProcessing(note);
	};
	
	Game_Vehicle.prototype.setBigVehicleSize = function(type) {
		if (type === 'boat' && Dahlys.bigBoat) {
			this.setBigVehicleVariables(Dahlys.bigBoat);
		}
		if (type === 'ship' && Dahlys.bigShip) {
			this.setBigVehicleVariables(Dahlys.bigShip);
		}
		if (type === 'airship' && Dahlys.bigAirship) {
			this.setBigVehicleVariables(Dahlys.bigAirship);
		}
	};
	
	Game_Character.prototype.setBigVehicleVariables = function(args) {
		this.initializeBigSprite();
		this.bigSpriteRegexProcessing(args);
	};
	
	var _Game_Interpreter_command108 = Game_Interpreter.prototype.command108;
	Game_Interpreter.prototype.command108 = function() {
		var result = _Game_Interpreter_command108.call(this);
		var thisEvent = $gameMap.event(this._eventId);
		for (var i = 0; i < this._comments.length; i++) {
			if (this._comments[i].match(/bigEvent:/i)) {
				thisEvent.executeBigSpriteComment(this._comments[i], thisEvent);
			}
			if (this._comments[i].match(/bigEventSp:/i)) {
				thisEvent.executeBigSpriteSpComment(this._comments[i], thisEvent);
			}			
			if (this._comments[i].match(/bigPlayer:/i)) {
				thisEvent.executeBigSpriteComment(this._comments[i], $gamePlayer);
			}
			if (this._comments[i].match(/bigPlayerSp:/i)) {
				thisEvent.executeBigSpriteSpComment(this._comments[i], $gamePlayer);
			}
		}
		return result;
	};
	
	Game_Event.prototype.executeBigSpriteComment = function(comment, target) {
		target.initializeBigSprite();
		target.bigSpriteRegexProcessing(comment);
		target.setBigSpriteCoordinates();
	};
	
	Game_Event.prototype.executeBigSpriteSpComment = function(comment, target) {
		target._bigSprite.spCoord = null;
		target._bigSprite.spType = null;
		target.bigSpriteSpRegexProcessing(comment);
		target.setBigSpriteCoordinates();
	};
	
	Game_Event.prototype.setSpriteSizeFromPageComment = function() {		
		var pagelist = this.list();
		for (var i = 0; i < pagelist.length; i++) {
			if ((pagelist[i].code === 108 || pagelist[i].code === 408)) {
				var params = pagelist[i].parameters;
				for (var j = 0; j < params.length; j++) {				
					if (params[j].match(/bigEvent:/i)) this.bigSpriteRegexProcessing(params[j]);
					else if (params[j].match(/bigEventSp:/i)) this.bigSpriteSpRegexProcessing(params[j]);
				}
			}
		}
	};
	
	Game_Character.prototype.bigSpriteRegexProcessing = function(comment) {
		var capturingRegexA = /(\d+)(?: )(\d+)(?: )(\d+)/;
		var capturingRegex = /(\d+)(?: )(\d+)(?: )(\d+)(?: )(\d+)(?: )(\d+)/;
		var capturingRegex2 = /(\d+)(?: )(?:diamond )(\d+)/i;
		var capturingRegex3 = /(\d+)(?: )(?:circle )(\d+)/i;
		var capturingRegexC = /(?:\[)(\d+)(?: )(\d+)(?: )(\d+)(?:\])(?: \[)(\d+)(?: )(\d+)(?: )(\d+)(?:\])(?: \[)(\d+)(?: )(\d+)(?: )(\d+)(?:\])(?: \[)(\d+)(?: )(\d+)(?: )(\d+)(?:\])/;
		if (comment.match(/\d+ \d+ \d+ \d+ \d+/)) {
			var params = capturingRegex.exec(comment);
			this._bigSprite.size = Number(params[1]);
			this._bigSprite.front = Number(params[2]);
			this._bigSprite.back = Number(params[3]);
			this._bigSprite.left = Number(params[4]);
			this._bigSprite.right = Number(params[5]);
			this._bigSprite.type = 'squareB';
		} else if (comment.match(/\d+ diamond \d+/i)) {
			var params = capturingRegex2.exec(comment);
			this._bigSprite.size = Number(params[1]);
			this._bigSprite.radius = Number(params[2]);
			this._bigSprite.type = 'diamondB';
		} else if (comment.match(/\d+ circle \d+/i)) {
			var params = capturingRegex3.exec(comment);
			this._bigSprite.size = Number(params[1]);
			this._bigSprite.radius = Number(params[2]);
			this._bigSprite.type = 'circleB';
		} else if (comment.match(/\[.*\]/)) {
			var params = capturingRegexC.exec(comment);
			this._bigSprite.back = [Number(params[1]), Number(params[4]), Number(params[7]), Number(params[10])];
			this._bigSprite.left = [Number(params[2]), Number(params[5]), Number(params[8]), Number(params[11])];
			this._bigSprite.right = [Number(params[3]), Number(params[6]), Number(params[9]), Number(params[12])];
			this._bigSprite.type = 'custom';
		} else if (comment.match(/\d+ \d+ \d+/)) {
			var params = capturingRegexA.exec(comment);
			this._bigSprite.back = Number(params[1]);
			this._bigSprite.left = Number(params[2]);
			this._bigSprite.right = Number(params[3]);
			this._bigSprite.type = 'squareA';
		}		
	};
	
	Game_Character.prototype.bigSpriteSpRegexProcessing = function(comment) {
		var capturingRegexA = /(\d+|-\d+),(\d+|-\d+)/g
		var capturingRegexC = /(?:\[)(.*)(?:\])(?: \[)(.*)(?:\])(?: \[)(.*)(?:\])(?: \[)(.*)(?:\])/
		var capturingRegexC2 = /(\d+|-\d+),(\d+|-\d+)/g
		if (comment.match(/\[.*\]/)) {
			var params = capturingRegexC.exec(comment);
			var coord = {'down': [], 'left': [], 'right': [], 'up': []};
			if (params[1].match(/(\d+|-\d+),(\d+|-\d+)/)) {
				do {
					var match = capturingRegexC2.exec(comment);
					if (match) coord.down.push({'dx': Number(match[1]), 'dy': Number(match[2])});
				} while (match);
			}
			if (params[2].match(/(\d+|-\d+),(\d+|-\d+)/)) {
				do {
					var match = capturingRegexC2.exec(comment);
					if (match) coord.left.push({'dx': Number(match[1]), 'dy': Number(match[2])});
				} while (match);
			}
			if (params[3].match(/(\d+|-\d+),(\d+|-\d+)/)) {
				do {
					var match = capturingRegexC2.exec(comment);
					if (match) coord.right.push({'dx': Number(match[1]), 'dy': Number(match[2])});
				} while (match);
			}
			if (params[4].match(/(\d+|-\d+),(\d+|-\d+)/)) {
				do {
					var match = capturingRegexC2.exec(comment);
					if (match) coord.up.push({'dx': Number(match[1]), 'dy': Number(match[2])});
				} while (match);
			}
			this._bigSprite.spCoord = coord;
			this._bigSprite.spType = 'C';
		}
		if (comment.match(/(\d+|-\d+),(\d+|-\d+)/)) {
			var coord = [];
			do {
				var match = capturingRegexA.exec(comment);
				if (match) coord.push({'dx': Number(match[1]), 'dy': Number(match[2])});
			} while (match);
			this._bigSprite.spCoord = coord;
			if (this._bigSprite.type === 'squareA') this._bigSprite.spType = 'A';
			else this._bigSprite.spType = 'B';
		}
	};	

/* 
-------------------------------------------------------------------------------------------------------------------------------------------
		SET AND REFRESH EVENT COORDINATES
-------------------------------------------------------------------------------------------------------------------------------------------
*/	
	
	Game_Character.prototype.setBigSpriteCoordinates = function() {
		this._bigSprite.Y0 = this.y - Math.floor(this._bigSprite.size / 2);
		var coord = [];
		if (this._bigSprite.type === 'squareB') {
			var occupancy = this.getTypeBOccupancy();
			var topleft = [this.x - occupancy.left, this._bigSprite.Y0 - occupancy.up];
			for (var j = 0; j <= (occupancy.up + occupancy.down); j++) {
				for (var i = 0; i <= (occupancy.left + occupancy.right); i++) {
					coord.push({'x': topleft[0] + i, 'y': topleft[1] + j});
				}
			}
		}
		if (this._bigSprite.type === 'diamondB') {
			var rad = this._bigSprite.radius;
			var x0 = this.x;
			var y0 = this._bigSprite.Y0;
			for (var y = -rad; y <= rad; y++) {
				for (var x = -rad; x <= rad; x++) {
					if (Math.abs(x) + Math.abs(y) <= rad) {
						coord.push({'x': x0 + x, 'y': y0 + y});
					}
				}
			}
		}
		if (this._bigSprite.type === 'circleB') {
			var rad = this._bigSprite.radius;
			var x0 = this.x;
			var y0 = this._bigSprite.Y0;
			coord.push({'x': x0, 'y': y0});
			var x = rad;
			var y = 0;
			var err = 1 - x;
			while (x >= y) {
				coord.push({'x': x0 + x, 'y': y0 + y});
				coord.push({'x': x0 + y, 'y': y0 + x});
				coord.push({'x': x0 - x, 'y': y0 + y});
				coord.push({'x': x0 - y, 'y': y0 + x});
				coord.push({'x': x0 - x, 'y': y0 - y});
				coord.push({'x': x0 - y, 'y': y0 - x});
				coord.push({'x': x0 + x, 'y': y0 - y});
				coord.push({'x': x0 + y, 'y': y0 - x});
				y++;
				if (err < 0) err += 2 * y + 1;
				else {
					x--;
					err += 2 * (y - x + 1);
				}
			}
		}
		if (this._bigSprite.type === 'squareA') {
			var occupancy = {'up': this._bigSprite.back, 'left': this._bigSprite.left, 'right': this._bigSprite.right};
			var topleft = [this.x - occupancy.left, this.y - occupancy.up];
			for (var j = 0; j <= occupancy.up; j++) {
				for (var i = 0; i <= (occupancy.left + occupancy.right); i++) {
					coord.push({'x': topleft[0] + i, 'y': topleft[1] + j});
				}
			}
		}
		if (this._bigSprite.type === 'custom') {
			if (this._direction === 2) {
				var occupancy = {'up': this._bigSprite.back[0], 'left': this._bigSprite.left[0], 'right': this._bigSprite.right[0]};
			} else if (this._direction === 4) {
				var occupancy = {'up': this._bigSprite.back[1], 'left': this._bigSprite.left[1], 'right': this._bigSprite.right[1]};
			} else if (this._direction === 6) {
				var occupancy = {'up': this._bigSprite.back[2], 'left': this._bigSprite.left[2], 'right': this._bigSprite.right[2]};
			} else if (this._direction === 8) {
				var occupancy = {'up': this._bigSprite.back[3], 'left': this._bigSprite.left[3], 'right': this._bigSprite.right[3]};
			}
			var topleft = [this.x - occupancy.left, this.y - occupancy.up];
			for (var j = 0; j <= occupancy.up; j++) {
				for (var i = 0; i <= (occupancy.left + occupancy.right); i++) {
					coord.push({'x': topleft[0] + i, 'y': topleft[1] + j});
				}
			}
		}
		if (this._bigSprite.spType === 'A') {
			var spCoord = this._bigSprite.spCoord;
			for (var i = 0; i < spCoord.length; i++) {
				coord.push({'x': this.x + spCoord[i].dx, 'y': this.y + spCoord[i].dy});
			}
		}
		if (this._bigSprite.spType === 'B') {
			var spCoord = this._bigSprite.spCoord;
			if (this._direction === 2) {
				for (var i = 0; i < spCoord.length; i++) {
					coord.push({'x': this.x + spCoord[i].dx, 'y': this._bigSprite.Y0 + spCoord[i].dy});
				}
			} else if (this._direction === 4) {
				for (var i = 0; i < spCoord.length; i++) {
					coord.push({'x': this.x - spCoord[i].dy, 'y': this._bigSprite.Y0 + spCoord[i].dx});
				}
			} else if (this._direction === 6) {
				for (var i = 0; i < spCoord.length; i++) {
					coord.push({'x': this.x + spCoord[i].dy, 'y': this._bigSprite.Y0 - spCoord[i].dx});
				}
			} else if (this._direction === 8) {
				for (var i = 0; i < spCoord.length; i++) {
					coord.push({'x': this.x - spCoord[i].dx, 'y': this._bigSprite.Y0 - spCoord[i].dy});
				}
			}			
		}
		if (this._bigSprite.spType === 'C') {
			if (this._direction === 2) {
				var spCoord = this._bigSprite.spCoord.down;
			} else if (this._direction === 4) {
				var spCoord = this._bigSprite.spCoord.left;
			} else if (this._direction === 6) {
				var spCoord = this._bigSprite.spCoord.right;
			} else if (this._direction === 8) {
				var spCoord = this._bigSprite.spCoord.up;
			}
			for (var i = 0; i < spCoord.length; i++) {
				coord.push({'x': this.x + spCoord[i].dx, 'y': this.y + spCoord[i].dy});
			}
		}
		if (!this._bigSprite.type && !this._bigSprite.spType) {
			coord.push({'x': this.x, 'y': this.y});
		}
		if (DataManager.isMapLoaded()) {
			for (var k = 0; k < coord.length; k++) {
				if ($gameMap.isLoopHorizontal()) {
					if (coord[k].x >= $gameMap.width()) {coord[k].x -= $gameMap.width();}
					else if (coord[k].x < 0) {coord[k].x += $gameMap.width();};
				}
				if ($gameMap.isLoopVertical()) {
					if (coord[k].y >= $gameMap.height()) {coord[k].y -= $gameMap.height();}
					else if (coord[k].y < 0) {coord[k].y += $gameMap.height();};
				}
			}
		}
		this._bigSprite.occupancy = coord;
		return this._bigSprite.occupancy;
	};
	
	Game_Character.prototype.getTypeBOccupancy = function() {
		var up = 0;
		var down = 0;
		var left = 0;
		var right = 0;
		if (this._direction === 2) {
			up = this._bigSprite.back;
			down = this._bigSprite.front;
			left = this._bigSprite.right;
			right = this._bigSprite.left;
		} else if (this._direction === 4) {
			up = this._bigSprite.right;
			down = this._bigSprite.left;
			left = this._bigSprite.front;
			right = this._bigSprite.back;
		} else if (this._direction === 6) {
			up = this._bigSprite.left;
			down = this._bigSprite.right;
			left = this._bigSprite.back;
			right = this._bigSprite.front;
		} else if (this._direction === 8) {
			up = this._bigSprite.front;
			down = this._bigSprite.back;
			left = this._bigSprite.left;
			right = this._bigSprite.right;
		}
		return {'up': up, 'down': down, 'left': left, 'right': right};
	};

/* 
-------------------------------------------------------------------------------------------------------------------------------------------
		CHECK IF EVENT IS OCCUPYING TILE
-------------------------------------------------------------------------------------------------------------------------------------------
*/	
	
	var _Game_CharacterBase_pos = Game_CharacterBase.prototype.pos;
	Game_CharacterBase.prototype.pos = function(x, y) {
		if (!this._bigSprite) return _Game_CharacterBase_pos.call(this, x, y);
		var coord = this._bigSprite.occupancy;
		for (var i = 0; i < coord.length; i++) {
			if (coord[i].x === x && coord[i].y === y) return true;
		}
		return false;
	};	
	
/* 
-------------------------------------------------------------------------------------------------------------------------------------------
		MOVE CHECKING TILES FORWARD FOR LARGE EVENT
-------------------------------------------------------------------------------------------------------------------------------------------
*/
	
	Game_CharacterBase.prototype.checkAheadTiles = function(d) {		
		var thisCoord = this._bigSprite.occupancy;
		var forwardTiles = [];
		for (var i = 0; i < thisCoord.length; i++) {
			var tempX = $gameMap.roundXWithDirection(thisCoord[i].x, d);
			var tempY = $gameMap.roundYWithDirection(thisCoord[i].y, d);
			if (!thisCoord.some(function(xy) {return xy.x === tempX && xy.y === tempY})) forwardTiles.push({'x': tempX,'y': tempY});
		}
		return forwardTiles;
	};
	
	Game_CharacterBase.prototype.checkDiagonalTiles = function(horz, vert) {
		var thisCoord = this._bigSprite.occupancy;
		if (Dahlys.diagBlock) {
			var forwardTiles = this.checkAheadTiles(horz).concat(this.checkAheadTiles(vert));
		} else {
			var forwardTiles = [];
		}
		for (var i = 0; i < thisCoord.length; i++) {
			var tempX = $gameMap.roundXWithDirection(thisCoord[i].x, horz);
			var tempY = $gameMap.roundYWithDirection(thisCoord[i].y, vert);
			if (!thisCoord.some(function(xy) {return xy.x === tempX && xy.y === tempY}) && !forwardTiles.some(function(xy) {return xy.x === tempX && xy.y === tempY})) {
				forwardTiles.push({'x': tempX,'y': tempY});
			}
		}
		return forwardTiles;
	};

/* 
-------------------------------------------------------------------------------------------------------------------------------------------
		GETTING ON/OFF GAME VEHICLE
-------------------------------------------------------------------------------------------------------------------------------------------
*/
	
	Game_Player.prototype.forceMoveDirection = function(d) {
		this._moveRouteForcing = true;
		this.setThrough(true);		
		this.setDirection(d);
		this.moveForward();
		this.setThrough(false);
		this._moveRouteForcing = false;
	};
	
	Game_Player.prototype.forceTurnDirection = function(d) {
		this.setThrough(true);
		this.setDirection(d);
		this.setThrough(false);
	};
	
	var _Game_Vehicle_syncWithPlayer = Game_Vehicle.prototype.syncWithPlayer;
	Game_Vehicle.prototype.syncWithPlayer = function() {
		_Game_Vehicle_syncWithPlayer.call(this);
		this._bigSprite.occupancy = [];
	};
	
	var _Game_Player_getOnVehicle = Game_Player.prototype.getOnVehicle;
	Game_Player.prototype.getOnVehicle = function() {
		if ($gameMap.boat()._bigSprite.type || $gameMap.ship()._bigSprite.type || $gameMap.airship()._bigSprite.type) {
			var d = this.direction();
			var coord = this._bigSprite.occupancy;
			for (var i = 0; i < coord.length; i++) {
				if ($gameMap.airship().pos(coord[i].x, coord[i].y)) {
					var vehicleType = 'airship';
					break;
				}
			}
			if (vehicleType !== 'airship') {
				if (Dahlys.Pl_ADT) {
					var ahead = this.checkAheadTiles(2).concat(this.checkAheadTiles(4), this.checkAheadTiles(6), this.checkAheadTiles(8));
				} else {
					var ahead = this.checkAheadTiles(d);
				}				
				for (var i = 0; i < ahead.length; i++) {
					if ($gameMap.ship().pos(ahead[i].x, ahead[i].y)) {
						if (Dahlys.sideLoad) {
							var d1 = this._direction;
							var d2 = $gameMap.ship()._direction;
							if ((d1 === 2 || d1 === 8) && (d2 === 4 || d2 === 6)) {
								var vehicleType = 'ship';
							} else if ((d2 === 2 || d2 === 8) && (d1 === 4 || d1 === 6)) {
								var vehicleType = 'ship';
							}
						} else {
							var vehicleType = 'ship';
						}					
						break;
					} else if ($gameMap.boat().pos(ahead[i].x, ahead[i].y)) {
						if (Dahlys.sideLoad) {
							var d1 = this._direction;
							var d2 = $gameMap.boat()._direction;
							if ((d1 === 2 || d1 === 8) && (d2 === 4 || d2 === 6)) {
								var vehicleType = 'boat';
							} else if ((d2 === 2 || d2 === 8) && (d1 === 4 || d1 === 6)) {
								var vehicleType = 'boat';
							}
						} else {
							var vehicleType = 'boat';
						}
						break;
					}
				}
			}
			if (vehicleType) {
				this._vehicleGettingOn = true;
				this.gatherFollowers();
				if (vehicleType === 'boat') var vehicle = $gameMap.boat();
				if (vehicleType === 'ship') var vehicle = $gameMap.ship();
				if (vehicleType === 'airship') var vehicle = $gameMap.airship();				
				var x = vehicle._x;
				var y = vehicle._y;
				var dir = null;
				if (this._direction === 2 || this._direction === 8) dir = 'vert';
				var move = setInterval(function() {
					if (dir === 'vert') {
						if ($gamePlayer.x < x) $gamePlayer.forceMoveDirection(6);
						else if ($gamePlayer.x > x) $gamePlayer.forceMoveDirection(4);
						else if ($gamePlayer.y < y) $gamePlayer.forceMoveDirection(2);
						else if ($gamePlayer.y > y) $gamePlayer.forceMoveDirection(8);
					} else {
						if ($gamePlayer.y < y) $gamePlayer.forceMoveDirection(2);
						else if ($gamePlayer.y > y) $gamePlayer.forceMoveDirection(8);
						else if ($gamePlayer.x < x) $gamePlayer.forceMoveDirection(6);
						else if ($gamePlayer.x > x) $gamePlayer.forceMoveDirection(4);
						
					}
					if ($gamePlayer.x === x && $gamePlayer.y === y) {
						$gamePlayer._vehicleType = vehicleType;
						clearInterval(move);
						return $gamePlayer._vehicleGettingOn;						
					}
				}, 300);
			}
			return this._vehicleGettingOn;
		}
		return _Game_Player_getOnVehicle.call(this);
	};
	
	var _Game_Vehicle_getOn = Game_Vehicle.prototype.getOn;
	Game_Vehicle.prototype.getOn = function() {
		$gameSystem._bigSprite = $gamePlayer._bigSprite;
		$gamePlayer.initializeBigSprite();
		_Game_Vehicle_getOn.call(this); 
		this.setBigVehicleSize.call($gamePlayer, this._type); 
		this.initializeBigSprite();
		$gamePlayer.setBigSpriteCoordinates();
	};
	
	Dahlys.getOffCoord = null;
	
	var _Game_Vehicle_isLandOk = Game_Vehicle.prototype.isLandOk;
	Game_Vehicle.prototype.isLandOk = function(x, y, d) {
		if ($gamePlayer._bigSprite.type) {
			if (this.isAirship()) {
				if (!$gameMap.isAirshipLandOk(x, y)) {
					return false;
				}
				if ($gameMap.eventsXy(x, y).length > 0) {
					return false;
				}
			} else {				
				if (Dahlys.sideUnload) {
					if (Dahlys.RHD) {
						if (d === 2) {var d1 = 6; var d2 = 4;}
						if (d === 8) {var d1 = 4; var d2 = 6;}
						if (d === 4) {var d1 = 2; var d2 = 8;}
						if (d === 6) {var d1 = 8; var d2 = 2;}
					} else {
						if (d === 2) {var d1 = 4; var d2 = 6;}
						if (d === 8) {var d1 = 6; var d2 = 4;}
						if (d === 4) {var d1 = 8; var d2 = 2;}
						if (d === 6) {var d1 = 2; var d2 = 8;}
					}
					var side1Tiles = this.checkAheadTiles.call($gamePlayer, d1);
					var options = [];
					for (var i = 0; i < side1Tiles.length; i++) {
						if ($gameMap.isValid(side1Tiles[i].x, side1Tiles[i].y) && $gameMap.isPassable(side1Tiles[i].x, side1Tiles[i].y, this.reverseDir(d1)) && !this.isCollidedWithCharacters(side1Tiles[i].x, side1Tiles[i].y)) {
							var plusX = 0;
							var plusY = 0;
							if (d1 === 2) plusY = -1;
							if (d1 === 6) plusX = -1;
							if (d1 === 8) plusY = 1;
							if (d1 === 4) plusX = 1;
							options.push({'x': side1Tiles[i].x + plusX, 'y': side1Tiles[i].y + plusY, 'd': d1});
						}
					}
					if (options.length > 0) {
						for (var i = 0; i < options.length; i++) {
							if ($gameMap.isLoopHorizontal()) {
								if (options[i].x >= $gameMap.width()) {options[i].x -= $gameMap.width();}
								else if (options[i].x < 0) {options[i].x += $gameMap.width();};
							}
							if ($gameMap.isLoopVertical()) {
								if (options[i].y >= $gameMap.height()) {options[i].y -= $gameMap.height();}
								else if (options[i].y < 0) {options[i].y += $gameMap.height();};
							}
						}
						if (options.length % 2 === 0) {
							if (d === 2) var middleOption = options.length/2 - 1;
							else var middleOption = options.length/2;
						} else {
							var middleOption = Math.floor(options.length/2);
						}
						Dahlys.getOffCoord = options[middleOption];
						return true;
					}
					var side2Tiles = this.checkAheadTiles.call($gamePlayer, d2);
					for (var i = 0; i < side2Tiles.length; i++) {
						if ($gameMap.isValid(side2Tiles[i].x, side2Tiles[i].y) && $gameMap.isPassable(side2Tiles[i].x, side2Tiles[i].y, this.reverseDir(d2)) && !this.isCollidedWithCharacters(side2Tiles[i].x, side2Tiles[i].y)) {
							var plusX = 0;
							var plusY = 0;
							if (d2 === 2) plusY = -1;
							if (d2 === 6) plusX = -1;
							if (d2 === 8) plusY = 1;
							if (d2 === 4) plusX = 1;
							options.push({'x': side2Tiles[i].x + plusX, 'y': side2Tiles[i].y + plusY, 'd': d2});
						}
					}
					if (options.length > 0) {
						for (var i = 0; i < options.length; i++) {
							if ($gameMap.isLoopHorizontal()) {
								if (options[i].x >= $gameMap.width()) {options[i].x -= $gameMap.width();}
								else if (options[i].x < 0) {options[i].x += $gameMap.width();};
							}
							if ($gameMap.isLoopVertical()) {
								if (options[i].y >= $gameMap.height()) {options[i].y -= $gameMap.height();}
								else if (options[i].y < 0) {options[i].y += $gameMap.height();};
							}
						}
						if (options.length % 2 === 0) {
							if (d === 2) var middleOption = options.length/2 - 1;
							else var middleOption = options.length/2;
						} else {
							var middleOption = Math.floor(options.length/2);
						}
						Dahlys.getOffCoord = options[middleOption];
						return true;
					}
					return false;
				}
				var forwardTiles = this.checkAheadTiles.call($gamePlayer, d);
				for (var i = 0; i < forwardTiles.length; i++) {
					if ($gameMap.isValid(forwardTiles[i].x, forwardTiles[i].y) && $gameMap.isPassable(forwardTiles[i].x, forwardTiles[i].y, this.reverseDir(d)) && !this.isCollidedWithCharacters(forwardTiles[i].x, forwardTiles[i].y)) {
						var plusX = 0;
						var plusY = 0;
						if (this._direction === 2) plusY = -1;
						if (this._direction === 6) plusX = -1;
						if (this._direction === 8) plusY = 1;
						if (this._direction === 4) plusX = 1;
						Dahlys.getOffCoord = {'x': forwardTiles[i].x + plusX, 'y': forwardTiles[i].y + plusY, 'd': this._direction};
						if ($gameMap.isLoopHorizontal()) {
							if (Dahlys.getOffCoord.x >= $gameMap.width()) {Dahlys.getOffCoord.x -= $gameMap.width();}
							else if (Dahlys.getOffCoord.x < 0) {Dahlys.getOffCoord.x += $gameMap.width();};
						}
						if ($gameMap.isLoopVertical()) {
							if (Dahlys.getOffCoord.y >= $gameMap.height()) {Dahlys.getOffCoord.y -= $gameMap.height();}
							else if (Dahlys.getOffCoord.y < 0) {Dahlys.getOffCoord.y += $gameMap.height();};
						}
						return true;
					}
				}
				return false;
			}			
		}
		return _Game_Vehicle_isLandOk.call(this, x, y, d);		
	};
	
	var _Game_Map_isAirshipLandOk = Game_Map.prototype.isAirshipLandOk;
	Game_Map.prototype.isAirshipLandOk = function(x, y) {
		if ($gamePlayer._bigSprite.type) {
			var coord = $gamePlayer._bigSprite.occupancy;
			var check = true;
			for (var i = 0; i < coord.length; i++) {
				check = check && this.checkPassage(coord[i].x, coord[i].y, 0x0800) && this.checkPassage(coord[i].x, coord[i].y, 0x0f);
				if (!check) return check;
			}
			return check;
		}
		return _Game_Map_isAirshipLandOk.call(this, x, y);
	};

	var _Game_Vehicle_getOff = Game_Vehicle.prototype.getOff;
	Game_Vehicle.prototype.getOff = function() {
		var dir = this._direction;
		$gamePlayer.initializeBigSprite();		
		_Game_Vehicle_getOff.call(this);
		this.setDirection(dir);
		if (Dahlys.getOffCoord) {
			var x = Dahlys.getOffCoord.x;
			var y = Dahlys.getOffCoord.y;
			while ($gamePlayer.x < x) $gamePlayer.forceMoveDirection(6);
			while ($gamePlayer.x > x) $gamePlayer.forceMoveDirection(4);
			while ($gamePlayer.y < y) $gamePlayer.forceMoveDirection(2);
			while ($gamePlayer.y > y) $gamePlayer.forceMoveDirection(8);
			$gamePlayer.setDirection(Dahlys.getOffCoord.d);
		}
		Dahlys.getOffCoord = null;
		$gamePlayer._bigSprite = $gameSystem._bigSprite;
		$gameSystem.setupBigPlayerSettings();
		this.setBigVehicleSize(this._type);
		this.setBigSpriteCoordinates();
		$gamePlayer.setBigSpriteCoordinates();
	};
	
/* 
-------------------------------------------------------------------------------------------------------------------------------------------
		FIX ACTION BUTTON, PLAYER TOUCH AND EVENT TOUCH TRIGGERS
-------------------------------------------------------------------------------------------------------------------------------------------
*/
	
	var _Game_CharacterBase_checkEventTriggerTouchFront = Game_CharacterBase.prototype.checkEventTriggerTouchFront;
	Game_CharacterBase.prototype.checkEventTriggerTouchFront = function(d) {
		if (this._bigSprite.type) {
			if (Dahlys.Ev_ADT) {
				var surroundTiles = this.checkAheadTiles(2).concat(this.checkAheadTiles(4), this.checkAheadTiles(6), this.checkAheadTiles(8));
				for (var i = 0; i < surroundTiles.length; i++) {
					this.checkEventTriggerTouch(surroundTiles[i].x, surroundTiles[i].y);
				}
			} else {
				var forwardTiles = this.checkAheadTiles(d);
				for (var i = 0; i < forwardTiles.length; i++) {
					this.checkEventTriggerTouch(forwardTiles[i].x, forwardTiles[i].y);
				}
			}
		} else {
			_Game_CharacterBase_checkEventTriggerTouchFront.call(this, d);
		}
	};
	
	var _Game_Player_checkEventTriggerHere = Game_Player.prototype.checkEventTriggerHere;
	Game_Player.prototype.checkEventTriggerHere = function(triggers) {
		if (this.canStartLocalEvents() && this._bigSprite.type) {
			var coord = this._bigSprite.occupancy;
			for (var i = 0; i < coord.length; i++) {
				this.startMapEvent(coord[i].x, coord[i].y, triggers, false);
			}
		}
		return _Game_Player_checkEventTriggerHere.call(this, triggers);
	};
	
	var _Game_Player_checkEventTriggerThere = Game_Player.prototype.checkEventTriggerThere;
	Game_Player.prototype.checkEventTriggerThere = function(triggers) {
		if (this.canStartLocalEvents() && this._bigSprite.type) {
			if (Dahlys.Pl_ADT) {
				var surroundTiles = this.checkAheadTiles(2).concat(this.checkAheadTiles(4), this.checkAheadTiles(6), this.checkAheadTiles(8));
				for (var i = 0; i < surroundTiles.length; i++) {
					if (!$gameMap.isAnyEventStarting()) this.startMapEvent(surroundTiles[i].x, surroundTiles[i].y, triggers, true);
				}
			} else {
				var d = this.direction();
				var forwardTiles = this.checkAheadTiles(d);
				for (var i = 0; i < forwardTiles.length; i++) {
					if (!$gameMap.isAnyEventStarting()) this.startMapEvent(forwardTiles[i].x, forwardTiles[i].y, triggers, true);
				}
			}
		} else _Game_Player_checkEventTriggerThere.call(this, triggers);
	};
	
	var _Game_Player_triggerTouchAction = Game_Player.prototype.triggerTouchAction;
	Game_Player.prototype.triggerTouchAction = function() {
		if (this._bigSprite.type && $gameTemp.isDestinationValid()){
			var direction = this.direction();
			var here = this._bigSprite.occupancy;
			for (var i = 0; i < here.length; i++) {
				if (this.triggerTouchActionD1(here[i].x, here[i].y)) return true;
			}
			var ahead = this.checkAheadTiles(direction);
			for (var i = 0; i < ahead.length; i++) {
				if (this.triggerTouchActionD2(ahead[i].x, ahead[i].y)) return true;
			}
		}
		return _Game_Player_triggerTouchAction.call(this);
	};
	
/* 
-------------------------------------------------------------------------------------------------------------------------------------------
		CONFIGURE PASSABILITY
-------------------------------------------------------------------------------------------------------------------------------------------
*/	
	
	var _Game_CharacterBase_isMapPassable = Game_CharacterBase.prototype.isMapPassable;
	Game_CharacterBase.prototype.isMapPassable = function(x, y, d) {
		if (this._bigSprite.type) {
			var d2 = this.reverseDir(d);
			return $gameMap.isPassable(x, y, d) && $gameMap.isPassable(x, y, d2);
		} else return _Game_CharacterBase_isMapPassable.call(this, x, y, d);
	};
	
	var _Game_Vehicle_isMapPassable = Game_Vehicle.prototype.isMapPassable;
	Game_Vehicle.prototype.isMapPassable = function(x, y, d) {
		if ($gamePlayer._bigSprite.type) {
			if (this.isAirship()) return true;
			if (this.isBoat()) {
				return $gameMap.isBoatPassable(x, y);
			} else if (this.isShip()) {
				return $gameMap.isShipPassable(x, y);
			} else if (this.isAirship()) {
				return true;
			} else {
				return false;
			}
		} else return _Game_Vehicle_isMapPassable.call(this, x, y, d);
	};
	
	Game_CharacterBase.prototype.isCollidedWithEvents = function(x, y) {
		if (!this.isNormalPriority()) return false;
		var events = $gameMap.eventsXyNt(x, y).filter(function(ev) {return ev.isNormalPriority();});
		if (events.length <= 0) return false;
		for (var i = 0; i < events.length; i++) {
			if (events[i] !== this) return true;
		}
		return false;
	};
	
	Game_Event.prototype.isCollidedWithEvents = function(x, y) {
		if (!this.isNormalPriority())return false;
		var events = $gameMap.eventsXyNt(x, y).filter(function(ev) {return ev.isNormalPriority();});
		if (events.length <= 0) return false;	
		for (var i = 0; i < events.length; i++) {
			if (events[i] !== this) return true;
		}
		return false;
	};
	
	var _Game_CharacterBase_canPass = Game_CharacterBase.prototype.canPass;
	Game_CharacterBase.prototype.canPass = function(x, y, d) {
		if (this._bigSprite.type) {
			if (this.isThrough() || this.isDebugThrough())return true;
			if (this === $gamePlayer && this.isInAirship())return true;
			var forwardTiles = this.checkAheadTiles(d); 
			for (var i = 0; i < forwardTiles.length; i++) {
				if (!$gameMap.isValid(forwardTiles[i].x, forwardTiles[i].y)) return false;
				if (!this.isMapPassable(forwardTiles[i].x, forwardTiles[i].y, d)) return false;
				if (this.isCollidedWithCharacters(forwardTiles[i].x, forwardTiles[i].y)) return false;
			} 
			return true;
		}
		return _Game_CharacterBase_canPass.call(this, x, y, d);
	};
	
	var _Game_CharacterBase_canPassDiagonally = Game_CharacterBase.prototype.canPassDiagonally;
	Game_CharacterBase.prototype.canPassDiagonally = function(x, y, horz, vert) {
		if (this._bigSprite.type) {
			if (this.isThrough() || this.isDebugThrough()) return true;
			if (this === $gamePlayer && this.isInAirship())return true;
			var tilesToCheck = this.checkDiagonalTiles(horz, vert);
			for (var i = 0; i < tilesToCheck.length; i++) {
				if (!$gameMap.isValid(tilesToCheck[i].x, tilesToCheck[i].y)) return false;
				if (this.isCollidedWithCharacters(tilesToCheck[i].x, tilesToCheck[i].y)) return false;			
				if (!this.isMapPassable(tilesToCheck[i].x, tilesToCheck[i].y, horz) || !this.isMapPassable(tilesToCheck[i].x, tilesToCheck[i].y, vert)) return false;				
			} 
			return true;
		}
		return _Game_CharacterBase_canPassDiagonally.call(this, x, y, horz, vert);		
	};	
	
	if (Dahlys.diagMovement) {
		var _Game_Player_canPassDiagonally = Game_Player.prototype.canPassDiagonally;
		Game_Player.prototype.canPassDiagonally = function(x, y, horz, vert) {
			if (this._bigSprite.type) {
				if (this.isThrough() || this.isDebugThrough()) return true;
				if (this === $gamePlayer && this.isInAirship())return true;
				var tilesToCheck = this.checkDiagonalTiles(horz, vert);
				for (var i = 0; i < tilesToCheck.length; i++) {
					if (!$gameMap.isValid(tilesToCheck[i].x, tilesToCheck[i].y)) return false;
					if (this.isCollidedWithCharacters(tilesToCheck[i].x, tilesToCheck[i].y)) return false;				
					if (!this.isMapPassable(tilesToCheck[i].x, tilesToCheck[i].y, horz) || !this.isMapPassable(tilesToCheck[i].x, tilesToCheck[i].y, vert)) return false;
				}
				return true;
			} else if (_Game_Player_canPassDiagonally) {
				return _Game_Player_canPassDiagonally.call(this, x, y, horz, vert);
			} else {
				return this.canPassDiagonally(this, x, y, horz, vert);
			}			
		};
	}
	
/* 
-------------------------------------------------------------------------------------------------------------------------------------------
		MOVEMENT UPDATE EVENT SIZE
-------------------------------------------------------------------------------------------------------------------------------------------
*/	
	
	var _Game_Character_turnTowardCharacter = Game_Character.prototype.turnTowardCharacter;
	Game_Character.prototype.turnTowardCharacter = function(character) {
		if (this._bigSprite.type) {
			var coord = this._bigSprite.occupancy;
			var nearestCoord = null;
			var sx = this.deltaXFrom(character.x);
			var sy = this.deltaYFrom(character.y);
			for (var i = 0; i < coord.length; i++) {
				var dx = $gameMap.deltaX(coord[i].x, character.x);
				var dy = $gameMap.deltaX(coord[i].y, character.y);
				if (Math.abs(dx) + Math.abs(dy) <= Math.abs(sx) + Math.abs(sy)) {
					sx = dx;
					sy = dy;					
				}
			}
			if (Math.abs(sx) > Math.abs(sy)) {
				this.setDirection(sx > 0 ? 4 : 6);
			} else if (sy !== 0) {
				this.setDirection(sy > 0 ? 8 : 2);
			}
		} else {
			_Game_Character_turnTowardCharacter.call(this, character);
		}
	};
	
	var _Game_CharacterBase_setDirection = Game_CharacterBase.prototype.setDirection;
	Game_CharacterBase.prototype.setDirection = function(d) {
		if (!$gameMap || !$gameMap.tileEvents) return _Game_CharacterBase_setDirection.call(this, d);
		if (this._bigSprite.type) {
			oldCoord = this._bigSprite.occupancy; 
			oldDir = this._direction;
			_Game_CharacterBase_setDirection.call(this, d);
			newCoord = this.setBigSpriteCoordinates();
			if (oldCoord !== newCoord) {
				for (var i = 0; i < newCoord.length; i++) {
					if (!$gameMap.isValid(newCoord[i].x, newCoord[i].y) || this.isCollidedWithCharacters(newCoord[i].x, newCoord[i].y) || !this.isMapPassable(newCoord[i].x, newCoord[i].y, d)) {
						this._bigSprite.occupancy = oldCoord;
						_Game_CharacterBase_setDirection.call(this, oldDir);
					}
				} 
			}
		} else {
			_Game_CharacterBase_setDirection.call(this, d);
		}	
	};
	
	var _Game_CharacterBase_setThrough = Game_CharacterBase.prototype.setThrough;
	Game_CharacterBase.prototype.setThrough = function(through) {
		_Game_CharacterBase_setThrough.call(this, through);
		this.setBigSpriteCoordinates();
	};
	
	var _Game_Character_moveStraight = Game_Character.prototype.moveStraight;
	Game_Character.prototype.moveStraight = function(d) {		
		if (this._bigSprite.type) {
			this.setDirection(d);
			if (d === this._direction) { 
				this.setMovementSuccess(this.canPass(this._x, this._y, d));			
				if (this.isMovementSucceeded()) {
					this._x = $gameMap.roundXWithDirection(this._x, d);
					this._y = $gameMap.roundYWithDirection(this._y, d);
					this._realX = $gameMap.xWithDirection(this._x, this.reverseDir(d));
					this._realY = $gameMap.yWithDirection(this._y, this.reverseDir(d));
					this.setBigSpriteCoordinates();
					this.increaseSteps();
					this.checkEventTriggerTouchFront(d);
				} else {
					this.setBigSpriteCoordinates();
					this.checkEventTriggerTouchFront(d);
				} 
			} else {
				this.setBigSpriteCoordinates();
				this.checkEventTriggerTouchFront(this._direction);
			}			
		} else {
			_Game_Character_moveStraight.call(this, d);
			this.setBigSpriteCoordinates();
			this.checkEventTriggerTouchFront(d);
		}
	};
	
	var _Game_Character_moveDiagonally = Game_Character.prototype.moveDiagonally;
	Game_Character.prototype.moveDiagonally = function(horz, vert) {	
		if (this._bigSprite.type) {
			this.setMovementSuccess(this.canPassDiagonally(this._x, this._y, horz, vert));		
			if (this.isMovementSucceeded()) {
				this._x = $gameMap.roundXWithDirection(this._x, horz);
				this._y = $gameMap.roundYWithDirection(this._y, vert);
				this._realX = $gameMap.xWithDirection(this._x, this.reverseDir(horz));
				this._realY = $gameMap.yWithDirection(this._y, this.reverseDir(vert));
				this.setBigSpriteCoordinates();
				this.increaseSteps();
				this.checkEventTriggerTouchFront(this._direction);				
			} else {
				this.checkEventTriggerTouchFront(this._direction);
			}
			if (this._direction === this.reverseDir(horz)) {
				this.setDirection(horz);
				this.checkEventTriggerTouchFront(this._direction);
			}
			if (this._direction === this.reverseDir(vert)) {
				this.setDirection(vert);
				this.checkEventTriggerTouchFront(this._direction);
			}		
		} else {
			_Game_Character_moveDiagonally.call(this, horz, vert);
			this.setBigSpriteCoordinates();
			this.checkEventTriggerTouchFront(this._direction);
		}
	};
	
	var _Game_Character_jump = Game_Character.prototype.jump;
	Game_Character.prototype.jump = function(xPlus, yPlus) {
		if (this._bigSprite.type) {
			if (Math.abs(xPlus) > Math.abs(yPlus)) {
				if (xPlus !== 0) {
					var d = xPlus < 0 ? 4 : 6;
					this.setDirection(d);
					var canTurn = d === this._direction;
				}
			} else {
				if (yPlus !== 0) {
					var d = yPlus < 0 ? 8 : 2;
					this.setDirection(d);
					var canTurn = d === this._direction;
				}
			}
			if (canTurn) {
				var oldCoord = this._bigSprite.occupancy;	
				var oldX = this._x;
				var oldY = this._y;
				this._x += xPlus;
				this._y += yPlus;
				var newCoord = this.setBigSpriteCoordinates();
				for (var i = 0; i < newCoord.length; i++) {
					if (!$gameMap.isValid(newCoord[i].x, newCoord[i].y) || this.isCollidedWithCharacters(newCoord[i].x, newCoord[i].y) || !this.isMapPassable(newCoord[i].x, newCoord[i].y, d)) {
						this._x = oldX;
						this._y = oldY;
						this._bigSprite.occupancy = oldCoord;
						this.resetStopCount();
						this.straighten();
						this.checkEventTriggerTouchFront(this._direction);
						return;
					}
				}
				var distance = Math.round(Math.sqrt(xPlus * xPlus + yPlus * yPlus));
				this._jumpPeak = 10 + distance - this._moveSpeed;
				this._jumpCount = this._jumpPeak * 2;
				this.resetStopCount();
				this.straighten();
				this.checkEventTriggerTouchFront(this._direction);
			}
		} else {
			_Game_Character_jump.call(this, xPlus, yPlus);
			this.setBigSpriteCoordinates();
			this.checkEventTriggerTouchFront(this._direction);
		}
	};
	
	var _Game_Character_deltaYFrom = Game_Character.prototype.deltaYFrom;
	Game_Character.prototype.deltaYFrom = function(y) {
		if (this._bigSprite.type && this._bigSprite.type.includes('B')) return $gameMap.deltaY(this._bigSprite.Y0, y);
		return _Game_Character_deltaYFrom.call(this, y);
	};
	
	var _Game_Character_moveRandom = Game_Character.prototype.moveRandom;
	Game_Character.prototype.moveRandom = function() {
		if (this._bigSprite.type && this._bigSprite.type.includes('B')) {
			var d = 2 + Math.randomInt(4) * 2;
			if (this.canPass(this.x, this._bigSprite.Y0, d)) {
				this.moveStraight(d);
			}
		} else {
			_Game_Character_moveRandom.call(this);
		}
	};
	
	var _Game_Character_swap = Game_Character.prototype.swap;
	Game_Character.prototype.swap = function(character) {
		if (this._bigSprite.type || character._bigSprite.type) {
			var oneNewX = character.x;
			var oneNewY = character.y + Math.floor(this._bigSprite.size / 2);
			var twoNewX = this.x;
			var twoNewY = this.y + Math.floor(character._bigSprite.size / 2);
			var oneOldX = this.x;
			var oneOldY = this.y;
			var twoOldX = character.x;
			var twoOldY = character.y;
			character.locate(twoNewX, twoNewY);
			this.locate(oneNewX, oneNewY);
			var oneNewCoord = this._bigSprite.occupancy;
			var twoNewCoord = character._bigSprite.occupancy;
			for (var i = 0; i < oneNewCoord.length; i++) {
				if (!$gameMap.isValid(oneNewCoord[i].x, oneNewCoord[i].y) || this.isCollidedWithCharacters(oneNewCoord[i].x, oneNewCoord[i].y) || !this.isMapPassable(newCoord[i].x, newCoord[i].y, this._direction)) {
					character.locate(twoOldX, twoOldY);
					this.locate(oneOldX, oneOldY);
					this.resetStopCount();
					this.straighten();
					return;
				}
			}
			for (var i = 0; i < twoNewCoord.length; i++) {
				if (!$gameMap.isValid(twoNewCoord[i].x, twoNewCoord[i].y) || character.isCollidedWithCharacters(twoNewCoord[i].x, twoNewCoord[i].y) || !character.isMapPassable(newCoord[i].x, newCoord[i].y, character._direction)) {
					character.locate(twoOldX, twoOldY);
					this.locate(oneOldX, oneOldY);
					this.resetStopCount();
					this.straighten();
					return;
				}
			}				
		} else {
			_Game_Character_swap.call(this, character);
		}
	};
	
	var _Game_CharacterBase_locate = Game_CharacterBase.prototype.locate;
	Game_CharacterBase.prototype.locate = function(x, y) {
		_Game_CharacterBase_locate.call(this, x, y);
		if (this._bigSprite.occupancy) {
			this.setBigSpriteCoordinates();
			this.checkEventTriggerTouchFront(this._direction);
		}
	};
	
	if (Dahlys.touchFixB) {
		Game_Character.prototype.findDirectionTo = function(goalX, goalY) {
			if (this._bigSprite.type && this._bigSprite.type.match(/B/)) {
				var centerY = this._bigSprite.Y0;
			} else {
				var centerY = this._y;
			}
			var searchLimit = this.searchLimit();
			var mapWidth = $gameMap.width();
			var nodeList = [];
			var openList = [];
			var closedList = [];
			var start = {};
			var best = start;
			
			if (this.x === goalX && centerY === goalY) {
				return 0;
			}

			start.parent = null;
			start.x = this.x;
			start.y = centerY;
			start.g = 0;
			start.f = $gameMap.distance(start.x, start.y, goalX, goalY);
			nodeList.push(start);
			openList.push(start.y * mapWidth + start.x);

			while (nodeList.length > 0) {
				var bestIndex = 0;
				for (var i = 0; i < nodeList.length; i++) {
					if (nodeList[i].f < nodeList[bestIndex].f) {
						bestIndex = i;
					}
				}

				var current = nodeList[bestIndex];
				var x1 = current.x;
				var y1 = current.y;
				var pos1 = y1 * mapWidth + x1;
				var g1 = current.g;

				nodeList.splice(bestIndex, 1);
				openList.splice(openList.indexOf(pos1), 1);
				closedList.push(pos1);

				if (current.x === goalX && current.y === goalY) {
					best = current;
					break;
				}

				if (g1 >= searchLimit) {
					continue;
				}

				for (var j = 0; j < 4; j++) {
					var direction = 2 + j * 2;
					var x2 = $gameMap.roundXWithDirection(x1, direction);
					var y2 = $gameMap.roundYWithDirection(y1, direction);
					var pos2 = y2 * mapWidth + x2;

					if (closedList.contains(pos2)) {
						continue;
					}
					if (!this.canPass(x1, y1, direction)) {
						continue;
					}

					var g2 = g1 + 1;
					var index2 = openList.indexOf(pos2);

					if (index2 < 0 || g2 < nodeList[index2].g) {
						var neighbor;
						if (index2 >= 0) {
							neighbor = nodeList[index2];
						} else {
							neighbor = {};
							nodeList.push(neighbor);
							openList.push(pos2);
						}
						neighbor.parent = current;
						neighbor.x = x2;
						neighbor.y = y2;
						neighbor.g = g2;
						neighbor.f = g2 + $gameMap.distance(x2, y2, goalX, goalY);
						if (!best || neighbor.f - neighbor.g < best.f - best.g) {
							best = neighbor;
						}
					}
				}
			}

			var node = best;
			while (node.parent && node.parent !== start) {
				node = node.parent;
			}

			var deltaX1 = $gameMap.deltaX(node.x, start.x);
			var deltaY1 = $gameMap.deltaY(node.y, start.y);
			if (deltaY1 > 0) {
				return 2;
			} else if (deltaX1 < 0) {
				return 4;
			} else if (deltaX1 > 0) {
				return 6;
			} else if (deltaY1 < 0) {
				return 8;
			}

			var deltaX2 = this.deltaXFrom(goalX);
			var deltaY2 = this.deltaYFrom(goalY);
			if (Math.abs(deltaX2) > Math.abs(deltaY2)) {
				return deltaX2 > 0 ? 4 : 6;
			} else if (deltaY2 !== 0) {
				return deltaY2 > 0 ? 8 : 2;
			}

			return 0;
		};
	};
	
})();
