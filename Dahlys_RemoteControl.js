/*:
 * @plugindesc Universal Remote Control
 * @author dahlys
 *
 * @help
 * ==============================================================================
 * Universal Remote Control
 * ============================================================================== 
 * 
 * Live Search Engine: Search in-game for groups of Event IDs by setting  
 * conditions, using their names, notes and even self-switches! Do searches even
 * in conditional branches!
 *
 * Get Values: Get custom self switch values quickly and use them in conditional 
 * branches. Get the values of multiple self switches/variables and store them in 
 * a variable. Quickly obtain a namelist/notelist of all events on the map, or a 
 * subset defined by a source array.
 * 
 * Remote Control: Remotely change the values of self switches/variables en masse
 * and set conditions for the change.
 * 
 * Search, Get and Manipulate:
 *  - Yanfly's self switches and self variables en masse.
 *  - Hime's self variables en masse.
 * 
 * ------------------------------------------------------------------------------
 * Contents
 * ------------------------------------------------------------------------------
 * 
 * 1. Search Engine
 *    1.1  Conditional Branch Search
 *    1.2  Search by Conditions
 *    1.3  Search by Event Names
 *    1.4  Search by Event Notes
 *    1.5  Search by Self Switches
 *    1.6  Search by Yanfly's Self Variables
 *    1.7  Search by Hime's Self Variables
 *    1.8  Search if Event Names X have Self Switch Y with Value Z
 *    1.9  Search if Event Notes X have Self Switch Y with Value Z
 *    1.10 Search if Event Names X have Yanfly Self Variable Y with Value Z
 *    1.11 Search if Event Notes X have Hime Self Variable Y with Value Z
 *
 * 2. Get Values
 *    2.1 Get Single Default/Custom Self Switch Values and Use in Conditionals
 *    2.2 Get Values of Multiple Self Switches from 1 Event
 *    2.3 Get Values of Multiple Yanfly Self Variables from 1 Event
 *    2.4 Get Values of Multiple Hime Self Variables from 1 Event
 *    2.5 Get Namelist of All Events on Map, or from Source
 *    2.5 Get Notelist of All Events on Map, or from Source
 * 
 * 3. Remote Control
 *    3.1 Set Custom/Default Self Switches (The Even Lazier Way)
 *    3.2 Mass Set Self Switches
 *    3.3 Mass Set Yanfly's Self Variables
 *    3.4 Mass Set Hime's Self Variables
 *    3.5 Mass Set Self Switches by Event Names/Notes
 *    3.6 Mass Set Yanfly's Self Variables by Event Notes
 *    3.7 Mass Set Hime's Self Variables by Event Names
 * 
 * 3. Miscellaneous
 *    3.1 Array to Integer
 * 
 * ==============================================================================
 */
 
 
/* 
---------------------------------------------------------------------------------
    BEGIN MAIN FUNCTION
---------------------------------------------------------------------------------
*/

