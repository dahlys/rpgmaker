/*:
 * @plugindesc Big Sprites
 * @author Dahlys
 * 
 * @param Auto Set Comment
 * @desc Automatically set 1st bigSprite comment on event page.
 * @default true
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
 * @help
 * ==============================================================================
 *                                 BIG SPRITES
 * ==============================================================================
 * 
 * NOTE: I am following the map grid, so partially blocked tiles are not a thing.
 *
 * A 'solid' tile is a tile where the character EXISTS. It inherits the priority 
 * from the main character (below/same/above player) and will be passable the 
 * same way. Only solid tiles are triggerable. The main character tile does not 
 * have to be solid.
 *
 * Also, different kinds of big sprites are treated differently. These are the
 * categories:
 *
 * A) No matter how sprite moves/turns, the same tiles remain solid. e.g. A 
 *    giant mecha
 * B) The middle of the big sprite image is solid and the rest is relative to it.
 *    e.g. A flying spaghetti monster, a large battleship
 * C) Complete customization of big sprite solidity based on direction faced.
 *
 * When a character turns or moves around, its size will be adjusted accordingly. 
 * A bigger character will also have a bigger action button/event touch/player 
 * touch trigger.
 *
 * ------------------------------------------------------------------------------
 *                                   FOR EVENTS
 * ------------------------------------------------------------------------------
 *
 * For events, you can use comments to override notetags. The contents of the 
 * comments are the same as the relevant notetags.
 *
 * When an event page is initialized, the event sprite size is set by notetag.
 * After that the event page is searched for the first bigSprite comment. If
 * found, it will override/add to the notetag. Subsequent bigSprite comments will 
 * be processed when the event is activated by its trigger. 
 * 
 * e.g. Action Button Trigger
 * Comment: <bigSprite: 1 2 3>
 * Text: I'm going to transform!
 * Show Picture
 * Comment: <bigSprite: 5 circle 2>
 * 
 * The initial size is 1 2 3. When the event is activated by action button, 
 * the second bigSprite command is executed and the event will change size to 
 * 5 circle 2. This is good for transforming events!
 *
 * ------------------------------------------------------------------------------
 *                                   FOR PLAYER
 * ------------------------------------------------------------------------------
 *
 * When the character is the PLAYER, bigSprite is only triggered by
 * running an event containing the appropriate comment. It's the same as using a
 * plugin command, except it's a comment instead.
 *
 * ------------------------------------------------------------------------------
 *                                   CATEGORY A
 * ------------------------------------------------------------------------------
 * 
 * For category A, the character is expanded upwards and sideways but not 
 * downwards since the default character tile is always at the middle bottom.
 *
 * FOR PLAYER, Comment: <bigPlayer: above left right>
 *
 * FOR EVENT, Notetag/Comment: <bigEvent: above left right>
 *
 * e.g. <bigEvent: 1 1 1> creates a rectagle around the base event 1 tile
 * above, 1 tile to the left and 1 tile to the right to a total of 6 solid tiles.
 *
 * You can use more notes/comments to customize the shape, tile by tile.
 *
 * Notetag/Comment: <bigEventEx: dx,dy dx,dy dx,dy>
 *  
 * e.g. 
 * Notetag: <bigEvent: 0 1 1> <bigEventEx: -1,-1 -1,-2> 
 * Event has a base rectangle 3 tiles long and 2 extra solid tiles: 1 and 2  
 * tiles above the main event and 1 tile to the left. The result of the 2 
 * commands is an L-shaped big event!
 *
 * You can add as many extra tiles as you want.
 *
 * ------------------------------------------------------------------------------
 *                                   CATEGORY B
 * ------------------------------------------------------------------------------
 *
 * For category B, the center of the character is shifted up to match the sprite.
 * This makes it possible to make the default event tile passable. Hence, to
 * facilitate turning for such an character, the sprite box is highly recommended 
 * to be a square.
 *
 * FOR PLAYER, Comment: <bigPlayer: spritesize front back left right>
 *
 * FOR EVENT, Notetag/Comment: <bigEvent: spritesize front back left right>
 * 
 * where spritesize, front, back, left, and right are numbers. 
 * e.g. <bigEvent: 7 1 1 1 0> shifts the center of the event 3 tiles up to 
 * match the center of the big sprite image. It then adds 1 tile front, 1 tile 
 * back, and 1 to the left making the event occupy a rectangular space that is 
 * 2x3 tiles.
 *
 * Besides big rectangular events, big diamond-shaped characters are also 
 * possible. The notetag for this is: 
 *
 * FOR PLAYER, Comment: <bigPlayer: spritesize diamond radius>
 *
 * FOR EVENT, Notetag/Comment: <bigEvent: spritesize diamond radius>
 *
 * e.g. <bigEvent: 7 diamond 3> adds all tiles <= 3 tiles away to event size.
 *
 * You can also have a circular big character with notetag:
 *
 * FOR PLAYER, Comment: <bigPlayer: spritesize circle radius>
 *
 * FOR EVENT, Notetag/Comment: <bigEvent: spritesize circle radius>
 *
 * e.g. <bigEvent: 7 circle 4> expands the event size by a radius of 4 tiles.
 *
 * Extra tiles can be added to customize the shape. These tile coordinates are
 * measured relative to the new center, not the base event.
 *
 * FOR PLAYER, Comment: <bigPlayerEx: dx,dy dx,dy dx,dy>
 *
 * FOR EVENT, Notetag/Comment: <bigEventEx: dx,dy dx,dy dx,dy>
 * 
 * ------------------------------------------------------------------------------
 *                                   CATEGORY C
 * ------------------------------------------------------------------------------
 * 
 * This is the most versatile mode but also the most complicated to set up. You
 * can fully customize which tile will be solid in all 4 directions.
 *
 * Like category A, the default tile is not shifted and everything is relative to
 * the main tile.
 *
 * FOR PLAYER, Comment: <bigPlayer: [down] [left] [right] [up]>
 *
 * FOR EVENT, Notetag/Comment: <bigEvent: [down] [left] [right] [up]>
 * where [direction] = [above left right]
 *
 * e.g. <bigEvent: [1 0 0] [0 1 1] [0 1 1] [1 0 0]> will create a big event that
 * is 2 tiles high when facing up/down, but 3 tiles wide when facing left/right.
 *
 * For even more customization, you can add tile by tile.
 *
 * FOR PLAYER, Comment: <bigPlayerEx: [down] [left] [right] [up]>
 *
 * FOR EVENT, Notetag/Commment: <bigEventEx: [down] [left] [right] [up]>
 * where [direction] = [dx,dy dx,dy dx,dy]
 * 
 * ------------------------------------------------------------------------------
 *                            BIG EVENT/PLAYER EX ONLY
 * ------------------------------------------------------------------------------
 *
 * bigSpriteEx used without bigSprite will default to Category B, but with the
 * event origin at the base tile. It will rotate when the sprite turns. To use
 * Category A type bigSpriteEx only:
 *
 * FOR PLAYER, commment: <bigPlayer: 0 0 0> <bigPlayerEx: dx,dy dx,dy dx,dy>
 *
 * FOR EVENTS, notetag/comment <bigEvent: 0 0 0> <bigEventEx: dx,dy dx,dy dx,dy>
 *
 * Category C type bigSpriteEx can be used as is.
 *
*/

