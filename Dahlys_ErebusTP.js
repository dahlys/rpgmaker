/*:
 * @plugindesc Erebus TP
 * @author Dahlys
 *
 * @param Low HP Fraction
 * @desc Fraction that signals low HP/MP
 * @default 0.1
 *
 * @param Comrade Unlock
 * @desc Value for actors to unlock Comrade
 * @default 1
 *
 * @param Comrade TP Mode
 * @desc TP Mode ID for Comrade
 * @default 2 
 *
 * @param Warrior Unlock
 * @desc Value for actors to unlock Warrior
 * @default 1
 *
 * @param Warrior TP Mode
 * @desc TP Mode ID for Warrior
 * @default 3
 *
 *
 * @param Healer Unlock
 * @desc Value for actors to unlock Healer
 * @default 1
 *
 * @param Healer TP Mode
 * @desc TP Mode ID for Healer
 * @default 4
 *
 * @param Breaker Unlock
 * @desc Value for actors to unlock Breaker
 * @default 1
 *
 * @param Breaker TP Mode
 * @desc TP Mode ID for Breaker
 * @default 5
 *
 * @param Booster Unlock
 * @desc Value for actors to unlock Booster
 * @default 1
 *
 * @param Booster TP Mode
 * @desc TP Mode ID for Booster
 * @default 6
 *
 * @param Slayer Unlock
 * @desc Value for actors to unlock Slayer
 * @default 1
 *
 * @param Slayer TP Mode
 * @desc TP Mode ID for Slayer
 * @default 7
 *
 * @param Avenger Unlock
 * @desc Value for actors to unlock Avenger
 * @default 1
 *
 * @param Avenger TP Mode
 * @desc TP Mode ID for Avenger
 * @default 8
 *
 * @param Victor Unlock
 * @desc Value for actors to unlock Victor
 * @default 1
 *
 * @param Victor TP Mode
 * @desc TP Mode ID for Victor
 * @default 9
 *
 * @param Coward Unlock
 * @desc Value for actors to unlock Coward
 * @default 1
 *
 * @param Coward TP Mode
 * @desc TP Mode ID for Coward
 * @default 10
 *
 * @param Daredevil Unlock
 * @desc Value for actors to unlock Daredevil
 * @default 1
 *
 * @param Daredevil TP Mode
 * @desc TP Mode ID for Daredevil
 * @default 11
 *
 * @param Caster Unlock
 * @desc Value for actors to unlock Caster
 * @default 1
 *
 * @param Caster TP Mode
 * @desc TP Mode ID for Caster
 * @default 12
 *
 * @param Tactician Unlock
 * @desc Value for actors to unlock Tactician
 * @default 1
 *
 * @param Tactician TP Mode
 * @desc TP Mode ID for Tactician
 * @default 13
 *
 * @param Victim Unlock
 * @desc Value for actors to unlock Victim
 * @default 1
 *
 * @param Victim TP Mode
 * @desc TP Mode ID for Victim
 * @default 14
 *
 * @param Dancer Unlock
 * @desc Value for actors to unlock Dancer
 * @default 1
 *
 * @param Dancer TP Mode
 * @desc TP Mode ID for Dancer
 * @default 15
 *
 * @param Loner Unlock
 * @desc Value for actors to unlock Loner
 * @default 1
 *
 * @param Loner TP Mode
 * @desc TP Mode ID for Loner
 * @default 16
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
	var lowHpFrac = Number(parameters['Low HP Fraction']) || 0.1;
	var warriorUnlock = Number(parameters['Warrior Unlock']) || 1;
	var warriorTpModeNum = Number(parameters['Warrior TP Mode']) || 3;
	var comradeUnlock = Number(parameters['Comrade Unlock']) || 1;
	var comradeTpModeNum = Number(parameters['Comrade TP Mode']) || 2;
	var healerUnlock = Number(parameters['Healer Unlock']) || 1;
	var healerTpModeNum = Number(parameters['Healer TP Mode']) || 4;
	var breakerUnlock = Number(parameters['Breaker Unlock']) || 1;
	var breakerTpModeNum = Number(parameters['Breaker TP Mode']) || 5;
	var boosterUnlock = Number(parameters['Booster Unlock']) || 1;
	var boosterTpModeNum = Number(parameters['Booster TP Mode']) || 6;
	var slayerUnlock = Number(parameters['Slayer Unlock']) || 1;
	var slayerTpModeNum = Number(parameters['Slayer TP Mode']) || 7;
	var avengerUnlock = Number(parameters['Avenger Unlock']) || 1;
	var avengerTpModeNum = Number(parameters['Avenger TP Mode']) || 8;
	var victorUnlock = Number(parameters['Victor Unlock']) || 1;
	var victorTpModeNum = Number(parameters['Victor TP Mode']) || 9;
	var cowardUnlock = Number(parameters['Coward Unlock']) || 1;
	var cowardTpModeNum = Number(parameters['Coward TP Mode']) || 10;
	var daredevilUnlock = Number(parameters['Daredevil Unlock']) || 1;
	var daredevilTpModeNum = Number(parameters['Daredevil TP Mode']) || 11;
	var casterUnlock = Number(parameters['Caster Unlock']) || 1;
	var casterTpModeNum = Number(parameters['Caster TP Mode']) || 12;
	var tacticianUnlock = Number(parameters['Tactician Unlock']) || 1;
	var tacticianTpModeNum = Number(parameters['Tactician TP Mode']) || 13;
	var victimUnlock = Number(parameters['Victim Unlock']) || 1;
	var victimTpModeNum = Number(parameters['Victim TP Mode']) || 14;
	var dancerUnlock = Number(parameters['Dancer Unlock']) || 1;
	var dancerTpModeNum = Number(parameters['Dancer TP Mode']) || 15;
	var lonerUnlock = Number(parameters['Loner Unlock']) || 1;
	var lonerTpModeNum = Number(parameters['Loner TP Mode']) || 16;
	
/* 
----------------------------------------------------------------------------------
		UNLOCK TP MODES AUTOMATICALLY
----------------------------------------------------------------------------------
*/
	
	var _Scene_Map_update = Scene_Map.prototype.update;
	Scene_Map.prototype.update = function() {
		_Scene_Map_update.call(this);
		unlockTpModes_Erebus();
	};
	
	function unlockTpModes_Erebus() {
		for (var i = 1; i < $gameActors._data.length; i++) {
			if ($gameActors.actor(i).warriorErebus() >= warriorUnlock) $gameActors.actor(i).unlockTpMode(warriorTpModeNum);
			if ($gameActors.actor(i).comradeErebus() >= comradeUnlock) $gameActors.actor(i).unlockTpMode(comradeTpModeNum);
			if ($gameActors.actor(i).healerErebus() >= healerUnlock) $gameActors.actor(i).unlockTpMode(healerTpModeNum);
			if ($gameActors.actor(i).breakerErebus() >= breakerUnlock) $gameActors.actor(i).unlockTpMode(breakerTpModeNum);
			if ($gameActors.actor(i).boosterErebus() >= boosterUnlock) $gameActors.actor(i).unlockTpMode(boosterTpModeNum);
			if ($gameActors.actor(i).slayerErebus() >= slayerUnlock) $gameActors.actor(i).unlockTpMode(slayerTpModeNum);
			if ($gameActors.actor(i).avengerErebus() >= avengerUnlock) $gameActors.actor(i).unlockTpMode(avengerTpModeNum);
			if ($gameActors.actor(i).victorErebus() >= victorUnlock) $gameActors.actor(i).unlockTpMode(victorTpModeNum);
			if ($gameActors.actor(i).cowardErebus() >= cowardUnlock) $gameActors.actor(i).unlockTpMode(cowardTpModeNum);
			if ($gameActors.actor(i).daredevilErebus() >= daredevilUnlock) $gameActors.actor(i).unlockTpMode(daredevilTpModeNum);
			if ($gameActors.actor(i).casterErebus() >= casterUnlock) $gameActors.actor(i).unlockTpMode(casterTpModeNum);
			if ($gameActors.actor(i).tacticianErebus() >= tacticianUnlock) $gameActors.actor(i).unlockTpMode(tacticianTpModeNum);
			if ($gameActors.actor(i).victimErebus() >= victimUnlock) $gameActors.actor(i).unlockTpMode(victimTpModeNum);
			if ($gameActors.actor(i).dancerErebus() >= dancerUnlock) $gameActors.actor(i).unlockTpMode(dancerTpModeNum);
			if ($gameActors.actor(i).lonerErebus() >= lonerUnlock) $gameActors.actor(i).unlockTpMode(lonerTpModeNum);
		}
	};

