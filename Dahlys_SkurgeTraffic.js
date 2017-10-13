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
	
	var parameters = PluginManager.parameters('Dahlys_SkurgeTraffic');
	var redSelfSw = String(parameters['Self Switch Red']) || 'A';
	var tfnames = String(parameters['Traffic Light Names']) || 'TRAFFIC LIGHT STOPPER,TRAFFIC LIGHT ODD';	
	
/* 
-------------------------------------------------------------------------------------------------------------------------------------------
		OVERWRITE CANPASS
-------------------------------------------------------------------------------------------------------------------------------------------
*/	
	
	//overwriting base canPass
	Game_CharacterBase.prototype.canPass = function(x, y, d) {
		var x2 = $gameMap.roundXWithDirection(x, d);
		var y2 = $gameMap.roundYWithDirection(y, d);		
		if (!$gameMap.isValid(x2, y2)) {
			return false; //hit the map edges
		}
		if (this.isThrough() || this.isDebugThrough() || !this.isNormalPriority()) {
			return true; //this is a ghost or a below/above player priority event
		} 
		if (!this.isMapPassable(x, y, d)) {
			return false; //hit a wall/blocked region
		} 
		if (this.isCollidedWithVehicles(x2, y2)) {
			return false; //hit player vehicle
		}
		if (this._eventId && this.isCollidedWithPlayerCharacters(x2, y2)) {
			return false; //an event hit the player
		}
		return skurge_canPass.call(this, x, y, x2, y2, d); //hit an event
	};
	
	Game_CharacterBase.prototype.isCollidedWithEvents = function(x, y) {
		var highestPriorityEvent = Game_CharacterBase.prototype.skurge_highestPriorityBlocker.call(this, x, y);
		if (highestPriorityEvent === 'blocked') {
			return true;
		} else {
			return false;
		}
	};
	
	Game_Event.prototype.isCollidedWithEvents = function(x, y) {
		var highestPriorityEvent = Game_CharacterBase.prototype.skurge_highestPriorityBlocker.call(this, x, y);
		if (highestPriorityEvent === 'blocked') {
			return true;
		} else {
			return false;
		}
	};

/* 
-------------------------------------------------------------------------------------------------------------------------------------------
		EVENT PASSABILITY
-------------------------------------------------------------------------------------------------------------------------------------------
*/	
	Game_CharacterBase.prototype.skurge_canPass = function(x, y, x2, y2, d) {
		return skurge_canPass.call(this, x, y, x2, y2, d);
	};
	
	function skurge_canPass(x, y, x2, y2, d) {
		var tlightIds = make_tfidarray(tfnames); //get ids of each type of traffic light
		var tfNames = tfnames.split(","); //get traffic light names
		for (var i = 0; i < tfNames.length; i++) { 
			tfNames[i] = new RegExp(tfNames[i], 'i'); //case insensitive traffic light name matching
		}
		var blocker = skurge_highestPriorityBlocker.call(this, x2, y2);
		//PASSER IS A LARGE EVENT (CAR)	
		if (this._eventId && this._isLargeEvent) {
			if (blocker.type === 'trafficLight') {				
				tf_name = $dataMap.events[blocker.ev._eventId].name;
				for (var i = 0; i < tlightIds.length; i++) { 
					if (tf_name.match(tfNames[i]) && $gameSelfSwitches.value([$gameMap.mapId(), tlightIds[i], redSelfSw])) {
						return skurge_largeEventOnTrafficLight.call(this, x2, y2); //traffic light is YELLOW. If car is on traffic light, DASH. Else, STOP.
					}
				}
				return true; //traffic light is GREEN, let it pass!
			}			
			if (this.isCollidedWithEvents(x2, y2)) return false;
			return true;
		}
		//PASSER IS NOT A CAR
		if (blocker.type !== 'trafficLight') {			
			if (this.isCollidedWithEvents(x2, y2)) return false;
			return true;			
		} else {
			return true; //nobody is blocked by traffic lights except cars
		}
		
	};	

/* 
-------------------------------------------------------------------------------------------------------------------------------------------
		DETERMINE HIGHEST PRIORTY BLOCKER EVENT, IF MULTIPLE EVENTS ON SAME TILE
-------------------------------------------------------------------------------------------------------------------------------------------
*/
	
	Game_CharacterBase.prototype.skurge_highestPriorityBlocker = function(x, y) {
		return skurge_highestPriorityBlocker.call(this, x, y);
	};
	
	function skurge_highestPriorityBlocker(x, y) {
		var allBlockers = $gameMap.eventsXyNt(x, y).filter(function(ev) { return ev.isNormalPriority();	});
		if (allBlockers.length <= 0) {
			return 'unblocked';
		}
		for (var i = 0; i < allBlockers.length; i++) {
			if (!allBlockers[i]) {
				//hit null event
				return 'blocked';
			}
		}		
		for (var i = 0; i < allBlockers.length; i++) {
			if (allBlockers[i].isSpawnEvent) {
				//hit spawned event
				return 'blocked';
			}
		}
		for (var i = 0; i < allBlockers.length; i++) {
			if (this._eventId && this.isCollidedWithSelf(x,y)) {
				//hit self event
				return 'unblocked';
			}
		}
		for (var i = 0; i < allBlockers.length; i++) {
			if (!$dataMap.events[allBlockers[i]._eventId].name.match(/TRAFFIC LIGHT/i) && !$dataMap.events[allBlockers[i]._eventId].name.match(/CAR/i)) {
				//hit non-traffic light, non-car event
				return 'blocked';
			}
		}
		if (this._eventId && this._isLargeEvent) {
			for (var i = 0; i < allBlockers.length; i++) {				
				if ($dataMap.events[allBlockers[i]._eventId].name.match(/TRAFFIC LIGHT/i)) {
					//hit a traffic light
					return {'ev': allBlockers[i], 'type': 'trafficLight'};
				}
			}
			//hit a car
			return 'blocked';
		} else {
			for (var i = 0; i < allBlockers.length; i++) {
				if ($dataMap.events[allBlockers[i]._eventId].name.match(/CAR/i) || this.check_events_size(x, y)) {
					//hit a car
					return 'blocked';
				}
			}
			return {'type': 'trafficLight'};
		}
	};
	
	function skurge_largeEventOnTrafficLight(x, y) {
		//get coordinates of all parts of large event
		var coordinates = [];
		var topleft = [$gameMap.event(this._eventId).x - this._largeEventLeft, $gameMap.event(this._eventId).y - this._largeEventTop];
		var downright = [$gameMap.event(this._eventId).x + this._largeEventRight, $gameMap.event(this._eventId).y + this._largeEventDown];
		for (var j = 0; j < (1 + this._largeEventTop + this._largeEventDown); j++) {
			for (var i = 0; i < (1 + this._largeEventLeft + this._largeEventRight); i++) {
				coordinates.push([topleft[0] + i, topleft[1] + j]);
			}
		}
		for (var i = 0; i < coordinates.length; i++) {
			if (coordinates[i][0] === x && coordinates[i][1] === y) return true;
		}
		return false;		
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