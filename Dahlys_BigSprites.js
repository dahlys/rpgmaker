/*:
 * @plugindesc Big Event Sprites
 * @author Dahlys
 * 
 * @help
 * ==============================================================================
 *                               BIG EVENT SPRITES
 * ==============================================================================
 * 
 * NOTE: I am following the map grid, so partially blocked tiles are not a thing.
 *
 * A 'solid' tile is a tile where the event EXISTS. It inherits the priority from
 * the main event (below/same/above player) and will be passable the same way.
 * Only solid tiles are triggerable. The main event tile does not have to be 
 * solid.
 *
 * Also, different kinds of big sprites are treated differently. These are the
 * categories:
 *
 * A) No matter how sprite moves/turns, the same tiles remain solid. e.g. A 
 *    giant robot, a giant subway train sprite
 * B) The middle of the big sprite image is solid and the rest is relative to it.
 *    e.g. A flying spaghetti monster, a large warship
 * C) Complete customization of big sprite solidity based on direction faced.
 *
 * When an event turns or moves around, its size will be adjusted accordingly. A  
 * bigger event will also have a bigger action button/event touch/player touch 
 * trigger.
 *
 * You can use comments to override notetags. The contents of the comments are 
 * the same as the relevant notetags.
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
 *                                   CATEGORY A
 * ------------------------------------------------------------------------------
 * 
 * For category A, the event is expanded upwards and sideways but not downwards
 * since the default event tile is always at the middle bottom.
 *
 * Notetag/Comment: <bigSprite: above left right>
 *
 * e.g. <bigSprite: 1 1 1> creates a rectagle around the base event 1 tile
 * above, 1 tile to the left and 1 tile to the right to a total of 6 solid tiles.
 *
 * You can use more notes/comments to customize the shape, tile by tile.
 *
 * Notetag/Comment: <bigSpriteEx: dx,dy dx,dy dx,dy>
 *  
 * e.g. 
 * Notetag: <bigSprite: 0 1 1> <bigSpriteEx: -1,-1 -1,-2> 
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
 * For category B, the center of the event is shifted up to match the sprite.
 * This makes it possible to make the default event tile passable. Hence, to
 * facilitate turning for such an event, the sprite box is highly reccomended to
 * be a square.
 *
 * Notetag/Comment: <bigSprite: spritesize front back left right>
 * 
 * where spritesize, front, back, left, and right are numbers. 
 * e.g. <bigSprite: 7 1 1 1 0> shifts the center of the event 3 tiles up to 
 * match the center of the big sprite image. It then adds 1 tile front, 1 tile 
 * back, and 1 to the left making the event occupy a rectangular space that is 
 * 2x3 tiles.
 *
 * Besides big rectangular events, big diamond-shaped events are also possible. 
 * The notetag for this is: 
 *
 * Notetag/Comment: <bigSprite: spritesize diamond radius>
 *
 * e.g. <bigSprite: 7 diamond 3> adds all tiles <= 3 tiles away to event size.
 *
 * You can also have a circular big event with notetag:
 *
 * Notetag/Comment: <bigSprite: spritesize circle radius>
 *
 * e.g. <bigSprite: 7 circle 4> expands the event size by a radius of 4 tiles.
 *
 * Extra tiles can be added to customize the shape. These tile coordinates are
 * measured relative to the new center, not the base event.
 *
 * Notetag/Comment: <bigSpriteEx: dx,dy dx,dy dx,dy>
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
 * Notetag/Comment: <bigSprite: [down] [left] [right] [up]>
 * where [direction] = [above left right]
 *
 * e.g. <bigSprite: [1 0 0] [0 1 1] [0 1 1] [1 0 0]> will create a big event that
 * is 2 tiles high when facing up/down, but 3 tiles wide when facing left/right.
 *
 * For even more customization, you can add tile by tile.
 *
 * Notetag/Commment: <bigSpriteEx: [down] [left] [right] [up]>
 * where [direction] = [dx,dy dx,dy dx,dy]
 * 
 * ------------------------------------------------------------------------------
 *                               BIG SPRITE EX ONLY
 * ------------------------------------------------------------------------------
 *
 * bigSpriteEx used without bigSprite will default to Category B, but with the
 * event origin at the base tile. It will rotate when the sprite turns. To use
 * Category A type bigSpriteEx only, use a notetag/comment <bigSprite: 0 0 0>
 * before <bigSpriteEx: dx,dy dx,dy dx,dy>.
 *
 * Category C type bigSpriteEx can be used as is.
 *
*/

