/*:
 * @plugindesc Search Events, Retrieve Data, Remote Control Self Switches
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
 * How to Use
 * ------------------------------------------------------------------------------
 * 
 * It's complicated. See webpage:
 *
 * https://dahlys.000webhostapp.com/dahlysRemoteControl.html
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
		} else if (command === 'get') { 
			get_swswitch_fast.apply(this, args);	
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
		} else if (command === 'GetSSwNames') { 
			get_ssw_names.apply(this, args);	
		} else if (command === 'GetSSwNotes') { 
			get_ssw_notes.apply(this, args);
		} else if (command === 'GetYanflySVNames') { 
			get_YanflySV_names.apply(this, args);	
		} else if (command === 'GetYanflySVNotes') { 
			get_YanflySV_notes.apply(this, args);	
		} else if (command === 'GetHimeSVNames') { 
			get_HimeSV_names.apply(this, args);	
		} else if (command === 'GetHimeSVNotes') { 
			get_HimeSV_notes.apply(this, args);	
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
	
	Game_Interpreter.prototype.recursion = function (name, source) {
		return recursion(name, source);
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
	
	Game_Interpreter.prototype.GetSSwNames = function () {
		return get_ssw_names.apply(this, arguments);
	};
	
	Game_Interpreter.prototype.GetSSwNotes = function () {
		return get_ssw_notes.apply(this, arguments);
	};
	
	Game_Interpreter.prototype.GetYanflySVNames = function () {
		return get_YanflySV_names.apply(this, arguments);
	};
	
	Game_Interpreter.prototype.GetYanflySVNotes = function () {
		return get_YanflySV_notes.apply(this, arguments);
	};
	
	Game_Interpreter.prototype.GetHimeSVNames = function () {
		return get_HimeSV_names.apply(this, arguments);
	};
	
	Game_Interpreter.prototype.GetHimeSVNotes = function () {
		return get_HimeSV_notes.apply(this, arguments);
	};
	
	Game_Interpreter.prototype.ssw = function () { 
		set_swswitch_fast.apply(this, arguments);
	};
	
	Game_Interpreter.prototype.SetSSw = function () { 
		set_self_switch.apply(this, arguments);
	};	
	
	Game_Interpreter.prototype.SetHimeSV = function () { 
		set_HimeSV.apply(this, arguments);
	};
	
	Game_Interpreter.prototype.SetYanflySV = function () { 
		set_YanflySV.apply(this, arguments);
	};
	
	Game_Interpreter.prototype.NameSetSSw = function () { 
		set_self_switch_name.apply(this, arguments);
	};
	
	Game_Interpreter.prototype.NoteSetSSw = function () { 
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
		var newarray = [];
		for (var k = arg.length - endpt; k >= 0; k--) {
			if (Array.isArray(arg[k])) {
				for (var j = 0; j < arg[k].length; j++) {
					newarray.push(arg[k][j]);
				}
			} else {
				newarray.push(arg[k]);
			}
		};
		return newarray;
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
			return c;
		} else {
			if (n > 0) {
				$gameVariables.setValue(n, 0);
			}
			if (a > 0) {
				$gameVariables.setValue(a, 0);
			}
			return c;
		};		
	};
	
	function array_to_integer() {
		var storeNew = autoPlgCmdFix.apply(this, arguments);
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
	
	function create_source_search(svstring) {
		if (Array.isArray(svstring)) {
			return svstring;
		} else if (/S\d+/.test(svstring)) {
			var regex = /(?:S)(\d+)/;
			var sourcevariable = Number(regex.exec(svstring)[1]); 
			if (sourcevariable == 0) {
				var sArray = [];
				for (var eId = 1; eId < $dataMap.events.length; eId++) {
					if ($dataMap.events[eId] != null) {
						sArray.push(eId);
					}
				}
				return sArray;
			} else {
				return $gameVariables.value(sourcevariable);
			}
		} else {
			return [svstring];
		}
	};
	
	function create_source_getset(svstring) {
		if (Array.isArray(svstring)) {
			return svstring;
		} else if (/S\d+/.test(svstring)) {
			var regex = /(?:S)(\d+)/;
			var sourcevariable = Number(regex.exec(svstring)[1]); 
			if (sourcevariable == 0) {
				var sArray = [];
				for (var eId = 1; eId < $dataMap.events.length; eId++) {
					if ($dataMap.events[eId] != null) {
						sArray.push(eId);
					}
				}
				return sArray;
			} else {
				return $gameVariables.value(sourcevariable);
			}
		} else {
			return svstring;
		}
	};
	
	function identify_switch(sw, mapId, counted, sAry, value, cond) {	
		for (var i = 0; i < sAry.length; i++) { 
			eventId = sAry[i]; 
			if ($gameSelfSwitches.value([mapId, eventId, sw]) == value && eval(cond)) {
				counted.push(eventId);	
			}
		}
		return counted;
	};
	
	function get_mapId(string) {
		if (string == "thisM") {
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
	// Fixes the strings from plugin command input to booleans, numbers, and arrays
	
	function autoPlgCmdFix() {
		var args = Array.prototype.slice.call(arguments);
		for (var i = args.length - 1; i >= 0; i--) {
			if ( args[i] === "true" || args[i] === "false" || /^\[.*\]$/.test(args[i]) || /^\d+$/.test(args[i]) ) {
				args[i] = JSON.parse(args[i]);
			}
		};
		return args;
	};
	
	/*
	('Tom'^*, 1, 2, 'S0'/array, 'cond'/bool, 'and'/'or')
	('Tom'^*, 1, 2, 'S0', 'and'/'or') X
	('Tom'^*, 1, 2, 'and'/'or') X
	('Tom'^*, 'and'/'or')

	('Tom'^*) X
	('Tom'^*, 1, 2, 'S0')
	('Tom'^*, 1, 2, 'cond'/bool)
	('Tom'^*, 1, 2, 'S0', 'cond'/bool)

	('Tom'^*, 1, 2)
	*/
	
	function autoSearchNFix() {
		var args = autoPlgCmdFix.apply(this, arguments); 
		if ( args[args.length - 1] === 'and' || args[args.length - 1] === 'or' ) {
			if ( typeof args[args.length - 2] == "number" ) {
				args.splice(args.length - 1, 0, 'S0', true);
			} else if ( /S\d+/.test(args[args.length - 2]) || Array.isArray(args[args.length - 2]) ) {
				args.splice(args.length - 1, 0, true);
			} else if ( !args.some( function( arg ) { return typeof arg === 'number' } ) ) {
				args.splice(args.length - 1, 0, 0, 0, 'S0', true);
			}
		} else if ( typeof args[args.length - 1] === "string" || ( Array.isArray(args[args.length - 1]) && typeof args[args.length - 1][0] === "string" ) || typeof args[args.length - 1] === "boolean" ) {
			if ( ( /S\d+/.test(args[args.length - 1]) || Array.isArray(args[args.length - 1]) ) && args.some( function( arg ) { return typeof arg === 'number' } ) ) { // ('Tom'*, 1, 2, 'S0')
				args.push(true);
				args.push('or');
			} else if ( typeof args[args.length - 2] == "number" ) { // ('Tom'*, 1, 2, 'cond')
				args.splice(args.length - 1, 0, "S0");
				args.push('or');
			} else if ( !args.some( function( arg ) { return typeof arg === 'number' } ) ) { // ('Tom'*)
				args.push(0);
				args.push(0);
				args.push("S0");
				args.push(true);
				args.push('or');
			} else {
				args.push('or');
			}				
		} else { // ('Tom'*, 1, 2)
			args.push("S0");
			args.push(true);
			args.push('or');
		};
		return args;
	};
	
	/*
	('A'^*, bool*, 'M3', 1, 2, 'S0'/array, 'cond'/bool) X
	('A'^*, bool*, 'M3', 1, 2, 'S0'/array) X
	('A'^*, bool*, 'M3', 1, 2) X
	('A'^*, bool*, 'M3') X
	('A'^*, bool*) X
	('A'^*) X
	
	('A'^*, bool*, 'M3', 1, 2, 'S0'/array, 'cond'/bool, 'and'/'or')	
	('A'^*, bool*, 'M3', 1, 2, 'and'/'or') X
	('A'^*, bool*, 1, 2, 'and'/'or') X
	('A'^*, bool*, 'and'/'or') X
	('A'^*, 'and'/'or') X
	*/
	
	function autoSearchSwitchFix() {
		var args = autoPlgCmdFix.apply(this, arguments);
		if ( args[args.length - 1] === 'and' || args[args.length - 1] === 'or' ) {
			if ( typeof args[args.length - 2] === "number" ) {
				if ( args[args.length - 4] === "thisM" || /M\d+/.test(args[args.length - 4]) ) {
					args.splice(args.length - 1, 0, 'S0', true);
				} else {
					args.splice(args.length - 3, 0, 'thisM');
					args.splice(args.length - 1, 0, 'S0', true);
				}
			} else if ( typeof args[args.length - 2] === 'boolean' || Array.isArray(args[args.length - 2]) ) {
				args.splice(args.length - 1, 0, 'thisM', 0, 0, 'S0', true);
			} else if ( !args.some( function( arg ) { return typeof arg === 'number'; } ) ) {
				args.splice(args.length - 1, 0, true, 'thisM', 0, 0, 'S0', true);
			}
		} else if ( /S\d+/.test(args[args.length - 1]) || Array.isArray(args[args.length - 1]) ) {
			args.splice(args.length, 0, true, 'or');
		} else if ( typeof args[args.length - 1] === "number" ) {
			args.splice(args.length, 0, 'S0', true, 'or');
		} else if ( args[args.length - 1] === "thisM" || /M\d+/.test(args[args.length - 1]) ) {
			args.splice(args.length, 0, 0, 0, 'S0', true, 'or');
		} else if ( !args.some( function( arg ) { return typeof arg === 'number'; } ) && typeof args[args.length - 1] === 'boolean' || Array.isArray(args[args.length - 1]) ) {
			args.splice(args.length, 0, 'thisM', 0, 0, 'S0', true, 'or');
		} else if ( args.some( function( arg ) { return typeof arg === 'number'; } ) ) {
			args.push('or');
		} else {
			args.splice(args.length, 0, true, 'thisM', 0, 0, 'S0', true, 'or');
		}
		return args;
	};
	
	/*
	('Tom'*, 'A'*, bool/string/obj*, 1, 2, 'S0', 'cond'/bool)
	('Tom'*, 'A'*, bool/string/obj*, 1, 2, 'S0')
	('Tom'*, 'A'*, bool/string/obj*, 1, 2, 'cond'/bool)
	('Tom'*, 'A'*, bool/string/obj*, 1, 2)
	('Tom'*, 'A'*, 1, 2)
	('Tom'*, 'A'*, bool/string/obj*)
	('Tom'*, 'A'*)
	*/
	
	function autoSearchSwNFix() {
		var args = autoPlgCmdFix.apply(this, arguments);
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
				args.splice(5, 0, "S0");
			}			
		}
		return args;
	};
	
	/*
	('A', 'thisE'/eidNum, 'thisM', 'cond'/bool)
	('A', 'thisE'/eidNum, 'thisM')
	('A', 'thisE'/eidNum)
	('A')
	*/
	
	function autoGetSSwFastFix() {
		var args = autoPlgCmdFix.apply(this, arguments);
		if (args.length == 1) {
			args.push(this._eventId);
			args.push("thisM");
			args.push(true);
		} else if (args.length == 2) {
			args.push("thisM");
			args.push(true);
		} else if (args.length == 3) {
			args.push(true);
		};
		return args;
	};
	
	/*
	('A'*, 1, 2, 'thisE'/eidNum*, 'thisM'*, 'cond'/bool)
	('A'*, 1, 2, 'thisE'/eidNum*, 'thisM'*)
	('A'*, 1, 2, 'thisE'/eidNum*)
	('A'*, 1, 2)
	('A'*)
	*/
	
	function autoGetSSwFix() {
		var args = autoPlgCmdFix.apply(this, arguments);
		if (args.length == 1) {
			args.push(0);
			args.push(0);
			args.push(this._eventId);
			args.push("thisM");
			args.push(true);
		} else if (args.length == 3) {
			args.push(this._eventId);
			args.push("thisM");
			args.push(true);
		} else if (args.length == 4) {
			args.push("thisM");
			args.push(true);
		} else if (args.length == 5) {
			args.push(true);
		}
		return args;
	};
	
	/*
	(1, 2, 'S0', 'cond')
	(1, 2, 'S0')
	(1, 2, 'cond')
	(1, 2)
	()
	*/
	
	function autoGetN() {
		var args = autoPlgCmdFix.apply(this, arguments);
		if (args.length == 0) {
			args.push(0);
			args.push(0);
			args.push("S0");
			args.push(true);
		} else if ( args.length == 2 ) {
			args.push("S0");
			args.push(true);
		} else if (args.length == 3) {
			if ( /S\d+/.test(args[2]) || typeof args[2] === 'number' ) {
				args.push(true);
			} else {
				args.splice(2, 0, "S0");
			}
		}
		return args;
	};
	
	/*
	('Tom'*, 'A'*, 1, 2, 'S0', 'cond')
	('Tom'*, 'A'*, 1, 2, 'S0')
	('Tom'*, 'A'*, 1, 2, cond')
	('Tom'*, 'A'*, 1, 2)
	('Tom'*, 'A'*)
	*/
	
	function autoGetSSVN() {
		args = autoPlgCmdFix.apply(this, arguments);
		if ( args.length === 2 ) {
			args.push(0);
			args.push(0);
			args.push('S0');
			args.push(true);
		} else if ( args.length === 4 ){
			args.push('S0');
			args.push(true);
		} else if ( args.length === 5 ) {
			if (/S\d+/.test(args[2])) {
				args.push(true);
			} else {
				args.splice(4, 0, "S0");
			}
		}
	}
		
	/*
	('A'*, bool/string/obj*, 'thisE'/eidNum*, 'thisM'/'M1'*, 'cond'/bool)
	('A'*, bool/string/obj*, 'thisE'/eidNum*, 'thisM'/'M1'*)
	('A'*, bool/string/obj*, 'thisE'/eidNum*)
	('A'*, bool/string/obj*)
	('A'*)
	*/
		
	function autoSetSSwFix() {
		var args = autoPlgCmdFix.apply(this, arguments);
		if (args.length == 1) {
			args.push(true);
			args.push(this._eventId);
			args.push("thisM");
			args.push(true);
		} else if (args.length == 2) {
			args.push(this._eventId);
			args.push("thisM");
			args.push(true);
		} else if (args.length == 3) {
			args.push("thisM");
			args.push(true);
		} else if (args.length == 4) {
			args.push(true);
		};
		args[3] = get_mapId(args[3]);
		if (args[2] == "thisE") {
			args[2] = this._eventId;
		};
		return args;
	};
	
	/*
	('Tom'*, 'A'*, bool/string/obj*, 'S0', 'cond'/bool)
	('Tom'*, 'A'*, bool/string/obj*, 'S0')
	('Tom'*, 'A'*, bool/string/obj*,'cond'/bool)
	('Tom'*, 'A'*, bool/string/obj*)
	('Tom'*, 'A'*)
	*/
	
	function autoSSwNFix() {
		var args = autoPlgCmdFix.apply(this, arguments);
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
		var args = Array.prototype.slice.call(arguments);
		if (args.length == 1) {
			args.push(0);
			args.push(0);
			args.push("S0");
		} else if (args.length == 3) {
			args.push("S0");
		}
		var condition = args[0];
		var sourcestring = args[3];
		var sourcearray = create_source_search(sourcestring);
		var countedId = args[2];
		var countedNum = args[1];
		var eventId = 0;
		var counted = sourcearray.filter( function(eventId) { return eval(condition); } );
		return counted_variables(counted, countedNum, countedId);
	};
 
	// ('Tom'^*, 1, 2, 'S0', 'cond'/bool, 'and'/'or')	
	function search_name() {
		var args = autoSearchNFix.apply(this, arguments);
		var namelist = input_array(args, 6);
		var counted = [];
		var condition = args[args.length - 2];
		var sourcestring = args[args.length - 3];
		var sourcearray = create_source_search(sourcestring); 
		var countedId = args[args.length - 4];
		var countedNum = args[args.length - 5];
		var eventId = 0;
		if ( args[args.length - 1] === 'or' ) {
			for ( var i = 0; i < namelist.length; i++ ) {
				counted = counted.concat(sourcearray.filter( function(eventId) { return $dataMap.events[eventId].name.includes(namelist[i]) && eval(condition); } ));
			}			
			return counted_variables(counted, countedNum, countedId);
		} else if ( args[args.length - 1] === 'and' ) {
			counted = sourcearray.filter( function(eventId) { return $dataMap.events[eventId].name.includes(namelist[namelist.length - 1]) && eval(condition); } );
			namelist.pop();
			if (namelist.length == 0) {
				return counted_variables(counted, countedNum, countedId);
			}
			return search_name(namelist, countedNum, countedId, counted, true, 'and');
		}				
	};
		
	function search_note() {
		var args = autoSearchNFix.apply(this, arguments);
		var notelist = input_array(args, 6);
		var counted = [];
		var condition = args[args.length - 2]; 
		var sourcestring = args[args.length - 3];
		var sourcearray = create_source_search(sourcestring);
		var countedId = args[args.length - 4];
		var countedNum = args[args.length - 5];
		var eventId = 0;
		if ( args[args.length - 1] === 'or' ) {
			for ( var i = 0; i < notelist.length; i++ ) {
				counted = counted.concat(sourcearray.filter( function(eventId) { return $dataMap.events[eventId].note && $dataMap.events[eventId].note.includes(notelist[i]) && eval(condition); } ));
			}
			return counted_variables(counted, countedNum, countedId);
		} else if ( args[args.length - 1] === 'and' ) {
			counted = sourcearray.filter( function(eventId) { return $dataMap.events[eventId].note && $dataMap.events[eventId].note.includes(notelist[notelist.length - 1]) && eval(condition); } );
			notelist.pop();
			if (notelist.length == 0) {
				return counted_variables(counted, countedNum, countedId);
			}
			return search_note(notelist, countedNum, countedId, counted, true, 'and');	
		}			
	};
				
	function search_switch() {
		var args = autoSearchSwitchFix.apply(this, arguments);
		var swnames = input_array(args, 7);
		var counted = [];
		var condition = args[args.length - 2]; 
		var sourcestring = args[args.length - 3]; 
		var sourcearray = create_source_search(sourcestring);
		var countedId = args[args.length - 4];
		var countedNum = args[args.length - 5];
		var mapPoint = args[args.length - 6];
		var mapId = get_mapId(mapPoint); 
		var value = args[args.length - 7];
		var eventId = 0;
		for (var k = 0; k < swnames.length; k++) {
			if (typeof swnames[k] == "number") {
				swnames[k] = 'SELF SWITCH ' + swnames[k];
			}
		}
		if ( args[args.length - 1] === 'or' ) {
			for (var j = 0; j < swnames.length; j++) {				
				if ( Array.isArray(value) ) {
					counted = counted.concat( sourcearray.filter( function(eventId) { return $gameSelfSwitches.value([mapId, eventId, swnames[j]]) == value[j] && eval(condition); } ) );
				} else {
					counted = counted.concat( sourcearray.filter( function(eventId) { return $gameSelfSwitches.value([mapId, eventId, swnames[j]]) == value && eval(condition); } ) );
				}
			}
			return counted_variables(counted, countedNum, countedId);
		} else if ( args[args.length - 1] === 'and' ) {
			if ( Array.isArray(value) ) {
				counted = sourcearray.filter( function(eventId) { return $gameSelfSwitches.value([mapId, eventId, swnames[swnames.length - 1]]) == value[value.length - 1] && eval(condition); } );
			} else {
				counted = sourcearray.filter( function(eventId) { return $gameSelfSwitches.value([mapId, eventId, swnames[swnames.length - 1]]) == value && eval(condition); } );
			}	
			swnames.pop();
			if ( Array.isArray(value) ) { value.pop(); }
			if (swnames.length == 0) {
				return counted_variables(counted, countedNum, countedId);
			}
			return search_switch(swnames, value, mapId, countedNum, countedId, counted, true, 'and');	
		}				
	};	
		
	function search_HimeSV() {
		var args = autoSearchSwitchFix.apply(this, arguments); 
		var variablelist = input_array(args, 7); 
		var counted = [];
		var condition = args[args.length - 2];
		var sourcestring = args[args.length - 3];
		var sourcearray = create_source_search(sourcestring);
		var countedId = args[args.length - 4];
		var countedNum = args[args.length - 5];
		var mapPoint = args[args.length - 6];
		var mapId = get_mapId(mapPoint);
		var value = args[args.length - 7];
		var eventId = 0;
		if ( args[args.length - 1] === 'or' ) {
			for (var i = 0; i < variablelist.length; i++) {
				if ( Array.isArray(value) ) {
					counted = counted.concat( sourcearray.filter( function(eventId) { return $gameSelfVariables.value(mapId, eventId, variablelist[i]) == value[i] && eval(condition); } ) );
				} else {
					counted = counted.concat( sourcearray.filter( function(eventId) { return $gameSelfVariables.value(mapId, eventId, variablelist[i]) == value && eval(condition); } ) );
				}
			}
			return counted_variables(counted, countedNum, countedId);
		} else if ( args[args.length - 1] === 'and' ) {
			if ( Array.isArray(value) ) {
				counted = sourcearray.filter( function(eventId) { return $gameSelfVariables.value(mapId, eventId, variablelist[variablelist.length - 1]) == value[value.length - 1] && eval(condition); } );
			} else {
				counted = sourcearray.filter( function(eventId) { return $gameSelfVariables.value(mapId, eventId, variablelist[variablelist.length - 1]) == value && eval(condition); } );
			}
			variablelist.pop();
			if ( Array.isArray(value) ) { value.pop(); }
			if ( variablelist.length == 0 ) {
				return counted_variables(counted, countedNum, countedId);
			} 
			return search_HimeSV(variablelist, value, mapId, countedNum, countedId, counted, true, 'and');	
		}		
	};
	
	function search_YanflySV() {
		var args = autoSearchSwitchFix.apply(this, arguments); 
		var svNames = input_array(args, 7); 
		var counted = [];
		var condition = args[args.length - 2];
		var sourcestring = args[args.length - 3];
		var sourcearray = create_source_search(sourcestring);
		var countedId = args[args.length - 4];
		var countedNum = args[args.length - 5];
		var mapPoint = args[args.length - 6];
		var mapId = get_mapId(mapPoint);
		var value = args[args.length - 7]; 
		var eventId = 0;
		if ( args[args.length - 1] === 'or' ) {
			for (var j = 0; j < svNames.length; j++) {
				if ( Array.isArray(value) ) {
					counted = counted.concat( sourcearray.filter( function(eventId) { return $gameSelfSwitches.value([mapId, eventId, 'SELF VARIABLE ' + svNames[j]]) == value[j] && eval(condition); } ) );
				} else {
					counted = counted.concat( sourcearray.filter( function(eventId) { return $gameSelfSwitches.value([mapId, eventId, 'SELF VARIABLE ' + svNames[j]]) == value && eval(condition); } ) );
				}
			}
			return counted_variables(counted, countedNum, countedId);
		} else if ( args[args.length - 1] === 'and' ) {
			if ( Array.isArray(value) ) {
				counted = sourcearray.filter( function(eventId) { return $gameSelfSwitches.value([mapId, eventId, 'SELF VARIABLE ' + svNames[svNames.length - 1]]) == value[value.length - 1] && eval(condition); } );
			} else {
				counted = sourcearray.filter( function(eventId) { return $gameSelfSwitches.value([mapId, eventId, 'SELF VARIABLE ' + svNames[svNames.length - 1]]) == value && eval(condition); } );
			}
			svNames.pop();
			if ( Array.isArray(value) ) { value.pop(); }
			if ( svNames.length == 0 ) {
				return counted_variables(counted, countedNum, countedId);
			} 
			return search_HimeSV(svNames, value, mapId, countedNum, countedId, counted, true, 'and');				
		}
	};

