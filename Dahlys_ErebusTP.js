/*:
 * @plugindesc Erebus TP
 * @author Dahlys
 *
 * @param TP Unlock Message
 * @desc Message that displays upon TP mode unlock
 * %1 = TP Mode Name, %2  = Actor Name
 * @default TP Mode: %1 has been unlocked for %2
 *
 * @param Low HP Fraction
 * @desc Fraction that signals low HP/MP
 * @default 0.1
 *
 * @param States Included
 * @desc State IDs of bad status afflictions
 * @default 4,5,6,7,8,9,10
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
	var tpUnlockMessage = String(parameters['TP Unlock Message']) || 'TP Mode: %1 has been unlocked for %2';
	var lowHpFrac = Number(parameters['Low HP Fraction']) || 0.1;
	var statesIncluded = String(parameters['States Included']) || '4,5,6,7,8,9,10';
	statesIncluded = statesIncluded.split(',');
	for (var i = 0; i < statesIncluded.length; i++) {
		statesIncluded[i] = parseInt(statesIncluded[i]);
	}
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
		UNLOCK TP MODES AT THE END OF BATTLE
----------------------------------------------------------------------------------
*/
	function isUnlocked_Erebus(i, tpModeNum, unlockVal, varErebus) {
		return !$gameActors.actor(i).unlockedErebus().some(function(tpid) {return tpid === tpModeNum;}) && varErebus >= unlockVal
	};
	
	function unlockTpMode_Erebus(i, str, tpModeNum) {
		$gameActors.actor(i).unlockTpMode(tpModeNum);
		$gameActors.actor(i)._unlockedErebus.push(tpModeNum);
		$gameMessage.add(tpUnlockMessage.replace('%1', str).replace('%2', $gameActors.actor(i).name()));
	};
	
	function unlockTpModes_Erebus() {
		for (var i = 1; i < $gameActors._data.length; i++) {
			if (isUnlocked_Erebus(i, warriorTpModeNum, warriorUnlock, $gameActors.actor(i).warriorErebus())) unlockTpMode_Erebus(i, 'Warrior', warriorTpModeNum);
			if (isUnlocked_Erebus(i, comradeTpModeNum, comradeUnlock, $gameActors.actor(i).comradeErebus())) unlockTpMode_Erebus(i, 'Comrade', comradeTpModeNum);
			if (isUnlocked_Erebus(i, healerTpModeNum, healerUnlock, $gameActors.actor(i).healerErebus())) unlockTpMode_Erebus(i, 'Healer', healerTpModeNum);			
			if (isUnlocked_Erebus(i, breakerTpModeNum, breakerUnlock, $gameActors.actor(i).breakerErebus())) unlockTpMode_Erebus(i, 'Breaker', breakerTpModeNum);
			if (isUnlocked_Erebus(i, boosterTpModeNum, boosterUnlock, $gameActors.actor(i).boosterErebus())) unlockTpMode_Erebus(i, 'Booster', boosterTpModeNum);
			if (isUnlocked_Erebus(i, slayerTpModeNum, slayerUnlock, $gameActors.actor(i).slayerErebus())) unlockTpMode_Erebus(i, 'Slayer', slayerTpModeNum);
			if (isUnlocked_Erebus(i, avengerTpModeNum, avengerUnlock, $gameActors.actor(i).avengerErebus())) unlockTpMode_Erebus(i, 'Avenger', avengerTpModeNum);
			if (isUnlocked_Erebus(i, victorTpModeNum, victorUnlock, $gameActors.actor(i).victorErebus())) unlockTpMode_Erebus(i, 'Victor', victorTpModeNum);
			if (isUnlocked_Erebus(i, cowardTpModeNum, cowardUnlock, $gameActors.actor(i).cowardErebus())) unlockTpMode_Erebus(i, 'Coward', cowardTpModeNum);
			if (isUnlocked_Erebus(i, daredevilTpModeNum, daredevilUnlock, $gameActors.actor(i).daredevilErebus())) unlockTpMode_Erebus(i, 'Daredevil', daredevilTpModeNum);
			if (isUnlocked_Erebus(i, casterTpModeNum, casterUnlock, $gameActors.actor(i).casterErebus())) unlockTpMode_Erebus(i, 'Caster', casterTpModeNum);
			if (isUnlocked_Erebus(i, tacticianTpModeNum, tacticianUnlock, $gameActors.actor(i).tacticianErebus())) unlockTpMode_Erebus(i, 'Tactician', tacticianTpModeNum);
			if (isUnlocked_Erebus(i, victimTpModeNum, victimUnlock, $gameActors.actor(i).victimErebus())) unlockTpMode_Erebus(i, 'Victim', victimTpModeNum);
			if (isUnlocked_Erebus(i, dancerTpModeNum, dancerUnlock, $gameActors.actor(i).dancerErebus())) unlockTpMode_Erebus(i, 'Dancer', dancerTpModeNum);
			if (isUnlocked_Erebus(i, lonerTpModeNum, lonerUnlock, $gameActors.actor(i).lonerErebus())) unlockTpMode_Erebus(i, 'Loner', lonerTpModeNum);
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
		this._unlockedErebus = [0];
	};
	
	Game_Actor.prototype.unlockedErebus = function() {
		if (this._unlockedErebus === undefined) this.initErebusTpVariables();
			return this._unlockedErebus;
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
		INCREASE EREBUS TP VARIABLES
----------------------------------------------------------------------------------
*/	
	var _BattleManager_endTurn = BattleManager.endTurn;
	BattleManager.endTurn = function() {
		_BattleManager_endTurn.call(this);
		//Daredevil - ends turn with < 10% hp
		for (var i = 0; i < $gameParty.aliveMembers().length; i++) {
			if ($gameParty.aliveMembers()[i].hp/$gameParty.aliveMembers()[i].mhp < lowHpFrac) {
				$gameParty.aliveMembers()[i]._daredevilErebus += 1;
			}
		}
		//Caster - ends turn with < 10% mp
		for (var i = 0; i < $gameParty.aliveMembers().length; i++) {
			if ($gameParty.aliveMembers()[i].mp/$gameParty.aliveMembers()[i].mmp < lowHpFrac) {
				$gameParty.aliveMembers()[i]._casterErebus += 1;
			}
		}
		//Victim - ends turn with status
		for (var i = 0; i < $gameParty.aliveMembers().length; i++) {
			if ($gameParty.aliveMembers()[i].states().some(function(state) {return statesIncluded.indexOf(state.id) > -1;})) {
				$gameParty.aliveMembers()[i]._victimErebus += 1;
			}			
		}
	};
	
	var _Game_Action_executeHpDamage = Game_Action.prototype.executeHpDamage;
	Game_Action.prototype.executeHpDamage = function(target, value) { 
		_Game_Action_executeHpDamage.call(this, target, value);
		var dmg = target.result().hpDamage;
		if ($gameParty.inBattle()) {
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
					for (var i = 0; i < $gameParty.aliveMembers().length; i++) {
						if (target != $gameParty.aliveMembers()[i]) {
							$gameParty.aliveMembers()[i]._comradeErebus += dmg;
						}
					}
				}
				//Avenger - ally was killed
				if (target.hp <= 0) {
					for (var i = 0; i < $gameParty.aliveMembers().length; i++) {
						if (target != $gameParty.aliveMembers()[i]) {
							$gameParty.aliveMembers()[i]._avengerErebus += 1;
						}
					}
				}
			}
		}
	};	
		
	var _Game_Action_executeMpDamage = Game_Action.prototype.executeMpDamage;
	Game_Action.prototype.executeMpDamage = function(target, value) {
		_Game_Action_executeMpDamage.call(this, target, value);
		var mpdmg = target.result().mpDamage;
		if ($gameParty.inBattle() && this.subject().isActor()) {	
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
		unlockTpModes_Erebus();
	};
	
	var _Game_Action_apply = Game_Action.prototype.apply;
	Game_Action.prototype.apply = function(target) {
		_Game_Action_apply.call(this, target);
		//Dancer - evaded an attack
		if ($gameParty.inBattle() && target.result().evaded) {
			this.subject()._dancerErebus += 1;
		}
	};
	
	var _Game_Action_itemEffectAddState = Game_Action.prototype.itemEffectAddState;
	Game_Action.prototype.itemEffectAddState = function(target, effect) {
		_Game_Action_itemEffectAddState.call(this, target, effect);
		//Tactician - inflicted a status condition
		if ($gameParty.inBattle() && target.result().success && statesIncluded.some(function(s) {return s === effect.dataId})) {
			this.subject()._tacticianErebus += 1;
		}
	};
	
})();
