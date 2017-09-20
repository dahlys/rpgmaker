/*:
 * @plugindesc Remote Event Count and Control
 * @author dahlys
 *
 * @help
 * ==============================================================================
 * Remote Event Count and Control
 * ============================================================================== 
 * 
 * Use: Count and Control events on the map. It is useful if you don't want 100
 * events to have 100 parallel processes monitoring a global switch.
 * Example uses: Make all the children on the map run away from you in a game of 
 * tag, drop a lightning bolt on everyone named Dick in town.
 *
 * I am personally using this to store arrays of NPCs and policemen in town. Then
 * if I want to check some property of the NPC, I don't have to cycle through 
 * every single event every time, which is tedious when I have a lot of doors,  
 * lights, animations etc. around. I can just use the array.
 *
 * ------------------------------------------------------------------------------
 * Counting by Event Names
 * ------------------------------------------------------------------------------
 *
 * SCRIPT CALL:
 * this.countevent("name", eventnumber, array, "condition")
 * 
 * e.g. this.countevent("Tom", "Dick", "Harry", 1, 2, true)
 * 
 * The total number of events whose names contain Tom, Dick or Harry is stored 
 * in game variable 1. 
 * !!!NOTE: CONTAIN, if their name is "Tom Smith" they will be counted. Also, if
 * the event name has two of the entries e.g. "Tom Dick", they will NOT be
 * double-counted!!!
 * An array containing the event ids of Toms, Dicks, and Harrys is stored in  
 * game variable 2.
 * If you don't want the array to be stored then set the number to 0
 * e.g. this.countevent("Smith", 1, 0, true) stores only the number of  
 * Smiths in game variable 1.
 * If you only want the array then:
 * e.g. this.countevent("Smith", 0, 1, true) stores only the array of 
 * eventids for the Smiths in game variable 1.
 * 
 * When there are no matches to the name, NOTHING is done.
 *
 * If say, in your game, self-switch A being ON means an npc is dead. You don't 
 * want to count that npc even if his name is on the list. So, set a condition.
 *
 * e.g.
 * this.countevent("Dick", 1, 2, "!$gameSelfSwitches.value([this._mapId, id, \"A\"])");
 *
 * If the event id is involved in the condition, use id like the example.
 * When your condition involves the event id in any way, it MUST be inside a 
 * string --> "". As long as it does not involve the event id then:
 *
 * e.g. this.countevent("Dick", 1, 2, $gameSwitches.value(1))
 *
 * is acceptable.
 *
 * If your condition is in a string and contains javascript special characters 
 * ', ", and \, put a backslash before it \', \" and \\ like in the example.
 *
 * You are free to use conditions from other plugins.
 *
 * e.g. this.countevent("Dick", 1, 2, Check.has(1, 2, 3))
 * 
 * Here, Check.has comes from plugin ConditionalBranch+ by mjshi.
 * 
 * This plugin is also capable of accepting an array of strings as input.
 * Some of my game variables store an array of strings. You can also define an
 * array within the same script call.
 *
 * e.g. $gameVariables.setValue(1, ["Tom", "Dick", "Harry"]);
 * e.g. var namearray = ["Smith", "Johnson"];
 * 
 * Then, the script call is:
 *
 * e.g. this.countevent($gameVariables.value(1), namearray, 1, 2, true)
 * 
 * Now, all events with names containing Tom, Dick, Harry, Smith or Johnson will
 * be counted and their information stored into variables 1 and 2.
 *
 * ------------------------------------------------------------------------------ 
 * Controlling Event Self Switches by their Names
 * ------------------------------------------------------------------------------
 *
 * SCRIPT CALL:
 * this.controlevent("name", selfswitchid, true/false, "condition")
 * 
 * e.g. this.controlevent("Tom", "Harry", "A", true, true);
 * 
 * All the events named Tom/Harry will have self-switch A turned on.
 * 
 * This plugin is also compatible with Yanfly's Self Switches.
 * 
 * e.g. this.controlevent("Harry", "Smith", 1, true, true);
 * 
 * If self-switch 1 is defined as a self switch (Self Sw in its name), then it
 * will be turned on for all Harry and Smith. Else, wierd things may happen :p
 *
 * Same as the event counter, if you want to turn on the switch with a condition
 * then include the condition.
 *
 * e.g.
 * this.controlevent("Tom", "Harry", "A", true, $gameVariables.value(1) == 10)
 *
 * It should work with conditions from other plugins as well.
 *
 * Like this.countevent, this.controlevent can also accept an array of strings as
 * input.
 *
 * ------------------------------------------------------------------------------ 
 * Counting Events from Array of Event IDs
 * ------------------------------------------------------------------------------
 * 
 * So you used this.countevent and dumped an array of event IDs into a variable.
 * What now?
 * You can search only within this new array. It is faster than searching 
 * through all the events on the map, especially if you have a lot of events.
 * 
 * SCRIPT CALL:
 * this.counteventarray("name", eventnumber, array, sourcearray, "condition")
 *
 * e.g. Previously, I stored the ids of all the Toms, Dicks, and Harrys in
 *      variable 2.
 *
 * this.counteventarray("Smith", 3, 4, 2, true)
 *
 * Now, I will find out which of the Toms, Dicks, and Harrys have a last name 
 * "Smith", and store it in new variables. A John Smith will go undetected this
 * way.
 *
 * My personal use of this command is as such:
 * this.counteventarray("Policeman", 0, 2, 1, "Galv.DETECT.event(sourcearray[id], 4, true)")
 *
 * Galv's event detector is used here. Variable 1 stored all the NPCs on the map.
 * I find out which NPC is a Policeman, and if they're close to the player. I run
 * this script in a parallel common event to keep monitoring policemen around the
 * player. Now if the player is notorious I can command all the nearby policemen 
 * to give chase.
 * 
 * Unlike the previous script calls, if you need the event ID here, use
 * sourcearray[id], not just id.
 *
 * Special javascript characers require an extra \ within the condition (see 
 * above) if the condition is a string.
 * 
 * Like the previous calls, an array can be used as input as well.
 * 
 * e.g $gameVariables.setValue(1, ["Smith", "Johnson"]);
 *     var victimfamilies = $gameVariables.value(1);
 *     this.counteventarray(victimfamilies, 3, 4, 2, true)
 * 
 * Now I can do stuff with the families of the player's victims.
 *
 * ------------------------------------------------------------------------------ 
 * Controlling Events from Array of Event IDs
 * ------------------------------------------------------------------------------ 
 * 
 * A combination of the last two functions.
 * Now I control event self switches, but using an array as a source instead of
 * all the events on the map.
 * 
 * SCRIPT CALL:
 * this.controleventarray("name", sourcearray, selfswitchid, bool, "condition")
 * 
 * e.g. this.controleventarray("Smith", "Johnson", 2, "A", true, true);
 *
 * Uses the array stored in variable 2 as a source and turns on self-switch A
 * for all Tom Smith, Harry Johnson, Dick Smith etc. Tom Robinson will not
 * be activated despite being in array 2.
 * 
 * An array of strings can be used as input, same as before.
 *  
 * ==============================================================================
 */
 
 
 