/* 
---------------------------------------------------------------------------------
    SEARCH IF NAME/NOTE X HAS SW/VAR Y OF Z VALUE
---------------------------------------------------------------------------------
*/
	// (eventName*, swName*, bool*, numberV, arrayV, source, condition)  ('A'^*, bool*, 'M3', 1, 2, 'S0'/array, 'cond'/bool)
	function search_switch_name() {
		var args = autoSearchSwNFix.apply(this, arguments);
		var eventId = search_name(args[0], 0, 0, args[5], true); 
		var counted =  search_switch(args[1], args[2], "thisM", args[3], args[4], eventId, args[6]);
		return counted;
	};
	
	function search_switch_note() {
		var args = autoSearchSwNFix.apply(this, arguments);
		var eventId = search_note(args[0], 0, 0, args[5], true);
		var counted =  search_switch(args[1], args[2], "thisM", args[3], args[4], eventId, args[6]);
		return counted;	
	};
	
	function search_HimeSV_name() {
		var args = autoSearchSwNFix.apply(this, arguments);
		var eventId = search_name(args[0], 0, 0, args[5], true);
		var counted =  search_HimeSV(args[1], args[2], "thisM", args[3], args[4], eventId, args[6]);
		return counted;	
	};
	
	function search_HimeSV_note() {
		var args = autoSearchSwNFix.apply(this, arguments);
		var eventId = search_note(args[0], 0, 0, args[5], true);
		var counted =  search_HimeSV(args[1], args[2], "thisM", args[3], args[4], eventId, args[6]);
		return counted;	
	};
	
	function search_YanflySV_name() {
		var args = autoSearchSwNFix.apply(this, arguments);
		var eventId = search_name(args[0], 0, 0, args[5], true); 
		var counted =  search_YanflySV(args[1], args[2], "thisM", args[3], args[4], eventId, args[6]);
		return counted;	
	};
	
	function search_YanflySV_note() {
		var args = autoSearchSwNFix.apply(this, arguments);
		var eventId = search_note(args[0], 0, 0, args[5], true);
		var counted =  search_YanflySV(args[1], args[2], "thisM", args[3], args[4], eventId, args[6]);
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
		if ( eval(cond) ) { 
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
		var sourcearray = create_source_getset(args[3]);
		var mapId = get_mapId(args[4]);
		var cond = args[5];	
		var result = [];
		if (Array.isArray(switchName)) {
			for (var i = 0; i < switchName.length; i++) {
				if (typeof switchName[i] == "number") {
					switchName[i] = 'SELF SWITCH ' + switchName[i];
				}
			}
		} else if ( typeof switchName == "number" ) {
			switchName = 'SELF SWITCH ' + switchName;
		}
		if ( Array.isArray(switchName) ) {
			for ( var i = 0; i < switchName.length; i++ ) {
				if ( Array.isArray(sourcearray) ) {
					eventId = sourcearray[i];
					if ( Array.isArray(mapId) && eval(cond) ) {
						result.push($gameSelfSwitches.value([mapId[i], eventId, switchName[i]]));
					} else if ( eval(cond) ) {
						result.push($gameSelfSwitches.value([mapId, eventId, switchName[i]]));
					}
				} else if ( Array.isArray(mapId) ) {
					eventId = sourcearray;
					if ( eval(cond) ) {
						result.push($gameSelfSwitches.value([mapId[i], eventId, switchName[i]]));
					}						
				} else {
					eventId = sourcearray;
					if ( eval(cond) ) {
						result.push($gameSelfSwitches.value([mapId, eventId, switchName[i]]));
					}
				}
			}				
		} else if ( Array.isArray(sourcearray) ) {
			for ( var i = 0; i < sourcearray.length; i++ ) {
				eventId = sourcearray[i];
				if ( Array.isArray(mapId) && eval(cond) ) {
					result.push($gameSelfSwitches.value([mapId[i], eventId, switchName]));
				} else if ( eval(cond) ) {
					result.push($gameSelfSwitches.value([mapId, eventId, switchName]));
				}
			}
		} else if ( Array.isArray(mapId) ) {
			for ( var i = 0; i < mapId.length; i++ ) {
				eventId = sourcearray;
				if ( eval(cond) ) {
					result.push($gameSelfSwitches.value([mapId[i], eventId, switchName]));
				}
			}
		} else {
			eventId = sourcearray;
			if ( eval(cond) ) {
				result.push($gameSelfSwitches.value([mapId, eventId, switchName]));
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
		var sourcearray = create_source_getset(args[3]);
		var mapId = get_mapId(args[4]);
		var cond = args[5];	
		var result = [];
		if (Array.isArray(switchName)) {
			for (var i = 0; i < switchName.length; i++) {
				if (typeof switchName[i] == "number") {
					switchName[i] = 'SELF VARIABLE ' + switchName[i];
				}
			}
		} else if ( typeof switchName == "number" ) {
			switchName = 'SELF VARIABLE ' + switchName;
		};
		if ( Array.isArray(switchName) ) {
			for ( var i = 0; i < switchName.length; i++ ) {
				if ( Array.isArray(sourcearray) ) {
					eventId = sourcearray[i];
					if ( Array.isArray(mapId) && eval(cond) ) {
						result.push($gameSelfSwitches.value([mapId[i], eventId, switchName[i]]));
					} else if ( eval(cond) ) {
						result.push($gameSelfSwitches.value([mapId, eventId, switchName[i]]));
					}
				} else if ( Array.isArray(mapId) ) {
					eventId = sourcearray;
					if ( eval(cond) ) {
						result.push($gameSelfSwitches.value([mapId[i], eventId, switchName[i]]));
					}						
				} else {
					eventId = sourcearray;
					if ( eval(cond) ) {
						result.push($gameSelfSwitches.value([mapId, eventId, switchName[i]]));
					}
				}
			}				
		} else if ( Array.isArray(sourcearray) ) {
			for ( var i = 0; i < sourcearray.length; i++ ) {
				eventId = sourcearray[i];
				if ( Array.isArray(mapId) && eval(cond) ) {
					result.push($gameSelfSwitches.value([mapId[i], eventId, switchName]));
				} else if ( eval(cond) ) {
					result.push($gameSelfSwitches.value([mapId, eventId, switchName]));
				}
			}
		} else if ( Array.isArray(mapId) ) {
			for ( var i = 0; i < mapId.length; i++ ) {
				eventId = sourcearray;
				if ( eval(cond) ) {
					result.push($gameSelfSwitches.value([mapId[i], eventId, switchName]));
				}
			}
		} else {
			eventId = sourcearray;
			if ( eval(cond) ) {
				result.push($gameSelfSwitches.value([mapId, eventId, switchName]));
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
		var source = create_source_getset(args[3]); 
		var mapId = get_mapId(args[4]);
		var cond = args[5];	
		var result = [];
		var eventId = 0;
		if ( Array.isArray(switchName) ) {
			if ( Array.isArray(source) ) {
				for ( var i = 0; i < switchName.length; i++ ) {
					eventId = source[i];
					if ( Array.isArray(mapId) && eval(cond) ) {
						result.push($gameSelfVariables.value(mapId[i], eventId, switchName[i]));
					} else if ( eval(cond) ) {
						result.push($gameSelfVariables.value(mapId, eventId, switchName[i]));
					}
				}			
			} else if ( Array.isArray(mapId) ) {
				eventId = source;
				if ( eval(cond) ) {
					for ( var i = 0; i < switchName.length; i++ ) {
						result.push($gameSelfVariables.value(mapId[i], eventId, switchName[i]));
					}
				}					
			} else {
				eventId = source;
				for ( var i = 0; i < switchName.length; i++ ) {
					if ( eval(cond) ) {
						result.push($gameSelfVariables.value(mapId, eventId, switchName[i]));
					}
				}
			}
		} else if ( Array.isArray(source) ) {
			for ( var i = 0; i < source.length; i++ ) {
				eventId = source[i];
				if ( Array.isArray(mapId) && eval(cond) ) {
					result.push($gameSelfVariables.value(mapId[i], eventId, switchName));
				} else if ( eval(cond) ) {
					result.push($gameSelfVariables.value(mapId, eventId, switchName)); 
				}
			}				
		} else if ( Array.isArray(mapId) ) {
			eventId = source;
			if ( eval(cond) ) {
				for ( var i = 0; i < mapId.length; i++ ) {
					result.push($gameSelfVariables.value(mapId[i], eventId, switchName));
				}
			}				
		} else {
			eventId = source;
			if ( eval(cond) ) {
				result.push($gameSelfVariables.value(mapId, eventId, switchName));
			}				
		} 
		counted_variables(result, countedNum, countedId);
		return result;
	};
		
	function get_names() {
		var args = autoGetN.apply(this, arguments);
		var countedId = args[1];
		var countedNum = args[0];
		var sourcearray = create_source_getset(args[2]);
		var cond = args[3];
		var namelist = [];
		if ( Array.isArray(sourcearray) ) {
			for (var i = 0; i < sourcearray.length; i++) {
				var eventId = sourcearray[i];
				if ( eval(cond) ) {
					namelist.push($dataMap.events[eventId].name);
				}
			};
		} else {
			var eventId = sourcearray;
			if ( eval(cond)) {
				namelist.push($dataMap.events[eventId].name);
			}
		}		
		counted_variables(namelist, countedNum, countedId);
		return namelist;
	};
	
	function get_notes() {
		var args = autoGetN.apply(this, arguments);
		var countedId = args[1];
		var countedNum = args[0];
		var sourcearray = create_source_getset(args[2]);
		var cond = args[3];
		var notelist = [];
		if (  Array.isArray(sourcearray) ) {
			for (var i = 0; i < sourcearray.length; i++) {
				var eventId = sourcearray[i];
				if ( $dataMap.events[eventId].note && eval(cond) ) {
					notelist.push($dataMap.events[eventId].note);
				}
			};
		} else {
			var eventId = sourcearray[i];
			if ( $dataMap.events[eventId].note && eval(cond) ) {
				notelist.push($dataMap.events[eventId].note);
			}
		}		
		counted_variables(notelist, countedNum, countedId);
		return notelist;
	};

/* 
---------------------------------------------------------------------------------
    GET SELF SWITCH/VARIABLES USING NAMES/NOTES
---------------------------------------------------------------------------------
*/
	
	function get_ssw_names() {
		var args = autoGetSSVN.apply(this, arguments);
		var eventId = search_name(args[0], 0, 0, args[4], true);
		var result = [];
		for ( var i = 0; i < eventId.length; i++ ) {
			result.push(get_swswitch(args[1], args[2], args[3], eventId[i], "thisM", args[5]));
		};
	};
	
	function get_ssw_notes() {
		var args = autoGetSSVN.apply(this, arguments);
		var eventId = search_note(args[0], 0, 0, args[4], true);
		var result = [];
		for ( var i = 0; i < eventId.length; i++ ) {
			result.push(get_swswitch(args[1], args[2], args[3], eventId[i], "thisM", args[5]));
		};
	};
	
	function get_YanflySV_names() {
		var args = autoGetSSVN.apply(this, arguments);
		var eventId = search_name(args[0], 0, 0, args[4], true);
		var result = [];
		for ( var i = 0; i < eventId.length; i++ ) {
			result.push(get_YanflySV(args[1], args[2], args[3], eventId[i], "thisM", args[5]));
		};
	};
	
	function get_YanflySV_notes() {
		var args = autoGetSSVN.apply(this, arguments);
		var eventId = search_note(args[0], 0, 0, args[4], true);
		var result = [];
		for ( var i = 0; i < eventId.length; i++ ) {
			result.push(get_YanflySV(args[1], args[2], args[3], eventId[i], "thisM", args[5]));
		};
	};
	
	function get_HimeSV_names() {
		var args = autoGetSSVN.apply(this, arguments);
		var eventId = search_name(args[0], 0, 0, args[4], true);
		var result = [];
		for ( var i = 0; i < eventId.length; i++ ) {
			result.push(get_HimeSV(args[1], args[2], args[3], eventId[i], "thisM", args[5]));
		};
	};
	
	function get_HimeSV_notes() {
		var args = autoGetSSVN.apply(this, arguments);
		var eventId = search_note(args[0], 0, 0, args[4], true);
		var result = [];
		for ( var i = 0; i < eventId.length; i++ ) {
			result.push(get_HimeSV(args[1], args[2], args[3], eventId[i], "thisM", args[5]));
		};
	};
	
/* 
---------------------------------------------------------------------------------
    MASS SET SWITCHES & VARIABLES
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
		var source = create_source_getset(args[2]);
		var mapPoint = args[3];
		var mapId = get_mapId(mapPoint);
		var cond = args[4];
		var SnIsArray = Array.isArray(switchName); 
		var valueIsArray = Array.isArray(value); 
		var eIdIsArray = Array.isArray(source); 
		var mIdIsArray = Array.isArray(mapId);
		var eventId = 0;
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
				if (valueIsArray) {
					if (eIdIsArray) {
						eventId = source[i];
						if (mIdIsArray && eval(cond)) {
							$gameSelfSwitches.setValue([mapId[i], eventId, switchName[i]], value[i]);
						} else if ( eval(cond) ) {
							$gameSelfSwitches.setValue([mapId, eventId, switchName[i]], value[i]);
						}
					} else if (mIdIsArray) {
						eventId = source;
						if ( eval(cond) ) {
							$gameSelfSwitches.setValue([mapId[i], eventId, switchName[i]], value[i]);
						} 
					} else {
						eventId = source;
						if ( eval(cond) ) {
							$gameSelfSwitches.setValue([mapId, eventId, switchName[i]], value[i]);
						}					
					}
				} else if (eIdIsArray) {
					eventId = source[i];
					if (mIdIsArray && eval(cond)) {
						$gameSelfSwitches.setValue([mapId[i], eventId, switchName[i]], value);
					} else if ( eval(cond) ) {
						$gameSelfSwitches.setValue([mapId, eventId, switchName[i]], value);
					}
				} else if (mIdIsArray) {
					eventId = source;
					if ( eval(cond) ) {
						$gameSelfSwitches.setValue([mapId[i], source, switchName[i]], value);
					}					
				} else {
					eventId = source;
					if ( eval(cond) ) {
						$gameSelfSwitches.setValue([mapId, source, switchName[i]], value);
					}				
				}
			}
		} else if (valueIsArray) {
			for (var i = 0; i < value.length; i++) {
				if (eIdIsArray) {
					eventId = source[i];
					if (mIdIsArray && eval(cond) ) {
						$gameSelfSwitches.setValue([mapId[i], eventId, switchName], value[i]);
					} else if ( eval(cond) ) {
						$gameSelfSwitches.setValue([mapId, eventId, switchName], value[i]);
					}
				} else if (mIdIsArray) {
					eventId = source;
					if ( eval(cond) ) {
						$gameSelfSwitches.setValue([mapId[i], eventId, switchName], value[i]);
					}					
				} else{
					eventId = source;
					if ( eval(cond) ) {
						$gameSelfSwitches.setValue([mapId, eventId, switchName], value[i]);
					}					
				}
			}
		} else if (eIdIsArray) {
			for (var i = 0; i < source.length; i++) {
				eventId = source[i]; 
				if (mIdIsArray && eval(cond)) {
					$gameSelfSwitches.setValue([mapId[i], eventId, switchName], value);
				} else if (eval(cond)) {
					$gameSelfSwitches.setValue([mapId, eventId, switchName], value);
				}
			}	
		} else if (mIdIsArray) {
			eventId = source;
			for (var i = 0; i < mapId.length; i++) {
				if (eval(cond)) {
					$gameSelfSwitches.setValue([mapId[i], eventId, switchName], value);
				}
			}	
		} else {
			eventId = source;
			if ( eval(cond) ) {
				$gameSelfSwitches.setValue([mapId, eventId, switchName], value);
			}			
		}		
	};
		
	function set_HimeSV(){
		var args = autoSetSSwFix.apply(this, arguments); 
		var switchName = args[0];
		var value = args[1];
		var source = create_source_getset(args[2]);
		var mapId = args[3];
		var cond = args[4];
		var SnIsArray = Array.isArray(switchName);
		var valueIsArray = Array.isArray(value);
		var eIdIsArray = Array.isArray(source);
		var mIdIsArray = Array.isArray(mapId); 
		var eventId = 0;
		if (SnIsArray) {
			for (var i = 0; i < switchName.length; i++) {
				if (valueIsArray) {
					if (eIdIsArray) {
						eventId = source[i];
						if (mIdIsArray && eval(cond)) {
							$gameSelfVariables.setValue(mapId[i], eventId, switchName[i], value[i]);
						} else if ( eval(cond) ) {
							$gameSelfVariables.setValue(mapId, eventId, switchName[i], value[i]);
						}
					} else if (mIdIsArray) {
						eventId = source;
						if ( eval(cond) ) {
							$gameSelfVariables.setValue(mapId[i], eventId, switchName[i], value[i]);
						} 
					} else {
						eventId = source;
						if ( eval(cond) ) { console.log([switchName[i], value[i]]);
							$gameSelfVariables.setValue(mapId, eventId, switchName[i], value[i]);
						}					
					}
				} else if (eIdIsArray) {
					eventId = source[i];
					if (mIdIsArray && eval(cond)) {
						$gameSelfVariables.setValue(mapId[i], eventId, switchName[i], value);
					} else if ( eval(cond) ) {
						$gameSelfVariables.setValue(mapId, eventId, switchName[i], value);
					}
				} else if (mIdIsArray) {
					eventId = source;
					if ( eval(cond) ) {
						$gameSelfVariables.setValue(mapId[i], source, switchName[i], value);
					}					
				} else {
					eventId = source;
					if ( eval(cond) ) {
						$gameSelfVariables.setValue(mapId, source, switchName[i], value);
					}				
				}
			}
		} else if (valueIsArray) {
			for (var i = 0; i < value.length; i++) {
				if (eIdIsArray) {
					eventId = source[i];
					if (mIdIsArray && eval(cond) ) {
						$gameSelfVariables.setValue(mapId[i], eventId, switchName, value[i]);
					} else if ( eval(cond) ) {
						$gameSelfVariables.setValue(mapId, eventId, switchName, value[i]);
					}
				} else if (mIdIsArray) {
					eventId = source;
					if ( eval(cond) ) {
						$gameSelfVariables.setValue(mapId[i], eventId, switchName, value[i]);
					}					
				} else{
					eventId = source;
					if ( eval(cond) ) {
						$gameSelfVariables.setValue(mapId, eventId, switchName, value[i]);
					}					
				}
			}
		} else if (eIdIsArray) {
			for (var i = 0; i < source.length; i++) {
				eventId = source[i]; 
				if (mIdIsArray && eval(cond)) {
					$gameSelfVariables.setValue(mapId[i], eventId, switchName, value);
				} else if (eval(cond)) {
					$gameSelfVariables.setValue(mapId, eventId, switchName, value);
				}
			}	
		} else if (mIdIsArray) {
			eventId = source;
			for (var i = 0; i < mapId.length; i++) {
				if (eval(cond)) {
					$gameSelfVariables.setValue(mapId[i], eventId, switchName, value);
				}
			}	
		} else {
			eventId = source;
			if ( eval(cond) ) {
				$gameSelfVariables.setValue(mapId, eventId, switchName, value);
			}			
		}		
	};
			
	function set_YanflySV(){
		var args = autoSetSSwFix.apply(this, arguments);
		var switchName = args[0];
		var value = args[1];
		var eventId = create_source_getset(args[2]);
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
				if (valueIsArray) {
					if (eIdIsArray) {
						eventId = source[i];
						if (mIdIsArray && eval(cond)) {
							$gameSelfSwitches.setValue([mapId[i], eventId, switchName[i]], value[i]);
						} else if ( eval(cond) ) {
							$gameSelfSwitches.setValue([mapId, eventId, switchName[i]], value[i]);
						}
					} else if (mIdIsArray) {
						eventId = source;
						if ( eval(cond) ) {
							$gameSelfSwitches.setValue([mapId[i], eventId, switchName[i]], value[i]);
						} 
					} else {
						eventId = source;
						if ( eval(cond) ) {
							$gameSelfSwitches.setValue([mapId, eventId, switchName[i]], value[i]);
						}					
					}
				} else if (eIdIsArray) {
					eventId = source[i];
					if (mIdIsArray && eval(cond)) {
						$gameSelfSwitches.setValue([mapId[i], eventId, switchName[i]], value);
					} else if ( eval(cond) ) {
						$gameSelfSwitches.setValue([mapId, eventId, switchName[i]], value);
					}
				} else if (mIdIsArray) {
					eventId = source;
					if ( eval(cond) ) {
						$gameSelfSwitches.setValue([mapId[i], source, switchName[i]], value);
					}					
				} else {
					eventId = source;
					if ( eval(cond) ) {
						$gameSelfSwitches.setValue([mapId, source, switchName[i]], value);
					}				
				}
			}
		} else if (valueIsArray) {
			for (var i = 0; i < value.length; i++) {
				if (eIdIsArray) {
					eventId = source[i];
					if (mIdIsArray && eval(cond) ) {
						$gameSelfSwitches.setValue([mapId[i], eventId, switchName], value[i]);
					} else if ( eval(cond) ) {
						$gameSelfSwitches.setValue([mapId, eventId, switchName], value[i]);
					}
				} else if (mIdIsArray) {
					eventId = source;
					if ( eval(cond) ) {
						$gameSelfSwitches.setValue([mapId[i], eventId, switchName], value[i]);
					}					
				} else{
					eventId = source;
					if ( eval(cond) ) {
						$gameSelfSwitches.setValue([mapId, eventId, switchName], value[i]);
					}					
				}
			}
		} else if (eIdIsArray) {
			for (var i = 0; i < source.length; i++) {
				eventId = source[i]; 
				if (mIdIsArray && eval(cond)) {
					$gameSelfSwitches.setValue([mapId[i], eventId, switchName], value);
				} else if (eval(cond)) {
					$gameSelfSwitches.setValue([mapId, eventId, switchName], value);
				}
			}	
		} else if (mIdIsArray) {
			eventId = source;
			for (var i = 0; i < mapId.length; i++) {
				if (eval(cond)) {
					$gameSelfSwitches.setValue([mapId[i], eventId, switchName], value);
				}
			}	
		} else {
			eventId = source;
			if ( eval(cond) ) {
				$gameSelfSwitches.setValue([mapId, eventId, switchName], value);
			}			
		}		
	};
	
/* 
---------------------------------------------------------------------------------
    MASS SET SWITCHES & VARIABLES BY NAME/NOTE
---------------------------------------------------------------------------------
*/
	
	function set_self_switch_name(){
		var args = autoSSwNFix.apply(this, arguments);
		var eventId = search_name(args[0], 0, 0, args[3], args[4], 'or');
		for ( var i = 0; i < eventId.length; i++ ) {
			set_self_switch(args[1], args[2], eventId[i], "thisM", true);
		};		
	};

	function set_self_switch_note(){
		var args = autoSSwNFix.apply(this, arguments);
		var args = autoSSwNFix.apply(this, arguments); 
		var eventId = search_note(args[0], 0, 0, args[3], args[4], 'or');
		for ( var i = 0; i < eventId.length; i++ ) {
			set_self_switch(args[1], args[2], eventId[i], "thisM", true);
		};	
	};
	
	function set_HimeSV_name(){
		var args = autoSSwNFix.apply(this, arguments);
		var eventId = search_name(args[0], 0, 0, args[3], args[4]);
		for ( var i = 0; i < eventId.length; i++ ) {
			set_HimeSV(args[1], args[2], eventId[i], "thisM", true);
		};
	};

	function set_HimeSV_note(){
		var args = autoSSwNFix.apply(this, arguments);
		var eventId = search_note(args[0], 0, 0, args[3], args[4]);
		for ( var i = 0; i < eventId.length; i++ ) {
			set_HimeSV(args[1], args[2], eventId[i], "thisM", true);
		};
	};
	
	function set_YanflySV_name(){
		var args = autoSSwNFix.apply(this, arguments);
		var eventId = search_name(args[0], 0, 0, args[3], args[4]);
		for ( var i = 0; i < eventId.length; i++ ) {
			set_YanflySV(args[1], args[2], eventId[i], "thisM", true);
		};
	};

	function set_YanflySV_note(){
		var args = autoSSwNFix.apply(this, arguments);
		var eventId = search_note(args[0], 0, 0, args[3], args[4]);
		for ( var i = 0; i < eventId.length; i++ ) {
			set_YanflySV(args[1], args[2], eventId[i], "thisM", true);
		};
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
	Search.Names = function(name, source, cond, andor) {
		if (typeof source === 'undefined') { source = "S0"; };
		if (typeof cond === 'undefined') { cond = true; };
		if (typeof andor === 'undefined') { andor = 'or'; };
		return $dataMap.events.some( function(eId) { return eId != null && eId.name.includes(name); } );
	};
	
	// Search if Note exists in Map from Source with Condition
	Search.Notes = function(note, source, cond, andor) {
		if (typeof source === 'undefined') { source = "S0"; };
		if (typeof cond === 'undefined') { cond = true; };
		if (typeof andor === 'undefined') { andor = 'or'; };
		return $dataMap.events.some( function(eId) { return eId != null && eId.note && eId.note.includes(note); } );
	};
	
	// Search if Self Switch X is ON/OFF/value in any Map from Source with Condition
	Search.SelfSw = function(swName, value, mapId, source, cond) {
		if (typeof value === 'undefined') { value = true; };
		if (typeof mapId === 'undefined') { mapId = "thisM"; };
		if (typeof source === 'undefined') { source = "S0"; };
		if (typeof cond === 'undefined') { cond = true; }; 
		if ($gameTemp.SearchSSw(swName, value, mapId, 0, 0, source, cond).length > 0) { return true; }
		return false;
	};
	
	// Search if Hime Self Variable X is Y in any Map from Source with Condition
	Search.HimeSV = function(swName, value, mapId, source, cond) {
		if (typeof mapId === 'undefined') { mapId = "thisM"; };
		if (typeof source === 'undefined') { source = "S0"; };
		if (typeof cond === 'undefined') { cond = true; };
		if ($gameTemp.SearchHimeSV(swName, value, mapId, 0, 0, source, cond).length > 0) { return true; }
		return false;
	};	
	
	// Search if Yanfly Self Variable X is Y in any Map from Source with Condition
	Search.YanflySV = function(swName, value, mapId, source, cond) {
		if (typeof mapId === 'undefined') { mapId = "thisM"; };
		if (typeof source === 'undefined') { source = "S0"; };
		if (typeof cond === 'undefined') { cond = true; };
		if ($gameTemp.SearchYanflySV(swName, value, mapId, 0, 0, source, cond).length > 0) { return true; }
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
	
	// Search if Event Name has Yanfly Self Variable X of value Y in Map from Source with Condition
	Search.YanflySVName = function(eName, swName, value, source, cond) {
		if (typeof source === 'undefined') { source = "S0"; };
		if (typeof cond === 'undefined') { cond = true; };
		if ($gameTemp.SearchYanflySVName(eName, swName, value, 0, 0, source, cond).length > 0) { return true; }
		return false;		
	};
	
	// Search if Event Note has Yanfly Self Variable X of value Y in Map from Source with Condition
	Search.YanflySVNote = function(eNote, swName, value, source, cond) { 
		if (typeof source === 'undefined') { source = "S0"; };
		if (typeof cond === 'undefined') { cond = true; };
		if ($gameTemp.SearchYanflySVNote(eNote, swName, value, 0, 0, source, cond).length > 0) { return true; }
		return false;		
	};
	
	// Search if Event Name has Hime Self Variable X of value Y in Map from Source with Condition
	Search.HimeSVName = function(eName, swName, value, source, cond) {
		if (typeof source === 'undefined') { source = "S0"; };
		if (typeof cond === 'undefined') { cond = true; };
		if ($gameTemp.SearchHimeSVName(eName, swName, value, 0, 0, source, cond).length > 0) { return true; }
		return false;		
	};
	
	// Search if Event Note has Hime Self Variable X of value Y in Map from Source with Condition
	Search.HimeSVNote = function(eNote, swName, value, source, cond) { 
		if (typeof source === 'undefined') { source = "S0"; };
		if (typeof cond === 'undefined') { cond = true; };
		if ($gameTemp.SearchHimeSVNote(eNote, swName, value, 0, 0, source, cond).length > 0) { return true; }
		return false;		
	};
