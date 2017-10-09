/*:
 * @plugindesc Erebus TP
 * @author Dahlys
 *
 * @param Daredevil Variables
 * @desc Variable for actors to unlock Daredevil
 * @default 1,2,3
 *
 * @param Caster Variables
 * @desc Variable for actors to unlock Caster
 * @default 4,5,6
 *
 *
 */

(function() { 

/* 
----------------------------------------------------------------------------------
		PLUGIN PARAMETERS
----------------------------------------------------------------------------------
*/	
	
	var parameters = PluginManager.parameters('Dahlys_ErebusTP');
	var daredevilVariables = String(parameters['Daredevil Variables']) || '1,2,3';
	var daredevilVariables = daredevilVariables.split(',');
	var casterVariables = String(parameters['Caster Variables']) || '4,5,6';
	var casterVariables = casterVariables.split(',');
	
/* 
----------------------------------------------------------------------------------
		PLUGIN COMMANDS
----------------------------------------------------------------------------------
*/	
	
	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;			
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_Game_Interpreter_pluginCommand.call(this, command, args);
		if (command === 'erebusOnTurnEnd') {
			erebus_onTurnEnd();
		}
	};
	

/* 
----------------------------------------------------------------------------------
		AUTORUN IN PARALLEL
----------------------------------------------------------------------------------
*/	
	var _Game_Troop_increaseTurn = Game_Troop.prototype.increaseTurn;
	Game_Troop.prototype.increaseTurn = function() {
		_Game_Troop_increaseTurn.call(this);
		erebus_onTurnEnd();
	};

/* 
----------------------------------------------------------------------------------
		ON TURN END
----------------------------------------------------------------------------------
*/
	
	function erebus_onTurnEnd() {
		//Daredevil - ends turn with < 10% hp
		for (i = 0; i < $gameActors.length; i++) {
			if ($gameActors.actor(i).isBattleMember() && $gameActors.actor(i).hp/$gameActors.actor(i).mhp < 0.1) {
				$gameVariables.setValue(daredevilVariables[i], $gameVariables.value(daredevilVariables[i]) + 1);
			}
		}
		//Caster - ends turn with < 10% mp
		for (i = 0; i < $gameActors.length; i++) {
			if ($gameActors.actor(i).isBattleMember() && $gameActors.actor(i).mp/$gameActors.actor(i).mmp < 0.1) {
				$gameVariables.setValue(casterVariables[i], $gameVariables.value(casterVariables[i]) + 1);
			}
		}
	};	
	
})();

































