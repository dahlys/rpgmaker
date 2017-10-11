/*:
 * @plugindesc Traffic Management
 * @author Dahlys
 *
 * @param Vehicle Names
 * @desc Names of Events to Block
 * Separate names by commas, no spaces
 * @default car
 *
 * @param Self Switch Red
 * @desc What self switch means a traffic light is red?
 * @default A 
 *
 * @param Traffic Light Names
 * @desc Event Names for each type Traffic Light
 * Separate names by commas, no spaces
 * @default TL NS,TL EW
 *
 * @param Road Blocker Names
 * @desc Event Names for each type of Blocker
 * Separate names by commas, no spaces 
 * @default Block NS,Block EW
 *
 * @help
 * ==============================================================================
 *                              Traffic Management
 * ==============================================================================
 * 
 * PLUGIN PARAMETERS:
 *
 * Vehicle Name: 'car' by default, case insensitive. Works as long as the event 
 * name contains 'car'. i.e. 'Car X', 'theCAR', 'carBus' are all cars! If you 
 * change this to 'vehicle', all events named 'vehicle' will be blocked, but not 
 * 'car'. More than 1 name can be used, e.g. car,bus
 * 
 * Self Switch Red: Which self switch being ON means a traffic light is red? 'A' 
 * by default.
 * 
 * Traffic Light Names: Traffic lights must be in groups. Each group must share
 * a common light switch timer. You can have as many groups as you want. Names
 * for different groups are separated by a comma without spaces.
 * 
 * Road Blocker Names: Same as traffic light names. Road Blocker Name order must
 * correspond with the order of Traffic Light Names. i.e. Traffic Light NS 
 * activates Road Blocker NS. Must have the same number of entries as TLN, or the
 * plugin will glitch.
 * 
 * ROADBLOCK EVENTS:
 *
 * Roadblock events with event names matching parameters Road Blocker Names have 
 * to be created and placed on the road. Vehicles will stop before this roadblock
 * when the lights are red. They should be blank and have priorty same as 
 * characters.
 * e.g. Event Name: Block NS
 * Effect: When TL NS is RED, Block NS will block vehicles. Nothing else is 
 * blocked. Vehicles will remain blocked even if the light is green should 
 * another event/the player be standing on top of Block NS (non-through).
 *
 */

(function() { 

/* 
----------------------------------------------------------------------------------
		PLUGIN PARAMETERS
----------------------------------------------------------------------------------
*/	
	
	var parameters = PluginManager.parameters('Dahlys_Traffic');
	var vehicleName = String(parameters['Vehicle Names']) || 'car';
	var redSelfSw = String(parameters['Self Switch Red']) || 'A';
	var tfnames = String(parameters['Traffic Light Names']) || 'TL NS,TL EW';
	var blocknames = String(parameters['Road Blocker Names']) || 'Block NS,Block EW';

/* 
----------------------------------------------------------------------------------
		ALIAS CANPASS
----------------------------------------------------------------------------------
*/	
	
	var _Game_CharacterBase_canPass = Game_CharacterBase.prototype.canPass; //aliasing base canPass
	Game_CharacterBase.prototype.canPass = function(x, y, d) {		
		var x2 = $gameMap.roundXWithDirection(x, d);
		var y2 = $gameMap.roundYWithDirection(y, d);
		if (this.isCollidedWithEvents(x2, y2)) {
			if ($gamePlayer.x === x2 && $gamePlayer.y === y2 && !$gamePlayer.isThrough()) {
				return false; //failsafe in case player is standing on top of blocker
			}					
			if ($gameMap.eventsXy(x2, y2).length > 1 && !$gameMap.eventsXy(x2, y2)[1].isThrough()) {
				var blocker = $gameMap.eventsXy(x2, y2)[1];
			} else {
				if (this._eventId && this.isCollidedWithSelf(x2, y2)) {return true;}
				var blocker = $gameMap.eventsXy(x2, y2)[0];
			}
			return canPass_block(this, x2, y2, blocker); //hit an event
		} else {
			return _Game_CharacterBase_canPass.call(this, x, y, d); //hit anything else, return to original
		}			
	};

/* 
----------------------------------------------------------------------------------
		TRAFFIC LIGHT
----------------------------------------------------------------------------------
*/	
	
	function canPass_block(obj, x2, y2, blocker) { 
		var tlightIds = make_tfidarray(tfnames); //get ids of each type of traffic light
		var blockNames = blocknames.split(","); //get map blocker names
		var vehicleNames = vehicleName.split(","); //get vehicle names
		var regex = [];  
		for (var k = 0; k < vehicleNames.length; k++) { 
			regex.push(new RegExp(vehicleNames[k], 'i')); //case insensitive vehicle name matching
		} 
		if (!obj || !blocker) {return false;}
		if (obj.isSpawnEvent || blocker.isSpawnEvent) {return false;}
		if (obj._eventId) {
			if (obj._eventId === blocker._eventId) {if (this.left + this.hitboxWidth) {};}
			if ($dataMap.events[obj._eventId].name) {
				var passerName = $dataMap.events[obj._eventId].name;
			} else {
				return false;
			}
		} else {
			var passerName = $dataActors[1].name;
		}
		if (blocker._eventId) {
			if (obj._eventId === blocker._eventId) {return true;}
			if ($dataMap.events[blocker._eventId].name) {
				var blockerName = $dataMap.events[blocker._eventId].name;
			} else {
				return false;
			}
		} else {
			var blockerName = $dataActors[1].name;
		};
		for (var j = 0; j < regex.length; j++) {
			for (var i = 0; i < tlightIds.length; i++) {
				if (blockerName.match(regex[j]) && passerName.match(regex[j])) {
					return false;
				} else if ((blockerName.match(regex[j]) && passerName === blockNames[i]) || (blockerName === blockNames[i] && passerName.match(regex[j]))) { //car collided into blocker or blocker collided into car
					if ($gameSelfSwitches.value([$gameMap.mapId(), tlightIds[i], redSelfSw])) {
						return false; //traffic light is RED, block it!
					} else {
						return true; //traffic light is GREEN, let it pass!
					}
				} else if (passerName === blockNames[i] || blockerName === blockNames[i]) {
					return true; //anyone but cars can pass through blocker
				}
			}			
		}	
		return false; //non-traffic related collision event		
	}
	
/* 
----------------------------------------------------------------------------------
		OTHERS
----------------------------------------------------------------------------------
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