// Event Counting 
 
Game_Interpreter.prototype.GetEventSubset = function () {
	var precheck = Array.prototype.slice.call(arguments);
	for (var k = precheck.length - 4; k >= 0; k--) {
		if (Array.isArray(precheck[k])) {
		for (var j = 0; j < precheck[k].length; j++) {
			precheck.splice(k + 1, 0, precheck[k][j]);
		};
		precheck.splice(k, 1); 
		};
	};
	var names = precheck;
	var eventarray = [];
	var condition = names[names.length - 1];
	for (var i = 0; i < names.length - 3; i++) {
		for (var id = 1; id < 999; id++) {
			if ($dataMap.events[id] == null) {
				break;
			} else if ($dataMap.events[id].name.includes(names[i]) && eval(condition)) {
				eventarray.push(id);
			}
		}
	};
	// If array is not empty
	if (eventarray.length > 0) {
		//remove duplicates
		eventarray = eventarray.filter(function(elem, index, self) {
		return index == self.indexOf(elem);
		});
		//Set variables
		var eventnumber = names[names.length - 3];
		var eventids = names[names.length - 2];
		if (eventnumber > 0) {
			$gameVariables.setValue(eventnumber, eventarray.length);
		};
		if (eventids > 0) {
			$gameVariables.setValue(eventids, eventarray);
		};
	};
};


