/*:
 * @plugindesc Traffic Management
 * @author Dahlys
 *
 * @param Self Switch Red
 * @desc What self switch means a traffic light is red?
 * @default A
 *
 * @param Traffic Light Names
 * @desc Event Names for each type Traffic Light
 * Separate names by commas, no spaces
 * @default TRAFFIC LIGHT STOPPER,TRAFFIC LIGHT ODD
 *
 * @help
 * ==============================================================================
 *                            Skurge Traffic Management
 * ==============================================================================
 * 
 * PLUGIN PARAMETERS:
 *
 * Self Switch Red: Which self switch being ON means a traffic light is red? 'A' 
 * by default.
 * 
 * Traffic Light Names: Traffic lights must be in groups. Each group must share
 * a common light switch timer. You can have as many groups as you want. Names
 * for different groups are separated by a comma without spaces.
 * 
 * ROADBLOCK EVENTS:
 *
 * Roadblock events with event names matching parameters Traffic Light Names have 
 * to be created and placed on the road. Vehicles will stop before this roadblock
 * when the lights are red. They should be blank and have priorty same as 
 * characters.
 *
 */

(function() { 

/* 
-------------------------------------------------------------------------------------------------------------------------------------------
		PLUGIN PARAMETERS
-------------------------------------------------------------------------------------------------------------------------------------------
*/	
	
	var parameters = PluginManager.parameters('Dahlys_SkurgeTrafficBig');
	var redSelfSw = String(parameters['Self Switch Red']) || 'A';
	var tfnames = String(parameters['Traffic Light Names']) || 'TRAFFIC LIGHT STOPPER,TRAFFIC LIGHT ODD';
	
/* 
-------------------------------------------------------------------------------------------------------------------------------------------
		OVERWRITE CANPASS
-------------------------------------------------------------------------------------------------------------------------------------------
*/	
	
	//overwriting base canPass
	var _Game_CharacterBase_canPass = Game_CharacterBase.prototype.canPass;
	Game_CharacterBase.prototype.canPass = function(x, y, d) { 		
		if (_Game_CharacterBase_canPass.call(this, x, y, d)) return true;
		var x2 = $gameMap.roundXWithDirection(x, d); 
		var y2 = $gameMap.roundYWithDirection(y, d);		
		if (this._eventId && this._bigSpriteType) {
			var forwardTiles = this.checkAheadTiles(d);
			for (var i = 0; i < forwardTiles.length; i++) {
				if (this.isCollidedWithVehicles(forwardTiles[i].x, forwardTiles[i].y) || this.isCollidedWithPlayerCharacters(forwardTiles[i].x, forwardTiles[i].y)) return false;
				if (this.isCollidedWithEvents(forwardTiles[i].x, forwardTiles[i].y)) {
					var xTL = forwardTiles[i].x;
					var yTL = forwardTiles[i].y;
					var eventsHere = $gameMap.eventsXyNt(xTL, yTL);
					if (eventsHere.length === 1 && !eventsHere[0].isSpawnEvent && $dataMap.events[eventsHere[0]._eventId].name.match(/TRAFFIC LIGHT/i) && $dataMap.events[this._eventId].name.match(/CAR/i)) return this.skurge_canPass(eventsHere[0]._eventId, xTL, yTL);
					return false;
				}
			}
			return false;
		} else if (this.isCollidedWithEvents(x2, y2)) {
			var eventsHere = $gameMap.eventsXyNt(x2, y2);
			if (eventsHere.length > 1) return false;
			if (!eventsHere[0].isSpawnEvent && $dataMap.events[eventsHere[0]._eventId].name.match(/TRAFFIC LIGHT/i)) return true;
			return false;
		}
		return false;	
	};

/* 
-------------------------------------------------------------------------------------------------------------------------------------------
		EVENT PASSABILITY
-------------------------------------------------------------------------------------------------------------------------------------------
*/	
	Game_CharacterBase.prototype.skurge_canPass = function(id, x, y) {
		var tlightIds = make_tfidarray(tfnames); //get ids of each type of traffic light
		var tfNames = tfnames.split(","); //get traffic light names
		for (var i = 0; i < tfNames.length; i++) { 
			tfNames[i] = new RegExp(tfNames[i], 'i'); //case insensitive traffic light name matching
		}
		var tf_name = $dataMap.events[id].name;
		for (var i = 0; i < tlightIds.length; i++) { 
			if (tf_name.match(tfNames[i]) && $gameSelfSwitches.value([$gameMap.mapId(), tlightIds[i], redSelfSw])) {
				//traffic light is YELLOW. If car is on traffic light, DASH. Else, STOP.
				var occupancy = this.eventOccupancy();
				for (var j = 0; j < occupancy.length; j++) {
					if (occupancy[j].x === x && occupancy[j].y === y) return true;
				}
				return false; 
			}
		}
		return true; //traffic light is GREEN, let it pass!		
	};

/* 
-------------------------------------------------------------------------------------------------------------------------------------------
		SEARCH TRAFFIC LIGHT NAMES, GET THEIR EVENT IDS
-------------------------------------------------------------------------------------------------------------------------------------------
*/
	
	function search_name(name) {
		var regex = new RegExp(name, 'i'); //case insensitive name matching
		for (var eId = 1; eId < $dataMap.events.length; eId++) {
			if ($dataMap.events[eId]) {
				if ($dataMap.events[eId].name) {
					if ($dataMap.events[eId].name.match(regex)) {
						return eId;
					}//if event exists on map and the name matches, the function will return the eventId of the first match
				}
			}
		}
		return 0;
	};
	
	function make_tfidarray(tfnames) {
		var tfnamearray = tfnames.split(","); //split traffic light names up using commas
		var tfids = [];
		for (var i = 0; i < tfnamearray.length; i++) {
			tfids.push(search_name(tfnamearray[i]));
		}
		return tfids; //array containing eventIds examples from each traffic light type
	}
	
})();