(function() { 
 
	
/* 
---------------------------------------------------------------------------------
    PLUGIN COMMANDS
---------------------------------------------------------------------------------
*/

    var _Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
	if (command === 'ArraytoInteger') {
		array_to_integer.apply(this, args);
	} else if (command === 'SearchCond') {
		search_condition.apply(this, args);
        } else if (command === 'SearchNames') {
		search_name.apply(this, args);
        } else if (command === 'SearchNotes') {
		search_note.apply(this, args);
        } else if (command === 'SearchSSw') { 
		search_switch.apply(this, args); 
	} else if (command === 'SearchHimeSV') { 
		search_HimeSV.apply(this, args); 	
	} else if (command === 'SearchYanflySV') { 
		search_YanflySV.apply(this, args); 
	} else if (command === 'SearchSSwName') { 
		search_switch_name.apply(this, args);
	} else if (command === 'SearchSSwNote') { 
		search_switch_note.apply(this, args);
	} else if (command === 'SearchYanflySVName') { 
		search_YanflySV_name.apply(this, args);	
	} else if (command === 'SearchYanflySVNote') { 
		search_YanflySV_note.apply(this, args);
	} else if (command === 'SearchHimeSVName') { 
		search_HimeSV_name.apply(this, args);
	} else if (command === 'SearchYanflySVName') { 
		SearchHimeSVNote.apply(this, args);	
	} else if (command === 'GetSSw') { 
		get_swswitch.apply(this, args);
	} else if (command === 'GetYanflySV') { 
		get_YanflySV.apply(this, args);
	} else if (command === 'GetHimeSV') { 
		get_HimeSV.apply(this, args);
	} else if (command === 'GetNames') { 
		get_names.apply(this, args);	
	} else if (command === 'GetNotes') { 
		get_notes.apply(this, args);	
	} else if (command === 'ssw') { 
		set_swswitch_fast.apply(this, args);	
        } else if (command === 'SetSSw') { 
		set_self_switch.apply(this, args);
	} else if (command === 'SetHimeSV') { 
		set_HimeSV.apply(this, args);
	} else if (command === 'SetYanflySV') { 
		set_YanflySV.apply(this, args);	
        } else if (command === 'NameSetSSw') {
		set_self_switch_name.apply(this, args);
        } else if (command === 'NoteSetSSw') { 
		set_self_switch_note.apply(this, args);
	} else if (command === 'NameSetHimeSV') {
		set_HimeSV_name.apply(this, args);
        } else if (command === 'NoteSetHimeSV') { 
		set_HimeSV_note.apply(this, args);	
	} else if (command === 'NameSetYanflySV') {
		set_YanflySV_name.apply(this, args);
        } else if (command === 'NoteSetYanflySV') { 
		set_YanflySV_note.apply(this, args);	
        }		
    };
	
/* 
---------------------------------------------------------------------------------
    SCRIPT CALLS
---------------------------------------------------------------------------------
*/
	
	Game_Interpreter.prototype.ArraytoInt = function () {
		array_to_integer.apply(this, arguments);
	};
	
	Game_Interpreter.prototype.SearchCondition = function () {
		return search_condition.apply(this, arguments);
	};
	
	Game_Interpreter.prototype.SearchNames = function () {
		return search_name.apply(this, arguments);
	};
	
	Game_Interpreter.prototype.SearchNotes = function () {
		return search_note.apply(this, arguments);
	};
	
	Game_Interpreter.prototype.SearchSSw = function () { 
		return search_switch.apply(this, arguments);
	};
	
	Game_Interpreter.prototype.SearchHimeSV = function () { 
		return search_HimeSV.apply(this, arguments);
	};
	
	Game_Interpreter.prototype.SearchYanflySV = function () { 
		return search_YanflySV.apply(this, arguments);
	};
	
	Game_Interpreter.prototype.SearchSSwName = function () { 
		return search_switch_name.apply(this, arguments);
	};
	
	Game_Interpreter.prototype.SearchSSwNote = function () { 
		return search_switch_note.apply(this, arguments);
	};
	
	Game_Interpreter.prototype.SearchYanflySVName = function () { 
		return search_YanflySV_name.apply(this, arguments);
	};
	
	Game_Interpreter.prototype.SearchYanflySVNote = function () { 
		return search_YanflySV_note.apply(this, arguments);
	};
	
	Game_Interpreter.prototype.SearchHimeSVName = function () { 
		return search_HimeSV_name.apply(this, arguments);
	};
	
	Game_Interpreter.prototype.SearchHimeSVNote = function () { 
		return search_HimeSV_note.apply(this, arguments);
	};
	
	Game_Interpreter.prototype.get = function () {
		return get_swswitch_fast.apply(this, arguments);
	};
	
	Game_Interpreter.prototype.GetSSw = function () {
		return get_swswitch.apply(this, arguments);
	};
	
	Game_Interpreter.prototype.GetYanflySV = function () {
		return get_YanflySV.apply(this, arguments);
	};
	
	Game_Interpreter.prototype.GetHimeSV = function () {
		return get_HimeSV.apply(this, arguments);
	};
	
	Game_Interpreter.prototype.GetNames = function () {
		return get_names.apply(this, arguments);
	};
	
	Game_Interpreter.prototype.GetNotes = function () {
		return get_notes.apply(this, arguments);
	};
	
	Game_Interpreter.prototype.SetSelfSw = function () { 
		set_self_switch.apply(this, arguments);
	};	
	
	Game_Interpreter.prototype.SetHimeSV = function () { 
		set_HimeSV.apply(this, arguments);
	};
	
	Game_Interpreter.prototype.SetYanflySV = function () { 
		set_YanflySV.apply(this, arguments);
	};
	
	Game_Interpreter.prototype.NameSetSelfSw = function () { 
		set_self_switch_name.apply(this, arguments);
	};
	
	Game_Interpreter.prototype.NoteSetSelfSw = function () { 
		set_self_switch_note.apply(this, arguments);
	};
	
	Game_Interpreter.prototype.NameSetHimeSV = function () { 
		set_HimeSV_name.apply(this, arguments);
	};
	
	Game_Interpreter.prototype.NoteSetHimeSV = function () { 
		set_HimeSV_note.apply(this, arguments);
	};
	
	Game_Interpreter.prototype.NameSetYanflySV = function () { 
		set_YanflySV_name.apply(this, arguments);
	};
	
	Game_Interpreter.prototype.NoteSetYanflySV = function () { 
		set_YanflySV_note.apply(this, arguments);
	};

/* 
---------------------------------------------------------------------------------
    GAME TEMP FOR CONDITIONALS
---------------------------------------------------------------------------------
*/

	Game_Temp.prototype.SearchNames = function () {
		return search_name.apply(this, arguments);
	};

	Game_Temp.prototype.SearchNotes = function () {
		return search_note.apply(this, arguments);
	};
	
	Game_Temp.prototype.SearchSSw = function () { 
		return search_switch.apply(this, arguments);
	};
	
	Game_Temp.prototype.SearchHimeSV = function () { 
		return search_HimeSV.apply(this, arguments);
	};
	
	Game_Temp.prototype.SearchYanflySV = function () { 
		return search_YanflySV.apply(this, arguments);
	};
	
	Game_Temp.prototype.SearchSSwName = function () {
		return search_switch_name.apply(this, arguments);
	};
	
	Game_Temp.prototype.SearchSSwNote = function () { 
		return search_switch_note.apply(this, arguments);
	};
	
	Game_Temp.prototype.SearchYanflySVName = function () {
		return search_YanflySV_name.apply(this, arguments);
	};
	
	Game_Temp.prototype.SearchYanflySVNote = function () { 
		return search_YanflySV_note.apply(this, arguments);
	};
	
	Game_Temp.prototype.SearchHimeSVName = function () {
		return search_HimeSV_name.apply(this, arguments);
	};
	
	Game_Temp.prototype.SearchHimeSVNote = function () { 
		return search_HimeSV_note.apply(this, arguments);
	};
	
/* 
---------------------------------------------------------------------------------
    COMMON FUNCTIONS
---------------------------------------------------------------------------------
*/
	
	function input_array(arg, endpt){
		for (var k = arg.length - endpt; k >= 0; k--) {
			if (Array.isArray(arg[k])) {
			for (var j = 0; j < arg[k].length; j++) {
				arg.splice(k + 1, 0, arg[k][j]);
			};
			arg.splice(k, 1); 
			};
		};
		return arg;
	}
	
	function counted_variables(c, n, a) {
		if (c.length > 0) {
			c = c.filter(function(elem, index, self) {
				return index == self.indexOf(elem);
			});
			if (n > 0) {
				$gameVariables.setValue(n, c.length);
			};
			if (a > 0) {
				$gameVariables.setValue(a, c);
			};
		} else {
			if (n > 0) {
				$gameVariables.setValue(n, 0);
			}
			if (a > 0) {
				$gameVariables.setValue(a, 0);
			}
		};		
	};
	
	function array_to_integer() {
		var storeNew = autoNumBoolFix.apply(this, arguments);
		var convertArray = $gameVariables.value(storeNew[0]);
		if (Array.isArray(convertArray) && convertArray.length > 0) {
			if (convertArray.length == 1 || storeNew.length == 1) {
				$gameVariables.setValue(storeNew[storeNew.length - 1], convertArray[0]);
			} else if (storeNew.length == 2) {
				for (var i = 0; i < convertArray.length; i++) {
					$gameVariables.setValue(storeNew[1] + i, convertArray[i]);
				}
			} else if (storeNew.length == 1 + convertArray.length) {
				for (var i = i; i < storeNew.length; i++) {
					$gameVariables.setValue(storeNew[i], convertArray[i - 1]);
				}
			}
		}
	};
	
	function create_source_array(svstring) {
		if (Array.isArray(svstring)) {
			return svstring;
		} else {
		var regex = /(?:S)(\d+)/;
		var sourcevariable = Number(regex.exec(svstring)[1]); 
		if (sourcevariable == 0) {
			var sArray = [];
			for (var eId = 1; eId < $dataMap.events.length; eId++) {
				if ($dataMap.events[eId] != null) {
					sArray.push(eId);
				}
			} 
		} else {
			var sArray = $gameVariables.value(sourcevariable);
		}
		return sArray;
		}
	};
	
	function identify_switch(sw, mapId, counted, sAry, value, cond) {	
		for (var i = 0; i < sAry.length; i++) { 
			eventId = sAry[i]; 
			if (eval(cond)) { 
				if (sw == "all or") {
					if ($gameSelfSwitches.value([mapId, eventId, "A"]) == value || $gameSelfSwitches.value([mapId, eventId, "B"]) == value || $gameSelfSwitches.value([mapId, eventId, "C"]) == value || $gameSelfSwitches.value([mapId, eventId, "D"]) == value) {
						counted.push(eventId);
					}
				} else if (sw == "all and") {
					if ($gameSelfSwitches.value([mapId, eventId, "A"]) == value && $gameSelfSwitches.value([mapId, eventId, "B"]) == value && $gameSelfSwitches.value([mapId, eventId, "C"]) == value && $gameSelfSwitches.value([mapId, eventId, "D"]) == value) {
						counted.push(eventId);
					}
				} else { 
					if ($gameSelfSwitches.value([mapId, eventId, sw]) == value) {
						counted.push(eventId);	
					}	
				}
			}
		}
		return counted;
	};
	
	function get_mapId(string) {
		if (string == "thisMap") {
			return $gameMap._mapId;
		} else if (/M\d+/.test(string)) {
			var regex = /(?:M)(\d+)/;
			var mapId = Number(regex.exec(string)[1]);
			if (mapId == 0) {
				return $gameMap._mapId;
			} else {
				return mapId;
			}
		} else {
			return string;
		}
	};	
 
/* 
---------------------------------------------------------------------------------
    FIX RAW INPUTS
---------------------------------------------------------------------------------
*/
	
	function autoSearchNFix() {
		var args = Array.prototype.slice.call(arguments);
		var position = 0;
		for (var i = args.length - 1; i >= 0; i--) {
			if (typeof args[i] == "boolean" || args[i] === "true" || args[i] === "false") {
				args[i] = JSON.parse(args[i]);
			} else if (!Array.isArray(args[i]) && Number(args[i]) > 0) {
				args[i] = Number(args[i]);
			}
		}
		if (args.length == 1 || (typeof args[args.length - 1] == "string" && typeof args[args.length - 2] == "string")) {
			args.push(0);
			args.push(0);
			args.push("S0");
			args.push(true);
		} else if (typeof args[args.length - 1] == "number") {
			args.push("S0");
			args.push(true);
		} else if (typeof args[args.length - 2] == "number") {
			if (/S\d+/.test(args[args.length - 1])) {
				args.push(true);
			} else {			
				args.splice(args.length - 1, 0, "S0");
			}
		}
		return args;
	};
			
	function autoSearchSwitchFix() {
		var args = Array.prototype.slice.call(arguments);
		var position = 0;
		for (var i = args.length - 1; i >= 0; i--) {
			if (typeof args[i] == "boolean" || args[i] === "true" || args[i] === "false") {
				args[i] = JSON.parse(args[i]);
			} else if (!Array.isArray(args[i]) && Number(args[i]) > 0) {
				args[i] = Number(args[i]);
			}
		}
		if (args.length === 1 || (typeof args[args.length - 1] === "string" && typeof args[args.length - 2] === "string")) {
			args.push(true);
			args.push("thisMap");
			args.push(0);
			args.push(0);
			args.push("S0");
			args.push(true);
		} else if (args.length === 2 || (typeof args[args.length - 2] === "string" && typeof args[args.length - 3] === "string")) {
			args.push("thisMap");
			args.push(0);
			args.push(0);
			args.push("S0");
			args.push(true);
		} else if (args[args.length - 1] === "thisMap" || /M\d+/.test(args[args.length - 1])) {
			args.push(0);
			args.push(0);
			args.push("S0");
			args.push(true);
		} else if (typeof args[args.length - 1] === "number") {
			if (args[args.length - 3] === "thisMap" || /M\d+/.test(args[args.length - 3])) {
				args.push("S0");
				args.push(true);
			} else if (typeof args[args.length - 3] === "boolean") {
				args.splice(args.length - 2, 0, "thisMap");
				args.push("S0");
				args.push(true);
			} else {
				args.splice(args.length - 2, 0, true, "thisMap");
				args.push("S0");
				args.push(true);
			}
		} else if (typeof args[args.length - 2] === "number") {
			if (/S\d+/.test(args[args.length - 1])) {
				args.push(true);
			} else {			
				args.splice(args.length - 1, 0, "S0");
			}
		};
		return args;
	};
	
	function autoNumBoolFix() {
		var args = Array.prototype.slice.call(arguments);
		for (var i = args.length - 1; i >= 0; i--) {
			if (typeof args[i] == "boolean" || args[i] === "true" || args[i] === "false") {
				args[i] = JSON.parse(args[i]);
			} else if (!Array.isArray(args[i]) && Number(args[i]) > 0) {
				args[i] = Number(args[i]);
			}
		}
		return args;
	};
	
	function autoSetSSwFix() {
		var args = Array.prototype.slice.call(arguments);
		for (var i = args.length - 1; i >= 0; i--) {
			if (typeof args[i] == "boolean" || args[i] === "true" || args[i] === "false") {
				args[i] = JSON.parse(args[i]);
			} else if (!Array.isArray(args[i]) && Number(args[i]) > 0) {
				args[i] = Number(args[i]);
			}
		}
		if (args.length == 1) {
			args.push(true);
			args.push(this._eventId);
			args.push("thisMap");
			args.push(true);
		} else if (args.length == 2) {
			args.push(this._eventId);
			args.push("thisMap");
			args.push(true);
		} else if (args.length == 3) {
			args.push("thisMap");
			args.push(true);
		} else if (args.length == 4) {
			args.push(true);
		};
		if (args[2] == "thisEvent") {
			args[2] = this._eventId;
		};
		return args;
	};
	
	function autoGetSSwFastFix() {
		var args = Array.prototype.slice.call(arguments);
		for (var i = args.length - 1; i >= 0; i--) {
			if (typeof args[i] == "boolean" || args[i] === "true" || args[i] === "false") {
				args[i] = JSON.parse(args[i]);
			} else if (!Array.isArray(args[i]) && Number(args[i]) > 0) {
				args[i] = Number(args[i]);
			}
		}
		if (args.length == 1) {
			args.push(this._eventId);
			args.push("thisMap");
			args.push(true);
		} else if (args.length == 2) {
			args.push("thisMap");
			args.push(true);
		} else if (args.length == 3) {
			args.push(true);
		};
		if (args[1] == "thisEvent") {
			args[1] = this._eventId;
		};
		return args;
	};
				
	function autoSearchSwNFix() {
		var args = Array.prototype.slice.call(arguments);
		for (var i = args.length - 1; i >= 0; i--) {
			if (typeof args[i] == "boolean" || args[i] === "true" || args[i] === "false") {
				args[i] = JSON.parse(args[i]);
			} else if (!Array.isArray(args[i]) && Number(args[i]) > 0) {
				args[i] = Number(args[i]);
			}
		}
		if (args.length == 2) {
			args.push(true);
			args.push(0);
			args.push(0);
			args.push("S0");
			args.push(true);
		} else if (args.length == 3) {
			args.push(0);
			args.push(0);
			args.push("S0");
			args.push(true);
		} else if (args.length == 4) {
			args.splice(2, 0, true);
			args.push("S0");
			args.push(true);
		} else if (args.length == 5) {
			args.push("S0");
			args.push(true);
		} else if (args.length == 6) {
			if (/S\d+/.test(args[args.length - 1])) {
				args.push(true);
			} else {
				args.splice(3, 0, "S0");
			}			
		}
		return args;
	};
	
	function autoGetN() {
		var args = Array.prototype.slice.call(arguments);
		for (var i = args.length - 1; i >= 0; i--) {
			if (typeof args[i] == "boolean" || args[i] === "true" || args[i] === "false") {
				args[i] = JSON.parse(args[i]);
			} else if (!Array.isArray(args[i]) && Number(args[i]) > 0) {
				args[i] = Number(args[i]);
			}
		}
		if (args.length == 0) {
			args.push("S0");
			args.push(true);
		} else if (args.length == 1) {
			if (/S\d+/.test(args[0])) {
				args.push(true);
			} else {
				args.splice(0, 0, "S0");
			}
		}
		return args;
	};
	
	function autoGetSSwFix() {
		var args = Array.prototype.slice.call(arguments);
		for (var i = args.length - 1; i >= 0; i--) {
			if (typeof args[i] == "boolean" || args[i] === "true" || args[i] === "false") {
				args[i] = JSON.parse(args[i]);
			} else if (!Array.isArray(args[i]) && Number(args[i]) > 0) {
				args[i] = Number(args[i]);
			}
		}
		if (args.length == 1) {
			args.push(0);
			args.push(0);
			args.push(this._eventId);
			args.push("thisMap");
			args.push(true);
		} else if (args.length == 3) {
			args.push(this._eventId);
			args.push("thisMap");
			args.push(true);
		} else if (args.length == 4) {
			args.push("thisMap");
			args.push(true);
		} else if (args.length == 5) {
			args.push(true);
		}
		if (args[3] == "thisEvent") {
			args[3] = this._eventId;
		}
		return args;
	};
	
	function autoSSwNFix() {
		var args = Array.prototype.slice.call(arguments);
		for (var i = args.length - 1; i >= 0; i--) {
			if (typeof args[i] == "boolean" || args[i] === "true" || args[i] === "false") {
				args[i] = JSON.parse(args[i]);
			} else if (!Array.isArray(args[i]) && Number(args[i]) > 0) {
				args[i] = Number(args[i]);
			}
		}
		if (args.length == 2) {
			args.push(true);
			args.push("S0");
			args.push(true);
		} else if (args.length == 3) {
			args.push("S0");
			args.push(true);
		} else if (args.length == 4) {
			if (/S\d+/.test(args[args.length - 1])) {
				args.push(true);
			} else {
				args.splice(3, 0, "S0");
			}			
		}
		return args;
	};
		
/* 
---------------------------------------------------------------------------------
    MAIN SEARCH ENGINE
---------------------------------------------------------------------------------
*/
	
	function search_condition() {
		var args = autoSearchNFix.apply(this, arguments);
		var counted = [];
		var condition = args[3];
		var sourcestring = args[2];
		var sourcearray = create_source_array(sourcestring);
		var countedId = args[1];
		var countedNum = args[0];
		var eventId = 0;
		for (var i = 0; i < sourcearray.length; i++) {
			eventId = sourcearray[i];
			if (eval(condition)) {
				counted.push(eventId);
			}
		}
		counted_variables(counted, countedNum, countedId);
		return counted;
	};
 
	function search_name() {
		var inputcheck = autoSearchNFix.apply(this, arguments);
		var args = input_array(inputcheck, 4);
		var counted = [];
		var condition = args[args.length - 1];
		var sourcestring = args[args.length - 2];
		var sourcearray = create_source_array(sourcestring);
		var countedId = args[args.length - 3];
		var countedNum = args[args.length - 4];
		var eventId = 0;
		for (var i = 0; i < args.length - 4; i++) {
			for (var k = 0; k < sourcearray.length; k++) {
				eventId = sourcearray[k];
				if ($dataMap.events[eventId].name.includes(args[i]) && eval(condition)) {
					counted.push(eventId);
				}
			}
		};
		counted_variables(counted, countedNum, countedId);
		return counted;
	};

	function search_note() {
		var inputcheck = autoSearchNFix.apply(this, arguments);
		var args = input_array(inputcheck, 4);
		var counted = [];
		var condition = args[args.length - 1];
		var sourcestring = args[args.length - 2];
		var sourcearray = create_source_array(sourcestring);
		var countedId = args[args.length - 3];
		var countedNum = args[args.length - 4];
		var eventId = 0;
		for (var i = 0; i < args.length - 4; i++) {
			for (var k = 0; k < sourcearray.length; k++) {
				eventId = sourcearray[k];
				if ($dataMap.events[eventId].note) { 
					if ($dataMap.events[eventId].note.includes(args[i]) && eval(condition)) {
						counted.push(eventId);
					}
				}
			}
		};
		counted_variables(counted, countedNum, countedId);
		return counted;
	};
		
	function search_switch() {
		var args = autoSearchSwitchFix.apply(this, arguments);
		var counted = [];
		var condition = args[args.length - 1]; 
		var sourcestring = args[args.length - 2];
		var sourcearray = create_source_array(sourcestring); 
		var countedId = args[args.length - 3];
		var countedNum = args[args.length - 4];
		var mapPoint = args[args.length - 5];
		var mapId = get_mapId(mapPoint); 
		var value = args[args.length - 6];
		var swnames = [];
		for (var i = 0; i < args.length - 6; i++) {
			if (Array.isArray(args[i])) {
				for (var k = 0; k < args[i].length; k++) {
					if (typeof args[i][k] == "number") {
						args[i][k] = 'SELF SWITCH ' + args[i][k];
					}
					swnames.push(args[i][k]);
				}
			} else if (typeof args[i] == "number") {
				args[i] = 'SELF SWITCH ' + args[i];
				swnames.push(args[i]);
			} else {
				swnames.push(args[i]);
			}
		};
		for (var j = 0; j < swnames.length; j++) {
			if (Array.isArray(value)) {
				counted = identify_switch(swnames[j], mapId, counted, sourcearray, value[j], condition);
			} else {
				counted = identify_switch(swnames[j], mapId, counted, sourcearray, value, condition);
			}
		};
		counted_variables(counted, countedNum, countedId);
		return counted;
	};	
		
	function search_HimeSV() {
		var inputcheck = autoSearchSwitchFix.apply(this, arguments); 
		var args = input_array(inputcheck, 6); 
		var counted = [];
		var condition = args[args.length - 1];
		var sourcestring = args[args.length - 2];
		var sourcearray = create_source_array(sourcestring);
		var countedId = args[args.length - 3];
		var countedNum = args[args.length - 4];
		var mapPoint = args[args.length - 5];
		var mapId = get_mapId(mapPoint);
		var value = args[args.length - 6];
		for (var i = 0; i < args.length - 6; i++) {
			for (var k = 0; k < sourcearray.length; k++) {
				eventId = sourcearray[k];
				if ($gameSelfVariables.value(mapId, eventId, args[i]) == value && eval(condition)) {
					counted.push(eventId);
				}
			}
		}
		counted_variables(counted, countedNum, countedId);
		return counted;
	};
	
	function search_YanflySV() {
		var inputcheck = autoSearchSwitchFix.apply(this, arguments); 
		var args = input_array(inputcheck, 6); 
		var counted = [];
		var condition = args[args.length - 1];
		var sourcestring = args[args.length - 2];
		var sourcearray = create_source_array(sourcestring);
		var countedId = args[args.length - 3];
		var countedNum = args[args.length - 4];
		var mapPoint = args[args.length - 5];
		var mapId = get_mapId(mapPoint);
		var value = args[args.length - 6]; 
		var swname = [];
		for (var j = 0; j < args.length - 6; j++) {
			for (var k = 0; k < sourcearray.length; k++) {
				eventId = sourcearray[k];
				if ($gameSelfSwitches.value([mapId, eventId, 'SELF VARIABLE ' + args[j]]) == value && eval(condition)) {
					counted.push(eventId);
				}
			}
		};
		counted_variables(counted, countedNum, countedId);
		return counted;
	};

/* 
---------------------------------------------------------------------------------
    SEARCH IF NAME/NOTE X HAS SW/VAR Y OF Z VALUE
---------------------------------------------------------------------------------
*/
	
	function search_switch_name() {
		var args = autoSearchSwNFix.apply(this, arguments);
		var eventId = search_name(args[0], 0, 0, args[5], true);
		var counted =  search_switch(args[1], args[2], "thisMap", args[3], args[4], eventId, args[6]);
		return counted;
	};
	
	function search_switch_note() {
		var args = autoSearchSwNFix.apply(this, arguments);
		var eventId = search_note(args[0], 0, 0, args[5], true);
		var counted =  search_switch(args[1], args[2], "thisMap", args[3], args[4], eventId, args[6]);
		return counted;	
	};
	
	function search_HimeSV_name() {
		var args = autoSearchSwNFix.apply(this, arguments);
		var eventId = search_name(args[0], 0, 0, args[5], true);
		var counted =  search_HimeSV(args[1], args[2], "thisMap", args[3], args[4], eventId, args[6]);
		return counted;	
	};
	
	function search_HimeSV_note() {
		var args = autoSearchSwNFix.apply(this, arguments);
		var eventId = search_note(args[0], 0, 0, args[5], true);
		var counted =  search_HimeSV(args[1], args[2], "thisMap", args[3], args[4], eventId, args[6]);
		return counted;	
	};
	
	function search_YanflySV_name() {
		var args = autoSearchSwNFix.apply(this, arguments);
		var eventId = search_name(args[0], 0, 0, args[5], true); 
		var counted =  search_YanflySV(args[1], args[2], "thisMap", args[3], args[4], eventId, args[6]);
		return counted;	
	};
	
	function search_YanflySV_note() {
		var args = autoSearchSwNFix.apply(this, arguments);
		var eventId = search_note(args[0], 0, 0, args[5], true);
		var counted =  search_YanflySV(args[1], args[2], "thisMap", args[3], args[4], eventId, args[6]);
		return counted;	
	};
		
/* 
---------------------------------------------------------------------------------
    GET SELF SW/VAR VALUES PER EVENT, GET NAME/NOTELIST FROM SOURCE/ALL MAP
---------------------------------------------------------------------------------
*/
	
	function get_swswitch_fast() {
		var args = autoGetSSwFastFix.apply(this, arguments);
		var switchName = args[0];
		var eventId = args[1];
		var mapId = get_mapId(args[2]);
		var cond = args[3];	
		if (typeof switchName == "number") {
			switchName = 'SELF SWITCH ' + switchName;
		}
		if (eval(cond)) { 
			return $gameSelfSwitches.value([mapId, eventId, switchName]);
		} else {
			return false;
		}
	};
			
	function get_swswitch() {
		var args = autoGetSSwFix.apply(this, arguments);
		var switchName = args[0];
		var countedId = args[2];
		var countedNum = args[1];
		var eventId = args[3];
		var mapId = get_mapId(args[4]);
		var cond = args[5];	
		var result = [];
		if (Array.isArray(switchName)) {
			for (var i = 0; i < switchName.length; i++) {
				if (typeof switchName[i] == "number") {
					switchName[i] = 'SELF SWITCH ' + switchName[i];
				}
				result.push($gameSelfSwitches.value([mapId, eventId, switchName[i]]));
			}
		}
		counted_variables(result, countedNum, countedId);
		return result;
	};
		
	function get_YanflySV() {
		var args = autoGetSSwFix.apply(this, arguments);
		var switchName = args[0];
		var countedId = args[2];
		var countedNum = args[1];
		var eventId = args[3];
		var mapId = get_mapId(args[4]);
		var cond = args[5];	
		var result = [];
		if (Array.isArray(switchName)) {
			for (var i = 0; i < switchName.length; i++) {
				if (typeof switchName[i] == "number") {
					switchName[i] = 'SELF VARIABLE ' + switchName[i];
				}
				result.push($gameSelfSwitches.value([mapId, eventId, switchName[i]]));
			}
		} 
		counted_variables(result, countedNum, countedId);
		return result;
	};
		
	function get_HimeSV() {
		var args = autoGetSSwFix.apply(this, arguments);
		var switchName = args[0];
		var countedId = args[2];
		var countedNum = args[1];
		var eventId = args[3];
		var mapId = get_mapId(args[4]);
		var cond = args[5];	
		var result = [];
		if (Array.isArray(switchName)) {
			for (var i = 0; i < switchName.length; i++) {
				result.push($gameSelfVariables.value(mapId, eventId, switchName[i]));
			}
		} 
		counted_variables(result, countedNum, countedId);
		return result;
	};
		
	function get_names() {
		var args = autoGetN.apply(this, arguments);
		var sourcearray = create_source_array(args[0]);
		var cond = args[1];
		var namelist = [];
		for (var i = 0; i < sourcearray.length; i++) {
			var eventId = sourcearray[i];
			if (eval(cond)) {
				namelist.push($dataMap.events[eventId].name);
			}
		}
		return namelist;
	};
	
	function get_notes() {
		var args = autoGetN.apply(this, arguments);
		var sourcearray = create_source_array(args[0]);
		var cond = args[1];
		var notelist = [];
		for (var i = 0; i < sourcearray.length; i++) {
			var eventId = sourcearray[i];
			if (eval(cond)) {
				if ($dataMap.events[eventId].note) {
					notelist.push($dataMap.events[eventId].note);
				}
			}
		}
		return notelist;
	};
	
/* 
---------------------------------------------------------------------------------
    SET SWITCHES & VARIABLES
---------------------------------------------------------------------------------
*/

	function set_swswitch_fast() {
		var args = autoSetSSwFix.apply(this, arguments);
		var switchName = args[0];
		if (typeof switchName == "number") {
			switchName = 'SELF SWITCH ' + switchName;
		}
		var value = args[1];
		var eventId = args[2];
		var mapId = get_mapId(args[3]);
		var cond = args[4];	
		if (eval(cond)) {
			$gameSelfSwitches.setValue([mapId, eventId, switchName], value);
		}
	};
		
	function set_self_switch(){
		var args = autoSetSSwFix.apply(this, arguments);
		var switchName = args[0];
		var value = args[1];
		var eventId = args[2];
		var mapPoint = args[3];
		var mapId = get_mapId(mapPoint);
		var cond = args[4];
		var SnIsArray = Array.isArray(switchName);
		var valueIsArray = Array.isArray(value);
		var eIdIsArray = Array.isArray(eventId);
		var mIdIsArray = Array.isArray(mapId); 
		if (SnIsArray) {
			for (var k = 0; k < switchName.length; k++) {
				if (typeof switchName[k] == "number") {
					switchName[k] = 'SELF SWITCH ' + switchName[k];
				}
			}
		} else if (typeof switchName == "number") {
			switchName = 'SELF SWITCH ' + switchName;
		}
		if (SnIsArray) {
			for (var i = 0; i < switchName.length; i++) {
				if (valueIsArray && eval(cond)) {
					if (eIdIsArray) {
						if (mIdIsArray) {
							$gameSelfSwitches.setValue([mapId[i], eventId[i], switchName[i]], value[i]);
						} else {
							$gameSelfSwitches.setValue([mapId, eventId[i], switchName[i]], value[i]);
						}
					} else if (mIdIsArray) {
						$gameSelfSwitches.setValue([mapId[i], eventId, switchName[i]], value[i]);
					} else {
						$gameSelfSwitches.setValue([mapId, eventId, switchName[i]], value[i]);
					}
				} else if (eIdIsArray && eval(cond)) {
					if (mIdIsArray) {
						$gameSelfSwitches.setValue([mapId[i], eventId[i], switchName[i]], value);
					} else {
						$gameSelfSwitches.setValue([mapId, eventId[i], switchName[i]], value);
					}
				} else if (mIdIsArray && eval(cond)) {
					$gameSelfSwitches.setValue([mapId[i], eventId, switchName[i]], value);
				} else if (eval(cond)) {
					$gameSelfSwitches.setValue([mapId, eventId, switchName[i]], value);
				}
			}
		} else if (valueIsArray) {
			for (var i = 0; i < value.length; i++) {
				if (eIdIsArray && eval(cond)) {
					if (mIdIsArray) {
						$gameSelfSwitches.setValue([mapId[i], eventId[i], switchName], value[i]);
					} else {
						$gameSelfSwitches.setValue([mapId, eventId[i], switchName], value[i]);
					}
				} else if (mIdIsArray && eval(cond)) {
					$gameSelfSwitches.setValue([mapId[i], eventId, switchName], value[i]);
				} else if (eval(cond)) {
					$gameSelfSwitches.setValue([mapId, eventId, switchName], value[i]);
				}
			}
		} else if (eIdIsArray) {
			for (var i = 0; i < eventId.length; i++) {
				if (mIdIsArray && eval(cond)) {
					$gameSelfSwitches.setValue([mapId[i], eventId[i], switchName], value);
				} else if (eval(cond)) {
					$gameSelfSwitches.setValue([mapId, eventId[i], switchName], value);
				}
			}	
		} else if (mIdIsArray) {
			for (var i = 0; i < mapId.length; i++) {
				if (eval(cond)) {
					$gameSelfSwitches.setValue([mapId[i], eventId, switchName], value);
				}
			}	
		} else if (eval(cond)) {
			$gameSelfSwitches.setValue([mapId, eventId, switchName], value);
		}
		
	};
		
	// For Hime's Self Variables
	
	function set_HimeSV(){
		var args = autoSetSSwFix.apply(this, arguments);
		var switchName = args[0];
		var value = args[1];
		var eventId = args[2];
		var mapId = args[3];
		var cond = args[4];
		var SnIsArray = Array.isArray(switchName);
		var valueIsArray = Array.isArray(value);
		var eIdIsArray = Array.isArray(eventId);
		var mIdIsArray = Array.isArray(mapId); 
		if (SnIsArray) {
			for (var i = 0; i < switchName.length; i++) {
				if (valueIsArray && eval(cond)) {
					if (eIdIsArray) {
						if (mIdIsArray) {
							$gameSelfVariables.setValue(mapId[i], eventId[i], switchName[i], value[i]);
						} else {
							$gameSelfVariables.setValue(mapId, eventId[i], switchName[i], value[i]);
						}
					} else if (mIdIsArray) {
						$gameSelfVariables.setValue(mapId[i], eventId, switchName[i], value[i]);
					} else {
						$gameSelfVariables.setValue(mapId, eventId, switchName[i], value[i]);
					}
				} else if (eIdIsArray && eval(cond)) {
					if (mIdIsArray) {
						$gameSelfVariables.setValue(mapId[i], eventId[i], switchName[i], value);
					} else {
						$gameSelfVariables.setValue(mapId, eventId[i], switchName[i], value);
					}
				} else if (mIdIsArray && eval(cond)) {
					$gameSelfVariables.setValue(mapId[i], eventId, switchName[i], value);
				} else if (eval(cond)) {
					$gameSelfVariables.setValue(mapId, eventId, switchName[i], value);
				}
			}
		} else if (valueIsArray) {
			for (var i = 0; i < value.length; i++) {
				if (eIdIsArray && eval(cond)) {
					if (mIdIsArray) {
						$gameSelfVariables.setValue(mapId[i], eventId[i], switchName, value[i]);
					} else {
						$gameSelfVariables.setValue(mapId, eventId[i], switchName, value[i]);
					}
				} else if (mIdIsArray && eval(cond)) {
					$gameSelfVariables.setValue(mapId[i], eventId, switchName, value[i]);
				} else if (eval(cond)) {
					$gameSelfVariables.setValue(mapId, eventId, switchName, value[i]);
				}
			}
		} else if (eIdIsArray) {
			for (var i = 0; i < eventId.length; i++) {
				if (mIdIsArray && eval(cond)) {
					$gameSelfVariables.setValue(mapId[i], eventId[i], switchName, value);
				} else if (eval(cond)) {
					$gameSelfVariables.setValue(mapId, eventId[i], switchName, value);
				}
			}	
		} else if (mIdIsArray) {
			for (var i = 0; i < mapId.length; i++) {
				if (eval(cond)) {
					$gameSelfVariables.setValue(mapId[i], eventId, switchName, value);
				}
			}	
		} else if (eval(cond)) {
			$gameSelfVariables.setValue(mapId, eventId, switchName, value);
		}
		
	};	
	
	// For Yanfly's Self Variables
	
	function set_YanflySV(){
		var args = autoSetSSwFix.apply(this, arguments);
		var switchName = args[0];
		var value = args[1];
		var eventId = args[2];
		var mapPoint = args[3];
		var mapId = get_mapId(mapPoint);
		var cond = args[4];
		var SnIsArray = Array.isArray(switchName);
		var valueIsArray = Array.isArray(value);
		var eIdIsArray = Array.isArray(eventId);
		var mIdIsArray = Array.isArray(mapId); 
		if (SnIsArray) {
			for (var k = 0; k < switchName.length; k++) {
				if (typeof switchName[k] == "number") {
					switchName[k] = 'SELF VARIABLE ' + switchName[k];
				}
			}
		} else if (typeof switchName == "number") {
			switchName = 'SELF VARIABLE ' + switchName;
		};
		if (SnIsArray) {
			for (var i = 0; i < switchName.length; i++) {
				if (valueIsArray && eval(cond)) {
					if (eIdIsArray) {
						if (mIdIsArray) {
							$gameSelfSwitches.setValue([mapId[i], eventId[i], switchName[i]], value[i]);
						} else {
							$gameSelfSwitches.setValue([mapId, eventId[i], switchName[i]], value[i]);
						}
					} else if (mIdIsArray) {
						$gameSelfSwitches.setValue([mapId[i], eventId, switchName[i]], value[i]);
					} else {
						$gameSelfSwitches.setValue([mapId, eventId, switchName[i]], value[i]);
					}
				} else if (eIdIsArray && eval(cond)) {
					if (mIdIsArray) {
						$gameSelfSwitches.setValue([mapId[i], eventId[i], switchName[i]], value);
					} else {
						$gameSelfSwitches.setValue([mapId, eventId[i], switchName[i]], value);
					}
				} else if (mIdIsArray && eval(cond)) {
					$gameSelfSwitches.setValue([mapId[i], eventId, switchName[i]], value);
				} else if (eval(cond)) {
					$gameSelfSwitches.setValue([mapId, eventId, switchName[i]], value);
				}
			}
		} else if (valueIsArray) {
			for (var i = 0; i < value.length; i++) {
				if (eIdIsArray && eval(cond)) {
					if (mIdIsArray) {
						$gameSelfSwitches.setValue([mapId[i], eventId[i], switchName], value[i]);
					} else {
						$gameSelfSwitches.setValue([mapId, eventId[i], switchName], value[i]);
					}
				} else if (mIdIsArray && eval(cond)) {
					$gameSelfSwitches.setValue([mapId[i], eventId, switchName], value[i]);
				} else if (eval(cond)) {
					$gameSelfSwitches.setValue([mapId, eventId, switchName], value[i]);
				}
			}
		} else if (eIdIsArray) {
			for (var i = 0; i < eventId.length; i++) {
				if (mIdIsArray && eval(cond)) {
					$gameSelfSwitches.setValue([mapId[i], eventId[i], switchName], value);
				} else if (eval(cond)) {
					$gameSelfSwitches.setValue([mapId, eventId[i], switchName], value);
				}
			}	
		} else if (mIdIsArray) {
			for (var i = 0; i < mapId.length; i++) {
				if (eval(cond)) {
					$gameSelfSwitches.setValue([mapId[i], eventId, switchName], value);
				}
			}	
		} else if (eval(cond)) {
			$gameSelfSwitches.setValue([mapId, eventId, switchName], value);
		}		
	};
	
/* 
---------------------------------------------------------------------------------
    SET SWITCHES & VARIABLES BY NAME/NOTE
---------------------------------------------------------------------------------
*/
	
	function set_self_switch_name(){
		var args = autoSSwNFix.apply(this, arguments);
		eventId = search_name(args[0], 0, 0, args[3], true);
		set_self_switch(args[1], args[2], eventId, "thisMap", args[4]);
	};

	function set_self_switch_note(){
		var args = autoSSwNFix.apply(this, arguments);
		eventId = search_note(args[0], 0, 0, args[3], true);
		set_self_switch(args[1], args[2], eventId, "thisMap", args[4]);
	};
	
	function set_HimeSV_name(){
		var args = autoSSwNFix.apply(this, arguments);
		eventId = search_name(args[0], 0, 0, args[3], true);
		set_HimeSV(args[1], args[2], eventId, "thisMap", args[4]);
	};

	function set_HimeSV_note(){
		var args = autoSSwNFix.apply(this, arguments);
		eventId = search_note(args[0], 0, 0, args[3], true);
		set_HimeSV(args[1], args[2], eventId, "thisMap", args[4]);
	};
	
	function set_YanflySV_name(){
		var args = autoSSwNFix.apply(this, arguments);
		eventId = search_name(args[0], 0, 0, args[3], true);
		set_YanflySV(args[1], args[2], eventId, "thisMap", args[4]);
	};

	function set_YanflySV_note(){
		var args = autoSSwNFix.apply(this, arguments);
		eventId = search_note(args[0], 0, 0, args[3], true);
		set_YanflySV(args[1], args[2], eventId, "thisMap", args[4]);
	};

/* 
---------------------------------------------------------------------------------
    END MAIN FUNCTION
---------------------------------------------------------------------------------
*/

})();

