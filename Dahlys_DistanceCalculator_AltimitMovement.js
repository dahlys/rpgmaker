/*:
 * @plugindesc Distance Calculator
 * @author Dahlys
 * 
 * @param Angle of View
 * @desc Character angle of view in degrees
 * @default 120
 * 
 * @param Default View Distance
 * @desc Character default view distance
 * @default 300
 * 
 * @param Blocked Terrain Tags
 * @desc Terrain tags that character cannot see through. Separate tags with a space.
 *
 * @param Blocked Region Ids
 * @desc Region Ids that character cannot see through. Separate tags with a space.
 * 
 *
 * @help
 * ==============================================================================
 *                     Distance Calculator for Altimit Movement
 * ==============================================================================
 * 
 * Characters:
 * Player             = -1
 * Player + followers = -2
 * Event              = eventId
 *
 * Calculate Distance between 2 characters:
 *   - Script call: Dahlys.distCalc.distance(char1, char2)
 *   - e.g. 
 *     Dahlys.distCalc.distance(-1, 1) calculates distance in pixels between the
 *     Player and Event 1. 
 *     Dahlys.distCalc.distance(2, -2) calculates the distances in pixels between
 *     Event 2 and the Player + Followers and returns an array 
 *     containing all the distances.
 *
 * Calculate Angle between 2 characters:
 *   - Script call: Dahlys.distCalc.angleBtwChars(char1, char2)
 *   - e.g. 
 *     Dahlys.distCalc.angleBtwChars(-1, 1) calculates the angle of Event 1
 *     relative to the Player's line of sight.
 *
 * Can Char1 see Char2:
 *   - Script call: Dahlys.distCalc.canSee(char1, char2, dist, aov)
 *   - dist and aov are optional and the plugin parameters Default View Distance 
 *     and Angle of View will be used if they are left blank.
 *   - Char1 will not be able to see Char2 if blocked by: 1) tiles with Blocked
 *     Terrain Tags, 2) tiles with Blocked Region Ids, 3) other characters
 *   - Player can see through followers but event vision can be blocked by
 *     followers. Using char2 = -2 to check if Event char1 can see either the
 *     Player or any Follower.
 *   - e.g. 
 *     Dahlys.distCalc.canSee(-1, 1) is true if the Player can see Event 1 at
 *     the default distance and angle of view.
 *     Dahlys.distCalc.canSee(1, -2) is true if Event 1 can see the Player or any 
 *     of the Followers at the default distance and angle of view.
 *     Dahlys.distCalc.canSee(-1, 1, 100, 360) is true if the Player can see Event 
 *     1 at a radius of 100 pixels (360 degrees).
 *
*/

var Imported = Imported || {};
Imported.AltimitDistanceCalculator = true;

var Dahlys = Dahlys || {};
Dahlys.vars = Dahlys.vars || {};
Dahlys.distCalc = Dahlys.distCalc || {};