/* 
----------------------------------------------------------------------------------
		SETUP EREBUS TP VARIABLES
----------------------------------------------------------------------------------
*/
	
	var _Game_Actor_setup = Game_Actor.prototype.setup;
	Game_Actor.prototype.setup = function(actorId) {
		_Game_Actor_setup.call(this, actorId);
		this.initErebusTpVariables();
	};
	
	Game_Actor.prototype.initErebusTpVariables = function() {
		this._warriorErebus = 0;
		this._comradeErebus = 0;
		this._healerErebus = 0;
		this._breakerErebus = 0;
		this._boosterErebus = 0;
		this._slayerErebus = 0;
		this._avengerErebus = 0;
		this._victorErebus = 0;
		this._cowardErebus = 0;
		this._daredevilErebus = 0;
		this._casterErebus = 0;
		this._tacticianErebus = 0;
		this._victimErebus = 0;
		this._dancerErebus = 0;
		this._lonerErebus = 0;
	};
	
	Game_Actor.prototype.warriorErebus = function() {
		if (this._warriorErebus === undefined) this.initErebusTpVariables();
			return this._warriorErebus;
	};
	
	Game_Actor.prototype.comradeErebus = function() {
		if (this._comradeErebus === undefined) this.initErebusTpVariables();
			return this._comradeErebus;
	};
	
	Game_Actor.prototype.healerErebus = function() {
		if (this._healerErebus === undefined) this.initErebusTpVariables();
			return this._healerErebus;
	};
	
	Game_Actor.prototype.breakerErebus = function() {
		if (this._breakerErebus === undefined) this.initErebusTpVariables();
			return this._breakerErebus;
	};
	
	Game_Actor.prototype.boosterErebus = function() {
		if (this._boosterErebus === undefined) this.initErebusTpVariables();
			return this._boosterErebus;
	};
	
	Game_Actor.prototype.slayerErebus = function() {
		if (this._slayerErebus === undefined) this.initErebusTpVariables();
			return this._slayerErebus;
	};
	
	Game_Actor.prototype.avengerErebus = function() {
		if (this._avengerErebus === undefined) this.initErebusTpVariables();
			return this._avengerErebus;
	};
	
	Game_Actor.prototype.victorErebus = function() {
		if (this._victorErebus === undefined) this.initErebusTpVariables();
			return this._victorErebus;
	};
	
	Game_Actor.prototype.cowardErebus = function() {
		if (this._cowardErebus === undefined) this.initErebusTpVariables();
			return this._cowardErebus;
	};
	
	Game_Actor.prototype.daredevilErebus = function() {
		if (this._daredevilErebus === undefined) this.initErebusTpVariables();
			return this._daredevilErebus;
	};
	
	Game_Actor.prototype.casterErebus = function() {
		if (this._casterErebus === undefined) this.initErebusTpVariables();
			return this._casterErebus;
	};
	
	Game_Actor.prototype.tacticianErebus = function() {
		if (this._tacticianErebus === undefined) this.initErebusTpVariables();
			return this._tacticianErebus;
	};
	
	Game_Actor.prototype.victimErebus = function() {
		if (this._victimErebus === undefined) this.initErebusTpVariables();
			return this._victimErebus;
	};
	
	Game_Actor.prototype.dancerErebus = function() {
		if (this._dancerErebus === undefined) this.initErebusTpVariables();
			return this._dancerErebus;
	};
	
	Game_Actor.prototype.lonerErebus = function() {
		if (this._lonerErebus === undefined) this.initErebusTpVariables();
			return this._lonerErebus;
	};
	
		