(function() { 

/* 
----------------------------------------------------------------------------------
		PLUGIN PARAMETERS
----------------------------------------------------------------------------------
*/	
	
	var parameters = PluginManager.parameters('Dahlys_BigSprites');
	var autoSetComment = eval(parameters['Auto Set Comment']) || true;
	var bigBoat = String(parameters['Boat Size']) || null;
	var bigShip = String(parameters['Ship Size']) || null;
	var bigAirship = String(parameters['Airship Size']) || null;
	
/* 
-------------------------------------------------------------------------------------------------------------------------------------------
		INITIALIZE NEW VARIABLES
-------------------------------------------------------------------------------------------------------------------------------------------
*/
	
	var _Game_Map_initialize = Game_Map.prototype.initialize;
	Game_Map.prototype.initialize = function() {
		_Game_Map_initialize.call(this);
		this._occupiedTiles = [];
	};
	
	var _Game_System_initialize = Game_System.prototype.initialize;
	Game_System.prototype.initialize = function() {
		this.setupBigPlayerSettings();
	};
	
	Game_System.prototype.setupBigPlayerSettings = function() {
		this._bigSprite = {'type': null, 'Y0': null, 'size': null, 'front': null, 'back': null, 'left': null, 'right': null, 'radius': null, 'exCoord': null, 'exType': null, 'occupancy': null};
	};
	
	var _Game_Character_initialize = Game_Character.prototype.initialize;
	Game_Character.prototype.initialize = function() {
		_Game_Character_initialize.call(this);
		this.initializeBigSprite();		
	};
	
	Game_Character.prototype.initializeBigSprite = function() {
		this._bigSprite = {'type': null, 'Y0': this.y, 'size': 1, 'front': 0, 'back': 0, 'left': 0, 'right': 0, 'radius': 0, 'exCoord': null, 'exType': null, 'occupancy': [{'x': this.x, 'y': this.y}]};
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
		this.setSpriteExSizeFromEventNote();
		if (autoSetComment) this.setSpriteSizeFromPageComment();	
		this.setEventCoordinates();
		this.updateEventCoordinates();
	};		
	
/* 
-------------------------------------------------------------------------------------------------------------------------------------------
		SETUP BIG EVENT
-------------------------------------------------------------------------------------------------------------------------------------------
*/		
	
	Game_Event.prototype.setSpriteSizeFromEventNote = function() {
		if (this.isSpawnEvent) return;
		var note = $dataMap.events[this._eventId].meta.bigSprite;
		if (!note) return;		
		var capturingRegexA = /(\d+)(?: )(\d+)(?: )(\d+)/
		var capturingRegex = /(\d+)(?: )(\d+)(?: )(\d+)(?: )(\d+)(?: )(\d+)/;
		var capturingRegex2 = /(\d+)(?: )(?:diamond )(\d+)/i;
		var capturingRegex3 = /(\d+)(?: )(?:circle )(\d+)/i;
		var capturingRegexC = /(?:\[)(\d+)(?: )(\d+)(?: )(\d+)(?:\])(?: \[)(\d+)(?: )(\d+)(?: )(\d+)(?:\])(?: \[)(\d+)(?: )(\d+)(?: )(\d+)(?:\])(?: \[)(\d+)(?: )(\d+)(?: )(\d+)(?:\])/	
		if (note.match(/\d+ \d+ \d+ \d+ \d+/)) {
			var params = capturingRegex.exec(note);
			this._bigSprite.size = Number(params[1]);
			this._bigSprite.front = Number(params[2]);
			this._bigSprite.back = Number(params[3]);
			this._bigSprite.left = Number(params[4]);
			this._bigSprite.right = Number(params[5]);
			this._bigSprite.type = 'squareB';
			return;
		}
		if (note.match(/\d+ diamond \d+/i)) {
			var params = capturingRegex2.exec(note);
			this._bigSprite.size = Number(params[1]);
			this._bigSprite.radius = Number(params[2]);
			this._bigSprite.type = 'diamondB';
			return;
		}
		if (note.match(/\d+ circle \d+/i)) {
			var params = capturingRegex3.exec(note);
			this._bigSprite.size = Number(params[1]);
			this._bigSprite.radius = Number(params[2]);
			this._bigSprite.type = 'circleB';
			return;
		}
		if (note.match(/\[.*\]/)) {
			var params = capturingRegexC.exec(note);
			this._bigSprite.back = [Number(params[1]), Number(params[4]), Number(params[7]), Number(params[10])];
			this._bigSprite.left = [Number(params[2]), Number(params[5]), Number(params[8]), Number(params[11])];
			this._bigSprite.right = [Number(params[3]), Number(params[6]), Number(params[9]), Number(params[12])];
			this._bigSprite.type = 'custom';
			return;
		}
		if (note.match(/\d+ \d+ \d+/)) {
			var params = capturingRegexA.exec(note);
			this._bigSprite.back = Number(params[1]);
			this._bigSprite.left = Number(params[2]);
			this._bigSprite.right = Number(params[3]);
			this._bigSprite.type = 'squareA';
			return;
		}		
	};
	
	Game_Event.prototype.setSpriteExSizeFromEventNote = function() {
		if (this.isSpawnEvent) return;
		var note = $dataMap.events[this._eventId].meta.bigSpriteEx;
		if (!note) return;
		var capturingRegexA = /(\d+|-\d+),(\d+|-\d+)/g
		var capturingRegexC = /(?:\[)(.*)(?:\])(?: \[)(.*)(?:\])(?: \[)(.*)(?:\])(?: \[)(.*)(?:\])/
		var capturingRegexC2 = /(\d+|-\d+),(\d+|-\d+)/g
		if (note.match(/\[.*\]/)) {
			var params = capturingRegexC.exec(note);
			var coord = {'down': [], 'left': [], 'right': [], 'up': []};
			if (params[1].match(/(\d+|-\d+),(\d+|-\d+)/)) {
				do {
					var match = capturingRegexC2.exec(note);
					if (match) coord.down.push({'dx': Number(match[1]), 'dy': Number(match[2])});
				} while (match);
			}
			if (params[2].match(/(\d+|-\d+),(\d+|-\d+)/)) {
				do {
					var match = capturingRegexC2.exec(note);
					if (match) coord.left.push({'dx': Number(match[1]), 'dy': Number(match[2])});
				} while (match);
			}
			if (params[3].match(/(\d+|-\d+),(\d+|-\d+)/)) {
				do {
					var match = capturingRegexC2.exec(note);
					if (match) coord.right.push({'dx': Number(match[1]), 'dy': Number(match[2])});
				} while (match);
			}
			if (params[4].match(/(\d+|-\d+),(\d+|-\d+)/)) {
				do {
					var match = capturingRegexC2.exec(note);
					if (match) coord.up.push({'dx': Number(match[1]), 'dy': Number(match[2])});
				} while (match);
			}
			this._bigSprite.exCoord = coord;
			this._bigSprite.exType = 'C';
		}
		if (note.match(/(\d+|-\d+),(\d+|-\d+)/)) {
			var coord = [];
			do {
				var match = capturingRegexA.exec(note);
				if (match) coord.push({'dx': Number(match[1]), 'dy': Number(match[2])});
			} while (match);
			this._bigSprite.exCoord = coord;
			if (this._bigSprite.type === 'squareA') this._bigSprite.exType = 'A';
			else this._bigSprite.exType = 'B';
		}
	};
	
	Game_Vehicle.prototype.setBigVehicleSize = function(type) {
		if (type === 'boat' && bigBoat) {
			this.setBigVehicleVariables(bigBoat);
		}
		if (type === 'ship' && bigShip) {
			this.setBigVehicleVariables(bigShip);
		}
		if (type === 'airship' && bigAirship) {
			this.setBigVehicleVariables(bigAirship);
		}
	};
	
	Game_Character.prototype.setBigVehicleVariables = function(args) {
		this.initializeBigSprite();
		var capturingRegexA = /(\d+)(?: )(\d+)(?: )(\d+)/i
		var capturingRegexC = /(?:\[)(\d+)(?: )(\d+)(?: )(\d+)(?:\])(?: \[)(\d+)(?: )(\d+)(?: )(\d+)(?:\])(?: \[)(\d+)(?: )(\d+)(?: )(\d+)(?:\])(?: \[)(\d+)(?: )(\d+)(?: )(\d+)(?:\])/i	
		if (args.match(/\[.*\]/)) {
			var params = capturingRegexC.exec(args);
			this._bigSprite.back = [Number(params[1]), Number(params[4]), Number(params[7]), Number(params[10])];
			this._bigSprite.left = [Number(params[2]), Number(params[5]), Number(params[8]), Number(params[11])];
			this._bigSprite.right = [Number(params[3]), Number(params[6]), Number(params[9]), Number(params[12])];
			this._bigSprite.type = 'custom';
		} else if (args.match(/\d+ \d+ \d+/)) {
			var params = capturingRegexA.exec(args);
			this._bigSprite.back = Number(params[1]);
			this._bigSprite.left = Number(params[2]);
			this._bigSprite.right = Number(params[3]);
			this._bigSprite.type = 'squareA';
		}
	};
	
	var _Game_Interpreter_command108 = Game_Interpreter.prototype.command108;
	Game_Interpreter.prototype.command108 = function() {
		var result = _Game_Interpreter_command108.call(this);
		var thisEvent = $gameMap.event(this._eventId);
		for (var i = 0; i < this._comments.length; i++) {
			if (this._comments[i].match(/bigEvent:/i)) {
				thisEvent.executeBigSpriteComment(this._comments[i], thisEvent);
			}
			if (this._comments[i].match(/bigEventEx:/i)) {
				thisEvent.executeBigSpriteExComment(this._comments[i], thisEvent);
			}			
			if (this._comments[i].match(/bigPlayer:/i)) {
				thisEvent.executeBigSpriteComment(this._comments[i], $gamePlayer);
			}
			if (this._comments[i].match(/bigPlayerEx:/i)) {
				thisEvent.executeBigSpriteExComment(this._comments[i], $gamePlayer);
			}
		}
		return result;
	};
	
	Game_Event.prototype.executeBigSpriteComment = function(comment, target) {
		target.initializeBigSprite();
		var capturingRegexA = /(\d+)(?: )(\d+)(?: )(\d+)/i
		var capturingRegex = /(\d+)(?: )(\d+)(?: )(\d+)(?: )(\d+)(?: )(\d+)/i;
		var capturingRegex2 = /(\d+)(?: )(?:diamond )(\d+)/i;
		var capturingRegex3 = /(\d+)(?: )(?:circle )(\d+)/i;
		var capturingRegexC = /(?:\[)(\d+)(?: )(\d+)(?: )(\d+)(?:\])(?: \[)(\d+)(?: )(\d+)(?: )(\d+)(?:\])(?: \[)(\d+)(?: )(\d+)(?: )(\d+)(?:\])(?: \[)(\d+)(?: )(\d+)(?: )(\d+)(?:\])/i	
		if (comment.match(/\d+ \d+ \d+ \d+ \d+/i)) {
			var params = capturingRegex.exec(comment);
			target._bigSprite.size = Number(params[1]);
			target._bigSprite.front = Number(params[2]);
			target._bigSprite.back = Number(params[3]);
			target._bigSprite.left = Number(params[4]);
			target._bigSprite.right = Number(params[5]);
			target._bigSprite.type = 'squareB';
		} else if (comment.match(/\d+ diamond \d+/i)) {
			var params = capturingRegex2.exec(comment);
			target._bigSprite.size = Number(params[1]);
			target._bigSprite.radius = Number(params[2]);
			target._bigSprite.type = 'diamondB';
		} else if (comment.match(/\d+ circle \d+/i)) {
			var params = capturingRegex3.exec(comment);
			target._bigSprite.size = Number(params[1]);
			target._bigSprite.radius = Number(params[2]);
			target._bigSprite.type = 'circleB';
		} else if (comment.match(/\[.*\]/)) {
			var params = capturingRegexC.exec(comment);
			target._bigSprite.back = [Number(params[1]), Number(params[4]), Number(params[7]), Number(params[10])];
			target._bigSprite.left = [Number(params[2]), Number(params[5]), Number(params[8]), Number(params[11])];
			target._bigSprite.right = [Number(params[3]), Number(params[6]), Number(params[9]), Number(params[12])];
			target._bigSprite.type = 'custom';
		} else if (comment.match(/\d+ \d+ \d+/)) {
			var params = capturingRegexA.exec(comment);
			target._bigSprite.back = Number(params[1]);
			target._bigSprite.left = Number(params[2]);
			target._bigSprite.right = Number(params[3]);
			target._bigSprite.type = 'squareA';
		}		
		target.setEventCoordinates();
		target.updateEventCoordinates();
	};
	
	Game_Event.prototype.executeBigSpriteExComment = function(comment, target) {
		target._bigSprite.exCoord = null;
		target._bigSprite.exType = null;
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
			target._bigSprite.exCoord = coord;
			target._bigSprite.exType = 'C';
		}
		if (comment.match(/(\d+|-\d+),(\d+|-\d+)/)) {
			var coord = [];
			do {
				var match = capturingRegexA.exec(comment);
				if (match) coord.push({'dx': Number(match[1]), 'dy': Number(match[2])});
			} while (match);
			target._bigSprite.exCoord = coord;
			if (target._bigSprite.type === 'squareA') target._bigSprite.exType = 'A';
			else target._bigSprite.exType = 'B';
		}
		target.setEventCoordinates();
		target.updateEventCoordinates();
	};
	
	Game_Event.prototype.setSpriteSizeFromPageComment = function() {		
		var pagelist = this.list();
		var capturingRegexA = /(\d+)(?: )(\d+)(?: )(\d+)/i
		var capturingRegex = /(\d+)(?: )(\d+)(?: )(\d+)(?: )(\d+)(?: )(\d+)/i;
		var capturingRegex2 = /(\d+)(?: )(?:diamond )(\d+)/i;
		var capturingRegex3 = /(\d+)(?: )(?:circle )(\d+)/i;
		var capturingRegexC = /(?:\[)(\d+)(?: )(\d+)(?: )(\d+)(?:\])(?: \[)(\d+)(?: )(\d+)(?: )(\d+)(?:\])(?: \[)(\d+)(?: )(\d+)(?: )(\d+)(?:\])(?: \[)(\d+)(?: )(\d+)(?: )(\d+)(?:\])/i	
		
		var capturingRegexA2 = /(\d+|-\d+),(\d+|-\d+)/g
		var capturingRegexC2 = /(?:\[)(.*)(?:\])(?: \[)(.*)(?:\])(?: \[)(.*)(?:\])(?: \[)(.*)(?:\])/
		var capturingRegexC3 = /(\d+|-\d+),(\d+|-\d+)/g
		
		for (var i = 0; i < pagelist.length; i++) {
			var parameters = pagelist[i].parameters;
			for (var j = 0; j < parameters.length; j++) {
				if ((pagelist[i].code === 108 || pagelist[i].code === 408) && parameters[j].match(/<bigEvent: \d+ \d+ \d+ \d+ \d+>/i)) {
					var comment = pagelist[i].parameters;
					var params = capturingRegex.exec(comment);
					this._bigSprite.size = Number(params[1]);
					this._bigSprite.front = Number(params[2]);
					this._bigSprite.back = Number(params[3]);
					this._bigSprite.left = Number(params[4]);
					this._bigSprite.right = Number(params[5]);
					this._bigSprite.type = 'squareB';					
				} else if ((pagelist[i].code === 108 || pagelist[i].code === 408) && parameters[j].match(/<bigEvent: \d+ diamond \d+>/i)) {
					var comment = pagelist[i].parameters;
					var params = capturingRegex2.exec(comment);
					this._bigSprite.size = Number(params[1]);
					this._bigSprite.radius = Number(params[2]);
					this._bigSprite.type = 'diamondB';
				} else if ((pagelist[i].code === 108 || pagelist[i].code === 408) && parameters[j].match(/<bigEvent: \d+ circle \d+>/i)) {
					var comment = pagelist[i].parameters;
					var params = capturingRegex3.exec(comment);
					this._bigSprite.size = Number(params[1]);
					this._bigSprite.radius = Number(params[2]);
					this._bigSprite.type = 'circleB';
				} else if ((pagelist[i].code === 108 || pagelist[i].code === 408) && parameters[j].match(/<bigEvent: \[.*\]/)) {
					var comment = pagelist[i].parameters;
					var params = capturingRegexC.exec(comment);
					this._bigSprite.back = [Number(params[1]), Number(params[4]), Number(params[7]), Number(params[10])];
					this._bigSprite.left = [Number(params[2]), Number(params[5]), Number(params[8]), Number(params[11])];
					this._bigSprite.right = [Number(params[3]), Number(params[6]), Number(params[9]), Number(params[12])];
					this._bigSprite.type = 'custom';
				} else if ((pagelist[i].code === 108 || pagelist[i].code === 408) && parameters[j].match(/<bigEvent: \d+ \d+ \d+/)) {
					var comment = pagelist[i].parameters;
					var params = capturingRegexA.exec(comment);
					this._bigSprite.back = Number(params[1]);
					this._bigSprite.left = Number(params[2]);
					this._bigSprite.right = Number(params[3]);
					this._bigSprite.type = 'squareA';
				}	
				if ((pagelist[i].code === 108 || pagelist[i].code === 408) && parameters[j].match(/<bigEventEx: \[.*\]/)) {
					var comment = pagelist[i].parameters;
					var params = capturingRegexC2.exec(comment);
					var coord = {'down': [], 'left': [], 'right': [], 'up': []};
					if (params[1].match(/(\d+|-\d+),(\d+|-\d+)/)) {
						do {
							var match = capturingRegexC3.exec(comment);
							if (match) coord.down.push({'dx': Number(match[1]), 'dy': Number(match[2])});
						} while (match);
					}
					if (params[2].match(/(\d+|-\d+),(\d+|-\d+)/)) {
						do {
							var match = capturingRegexC3.exec(comment);
							if (match) coord.left.push({'dx': Number(match[1]), 'dy': Number(match[2])});
						} while (match);
					}
					if (params[3].match(/(\d+|-\d+),(\d+|-\d+)/)) {
						do {
							var match = capturingRegexC3.exec(comment);
							if (match) coord.right.push({'dx': Number(match[1]), 'dy': Number(match[2])});
						} while (match);
					}
					if (params[4].match(/(\d+|-\d+),(\d+|-\d+)/)) {
						do {
							var match = capturingRegexC3.exec(comment);
							if (match) coord.up.push({'dx': Number(match[1]), 'dy': Number(match[2])});
						} while (match);
					}
					this._bigSprite.exCoord = coord;
					this._bigSprite.exType = 'C';
				} else if ((pagelist[i].code === 108 || pagelist[i].code === 408) && parameters[j].match(/<bigEventEx: (\d+|-\d+),(\d+|-\d+)/)) {
					var comment = pagelist[i].parameters;
					var coord = [];
					do {
						var match = capturingRegexA.exec(comment);
						if (match) coord.push({'dx': Number(match[1]), 'dy': Number(match[2])});
					} while (match);
					this._bigSprite.exCoord = coord;
					if (this._bigSprite.type === 'squareA') this._bigSprite.exType = 'A';
					else this._bigSprite.exType = 'B';
				}
			}
		}
	};

/* 
-------------------------------------------------------------------------------------------------------------------------------------------
		SET AND REFRESH EVENT COORDINATES
-------------------------------------------------------------------------------------------------------------------------------------------
*/	
	
	Game_Character.prototype.setEventCoordinates = function() {
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
		if (this._bigSprite.exType === 'A') {
			var exCoord = this._bigSprite.exCoord;
			for (var i = 0; i < exCoord.length; i++) {
				coord.push({'x': this.x + exCoord[i].dx, 'y': this.y + exCoord[i].dy});
			}
		}
		if (this._bigSprite.exType === 'B') {
			var exCoord = this._bigSprite.exCoord;
			if (this._direction === 2) {
				for (var i = 0; i < exCoord.length; i++) {
					coord.push({'x': this.x + exCoord[i].dx, 'y': this._bigSprite.Y0 + exCoord[i].dy});
				}
			} else if (this._direction === 4) {
				for (var i = 0; i < exCoord.length; i++) {
					coord.push({'x': this.x - exCoord[i].dy, 'y': this._bigSprite.Y0 + exCoord[i].dx});
				}
			} else if (this._direction === 6) {
				for (var i = 0; i < exCoord.length; i++) {
					coord.push({'x': this.x + exCoord[i].dy, 'y': this._bigSprite.Y0 - exCoord[i].dx});
				}
			} else if (this._direction === 8) {
				for (var i = 0; i < exCoord.length; i++) {
					coord.push({'x': this.x - exCoord[i].dx, 'y': this._bigSprite.Y0 - exCoord[i].dy});
				}
			}			
		}
		if (this._bigSprite.exType === 'C') {
			if (this._direction === 2) {
				var exCoord = this._bigSprite.exCoord.down;
			} else if (this._direction === 4) {
				var exCoord = this._bigSprite.exCoord.left;
			} else if (this._direction === 6) {
				var exCoord = this._bigSprite.exCoord.right;
			} else if (this._direction === 8) {
				var exCoord = this._bigSprite.exCoord.up;
			}
			for (var i = 0; i < exCoord.length; i++) {
				coord.push({'x': this.x + exCoord[i].dx, 'y': this.y + exCoord[i].dy});
			}
		}
		if (!this._bigSprite.type && !this._bigSprite.exType) {
			coord.push({'x': this.x, 'y': this.y});
		}
		this._bigSprite.occupancy = coord;
		return this._bigSprite.occupancy;
	};
	
	Game_CharacterBase.prototype.updateEventCoordinates = function() { 
		for (var i = 0; i < $gameMap._occupiedTiles.length; i++) {
			if ($gameMap._occupiedTiles[i].event === this) { 
				$gameMap._occupiedTiles[i] = this._bigSprite.occupancy;
				return;
			}
		}
		$gameMap._occupiedTiles.push(this._bigSprite.occupancy);
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
		var forwardTiles = [];
		for (var i = 0; i < thisCoord.length; i++) {
			var tempX = $gameMap.roundXWithDirection(thisCoord[i].x, horz);
			var tempY = $gameMap.roundYWithDirection(thisCoord[i].y, vert);
			if (!thisCoord.some(function(xy) {return xy.x === tempX && xy.y === tempY})) forwardTiles.push({'x': tempX,'y': tempY});
		}
		return forwardTiles;
	};

/* 
-------------------------------------------------------------------------------------------------------------------------------------------
		GETTING ON/OFF GAME VEHICLE
-------------------------------------------------------------------------------------------------------------------------------------------
*/
	
	Game_Player.prototype.forceMoveDirection = function(d) {
		this.setThrough(true);
		this.setDirection(d);
		this.moveForward();
		this.setThrough(false);
	};
	
	var _Game_Vehicle_syncWithPlayer = Game_Vehicle.prototype.syncWithPlayer;
	Game_Vehicle.prototype.syncWithPlayer = function() {
		_Game_Vehicle_syncWithPlayer.call(this);
		this._bigSprite.occupancy = [];
	};
	
	var _Game_Player_getOnVehicle = Game_Player.prototype.getOnVehicle;
	Game_Player.prototype.getOnVehicle = function() {
		if (this._bigSprite.type) {
			var d = this.direction();
			var coord = this._bigSprite.occupancy;
			for (var i = 0; i < coord.length; i++) {
				if ($gameMap.airship().pos(coord[i].x, coord[i].y)) {
					this._vehicleType = 'airship';
					break;
				}
			}
			if (this._vehicleType !== 'airship') {
				var ahead = this.checkAheadTiles(d);
				for (var i = 0; i < ahead.length; i++) {
					if ($gameMap.ship().pos(ahead[i].x, ahead[i].y)) {
						this._vehicleType = 'ship';
						break;
					} else if ($gameMap.boat().pos(ahead[i].x, ahead[i].y)) {
						this._vehicleType = 'boat';
						break;
					}
				}
			}
			if (this.isInVehicle()) {
				this._vehicleGettingOn = true;
				if (!this.isInAirship()) {
					this.forceMoveForward();
				}
				this.gatherFollowers();
			}
			return this._vehicleGettingOn;
		}
		return _Game_Player_getOnVehicle.call(this);
	};
	
	var _Game_Vehicle_getOn = Game_Vehicle.prototype.getOn;
	Game_Vehicle.prototype.getOn = function() {
		$gameSystem._bigSprite = $gamePlayer._bigSprite;
		var x = this.x;
		var y = this.y;
		this.setThrough(true);
		while ($gamePlayer.x < x) $gamePlayer.forceMoveDirection(6);
		while ($gamePlayer.x > x) $gamePlayer.forceMoveDirection(4);
		while ($gamePlayer.y < y) $gamePlayer.forceMoveDirection(2);
		while ($gamePlayer.y > y) $gamePlayer.forceMoveDirection(8);
		this.setThrough(false);
		_Game_Vehicle_getOn.call(this); 
		this.setBigVehicleSize.call($gamePlayer, this._type);
		this.initializeBigSprite();
	};
	
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
				var forwardTiles = this.checkAheadTiles.call($gamePlayer, d);
				for (var i = 0; i < forwardTiles.length; i++) {
					if (!$gameMap.isValid(forwardTiles[i].x, forwardTiles[i].y)) return false;
					if (!$gameMap.isPassable(forwardTiles[i].x, forwardTiles[i].y, this.reverseDir(d))) return false;
					if (this.isCollidedWithCharacters(forwardTiles[i].x, forwardTiles[i].y)) return false;
				}
			}
			return true;
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
		_Game_Vehicle_getOff.call(this);
		this.setDirection(dir);
		$gamePlayer.initializeBigSprite();
		$gamePlayer._bigSprite = $gameSystem._bigSprite;
		$gameSystem.setupBigPlayerSettings();
		this.setBigVehicleSize(this._type);
		this.setEventCoordinates();
		this.updateEventCoordinates();
	};
	
	var _Game_Player_getOffVehicle = Game_Player.prototype.getOffVehicle;
	Game_Player.prototype.getOffVehicle = function() {
		var normal = _Game_Player_getOffVehicle.call(this);
		while (!$gameMap.isPassable(this.x, this._bigSprite.Y0, this._direction)) {
			this.forceMoveForward();
		}
		return normal;
	};
	
