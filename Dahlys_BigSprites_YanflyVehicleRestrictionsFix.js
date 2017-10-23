if (Imported.YEP_X_VehicleRestrict && Dahlys.sideUnload) {
	var _Game_CharacterBase_getRegionId = Game_CharacterBase.prototype.getRegionId;
	Game_CharacterBase.prototype.getRegionId = function(x, y, d) {
		if ($gamePlayer.isInVehicle() && $gamePlayer._bigSprite.type) {
			return $gameMap.regionId(x, y);
		} else {
			return  _Game_CharacterBase_getRegionId.call(this, x, y, d);
		}
	};
};