/* 
---------------------------------------------------------------------------------
    CONDITIONAL BRANCH SEARCH
---------------------------------------------------------------------------------
*/

function Search() {};

	// Search if Name exists in Map from Source with Condition
	Search.Names = function(name, source, cond) {
		if (typeof source === 'undefined') { source = "S0"; };
		if (typeof cond === 'undefined') { cond = true; };
		if ($gameTemp.SearchNames(name, 0, 0, source, cond).length > 0) { return true; }
		return false;
	};
	
	// Search if Note exists in Map from Source with Condition
	Search.Notes = function(note, source, cond) {
		if (typeof source === 'undefined') { source = "S0"; };
		if (typeof cond === 'undefined') { cond = true; };
		if ($gameTemp.SearchNotes(note, 0, 0, source, cond).length > 0) { return true; }
		return false;
	};
	
	// Search if Self Switch X is ON/OFF/value in any Map from Source with Condition
	Search.SelfSw = function(swName, value, mapId, source, cond) {
		if (typeof value === 'undefined') { value = true; };
		if (typeof mapId === 'undefined') { mapId = "thisMap"; };
		if (typeof source === 'undefined') { source = "S0"; };
		if (typeof cond === 'undefined') { cond = true; }; 
		if ($gameTemp.SearchSSw(swName, value, mapId, 0, 0, source, cond).length > 0) { return true; }
		return false;
	};
	
	// Search if Event Name has Self Switch X ON/OFF/value in Map from Source with Condition
	Search.NameSw = function(eName, swName, value, source, cond) {
		if (typeof value === 'undefined') { value = true; };
		if (typeof source === 'undefined') { source = "S0"; };
		if (typeof cond === 'undefined') { cond = true; };
		if ($gameTemp.SearchSSwName(eName, swName, value, 0, 0, source, cond).length > 0) { return true; }
		return false;		
	};
	
	// Search if Event Note has Self Switch X ON/OFF/value in Map from Source with Condition
	Search.NoteSw = function(eNote, swName, value, source, cond) { 
		if (typeof value === 'undefined') { value = true; };
		if (typeof source === 'undefined') { source = "S0"; };
		if (typeof cond === 'undefined') { cond = true; };
		if ($gameTemp.SearchSSwNote(eNote, swName, value, 0, 0, source, cond).length > 0) { return true; }
		return false;		
	};
	
	// Search if Hime Self Variable X is Y in any Map from Source with Condition
	Search.HimeSV = function(swName, value, mapId, source, cond) {
		if (typeof value === 'undefined') { value = true; };
		if (typeof mapId === 'undefined') { mapId = "thisMap"; };
		if (typeof source === 'undefined') { source = "S0"; };
		if (typeof cond === 'undefined') { cond = true; };
		if ($gameTemp.SearchHimeSV(swName, value, mapId, 0, 0, source, cond).length > 0) { return true; }
		return false;
	};	
	
	// Search if Yanfly Self Variable X is Y in any Map from Source with Condition
	Search.YanflySV = function(swName, value, mapId, source, cond) {
		if (typeof value === 'undefined') { value = true; };
		if (typeof mapId === 'undefined') { mapId = "thisMap"; };
		if (typeof source === 'undefined') { source = "S0"; };
		if (typeof cond === 'undefined') { cond = true; };
		if ($gameTemp.SearchYanflySV(swName, value, mapId, 0, 0, source, cond).length > 0) { return true; }
		return false;
	};

	// Search if Event Name has Yanfly Self Variable X of value Y in Map from Source with Condition
	Search.YanflySVName = function(eName, swName, value, source, cond) {
		if (typeof source === 'undefined') { source = "S0"; };
		if (typeof cond === 'undefined') { cond = true; };
		if ($gameTemp.SearchYanflySVName(eName, swName, value, 0, 0, source, cond).length > 0) { return true; }
		return false;		
	};
	
	// Search if Event Name has Hime Self Variable X of value Y in Map from Source with Condition
	Search.HimeSVName = function(eName, swName, value, source, cond) {
		if (typeof source === 'undefined') { source = "S0"; };
		if (typeof cond === 'undefined') { cond = true; };
		if ($gameTemp.SearchHimeSVName(eName, swName, value, 0, 0, source, cond).length > 0) { return true; }
		return false;		
	};