// Event Control

Game_Interpreter.prototype.controlevent = function () {
	var precheck = Array.prototype.slice.call(arguments);
	for (var k = precheck.length - 4; k >= 0; k--) {
		if (Array.isArray(precheck[k])) {
		for (var j = 0; j < precheck[k].length; j++) {
			precheck.splice(k + 1, 0, precheck[k][j]);
		};
		precheck.splice(k, 1); 
		};
	};
	var names = precheck;
	var selfswitchid = names[names.length - 3];
	var selfswitchvalue = names[names.length - 2];
	var condition = names[names.length - 1];
	for (var i = 0; i < names.length - 3; i++) {
		for (var id = 1; id < 999; id++) {
			if ($dataMap.events[id] == null) {
				break;
			} else if ($dataMap.events[id].name.includes(names[i]) && eval(condition)) {
				if (isNaN(selfswitchid)) {
					$gameSelfSwitches.setValue([this._mapId, id, selfswitchid], selfswitchvalue);
				} else {
					this.setSelfSwitchValue(this._mapId, id, selfswitchid, selfswitchvalue);
				};
			};
		};
	};
};

// Use array of event_id instead of searching all events

Game_Interpreter.prototype.counteventarray = function () {
	var precheck = Array.prototype.slice.call(arguments);
	for (var k = precheck.length - 5; k >= 0; k--) {
		if (Array.isArray(precheck[k])) {
		for (var j = 0; j < precheck[k].length; j++) {
			precheck.splice(k + 1, 0, precheck[k][j]);
		};
		precheck.splice(k, 1); 
		};
	};
	var names = precheck;
	var eventarray = [];
	var condition = names[names.length - 1];
	var sourcearray = $gameVariables.value(names[names.length - 2]);
	for (var i = 0; i < names.length - 4; i++) {
		for (var id = 0; id < sourcearray.length; id++) {
			if ($dataMap.events[sourcearray[id]] == null) {
				break;
			} else if ($dataMap.events[sourcearray[id]].name.includes(names[i]) && eval(condition)) {
				eventarray.push(sourcearray[id]);
			}
		}
	};
	// If array is not empty
	if (eventarray.length > 0) {
		//remove duplicates
		eventarray = eventarray.filter(function(elem, index, self) {
		return index == self.indexOf(elem);
		});
		//Set variables
		var eventnumber = names[names.length - 4];
		var eventids = names[names.length - 3];
		if (eventnumber > 0) {
			$gameVariables.setValue(eventnumber, eventarray.length);
		};
		if (eventids > 0) {
			$gameVariables.setValue(eventids, eventarray);
		};
	};
};

// Use array of event_id, and control self switch

Game_Interpreter.prototype.controleventarray = function () {
	var precheck = Array.prototype.slice.call(arguments);
	for (var k = precheck.length - 5; k >= 0; k--) {
		if (Array.isArray(precheck[k])) {
		for (var j = 0; j < precheck[k].length; j++) {
			precheck.splice(k + 1, 0, precheck[k][j]);
		};
		precheck.splice(k, 1); 
		};
	};
	var names = precheck;
	var selfswitchid = names[names.length - 3];
	var selfswitchvalue = names[names.length - 2];
	var sourcearray = $gameVariables.value(names[names.length - 4]);
	var condition = names[names.length - 1];
	for (var i = 0; i < names.length - 4; i++) {
		for (var id = 0; id < sourcearray.length; id++) {
			if ($dataMap.events[sourcearray[id]] == null) {
				break;
			} else if ($dataMap.events[sourcearray[id]].name.includes(names[i]) && eval(condition)) {
				if (isNaN(selfswitchid)) {
					$gameSelfSwitches.setValue([this._mapId, sourcearray[id], selfswitchid], selfswitchvalue);
				} else {
					this.setSelfSwitchValue(this._mapId, sourcearray[id], selfswitchid, selfswitchvalue);
				};
			};
		};
	};
};



