(function() { 
	
/* 
-------------------------------------------------------------------------------------------------------------------------------------------
		INITIALIZE NEW VARIABLES
-------------------------------------------------------------------------------------------------------------------------------------------
*/

	var _Game_Event_setupPageSettings = Game_Event.prototype.setupPageSettings;
	Game_Event.prototype.setupPageSettings = function() {
		this.initializeBigSprite();
		this.setupBigSprite();
		_Game_Event_setupPageSettings.call(this);
	};
	
	Game_Event.prototype.eventOccupancy = function() {
		if (this._eventOccupancy === undefined) this.setupPageSettings.call(this);
		return this._eventOccupancy;
	};

	Game_Event.prototype.spriteSize = function() {
		if (this._spriteSize === undefined) this.setupPageSettings.call(this);
		return this._spriteSize;
	};
	
	Game_Event.prototype.bigSpriteY0 = function() {
		if (this._bigSpriteY0 === undefined) this.setupPageSettings.call(this);
		return this._bigSpriteY0;
	};
	
	Game_Event.prototype.bigSpriteType = function() {
		if (this._bigSpriteType === undefined) this.setupPageSettings.call(this);
		return this._bigSpriteType;
	};

	Game_Event.prototype.bigSpriteFront = function() {
		if (this._bigSpriteFront === undefined) this.setupPageSettings.call(this);
		return this._bigSpriteFront;
	};

	Game_Event.prototype.bigSpriteBack = function() {
		if (this._bigSpriteBack === undefined) this.setupPageSettings.call(this);
		return this._bigSpriteBack;
	};

	Game_Event.prototype.bigSpriteLeft = function() {
		if (this._bigSpriteLeft === undefined) this.setupPageSettings.call(this);
		return this._bigSpriteLeft;
	};

	Game_Event.prototype.bigSpriteRight = function() {
		if (this._bigSpriteRight === undefined) this.setupPageSettings.call(this);
		return this._bigSpriteRight;
	};
	
	Game_Event.prototype.bigSpriteRadius = function() {
		if (this._bigSpriteRadius === undefined) this.setupPageSettings.call(this);
		return this._bigSpriteRadius;
	};
	
	Game_Event.prototype.bigSpriteExCoord = function() {
		if (this._bigSpriteExCoord === undefined) this.setupPageSettings.call(this);
		return this._bigSpriteExCoord;
	};
	
	Game_Event.prototype.bigSpriteExType = function() {
		if (this._bigSpriteExType === undefined) this.setupPageSettings.call(this);
		return this._bigSpriteExType;
	};

	var _Game_Map_initialize = Game_Map.prototype.initialize;
	Game_Map.prototype.initialize = function() {
		_Game_Map_initialize.call(this);
		this._occupiedTiles = [];
	};
	
	Game_Map.prototype.occupiedTiles = function() {
		if (this._occupiedTiles === undefined) this.initialize.call(this);
		return this._occupiedTiles;
	};
	
/* 
-------------------------------------------------------------------------------------------------------------------------------------------
		SETUP BIG EVENT
-------------------------------------------------------------------------------------------------------------------------------------------
*/		

	Game_Event.prototype.initializeBigSprite = function() {
		this._spriteSize = 1;
		this._bigSpriteY0 = this.y;
		this._bigSpriteType = null;
		this._bigSpriteFront = 0;		
		this._bigSpriteBack = 0;
		this._bigSpriteLeft = 0;
		this._bigSpriteRight = 0;
		this._bigSpriteRadius = 0;
		this._bigSpriteExCoord = null;
		this._bigSpriteExType = null;
		this._eventOccupancy = {'event': this, 'coordinates': []};
	};
	
	Game_Event.prototype.setupBigSprite = function() {
		if (!this.page()) return;
		this.setSpriteSizeFromEventNote();
		this.setSpriteExSizeFromEventNote();
		this.setSpriteSizeFromPageComment();	
		this.setEventCoordinates();
		this.updateEventCoordinates();
	};
	
	var _Game_Interpreter_command108 = Game_Interpreter.prototype.command108;
	Game_Interpreter.prototype.command108 = function() {
		var result = _Game_Interpreter_command108.call(this);
		var thisEvent = $gameMap.event(this._eventId);
		for (var i = 0; i < this._comments.length; i++) {
			if (this._comments[i].match(/bigSprite:/i)) {
				thisEvent.executeBigSpriteComment(this._comments[i]);
			}
			if (this._comments[i].match(/bigSpriteEx:/i)) {
				thisEvent.executeBigSpriteExComment(this._comments[i]);
			}
			
		}
		return result;
	};
	
	Game_Event.prototype.executeBigSpriteComment = function(comment) {
		this.initializeBigSprite();
		var capturingRegexA = /(?:<bigSprite: )(\d+)(?: )(\d+)(?: )(\d+)(?:>)/i
		var capturingRegex = /(?:<bigSprite: )(\d+)(?: )(\d+)(?: )(\d+)(?: )(\d+)(?: )(\d+)(?:>)/i;
		var capturingRegex2 = /(?:<bigSprite: )(\d+)(?: )(?:diamond )(\d+)(?:>)/i;
		var capturingRegex3 = /(?:<bigSprite: )(\d+)(?: )(?:circle )(\d+)(?:>)/i;
		var capturingRegexC = /(?:<bigSprite: \[)(\d+)(?: )(\d+)(?: )(\d+)(?:\])(?: \[)(\d+)(?: )(\d+)(?: )(\d+)(?:\])(?: \[)(\d+)(?: )(\d+)(?: )(\d+)(?:\])(?: \[)(\d+)(?: )(\d+)(?: )(\d+)(?:\]>)/i	
		if (comment.match(/<bigSprite: \d+ \d+ \d+ \d+ \d+>/i)) {
			var params = capturingRegex.exec(comment);
			this._spriteSize = Number(params[1]);
			this._bigSpriteFront = Number(params[2]);
			this._bigSpriteBack = Number(params[3]);
			this._bigSpriteLeft = Number(params[4]);
			this._bigSpriteRight = Number(params[5]);
			this._bigSpriteType = 'squareB';
		} else if (comment.match(/<bigSprite: \d+ diamond \d+>/i)) {
			var params = capturingRegex2.exec(comment);
			this._spriteSize = Number(params[1]);
			this._bigSpriteRadius = Number(params[2]);
			this._bigSpriteType = 'diamondB';
		} else if (comment.match(/<bigSprite: \d+ circle \d+>/i)) {
			var params = capturingRegex3.exec(comment);
			this._spriteSize = Number(params[1]);
			this._bigSpriteRadius = Number(params[2]);
			this._bigSpriteType = 'circleB';
		} else if (comment.match(/<bigSprite: \[.*\]>/)) {
			var params = capturingRegexC.exec(comment);
			this._bigSpriteBack = [Number(params[1]), Number(params[4]), Number(params[7]), Number(params[10])];
			this._bigSpriteLeft = [Number(params[2]), Number(params[5]), Number(params[8]), Number(params[11])];
			this._bigSpriteRight = [Number(params[3]), Number(params[6]), Number(params[9]), Number(params[12])];
			this._bigSpriteType = 'custom';
			return;
		} else if (comment.match(/<bigSprite: \d+ \d+ \d+>/)) {
			var params = capturingRegexA.exec(comment);
			this._bigSpriteBack = Number(params[1]);
			this._bigSpriteLeft = Number(params[2]);
			this._bigSpriteRight = Number(params[3]);
			this._bigSpriteType = 'squareA';
			return;
		}		
		this.setEventCoordinates();
		this.updateEventCoordinates();
	};
	
	Game_Event.prototype.executeBigSpriteExComment = function(comment) {
		this._bigSpriteExCoord = null;
		this._bigSpriteExType = null;
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
			this._bigSpriteExCoord = coord;
			this._bigSpriteExType = 'C';
		}
		if (comment.match(/(\d+|-\d+),(\d+|-\d+)/)) {
			var coord = [];
			do {
				var match = capturingRegexA.exec(comment);
				if (match) coord.push({'dx': Number(match[1]), 'dy': Number(match[2])});
			} while (match);
			this._bigSpriteExCoord = coord;
			if (this._bigSpriteType === 'squareA') this._bigSpriteExType = 'A';
			else this._bigSpriteExType = 'B';
		}
		this.setEventCoordinates();
		this.updateEventCoordinates();
	};
	
	Game_Event.prototype.setSpriteSizeFromPageComment = function() {		
		var pagelist = this.list();
		var capturingRegexA = /(?:<bigSprite: )(\d+)(?: )(\d+)(?: )(\d+)(?:>)/i
		var capturingRegex = /(?:<bigSprite: )(\d+)(?: )(\d+)(?: )(\d+)(?: )(\d+)(?: )(\d+)(?:>)/i;
		var capturingRegex2 = /(?:<bigSprite: )(\d+)(?: )(?:diamond )(\d+)(?:>)/i;
		var capturingRegex3 = /(?:<bigSprite: )(\d+)(?: )(?:circle )(\d+)(?:>)/i;
		var capturingRegexC = /(?:<bigSprite: \[)(\d+)(?: )(\d+)(?: )(\d+)(?:\])(?: \[)(\d+)(?: )(\d+)(?: )(\d+)(?:\])(?: \[)(\d+)(?: )(\d+)(?: )(\d+)(?:\])(?: \[)(\d+)(?: )(\d+)(?: )(\d+)(?:\]>)/i	
		
		var capturingRegexA2 = /(\d+|-\d+),(\d+|-\d+)/g
		var capturingRegexC2 = /(?:\[)(.*)(?:\])(?: \[)(.*)(?:\])(?: \[)(.*)(?:\])(?: \[)(.*)(?:\])/
		var capturingRegexC3 = /(\d+|-\d+),(\d+|-\d+)/g
		
		for (var i = 0; i < pagelist.length; i++) {
			var parameters = pagelist[i].parameters;
			for (var j = 0; j < parameters.length; j++) {
				if ((pagelist[i].code === 108 || pagelist[i].code === 408) && parameters[j].match(/<bigSprite reset>/i)) this.initializeBigSprite();
				if ((pagelist[i].code === 108 || pagelist[i].code === 408) && parameters[j].match(/<bigSprite: \d+ \d+ \d+ \d+ \d+>/i)) {
					var comment = pagelist[i].parameters;
					var params = capturingRegex.exec(comment);
					this._spriteSize = Number(params[1]);
					this._bigSpriteFront = Number(params[2]);
					this._bigSpriteBack = Number(params[3]);
					this._bigSpriteLeft = Number(params[4]);
					this._bigSpriteRight = Number(params[5]);
					this._bigSpriteType = 'squareB';					
				} else if ((pagelist[i].code === 108 || pagelist[i].code === 408) && parameters[j].match(/<bigSprite: \d+ diamond \d+>/i)) {
					var comment = pagelist[i].parameters;
					var params = capturingRegex2.exec(comment);
					this._spriteSize = Number(params[1]);
					this._bigSpriteRadius = Number(params[2]);
					this._bigSpriteType = 'diamondB';
				} else if ((pagelist[i].code === 108 || pagelist[i].code === 408) && parameters[j].match(/<bigSprite: \d+ circle \d+>/i)) {
					var comment = pagelist[i].parameters;
					var params = capturingRegex3.exec(comment);
					this._spriteSize = Number(params[1]);
					this._bigSpriteRadius = Number(params[2]);
					this._bigSpriteType = 'circleB';
				} else if ((pagelist[i].code === 108 || pagelist[i].code === 408) && parameters[j].match(/<bigSprite: \[.*\]/)) {
					var comment = pagelist[i].parameters;
					var params = capturingRegexC.exec(comment);
					this._bigSpriteBack = [Number(params[1]), Number(params[4]), Number(params[7]), Number(params[10])];
					this._bigSpriteLeft = [Number(params[2]), Number(params[5]), Number(params[8]), Number(params[11])];
					this._bigSpriteRight = [Number(params[3]), Number(params[6]), Number(params[9]), Number(params[12])];
					this._bigSpriteType = 'custom';
				} else if ((pagelist[i].code === 108 || pagelist[i].code === 408) && parameters[j].match(/<bigSprite: \d+ \d+ \d+/)) {
					var comment = pagelist[i].parameters;
					var params = capturingRegexA.exec(comment);
					this._bigSpriteBack = Number(params[1]);
					this._bigSpriteLeft = Number(params[2]);
					this._bigSpriteRight = Number(params[3]);
					this._bigSpriteType = 'squareA';
				}	
				if ((pagelist[i].code === 108 || pagelist[i].code === 408) && parameters[j].match(/<bigSpriteEx: \[.*\]/)) {
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
					this._bigSpriteExCoord = coord;
					this._bigSpriteExType = 'C';
				} else if ((pagelist[i].code === 108 || pagelist[i].code === 408) && parameters[j].match(/<bigSpriteEx: (\d+|-\d+),(\d+|-\d+)/)) {
					var comment = pagelist[i].parameters;
					var coord = [];
					do {
						var match = capturingRegexA.exec(comment);
						if (match) coord.push({'dx': Number(match[1]), 'dy': Number(match[2])});
					} while (match);
					this._bigSpriteExCoord = coord;
					if (this._bigSpriteType === 'squareA') this._bigSpriteExType = 'A';
					else this._bigSpriteExType = 'B';
				}
			}
		}
	};
	
	Game_Event.prototype.setSpriteSizeFromEventNote = function() {
		var note = $dataMap.events[this._eventId].meta.bigSprite;
		if (!note) return;		
		var capturingRegexA = /(\d+)(?: )(\d+)(?: )(\d+)/
		var capturingRegex = /(\d+)(?: )(\d+)(?: )(\d+)(?: )(\d+)(?: )(\d+)/;
		var capturingRegex2 = /(\d+)(?: )(?:diamond )(\d+)/i;
		var capturingRegex3 = /(\d+)(?: )(?:circle )(\d+)/i;
		var capturingRegexC = /(?:\[)(\d+)(?: )(\d+)(?: )(\d+)(?:\])(?: \[)(\d+)(?: )(\d+)(?: )(\d+)(?:\])(?: \[)(\d+)(?: )(\d+)(?: )(\d+)(?:\])(?: \[)(\d+)(?: )(\d+)(?: )(\d+)(?:\])/	
		if (note.match(/\d+ \d+ \d+ \d+ \d+/)) {
			var params = capturingRegex.exec(note);
			this._spriteSize = Number(params[1]);
			this._bigSpriteFront = Number(params[2]);
			this._bigSpriteBack = Number(params[3]);
			this._bigSpriteLeft = Number(params[4]);
			this._bigSpriteRight = Number(params[5]);
			if (this._bigSpriteFront > 0 || this._bigSpriteBack > 0 || this._bigSpriteLeft > 0 || this._bigSpriteRight > 0) this._bigSpriteType = 'squareB';
			return;
		}
		if (note.match(/\d+ diamond \d+/i)) {
			var params = capturingRegex2.exec(note);
			this._spriteSize = Number(params[1]);
			this._bigSpriteRadius = Number(params[2]);
			if (this._bigSpriteRadius > 0 ) this._bigSpriteType = 'diamondB';
			return;
		}
		if (note.match(/\d+ circle \d+/i)) {
			var params = capturingRegex3.exec(note);
			this._spriteSize = Number(params[1]);
			this._bigSpriteRadius = Number(params[2]);
			if (this._bigSpriteRadius > 0 ) this._bigSpriteType = 'circleB';
			return;
		}
		if (note.match(/\[.*\]/)) {
			var params = capturingRegexC.exec(note);
			this._bigSpriteBack = [Number(params[1]), Number(params[4]), Number(params[7]), Number(params[10])];
			this._bigSpriteLeft = [Number(params[2]), Number(params[5]), Number(params[8]), Number(params[11])];
			this._bigSpriteRight = [Number(params[3]), Number(params[6]), Number(params[9]), Number(params[12])];
			for (var i = 1; i < params.length; i++) {
				if (Number(params[i]) > 0) {
					this._bigSpriteType = 'custom';
					break;
				}
			}
			return;
		}
		if (note.match(/\d+ \d+ \d+/)) {
			var params = capturingRegexA.exec(note);
			this._bigSpriteBack = Number(params[1]);
			this._bigSpriteLeft = Number(params[2]);
			this._bigSpriteRight = Number(params[3]);
			if (this._bigSpriteBack > 0 || this._bigSpriteLeft > 0 || this._bigSpriteRight > 0) this._bigSpriteType = 'squareA';
			return;
		}		
	};
	
	Game_Event.prototype.setSpriteExSizeFromEventNote = function() {
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
			this._bigSpriteExCoord = coord;
			this._bigSpriteExType = 'C';
		}
		if (note.match(/(\d+|-\d+),(\d+|-\d+)/)) {
			var coord = [];
			do {
				var match = capturingRegexA.exec(note);
				if (match) coord.push({'dx': Number(match[1]), 'dy': Number(match[2])});
			} while (match);
			this._bigSpriteExCoord = coord;
			if (this._bigSpriteType === 'squareA') this._bigSpriteExType = 'A';
			else this._bigSpriteExType = 'B';
		}
	};
	
	Game_Event.prototype.setEventCoordinates = function() {
		this._bigSpriteY0 = this.y - Math.floor(this._spriteSize / 2);
		var coord = [];
		if (this.isThrough()) return;
		if (this._bigSpriteType === 'squareB') {
			var occupancy = this.getTypeBOccupancy();
			var topleft = [this.x - occupancy.left, this._bigSpriteY0 - occupancy.up];
			for (var j = 0; j <= (occupancy.up + occupancy.down); j++) {
				for (var i = 0; i <= (occupancy.left + occupancy.right); i++) {
					coord.push({'x': topleft[0] + i, 'y': topleft[1] + j});
				}
			}
		}
		if (this._bigSpriteType === 'diamondB') {
			var rad = this._bigSpriteRadius;
			var x0 = this.x;
			var y0 = this._bigSpriteY0;
			for (var y = -rad; y <= rad; y++) {
				for (var x = -rad; x <= rad; x++) {
					if (Math.abs(x) + Math.abs(y) <= rad) {
						coord.push({'x': x0 + x, 'y': y0 + y});
					}
				}
			}
		}
		if (this._bigSpriteType === 'circleB') {
			var rad = this._bigSpriteRadius;
			var x0 = this.x;
			var y0 = this._bigSpriteY0;
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
		if (this._bigSpriteType === 'squareA') {
			var occupancy = {'up': this._bigSpriteBack, 'left': this._bigSpriteLeft, 'right': this._bigSpriteRight};
			var topleft = [this.x - occupancy.left, this.y - occupancy.up];
			for (var j = 0; j <= occupancy.up; j++) {
				for (var i = 0; i <= (occupancy.left + occupancy.right); i++) {
					coord.push({'x': topleft[0] + i, 'y': topleft[1] + j});
				}
			}
		}
		if (this._bigSpriteType === 'custom') {
			if (this._direction === 2) {
				var occupancy = {'up': this._bigSpriteBack[0], 'left': this._bigSpriteLeft[0], 'right': this._bigSpriteRight[0]};
			} else if (this._direction === 4) {
				var occupancy = {'up': this._bigSpriteBack[1], 'left': this._bigSpriteLeft[1], 'right': this._bigSpriteRight[1]};
			} else if (this._direction === 6) {
				var occupancy = {'up': this._bigSpriteBack[2], 'left': this._bigSpriteLeft[2], 'right': this._bigSpriteRight[2]};
			} else if (this._direction === 8) {
				var occupancy = {'up': this._bigSpriteBack[3], 'left': this._bigSpriteLeft[3], 'right': this._bigSpriteRight[3]};
			}
			var topleft = [this.x - occupancy.left, this.y - occupancy.up];
			for (var j = 0; j <= occupancy.up; j++) {
				for (var i = 0; i <= (occupancy.left + occupancy.right); i++) {
					coord.push({'x': topleft[0] + i, 'y': topleft[1] + j});
				}
			}
		}
		if (this._bigSpriteExType === 'A') {
			var exCoord = this._bigSpriteExCoord;
			for (var i = 0; i < exCoord.length; i++) {
				coord.push({'x': this.x + exCoord[i].dx, 'y': this.y + exCoord[i].dy});
			}
		}
		if (this._bigSpriteExType === 'B') {
			var exCoord = this._bigSpriteExCoord;
			if (this._direction === 2) {
				for (var i = 0; i < exCoord.length; i++) {
					coord.push({'x': this.x + exCoord[i].dx, 'y': this._bigSpriteY0 + exCoord[i].dy});
				}
			} else if (this._direction === 4) {
				for (var i = 0; i < exCoord.length; i++) {
					coord.push({'x': this.x - exCoord[i].dy, 'y': this._bigSpriteY0 + exCoord[i].dx});
				}
			} else if (this._direction === 6) {
				for (var i = 0; i < exCoord.length; i++) {
					coord.push({'x': this.x + exCoord[i].dy, 'y': this._bigSpriteY0 - exCoord[i].dx});
				}
			} else if (this._direction === 8) {
				for (var i = 0; i < exCoord.length; i++) {
					coord.push({'x': this.x - exCoord[i].dx, 'y': this._bigSpriteY0 - exCoord[i].dy});
				}
			}			
		}
		if (this._bigSpriteExType === 'C') {
			if (this._direction === 2) {
				var exCoord = this._bigSpriteExCoord.down;
			} else if (this._direction === 4) {
				var exCoord = this._bigSpriteExCoord.left;
			} else if (this._direction === 6) {
				var exCoord = this._bigSpriteExCoord.right;
			} else if (this._direction === 8) {
				var exCoord = this._bigSpriteExCoord.up;
			}
			for (var i = 0; i < exCoord.length; i++) {
				coord.push({'x': this.x + exCoord[i].dx, 'y': this.y + exCoord[i].dy});
			}
		}
		if (!this._bigSpriteType && !this._bigSpriteExType) {
			coord.push({'x': this.x, 'y': this.y});			
		}
		this._eventOccupancy.coordinates = coord;
		return this._eventOccupancy.coordinates;
	};
	
	Game_Event.prototype.updateEventCoordinates = function() {
		for (var i = 0; i < $gameMap._occupiedTiles.length; i++) {
			if ($gameMap._occupiedTiles[i].event === this) {
				$gameMap._occupiedTiles[i] = this._eventOccupancy;
				return;
			}
		}
		$gameMap._occupiedTiles.push(this._eventOccupancy);
	};
	
	Game_Event.prototype.getTypeBOccupancy = function() {
		var up = 0;
		var down = 0;
		var left = 0;
		var right = 0;
		if (this._direction === 2) {
			up = this._bigSpriteBack;
			down = this._bigSpriteFront;
			left = this._bigSpriteRight;
			right = this._bigSpriteLeft;
		} else if (this._direction === 4) {
			up = this._bigSpriteRight;
			down = this._bigSpriteLeft;
			left = this._bigSpriteFront;
			right = this._bigSpriteBack;
		} else if (this._direction === 6) {
			up = this._bigSpriteLeft;
			down = this._bigSpriteRight;
			left = this._bigSpriteBack;
			right = this._bigSpriteFront;
		} else if (this._direction === 8) {
			up = this._bigSpriteFront;
			down = this._bigSpriteBack;
			left = this._bigSpriteLeft;
			right = this._bigSpriteRight;
		}
		return {'up': up, 'down': down, 'left': left, 'right': right};
	};

/* 
-------------------------------------------------------------------------------------------------------------------------------------------
		CHECK IF EVENT IS OCCUPYING TILE
-------------------------------------------------------------------------------------------------------------------------------------------
*/	
	
	Game_CharacterBase.prototype.isEventHere = function(x, y) {
		var eventHere = null;
		for (var i = 0; i < $gameMap._occupiedTiles.length; i++) {
			for (var j = 0; j < $gameMap._occupiedTiles[i].coordinates.length; j++) {
				var x2 = $gameMap._occupiedTiles[i].coordinates[j].x;
				var y2 = $gameMap._occupiedTiles[i].coordinates[j].y;
				if (x === x2 && y === y2) {
					eventHere = $gameMap._occupiedTiles[i].event; 
					break;
				}
			}
		}
		return this === eventHere ? null : eventHere;
	}

/* 
-------------------------------------------------------------------------------------------------------------------------------------------
		MOVE CHECKING TILES FORWARD FOR LARGE EVENT
-------------------------------------------------------------------------------------------------------------------------------------------
*/
	
	Game_CharacterBase.prototype.checkAheadTiles = function(d) {		
		var thisCoord = this._eventOccupancy.coordinates;		
		if (this._bigSpriteType && this._bigSpriteType.includes('B') || this._bigSpriteExType === 'B') {
			var x0 = this.x;
			var y0 = this._bigSpriteY0;
			var forward = this._bigSpriteFront;
			if (d === 8) var frontTiles = thisCoord.filter(function(tile) {return tile.y === y0 - forward;});
			else if (d === 2) var frontTiles = thisCoord.filter(function(tile) {return tile.y === y0 + forward;});
			else if (d === 4) var frontTiles = thisCoord.filter(function(tile) {return tile.x === x0 - forward;});
			else if (d === 6) var frontTiles = thisCoord.filter(function(tile) {return tile.x === x0 + forward;});
		} else {
			var minY = this.y;
			var maxY = this.y;
			var minX = this.x;
			var maxX = this.x;
			for (var i = 0; i < thisCoord.length; i++) {
				if (thisCoord[i].x < minX) minX = thisCoord[i].x;
				if (thisCoord[i].x > maxX) maxX = thisCoord[i].x;
				if (thisCoord[i].y < minY) minY = thisCoord[i].y;
				if (thisCoord[i].y > maxY) maxY = thisCoord[i].y;
			}
			if (d === 2) var frontTiles = thisCoord.filter(function(tile) {return tile.y === maxY});
			if (d === 4) var frontTiles = thisCoord.filter(function(tile) {return tile.x === minX});
			if (d === 6) var frontTiles = thisCoord.filter(function(tile) {return tile.x === maxX});
			if (d === 8) var frontTiles = thisCoord.filter(function(tile) {return tile.y === minY});
		}
		if (frontTiles) {
			for (var i = 0; i < frontTiles.length; i++) {
				var x2 = $gameMap.roundXWithDirection(frontTiles[i].x, d);
				var y2 = $gameMap.roundYWithDirection(frontTiles[i].y, d);
				frontTiles[i] = {'x': x2, 'y': y2};
			}
		}
		return frontTiles;
	};
		
/* 
-------------------------------------------------------------------------------------------------------------------------------------------
		UPDATE EVENT SIZE
-------------------------------------------------------------------------------------------------------------------------------------------
*/	
	
	var _Game_Character_turnTowardCharacter = Game_Character.prototype.turnTowardCharacter;
	Game_Character.prototype.turnTowardCharacter = function(character) {
		if (this._bigSpriteType) {
			var coord = this._eventOccupancy.coordinates;
			var nearestCoord = null;
			var sx = this.deltaXFrom(character.x);
			var sy = this.deltaYFrom(character.y);
			for (var i = 0; i < coord.length; i++) {
				var dx = $gameMap.deltaX(coord[i].x, character.x);
				var dy = $gameMap.deltaX(coord[i].y, character.y);
				if (Math.abs(dx) + Math.abs(dy) < Math.abs(sx) + Math.abs(sy)) {
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
		if (this._bigSpriteType) {
			oldCoord = this._eventOccupancy.coordinates;
			oldDir = this._direction;
			_Game_CharacterBase_setDirection.call(this, d);
			newCoord = this.setEventCoordinates();
			for (var i = 0; i < newCoord.length; i++) {
				var destinationPassage = this.isMapPassable(newCoord[i].x, newCoord[i].y, 2) && this.isMapPassable(newCoord[i].x, newCoord[i].y, 4) && this.isMapPassable(newCoord[i].x, newCoord[i].y, 6) && this.isMapPassable(newCoord[i].x, newCoord[i].y, 8)
				if (!$gameMap.isValid(newCoord[i].x, newCoord[i].y) || !destinationPassage || this.isCollidedWithCharacters(newCoord[i].x, newCoord[i].y)) {
					this._eventOccupancy.coordinates = oldCoord;
					_Game_CharacterBase_setDirection.call(this, oldDir);
					return false;
				}
			}
			this.updateEventCoordinates();
			_Game_CharacterBase_setDirection.call(this, d);
			return true;
		} else {
			_Game_CharacterBase_setDirection.call(this, d);
			return true;
		}	
	};
	
	var _Game_CharacterBase_setThrough = Game_CharacterBase.prototype.setThrough;
	Game_CharacterBase.prototype.setThrough = function(through) {
		_Game_CharacterBase_setThrough.call(this, through);
		if (this._bigSpriteType) {
			this.setEventCoordinates();
			this.updateEventCoordinates();
		}
	};
	
	var _Game_Event_moveStraight = Game_Event.prototype.moveStraight;
	Game_Event.prototype.moveStraight = function(d) {		
		if (this._bigSpriteType) {
			if (this.setDirection(d)) {
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
					this.checkEventTriggerTouchFront(d);
				} 
			} else {
				this.checkEventTriggerTouchFront(this._direction);
			}			
		} else {
			_Game_Event_moveStraight.call(this, d);
		}
	};
	
	var _Game_Event_moveDiagonally = Game_Event.prototype.moveDiagonally;
	Game_Event.prototype.moveDiagonally = function(horz, vert) {	
		if (this._bigSpriteType) {
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
				this.checkEventTriggerTouchFront(this._direction);
			}
			if (this._direction === this.reverseDir(horz)) {
				this.setDirection(horz);
			}
			if (this._direction === this.reverseDir(vert)) {
				this.setDirection(vert);
			}		
		} else {
			_Game_Event_moveDiagonally.call(this, horz, vert);
		}
	};
	
	var _Game_Event_jump = Game_Event.prototype.jump;
	Game_Event.prototype.jump = function(xPlus, yPlus) {
		if (this._bigSpriteType) {
			if (Math.abs(xPlus) > Math.abs(yPlus)) {
				if (xPlus !== 0) {
					var canTurn = this.setDirection(xPlus < 0 ? 4 : 6);
				}
			} else {
				if (yPlus !== 0) {
					var canTurn = this.setDirection(yPlus < 0 ? 8 : 2);
				}
			}
			if (canTurn) {
				var oldCoord = this._eventOccupancy.coordinates;	
				var oldX = this._x;
				var oldY = this._y;
				this._x += xPlus;
				this._y += yPlus;
				var newCoord = this.setEventCoordinates();
				for (var i = 0; i < newCoord.length; i++) {
					var destinationPassage = this.isMapPassable(newCoord[i].x, newCoord[i].y, 2) && this.isMapPassable(newCoord[i].x, newCoord[i].y, 4) && this.isMapPassable(newCoord[i].x, newCoord[i].y, 6) && this.isMapPassable(newCoord[i].x, newCoord[i].y, 8)
					if (!$gameMap.isValid(newCoord[i].x, newCoord[i].y) || !destinationPassage || this.isCollidedWithCharacters(newCoord[i].x, newCoord[i].y)) {
						this._x = oldX;
						this._y = oldY;
						this._eventOccupancy.coordinates = oldCoord;
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
			_Game_Event_jump.call(this, xPlus, yPlus);
		}
	};
	
	var _Game_Character_deltaYFrom = Game_Character.prototype.deltaYFrom;
	Game_Character.prototype.deltaYFrom = function(y) {
		if (this._bigSpriteType && this._bigSpriteType.includes('B')) return $gameMap.deltaY(this._bigSpriteY0, y);
		return _Game_Character_deltaYFrom.call(this, y);
	};
	
	var _Game_Character_moveRandom = Game_Character.prototype.moveRandom;
	Game_Character.prototype.moveRandom = function() {
		if (this._bigSpriteType && this._bigSpriteType.includes('B')) {
			var d = 2 + Math.randomInt(4) * 2;
			if (this.canPass(this.x, this._bigSpriteY0, d)) {
				this.moveStraight(d);
			}
		} else {
			_Game_Character_moveRandom.call(this);
		}
	};
	
	var _Game_Character_swap = Game_Character.prototype.swap;
	Game_Character.prototype.swap = function(character) {
		if (this._bigSpriteType) {
			var newX = character.x;
			var newY = character.y + Math.floor(this._spriteSize / 2);
			var oldCoord = this._eventOccupancy.coordinates;
			var oldX = this.x;
			var oldY = this.y;
			var oldcharX = character.x;
			var oldcharY = character.y;
			character.locate(this.x, this._bigSpriteY0);
			this.locate(newX, newY);
			this.resetStopCount();
			this.straighten();
			var newCoord = this._eventOccupancy.coordinates;
			for (var i = 0; i < newCoord.length; i++) {
				var destinationPassage = this.isMapPassable(newCoord[i].x, newCoord[i].y, 2) && this.isMapPassable(newCoord[i].x, newCoord[i].y, 4) && this.isMapPassable(newCoord[i].x, newCoord[i].y, 6) && this.isMapPassable(newCoord[i].x, newCoord[i].y, 8)
				if (!$gameMap.isValid(newCoord[i].x, newCoord[i].y) || !destinationPassage || this.isCollidedWithCharacters(newCoord[i].x, newCoord[i].y)) {
					character.locate(oldcharX, oldcharY);
					this.locate(oldX, oldY);
					this._eventOccupancy.coordinates = oldCoord;
					this.resetStopCount();
					this.straighten();
					return;
				}
			}
		} else if (character._bigSpriteType) {
			var newX = character.x;
			var newY = character._bigSpriteY0;
			var oldX = this.x;
			var oldY = this.y;
			var oldcharX = character.x;
			var oldcharY = character.y;
			var oldCoord = character._eventOccupancy.coordinates;			
			character.locate(this.x, this.y + Math.floor(character._spriteSize / 2));
			this.locate(newX, newY);			
			this.resetStopCount();
			this.straighten();
			var newCoord = character._eventOccupancy.coordinates;
			for (var i = 0; i < newCoord.length; i++) {
				var destinationPassage = character.isMapPassable(newCoord[i].x, newCoord[i].y, 2) && character.isMapPassable(newCoord[i].x, newCoord[i].y, 4) && character.isMapPassable(newCoord[i].x, newCoord[i].y, 6) && character.isMapPassable(newCoord[i].x, newCoord[i].y, 8)
				if (!$gameMap.isValid(newCoord[i].x, newCoord[i].y) || !destinationPassage || character.isCollidedWithCharacters(newCoord[i].x, newCoord[i].y)) {
					character.locate(oldcharX, oldcharY);
					this.locate(oldX, oldY);
					character._eventOccupancy.coordinates = oldCoord;
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
		if (this._eventOccupancy) {
			this.setEventCoordinates();
			this.updateEventCoordinates();
		}
	};
	
	var _Game_Character_findDirectionTo = Game_Character.prototype.findDirectionTo;
	Game_Character.prototype.findDirectionTo = function(goalX, goalY) {
		if (this._bigSpriteType && this._bigSpriteType.includes('B')) {
			var searchLimit = this.searchLimit();
			var mapWidth = $gameMap.width();
			var nodeList = [];
			var openList = [];
			var closedList = [];
			var start = {};
			var best = start;

			if (this.x === goalX && this._bigSpriteY0 === goalY) {
				return 0;
			}

			start.parent = null;
			start.x = this.x;
			start.y = this._bigSpriteY0;
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
	

/* 
-------------------------------------------------------------------------------------------------------------------------------------------
		FIX ACTION BUTTON, PLAYER TOUCH AND EVENT TOUCH TRIGGERS
-------------------------------------------------------------------------------------------------------------------------------------------
*/
	
	var _Game_CharacterBase_checkEventTriggerTouchFront = Game_CharacterBase.prototype.checkEventTriggerTouchFront;
	Game_CharacterBase.prototype.checkEventTriggerTouchFront = function(d) {
		if (this._eventId && this._bigSpriteType) {
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
	
	var _Game_Player_startMapEvent = Game_Player.prototype.startMapEvent;
	Game_Player.prototype.startMapEvent = function(x, y, triggers, normal) {
		if (!$gameMap.isEventRunning()) {
			var eventHere = this.isEventHere(x, y);
			if (eventHere && eventHere.isTriggerIn(triggers) && eventHere.isNormalPriority() === normal) eventHere.start();
		}
	};
	
/* 
-------------------------------------------------------------------------------------------------------------------------------------------
		CONFIGURE PASSABILITY
-------------------------------------------------------------------------------------------------------------------------------------------
*/	
	var Yanfly = Yanfly || {};
	if(!Yanfly.Core) {
		Game_Event.prototype.isCollidedWithEvents = function(x, y) {
			var events = $gameMap.eventsXyNt(x, y).filter(function(ev) {return ev.isNormalPriority();});
			if (events.length <= 0) return false;
			return this.isNormalPriority();
		}
	};
	
	var _Game_CharacterBase_isCollidedWithEvents = Game_CharacterBase.prototype.isCollidedWithEvents;
	Game_CharacterBase.prototype.isCollidedWithEvents = function(x, y) {
		var normal = _Game_CharacterBase_isCollidedWithEvents.call(this, x, y);
		var eventHere = this.isEventHere(x, y);
		if (eventHere && eventHere.isNormalPriority()) {
			return true;
		}
		return false;
	};
	
	var _Game_Event_isCollidedWithEvents = Game_Event.prototype.isCollidedWithEvents;
	Game_Event.prototype.isCollidedWithEvents = function(x, y) {
		var normal = _Game_Event_isCollidedWithEvents.call(this, x, y);
		var eventHere = this.isEventHere(x, y); 
		if (eventHere && eventHere.isNormalPriority()) {
			return true;
		}
		return false;
	};
	
	var _Game_CharacterBase_canPass = Game_CharacterBase.prototype.canPass;
	Game_CharacterBase.prototype.canPass = function(x, y, d) {
		var normal = _Game_CharacterBase_canPass.call(this, x, y, d);
		if (this._eventId && this._bigSpriteType) {
			var forwardTiles = this.checkAheadTiles(d);
			for (var i = 0; i < forwardTiles.length; i++) {
				if (!$gameMap.isValid(forwardTiles[i].x, forwardTiles[i].y)) {
					return false;
				}
				if (this.isThrough() || this.isDebugThrough()) {
					return true;
				}
				if (!this.isMapPassable(forwardTiles[i].x, forwardTiles[i].y, d)) { 
					return false;
				}
				if (this.isCollidedWithCharacters(forwardTiles[i].x, forwardTiles[i].y)) {
					return false;
				}
			}
			return true;
		}
		return normal;
	};
	
	
})();