/* 
----------------------------------------------------------------------------------
		AUTORUN
----------------------------------------------------------------------------------
*/	
	var _BattleManager_endTurn = BattleManager.endTurn;
	BattleManager.endTurn = function() {
		_BattleManager_endTurn.call(this);
		//Daredevil - ends turn with < 10% hp
		for (var i = 0; i < $gameParty.battleMembers().length; i++) {
			if ($gameParty.battleMembers()[i].isAlive() && $gameParty.battleMembers()[i].hp/$gameParty.battleMembers()[i].mhp < lowHpFrac) {
				$gameParty.battleMembers()[i]._daredevilErebus += 1;
			}
		}
		//Caster - ends turn with < 10% mp
		for (var i = 0; i < $gameParty.battleMembers().length; i++) {
			if ($gameParty.battleMembers()[i].isAlive() && $gameParty.battleMembers()[i].mp/$gameParty.battleMembers()[i].mmp < lowHpFrac) {
				$gameParty.battleMembers()[i]._casterErebus += 1;
			}
		}
		//Victim - ends turn with status
		for (var i = 0; i < $gameParty.battleMembers().length; i++) {
			if ($gameParty.battleMembers()[i].isAlive() && $gameParty.battleMembers()[i].states().length > 0) {
				$gameParty.battleMembers()[i]._victimErebus += 1;
			}
		}
	};
	
	var _Game_Action_executeHpDamage = Game_Action.prototype.executeHpDamage;
	Game_Action.prototype.executeHpDamage = function(target, value) { 
		_Game_Action_executeHpDamage.call(this, target, value);
		var dmg = target.result().hpDamage;
		if (this.subject().isActor()) {
			//Warrior - actor dealt damage
			if (dmg > 0) {
				this.subject()._warriorErebus += dmg;
			}
			//Healer - actor did healing
			if (dmg < 0) {
				this.subject()._healerErebus -= dmg;
			}
			//Slayer - actor killed target
			if (target.hp <= 0) {
				this.subject()._slayerErebus += 1;
			}
		}
		if (target.isActor()) {
			//Comrade - ally took damage
			if (dmg > 0) {
				for (var i = 0; i < $gameParty.battleMembers().length; i++) {
					if (target != $gameParty.battleMembers()[i] && $gameParty.battleMembers()[i].isAlive()) {
						$gameParty.battleMembers()[i]._comradeErebus += dmg;
					}
				}
			}
			//Avenger - ally was killed
			if (target.hp <= 0) {
				for (var i = 0; i < $gameParty.battleMembers().length; i++) {
					if (target != $gameParty.battleMembers()[i] && $gameParty.battleMembers()[i].isAlive()) {
						$gameParty.battleMembers()[i]._avengerErebus += 1;
					}
				}
			}
		}
	};	
		
	var _Game_Action_executeMpDamage = Game_Action.prototype.executeMpDamage;
	Game_Action.prototype.executeMpDamage = function(target, value) {
		_Game_Action_executeMpDamage.call(this, target, value);
		var mpdmg = target.result().mpDamage;
		if (this.subject().isActor()) {	
			//Breaker - actor dealt mp damage
			if (mpdmg > 0) {
				this.subject()._breakerErebus += mpdmg;
			}
			//Booster - actor gave mp recovery
			if (mpdmg < 0) {
				this.subject()._boosterErebus -= mpdmg;
			}
		}
	};
		
	var _BattleManager_endBattle = BattleManager.endBattle;
	BattleManager.endBattle = function(result) {
		_BattleManager_endBattle.call(this, result);
		if (result === 0) { //won battle
			//Victor - Survived and won a battle
			for (var i = 0; i < $gameParty.aliveMembers().length; i++) {
				$gameParty.aliveMembers()[i]._victorErebus += 1;
			}
			//Loner - One survivor
			if ($gameParty.aliveMembers().length === 1) {
				$gameParty.aliveMembers()[0]._lonerErebus += 1;
			}
		} else if (this._escaped) {
			//Coward - Survivors ran away
			for (var i = 0; i < $gameParty.aliveMembers().length; i++) {
				$gameParty.aliveMembers()[i]._cowardErebus += 1;
			}
		}
	};
	
	var _Game_Action_apply = Game_Action.prototype.apply;
	Game_Action.prototype.apply = function(target) {
		_Game_Action_apply.call(this, target);
		//Dancer - evaded an attack
		if (target.result().evaded) {
			this.subject()._dancerErebus += 1;
		}
	};
	
	var _Game_Action_itemEffectAddNormalState = Game_Action.prototype.itemEffectAddNormalState;
	Game_Action.prototype.itemEffectAddNormalState = function(target, effect) {
		_Game_Action_itemEffectAddNormalState.call(this, target, effect); console.log(target);
		//Tactician - inflicted a status condition
		if (target.result().success) {
			this.subject()._tacticianErebus += 1;
		}
	};
	
})();