/* 
-------------------------------------------------------------------------------------------------------------------------------------------
		FIX ACTION BUTTON, PLAYER TOUCH AND EVENT TOUCH TRIGGERS
-------------------------------------------------------------------------------------------------------------------------------------------
*/
	
	var _Game_CharacterBase_checkEventTriggerTouchFront = Game_CharacterBase.prototype.checkEventTriggerTouchFront;
	Game_CharacterBase.prototype.checkEventTriggerTouchFront = function(d) {
		if (this._bigSprite.type) {
			var forwardTiles = this.checkAheadTiles(d);
			if (forwardTiles) {
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
			var d = this.direction();
			var forwardTiles = this.checkAheadTiles(d);
			for (var i = 0; i < forwardTiles.length; i++) {
				this.startMapEvent(forwardTiles[i].x, forwardTiles[i].y, triggers, true);
			}			
		} else _Game_Player_checkEventTriggerThere.call(this, triggers);
	};
	
/* 
-------------------------------------------------------------------------------------------------------------------------------------------
		CONFIGURE PASSABILITY
-------------------------------------------------------------------------------------------------------------------------------------------
*/	
	
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
				if (this === $gamePlayer && this.isInBoat()) {
					if (!$gameMap.isBoatPassable(forwardTiles[i].x, forwardTiles[i].y)) return false;
				} else if (this === $gamePlayer && this.isInShip()) {
					if (!$gameMap.isShipPassable(forwardTiles[i].x, forwardTiles[i].y)) return false;
				} else if (!$gameMap.isPassable(forwardTiles[i].x, forwardTiles[i].y, d)) return false;
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
				if (this === $gamePlayer && this.isInBoat()) {
					if (!$gameMap.isBoatPassable(tilesToCheck[i].x, tilesToCheck[i].y)) return false;					
				} else if (this === $gamePlayer && this.isInShip()) {
					if (!$gameMap.isShipPassable(tilesToCheck[i].x, tilesToCheck[i].y)) return false;
				} else if (!$gameMap.isPassable(tilesToCheck[i].x, tilesToCheck[i].y, horz) || !$gameMap.isPassable(tilesToCheck[i].x, tilesToCheck[i].y, vert)) return false;				
				if (this.isCollidedWithCharacters(tilesToCheck[i].x, tilesToCheck[i].y)) return false;
			} 
			return true;
		}
		return _Game_CharacterBase_canPassDiagonally.call(this, x, y, horz, vert);		
	};	
	
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
			newCoord = this.setEventCoordinates(); 
			for (var i = 0; i < newCoord.length; i++) {
				if (!$gameMap.isValid(newCoord[i].x, newCoord[i].y) || this.isCollidedWithCharacters(newCoord[i].x, newCoord[i].y)) {
					this._bigSprite.occupancy = oldCoord;
					_Game_CharacterBase_setDirection.call(this, oldDir);
				}
				if (this === $gamePlayer && this.isInBoat()) {
					if (!$gameMap.isBoatPassable(newCoord[i].x, newCoord[i].y)) {
						this._bigSprite.occupancy = oldCoord;
						_Game_CharacterBase_setDirection.call(this, oldDir);
					}
				} else if (this === $gamePlayer && this.isInShip()) {
					if (!$gameMap.isShipPassable(newCoord[i].x, newCoord[i].y)) {
						this._bigSprite.occupancy = oldCoord;
						_Game_CharacterBase_setDirection.call(this, oldDir);
					}
				} else if (!$gameMap.isPassable(newCoord[i].x, newCoord[i].y, d)) {
					this._bigSprite.occupancy = oldCoord;
					_Game_CharacterBase_setDirection.call(this, oldDir);
				}
			} 
			this.updateEventCoordinates();
		} else {
			_Game_CharacterBase_setDirection.call(this, d);
		}	
	};
	
	var _Game_CharacterBase_setThrough = Game_CharacterBase.prototype.setThrough;
	Game_CharacterBase.prototype.setThrough = function(through) {
		_Game_CharacterBase_setThrough.call(this, through);
		if (this._bigSprite.type) {
			this.setEventCoordinates();
			this.updateEventCoordinates();
		}
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
					this.setEventCoordinates();
					this.updateEventCoordinates();
					this.increaseSteps();
				} else {
					this.setEventCoordinates();
					this.updateEventCoordinates();
					this.checkEventTriggerTouchFront(d);
				} 
			} else {
				this.setEventCoordinates();
				this.updateEventCoordinates();
				this.checkEventTriggerTouchFront(this._direction);
			}			
		} else {
			_Game_Character_moveStraight.call(this, d);
			this.setEventCoordinates();
			this.updateEventCoordinates();
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
				this.setEventCoordinates();
				this.updateEventCoordinates();
				this.increaseSteps();			
			} else {
				this.updateEventCoordinates();
				this.checkEventTriggerTouchFront(this._direction);
			}
			if (this._direction === this.reverseDir(horz)) {
				this.setDirection(horz);
				this.updateEventCoordinates();
			}
			if (this._direction === this.reverseDir(vert)) {
				this.setDirection(vert);
				this.updateEventCoordinates();
			}		
		} else {
			_Game_Character_moveDiagonally.call(this, horz, vert);
			this.setEventCoordinates();
			this.updateEventCoordinates();
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
				var newCoord = this.setEventCoordinates();
				for (var i = 0; i < newCoord.length; i++) {
					if (!$gameMap.isValid(newCoord[i].x, newCoord[i].y) || this.isCollidedWithCharacters(newCoord[i].x, newCoord[i].y)) {
						this._x = oldX;
						this._y = oldY;
						this._bigSprite.occupancy = oldCoord;
						this.resetStopCount();
						this.straighten();
						return;
					}
					if (this === $gamePlayer && this.isInBoat()) {
						if (!$gameMap.isBoatPassable(newCoord[i].x, newCoord[i].y)) {
							this._x = oldX;
							this._y = oldY;
							this._bigSprite.occupancy = oldCoord;
							this.resetStopCount();
							this.straighten();
							return;
						}
					} else if (this === $gamePlayer && this.isInShip()) {
						if (!$gameMap.isShipPassable(newCoord[i].x, newCoord[i].y)) {
							this._x = oldX;
							this._y = oldY;
							this._bigSprite.occupancy = oldCoord;
							this.resetStopCount();
							this.straighten();
							return;
						}
					} else if (!$gameMap.isPassable(newCoord[i].x, newCoord[i].y, d)) {
						this._x = oldX;
						this._y = oldY;
						this._bigSprite.occupancy = oldCoord;
						this.resetStopCount();
						this.straighten();
						return;
					}
				}
				var distance = Math.round(Math.sqrt(xPlus * xPlus + yPlus * yPlus));
				this._jumpPeak = 10 + distance - this._moveSpeed;
				this._jumpCount = this._jumpPeak * 2;
				this.updateEventCoordinates();
				this.resetStopCount();
				this.straighten();
			}
		} else {
			_Game_Character_jump.call(this, xPlus, yPlus);
			this.setEventCoordinates();
			this.updateEventCoordinates();
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
		if (this._bigSprite.type) {
			var newX = character.x;
			var newY = character.y + Math.floor(this._bigSprite.size / 2);
			var oldCoord = this._bigSprite.occupancy;
			var oldX = this.x;
			var oldY = this.y;
			var oldcharX = character.x;
			var oldcharY = character.y;
			character.locate(this.x, this._bigSprite.Y0);
			this.locate(newX, newY);
			this.resetStopCount();
			this.straighten();
			var newCoord = this._bigSprite.occupancy;
			for (var i = 0; i < newCoord.length; i++) {
				if (!$gameMap.isValid(newCoord[i].x, newCoord[i].y) || this.isCollidedWithCharacters(newCoord[i].x, newCoord[i].y)) {
					character.locate(oldcharX, oldcharY);
					this.locate(oldX, oldY);
					this._bigSprite.occupancy = oldCoord;
					this.resetStopCount();
					this.straighten();
					return;
				}
				if (this === $gamePlayer && this.isInBoat()) {
					if (!$gameMap.isBoatPassable(newCoord[i].x, newCoord[i].y)) {
						character.locate(oldcharX, oldcharY);
						this.locate(oldX, oldY);
						this._bigSprite.occupancy = oldCoord;
						this.resetStopCount();
						this.straighten();
						return;
					}
				} else if (this === $gamePlayer && this.isInShip()) {
					if (!$gameMap.isShipPassable(newCoord[i].x, newCoord[i].y)) {
						character.locate(oldcharX, oldcharY);
						this.locate(oldX, oldY);
						this._bigSprite.occupancy = oldCoord;
						this.resetStopCount();
						this.straighten();
						return;
					}
				} else if (!$gameMap.isPassable(newCoord[i].x, newCoord[i].y, this._direction)) {
					character.locate(oldcharX, oldcharY);
					this.locate(oldX, oldY);
					this._bigSprite.occupancy = oldCoord;
					this.resetStopCount();
					this.straighten();
					return;
				}
			}
			this.updateEventCoordinates();
		} else if (character._bigSprite.type) {
			var newX = character.x;
			var newY = character._bigSprite.Y0;
			var oldX = this.x;
			var oldY = this.y;
			var oldcharX = character.x;
			var oldcharY = character.y;
			var oldCoord = character._bigSprite.occupancy;			
			character.locate(this.x, this.y + Math.floor(character._bigSprite.size / 2));
			this.locate(newX, newY);			
			this.resetStopCount();
			this.straighten();
			var newCoord = character._bigSprite.occupancy;
			for (var i = 0; i < newCoord.length; i++) {
				if (!$gameMap.isValid(newCoord[i].x, newCoord[i].y) || character.isCollidedWithCharacters(newCoord[i].x, newCoord[i].y)) {
					character.locate(oldcharX, oldcharY);
					this.locate(oldX, oldY);
					character._bigSprite.occupancy = oldCoord;
					this.resetStopCount();
					this.straighten();
					return;
				}
				if (character === $gamePlayer && character.isInBoat()) {
					if (!$gameMap.isBoatPassable(newCoord[i].x, newCoord[i].y)) {
						character.locate(oldcharX, oldcharY);
						this.locate(oldX, oldY);
						character._bigSprite.occupancy = oldCoord;
						this.resetStopCount();
						this.straighten();
						return;
					}
				} else if (character === $gamePlayer && character.isInShip()) {
					if (!$gameMap.isShipPassable(newCoord[i].x, newCoord[i].y)) {
						character.locate(oldcharX, oldcharY);
						this.locate(oldX, oldY);
						character._bigSprite.occupancy = oldCoord;
						this.resetStopCount();
						this.straighten();
						return;
					}
				} else if (!$gameMap.isPassable(newCoord[i].x, newCoord[i].y, character._direction)) {
					character.locate(oldcharX, oldcharY);
					this.locate(oldX, oldY);
					character._bigSprite.occupancy = oldCoord;
					this.resetStopCount();
					this.straighten();
					return;
				}
			}
			this.setEventCoordinates();
			this.updateEventCoordinates();
		} else {
			_Game_Character_swap.call(this, character);
			this.setEventCoordinates();
			this.updateEventCoordinates();
		}
	};
	
	var _Game_CharacterBase_locate = Game_CharacterBase.prototype.locate;
	Game_CharacterBase.prototype.locate = function(x, y) {
		_Game_CharacterBase_locate.call(this, x, y);
		if (this._bigSprite.occupancy) {
			this.setEventCoordinates();
			this.updateEventCoordinates();
		}
	};
	
	var _Game_Character_findDirectionTo = Game_Character.prototype.findDirectionTo;
	Game_Character.prototype.findDirectionTo = function(goalX, goalY) {
		if (this._bigSprite.type && this._bigSprite.type.includes('B')) {
			var searchLimit = this.searchLimit();
			var mapWidth = $gameMap.width();
			var nodeList = [];
			var openList = [];
			var closedList = [];
			var start = {};
			var best = start;

			if (this.x === goalX && this._bigSprite.Y0 === goalY) {
				return 0;
			}

			start.parent = null;
			start.x = this.x;
			start.y = this._bigSprite.Y0;
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
		} else {
			_Game_Character_findDirectionTo.call(this, goalX, goalY);
		}
	};
	
})();