(function() { 

	var parameters = PluginManager.parameters('Dahlys_DistanceCalculator_AltimitMovement');
	Dahlys.distCalc.viewAngle = Number(parameters['Angle of View']) || 120;
	Dahlys.distCalc.viewDistance = Number(parameters['Default View Distance']) || 300;
	Dahlys.distCalc.blockedTerrain = String(parameters['Blocked Terrain Tags']) || null;
	if (Dahlys.distCalc.blockedTerrain) Dahlys.distCalc.blockedTerrain.split(' ').map(Number);
	Dahlys.distCalc.blockedRegion = String(parameters['Blocked Region Ids']) || null;
	if (Dahlys.distCalc.blockedRegion) Dahlys.distCalc.blockedRegion.split(' ').map(Number);
	
	Dahlys.distCalc.canSee = function(char1, char2, dist, aov) {
		char1 = Dahlys.distCalc.convertInputToCharacter(char1);
		char2 = Dahlys.distCalc.convertInputToCharacter(char2);
		if (!dist) dist = Dahlys.distCalc.viewDistance;
		if (!aov) aov = Dahlys.distCalc.viewAngle;
		if (!char1 || !char2) return 'undefined';
		if (Array.isArray(char1)) {
			var check = false;
			for (var i = 0; i < char1.length; i++) {
				check = check || Dahlys.distCalc.canSeeCalc(char1[i], char2, dist, aov);
				if (check) return true;
			}
			return check;
		} else if (Array.isArray(char2)) {
			var check = false;
			for (var i = 0; i < char2.length; i++) {
				check = check || Dahlys.distCalc.canSeeCalc(char1, char2[i], dist, aov);
				if (check) return true;
			}
			return check;
		} else {
			return Dahlys.distCalc.canSeeCalc(char1, char2, dist, aov);
		}
	};
	
	Dahlys.distCalc.distance = function(char1, char2) {
		char1 = Dahlys.distCalc.convertInputToCharacter(char1);
		char2 = Dahlys.distCalc.convertInputToCharacter(char2);
		if (!char1 || !char2) return 'undefined';
		if (Array.isArray(char1)) {
			var out = [];
			for (var i = 0; i < char1.length; i++) {
				out.push(Dahlys.distCalc.distanceCalc(char1[i], char2));
			}
			return out;
		} else if (Array.isArray(char2)) {
			var out = [];
			for (var i = 0; i < char2.length; i++) {
				out.push(Dahlys.distCalc.distanceCalc(char1, char2[i]));
			}
			return out;
		} else {
			return Dahlys.distCalc.distanceCalc(char1, char2);
		}
	};
	
	Dahlys.distCalc.angleBtwChars = function(char1, char2) {
		char1 = Dahlys.distCalc.convertInputToCharacter(char1);
		char2 = Dahlys.distCalc.convertInputToCharacter(char2);
		if (!char1 || !char2) return 'undefined';
		if (Array.isArray(char1)) {
			var out = [];
			for (var i = 0; i < char1.length; i++) {
				out.push(Dahlys.distCalc.angleBtwCharsCalc(char1[i], char2));
			}
			return out;
		} else if (Array.isArray(char2)) {
			var out = [];
			for (var i = 0; i < char2.length; i++) {
				out.push(Dahlys.distCalc.angleBtwCharsCalc(char1, char2[i]));
			}
			return out;
		} else {
			return Dahlys.distCalc.angleBtwCharsCalc(char1, char2);
		}
	};
	
	Dahlys.distCalc.convertInputToCharacter = function(input) {
		if (input === -1) return $gamePlayer;
		else if (input === -2) {
			if ($gamePlayer.followers()._visible) return [$gamePlayer].concat($gamePlayer._followers._data);
			else input = $gamePlayer;
		} else if (input > 0) return $gameMap.event(input);
		else return null;
	};
	
	Dahlys.distCalc.canSeeCalc = function(char1, char2, dist, aov) {
		if (!Dahlys.distCalc.isWithinDistanceofView(char1, char2, dist)) return false;
		if (!Dahlys.distCalc.isWithinAngleofView(char1, char2, aov)) return false;
		if (Dahlys.distCalc.isViewTerrainBlocked(char1, char2)) return false;
		if (Dahlys.distCalc.isViewRegionBlocked(char1, char2)) return false;
		if (Dahlys.distCalc.isViewCharacterBlocked(char1, char2)) return false;
		return true;
	};
	
	//Calculate distance between 2 characters
	Dahlys.distCalc.distanceCalc = function(char1, char2) {
		var coord1 = {'x': char1.x + char1.collider().x, 'y': char1.y + char1.collider().y};
		var coord2 = {'x': char2.x + char2.collider().x, 'y': char2.y + char2.collider().y};
		var pixCoord1 = Dahlys.mapCoordToPixelCoord(coord1);
		var pixCoord2 = Dahlys.mapCoordToPixelCoord(coord2);
		var x1 = pixCoord1.x;
		var y1 = pixCoord1.y;
		var x2 = pixCoord2.x;
		var y2 = pixCoord2.y;
		return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
	};
	
	//Calculate angle of char2 relative to char1's line of sight
	Dahlys.distCalc.angleBtwCharsCalc = function(char1, char2) {
		var vect2_length = Dahlys.distCalc.distanceCalc(char1, char2);
		var dotP = Dahlys.distCalc.vectorDotProduct(char1, char2);
		return Math.acos(dotP/vect2_length) * 180 / Math.PI;
	};	
	
	//Is char2 within char1's angle of view?
	Dahlys.distCalc.isWithinAngleofView = function(char1, char2, aov) {
		if (Dahlys.distCalc.angleBtwCharsCalc(char1, char2) <= aov / 2) return true;
		return false;
	};
	
	//Is char2 within char1's distance of view?
	Dahlys.distCalc.isWithinDistanceofView = function(char1, char2, dist) {
		if (Dahlys.distCalc.distanceCalc(char1, char2) <= dist) return true;
		return false;
	};
	
	//Is any terrain blocking char1's view to char2?
	Dahlys.distCalc.isViewTerrainBlocked = function(char1, char2) {
		var blocked = Dahlys.distCalc.blockedTerrain;
		if (!blocked) return false;
		var pix = Dahlys.distCalc.getPixelsInLine(char1, char2);
		var tiles = Dahlys.distCalc.pixelsToMapXY(pix);
		var tileTerrain = Dahlys.distCalc.getTerrainTags(tiles);
		return tileTerrain.some(function(v) {return blocked.indexOf(v) >= 0});
	}
	
	//Is any region blocking char1's view to char2?
	Dahlys.distCalc.isViewRegionBlocked = function(char1, char2) {
		var blocked = Dahlys.distCalc.blockedRegion;
		if (!blocked) return false;
		var pix = Dahlys.distCalc.getPixelsInLine(char1, char2);
		var tiles = Dahlys.distCalc.pixelsToMapXY(pix);
		var tileRegion = Dahlys.distCalc.getRegionIds(tiles);		
		return tileRegion.some(function(v) {return blocked.indexOf(v) >= 0});
	}
	
	Game_Map.prototype.visibleCharacters = function() {
		var events = [];
		for (var i = 0; i < this._events.length; i++) {
			if (this._events[i] && !this._events[i].isTransparent()) events.push(this._events[i]);
		}
		var player = $gamePlayer.isTransparent() ? [] : [$gamePlayer];
		var vehicle = [];
		for (var i = 0; i < $gameMap._vehicles.length; i++) {
			if ($gameMap._vehicles[i]._mapId === this._mapId && !$gameMap._vehicles[i].isTransparent()) vehicle.push($gameMap._vehicles[i]);
		}
		var followers = [];
		if ($gamePlayer.followers()._visible) followers = $gamePlayer._followers._data;
        return events.concat(player, vehicle, followers);
    };
	
	//Is any character blocking char1's view to char2?
	Dahlys.distCalc.isViewCharacterBlocked = function(char1, char2) {
		if (Dahlys.distCalc.charactersBlockingView(char1, char2)) return true;
		return false;
	};
	
	Dahlys.distCalc.charactersBlockingView = function(char1, char2) {
		var pix = Dahlys.distCalc.getPixelsInLine(char1, char2);
		var tiles = Dahlys.distCalc.pixelsToMapXY(pix);
		var charTiles = Dahlys.charOnTiles();
		var tileOverlaps = Dahlys.tileOverlaps(char1, char2, tiles, charTiles);
		if (tileOverlaps.length === 0) return null;
		var charsCollided = Dahlys.checkColliderOverlap(tileOverlaps, pix);
		if (charsCollided.length === 0) return null;
		return charsCollided;
	};
	
	Dahlys.mapTotalPixelWidth = function() {
		var tiles = $gameMap.width();
		var tileWidth = $gameMap.tileWidth();
		return tiles * tileWidth;
	}
	
	Dahlys.mapTotalPixelHeight = function() {
		var tiles = $gameMap.height();
		var tileWidth = $gameMap.tileWidth();
		return tiles * tileWidth;
	}
	
	Dahlys.mapCoordToPixelCoord = function(coord) {
		var xfrac = coord.x / $gameMap.width();
		var xPixelCoord = Math.round(xfrac * Dahlys.mapTotalPixelWidth());
		var yfrac = coord.y / $gameMap.width();
		var yPixelCoord = Math.round(yfrac * Dahlys.mapTotalPixelWidth());
		return {'x': xPixelCoord, 'y': yPixelCoord};
	}
	
	Dahlys.checkColliderOverlap = function(ary, pix) {
		var tileWidth = $gameMap.tileWidth();
		var charCollided = [];
		for (var i = 0; i < ary.length; i++) {
			var collider = ary[i].char.collider();
			var x = ary[i].x + collider.x;
			var y = ary[i].y + collider.y;
			var pixCoord = Dahlys.mapCoordToPixelCoord({'x': x,'y': y});
			var rad = collider.radius * tileWidth;
			if (Dahlys.charCircleColliderOverlap(pixCoord, rad, pix)) charCollided.push(ary[i].char);
		}
		return charCollided;
	};
	
	Dahlys.charCircleColliderOverlap = function(pixCoord, rad, pix) {
		var strPix = [];
		for (var i = 0; i < pix.length; i++) {
		  strPix.push(pix[i].join('|'));
		}
		var x0 = pixCoord.x;
		var y0 = pixCoord.y;
		if (strPix.indexOf(x0 + '|' + y0) >= 0) return true;
		var x = rad;
		var y = 0;
		var err = 1 - x;
		while (x >= y) {
			var coord = [];
			coord.push((x0 + x) + '|' + (y0 + y));
			coord.push((x0 + y) + '|' + (y0 + x));
			coord.push((x0 - x) + '|' + (y0 + y));
			coord.push((x0 - y) + '|' + (y0 + x));
			coord.push((x0 - x) + '|' + (y0 - y));
			coord.push((x0 - y) + '|' + (y0 - x));
			coord.push((x0 + x) + '|' + (y0 - y));
			coord.push((x0 + y) + '|' + (y0 - x));
			if (coord.some(function(v) {return strPix.indexOf(v) >= 0})) return true;
			y++;
			if (err < 0) err += 2 * y + 1;
			else {
				x--;
				err += 2 * (y - x + 1);
			}
		}
		return false;
	};
	
	Dahlys.tileOverlaps = function(char1, char2, source, target) {
		var overlap = [];
		for (var i = 0; i < target.length; i++) {
			for (var j = 0; j < source.length; j++) {
				if (source[j].x === target[i].x && source[j].y === target[i].y) overlap.push(target[i]);
			}
		}
		for (var i = overlap.length - 1; i >= 0; i--) {
			if (char1 === $gamePlayer) {
				if (overlap[i].char === $gamePlayer || $gamePlayer.followers()._data.some(function(v) {return v === overlap[i].char})) {
					overlap.splice(i, 1);
				} else if (overlap[i].char === char2) overlap.splice(i, 1);
			} else if (overlap[i].char === char1 || overlap[i].char === char2) overlap.splice(i, 1);
		}
		return overlap;
	};
	
	Dahlys.charOnTiles = function() {
		var allChar = $gameMap.visibleCharacters();
		var charTiles = [];
		for (var i = 0; i < allChar.length; i++) {
			if (allChar[i]) {
				var mapX = Math.floor(allChar[i].x + allChar[i].collider().x);
				var mapY = Math.floor(allChar[i].y + allChar[i].collider().y);
				charTiles.push({'char': allChar[i], 'x': mapX, 'y': mapY});
			}
		}
		return charTiles;
	};
	
	Dahlys.distCalc.getTerrainTags = function(ary) {
		var tags = [];
		for (var i = 0; i < ary.length; i++) {
			tags.push($gameMap.terrainTag(ary[i].x, ary[i].y));
		}
		return tags;
	};	
	
	Dahlys.distCalc.getRegionIds = function(ary) {
		var ids = [];
		for (var i = 0; i < ary.length; i++) {
			ids.push($gameMap.regionId(ary[i].x, ary[i].y));
		}
		return ids;
	};	
	
	Dahlys.distCalc.vectorDotProduct = function(char1, char2) {
		var v1 = Dahlys.distCalc.getVector(char1);
		var coord1 = {'x': char1.x + char1.collider().x, 'y': char1.y + char1.collider().y};
		var coord2 = {'x': char2.x + char2.collider().x, 'y': char2.y + char2.collider().y};
		var pixCoord1 = Dahlys.mapCoordToPixelCoord(coord1);
		var pixCoord2 = Dahlys.mapCoordToPixelCoord(coord2);
		var x1 = pixCoord1.x;
		var y1 = pixCoord1.y;
		var x2 = pixCoord2.x;
		var y2 = pixCoord2.y;
		var v2 = [x2 - x1, y2 - y1];
		var sum = 0;
		for (var i = 0; i < v1.length; i++) {
			sum += v1[i] * v2[i];
		}
		return sum;
	};
	
	Dahlys.distCalc.getVector = function(character) {
		var dir = character._direction;
		var diaglength = Math.SQRT1_2;
		switch (dir) {
			case 1:	return [-diaglength, diaglength];
			case 2: return [0, 1];
			case 3: return [diaglength, diaglength];
			case 4: return [-1, 0];
			case 6: return [1, 0];
			case 7: return [-diaglength, -diaglength];
			case 8: return [0, -1];
			case 9: return [diaglength, -diaglength];
		}
		return;
	}
	
	Dahlys.distCalc.tilesInBetween = function(char1, char2) {
		var pix = Dahlys.distCalc.getPixelsInLine(char1, char2);
		return Dahlys.distCalc.pixelsToMapXY(pix);
	}
	
	Dahlys.distCalc.getPixelsInLine = function(char1, char2) {
		var pix = [];
		var coord1 = {'x': char1.x + char1.collider().x, 'y': char1.y + char1.collider().y};
		var coord2 = {'x': char2.x + char2.collider().x, 'y': char2.y + char2.collider().y};
		var pixCoord1 = Dahlys.mapCoordToPixelCoord(coord1);
		var pixCoord2 = Dahlys.mapCoordToPixelCoord(coord2);
		var x1 = pixCoord1.x;
		var y1 = pixCoord1.y;
		var x2 = pixCoord2.x;
		var y2 = pixCoord2.y;
		var dx = Math.abs(x2 - x1);
		var dy = Math.abs(y2 - y1);
		var sx = (x1 < x2) ? 1 : -1;
		var sy = (y1 < y2) ? 1 : -1;
		var err = dx - dy;
		do {
			pix.push([x1, y1]);
			var e2 = err << 1;
			if (e2 > -dy) {
				err -= dy;
				x1 += sx;
			}
			if (e2 < dx) {
				err += dx;
				y1 += sy;
			}
		} while (!((x1 === x2) && (y1 === y2)));
		return pix;
	};
	
	Dahlys.distCalc.pixelsToMapXY = function(pix) {
		var mapXY = []; 
		var tileWidth = $gameMap.tileWidth();
		for (var i = 0; i < pix.length; i++) {
			var mapX = Math.floor(pix[i][0] / tileWidth);
			var mapY = Math.floor(pix[i][1] / tileWidth);
			mapXY.push([mapX, mapY]);
		}
		//remove duplicates
		var hash = {};
		var output = [];
		for (var i = 0; i < mapXY.length; i++) {
		  var key = mapXY[i].join('|');
		  if (!hash[key]) {
			output.push(mapXY[i]);
			hash[key] = 1;
		  }
		}
		//convert to objects
		var tiles = [];
		for (var i = 0; i < output.length; i++) {
			tiles.push({'x': output[i][0], 'y': output[i][1]});
		}
		return tiles;
	};
	
})();