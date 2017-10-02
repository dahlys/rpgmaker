/*:
 * @plugindesc Extra Stuff to Check After Selecting Item/Weapon/Armor
 * @author Dahlys
 *
 * @help
 * ==============================================================================
 * Select Item Plus
 * ============================================================================== 
 * 
 * Used the Select Item command and don't know what else to do but check it's id?
 * Do more with that itemId stored in a variable!
 * Check if: 
 *  - It's name includes Herb, i.e. Power Herb
 *  - It's a regular, key, hidden A or hidden B item
 *  - It's consumable
 *  - If it has an element
 *  - If it's worth more/less/equal to a certain price
 *  - If it belongs to a certain category --> note: <menu category: food>
 *
 * Select Items not enough? Used some plugin to dump a weapon/armor id into a
 * variable instead? Here we go...
 * Check if:
 *  - The weapon type is e.g. Sword
 *  - The weapon is worth more/less/equal to a certain price
 *  - The weapon's parameter (e.g. atk) is more/less/equal to a value
 *  - The weapon's element is e.g. Fire
 *  - The equip type is a shield/head/body/accessory
 *  - The armor type is heavy/light
 *  - The armor is worth more/less/equal to a certain price
 *  - The armor's parameter (e.g. def) is more/less/equal to a value
 * 
 * ------------------------------------------------------------------------------
 * How to Use
 * ------------------------------------------------------------------------------
 *
 * All scripts should be used in conditional branches.
 *
 * Select Item:
 *
 * varItem = variable where selected item id is stored from Select Item
 * 
 * Select.ItemName(varItem, name)
 * e.g. Select.ItemName(5, 'Herb')
 * Checks if selected item name contains Herb
 * 
 * Select.ItemType(varItem, type)
 * e.g. Select.ItemType(5, 'Key')
 * Checks if selected item is a Key Item
 * Types are: 'Regular'/'Key'/'HiddenA'/'HiddenB'
 * 
 * Select.ItemConsumable(varItem)
 * e.g. Select.ItemConsumable(5)
 * Checks if selected item is consumable
 * 
 * Select.ItemElement(varItem, elem)
 * e.g. Select.ItemElement(5, 'Fire')
 * Checks if selected item has the Fire element
 * Element has to one of those in Database Types Elements
 * 
 * Select.ItemPrice(varItem, price, operator)
 * e.g. Select.ItemPrice(5, 500, 'moreE')
 * Checks if selected item is worth more than equal to 500G
 * Operators: 'more'/'moreE'/'less'/'lessE'/'equal'
 * 
 * Select.ItemCategory(varItem, category)
 * e.g. Select.ItemCategory(5, 'Potions')
 * Checks if selected item belongs to item category Potions.
 * Item category must be defined in item note as either:
 * <Menu Category: Potions> or <Menu Categories: Potions, Chemicals>
 * If item has multiple categories, as long as one matches, the condition is true.
 *
 * Select Weapon:
 *
 * varW = variable where selected item id is stored from Select Weapon
 *
 * Select.Wtype(varW, wType)
 * e.g. Select.Wtype(5, 'Sword')
 * Checks if selected weapon is a Sword
 * wType has to one of those in Database Types Weapon Types
 *
 * Select.WPrice(varW, price, operator)
 * e.g. Select.WPrice(5, 1000, 'less')
 * Checks if selected weapon is worth less than 1000G
 * Operators: 'more'/'moreE'/'less'/'lessE'/'equal'
 *
 * Select.WParam(varW, param, value, operator)
 * e.g. Select.WParam(5, 'atk', 100, 'more')
 * Checks if selected weapon adds more than 100 to Attack
 * Parameters: 'mhp'/'mmp'/'atk'/'def'/'mat'/'mdf'/'agi'/'luk'
 * Operators: 'more'/'moreE'/'less'/'lessE'/'equal'
 * 
 * Select.WElement(varW, elem)
 * e.g. Select.WElement(5, 'Ice')
 * Checks if selected item has the Ice element
 * Element has to one of those in Database Types Elements
 *
 * Select Armor:
 *
 * varA = variable where selected item id is stored from Select Armor
 *
 * Select.Etype(varA, eType)
 * e.g. Select.Etype(5, 'Accessory')
 * Checks if selected armor is an Accessory
 * eType has to one of those in Database Types Eqiupment Types
 *
 * Select.Atype(varA, aType)
 * e.g. Select.Atype(5, 'Heavy Armor')
 * Checks if selected armor is a Heavy Armor
 * eType has to one of those in Database Types Armor Types 
 *
 * Select.APrice(varA, price, operator)
 * e.g. Select.APrice(5, 200, 'equal')
 * Checks if selected armor is worth exactly 200G
 * Operators: 'more'/'moreE'/'less'/'lessE'/'equal'
 *
 * Select.AParam(varA, param, value, operator)
 * e.g. Select.AParam(5, 'mdf', 80, 'moreE')
 * Checks if selected armor adds more than equal to 80 to Magic Defense
 * Parameters: 'mhp'/'mmp'/'atk'/'def'/'mat'/'mdf'/'agi'/'luk'
 * Operators: 'more'/'moreE'/'less'/'lessE'/'equal'
 * 
 * ==============================================================================
 */

function Select() {}; 

	Select.ItemName = function(varItem, name) {
		return $gameTemp.SelectItemName(varItem, name);
	};
	
	Select.ItemType = function(varItem, type) {
		return $gameTemp.SelectItemName(varItem, type);
	};	
	
	Select.ItemConsumable = function(varItem) {
		return $gameTemp.SelectItemConsumable(varItem);
	};	
	
	Select.ItemElement = function(varItem, elem) {
		return $gameTemp.SelectItemElement(varItem, elem);
	};	
	
	Select.ItemPrice = function(varItem, price, operator) {
		return $gameTemp.SelectItemPrice(varItem, price, operator);
	};	

	Select.ItemCategory = function(varItem, category) {
		return $gameTemp.SelectItemCategory(varItem, category);
	};	

	Select.Wtype = function(varW, wType) {
		return $gameTemp.SelectWtype(varW, wType);
	};	
	
	Select.WPrice = function(varW, price, operator) {
		return $gameTemp.SelectWPrice(varW, price, operator);
	};	

	Select.WParam = function(varW, param, value, operator) {
		return $gameTemp.SelectWParam(varW, param, value, operator);
	};		
	
	Select.WElement = function(varW, elem) {
		return $gameTemp.SelectWElement(varW, elem);
	};	
 
	Select.Etype = function(varE, etype) {
		return $gameTemp.SelectEtype(varE, etype);
	};	
	
	Select.Atype = function(varA, atype) {
		return $gameTemp.SelectAtype(varA, atype);
	};	
	
	Select.APrice = function(varA, price, operator) {
		return $gameTemp.SelectAPrice(varA, price, operator);
	};	

	Select.AParam = function(varA, param, value, operator) {
		return $gameTemp.SelectAParam(varA, param, value, operator);
	};		
 
(function() { 

	Game_Interpreter.prototype.GetItemCat = function () {
		return get_itemCategory.apply(this, arguments);
	};
	
	Game_Temp.prototype.SelectEtype = function () {
		return select_etype.apply(this, arguments);
	};
	
	Game_Temp.prototype.SelectAtype = function () {
		return select_atype.apply(this, arguments);
	};

	Game_Temp.prototype.SelectAPrice = function () {
		return select_aPrice.apply(this, arguments);
	};
	
	Game_Temp.prototype.SelectAParam = function () {
		return select_aParam.apply(this, arguments);
	};
	
	Game_Temp.prototype.SelectWtype = function () {
		return select_wType.apply(this, arguments);
	};
	
	Game_Temp.prototype.SelectWPrice = function () {
		return select_wPrice.apply(this, arguments);
	};
	
	Game_Temp.prototype.SelectWParam = function () {
		return select_wParam.apply(this, arguments);
	};
	
	Game_Temp.prototype.SelectWElement = function () {
		return select_wElement.apply(this, arguments);
	};
	
	Game_Temp.prototype.SelectItemName = function () {
		return select_itemName.apply(this, arguments);
	};
	
	Game_Temp.prototype.SelectItemType = function () {
		return select_itemType.apply(this, arguments);
	};
	
	Game_Temp.prototype.SelectItemConsumable = function () {
		return select_itemConsumable.apply(this, arguments);
	};
	
	Game_Temp.prototype.SelectItemElement = function () {
		return select_itemElement.apply(this, arguments);
	};
	
	Game_Temp.prototype.SelectItemPrice = function () {
		return select_itemPrice.apply(this, arguments);
	};
	
	Game_Temp.prototype.SelectItemCategory = function () {
		return select_itemCategory.apply(this, arguments);
	};
	
	// varE, etypename (armor only!)
	function select_etype() {
		var args = Array.prototype.slice.call(arguments);
		var equipId = $gameVariables.value(args[0]);
		var etypeId = $dataArmors[equipId].etypeId;
		var etypes = $dataSystem.equipTypes;
		if (etypes[etypeId] == args[1]) {
			return true;
		}
		return false;
	};
	
	// varA, atypename
	function select_atype() {
		var args = Array.prototype.slice.call(arguments);
		var armorId = $gameVariables.value(args[0]);
		var atypeId = $dataArmors[armorId].atypeId;
		var atypes = $dataSystem.armorTypes;
		if (atypes[atypeId] == args[1]) {
			return true;
		}
		return false;
	};
	
	// varA, price, more/moreE/less/lessE/equal
	function select_aPrice() {
		var args = Array.prototype.slice.call(arguments);
		var armorId = $gameVariables.value(args[0]);
		var price = $dataArmors[armorId].price;
		switch (args[2]) {
			case 'more':
				if (price > args[1]) {
					return true;
				}
				return false;
			case 'moreE':
				if (price >= args[1]) {
					return true;
				}
				return false;	
			case 'less':
				if (price < args[1]) {
					return true;
				}
				return false;
			case 'lessE':
				if (price <= args[1]) {
					return true;
				}
				return false;	
			case 'equal':
				if (price == args[1]) {
					return true;
				}
				return false;
		};
		return false;
	};	
	
	// varWp param value more/moreE/less/lessE/equal  | params: mhp, mmp, atk, def, mat, mdf, agi, luk
	function select_aParam() {
		var args = Array.prototype.slice.call(arguments);
		var armorId = $gameVariables.value(args[0]);
		switch (args[1]) {
			case 'mhp':
				var param = $dataArmors[armorId].params[0];
				break;
			case 'mmp':
				var param = $dataArmors[armorId].params[1];
				break;
			case 'atk':
				var param = $dataArmors[armorId].params[2];
				break;
			case 'def':
				var param = $dataArmors[armorId].params[3];
				break;	
			case 'mat':
				var param = $dataArmors[armorId].params[4];
				break;
			case 'mdf':
				var param = $dataArmors[armorId].params[5];
				break;
			case 'agi':
				var param = $dataArmors[armorId].params[6];
				break;
			case 'luk':
				var param = $dataArmors[armorId].params[7];
				break;				
		}
		switch (args[3]) {
			case 'more':
				if (param > args[2]) {
					return true;
				}
				return false;
			case 'moreE':
				if (param >= args[2]) {
					return true;
				}
				return false;	
			case 'less':
				if (param < args[2]) {
					return true;
				}
				return false;
			case 'lessE':
				if (param <= args[2]) {
					return true;
				}
				return false;	
			case 'equal':
				if (param == args[2]) {
					return true;
				}
				return false;
		};
	};	
	
	// varW, wtypename
	function select_wType() {
		var args = Array.prototype.slice.call(arguments);
		var weaponId = $gameVariables.value(args[0]);
		var wtypeId = $dataWeapons[weaponId].wtypeId;
		var wtypes = $dataSystem.weaponTypes;
		if (wtypes[wtypeId] == args[1]) {
			return true;
		}
		return false;
	};
	
	// varW, price, more/moreE/less/lessE/equal
	function select_wPrice() {
		var args = Array.prototype.slice.call(arguments);
		var weaponId = $gameVariables.value(args[0]);
		var price = $dataWeapons[weaponId].price;
		switch (args[2]) {
			case 'more':
				if (price > args[1]) {
					return true;
				}
				return false;
			case 'moreE':
				if (price >= args[1]) {
					return true;
				}
				return false;	
			case 'less':
				if (price < args[1]) {
					return true;
				}
				return false;
			case 'lessE':
				if (price <= args[1]) {
					return true;
				}
				return false;	
			case 'equal':
				if (price == args[1]) {
					return true;
				}
				return false;
		};
		return false;
	};
	
	// varWp param value more/moreE/less/lessE/equal  | params: mhp, mmp, atk, def, mat, mdf, agi, luk
	function select_wParam() {
		var args = Array.prototype.slice.call(arguments);
		var weaponId = $gameVariables.value(args[0]);
		switch (args[1]) {
			case 'mhp':
				var param = $dataWeapons[weaponId].params[0];
				break;
			case 'mmp':
				var param = $dataWeapons[weaponId].params[1];
				break;
			case 'atk':
				var param = $dataWeapons[weaponId].params[2];
				break;
			case 'def':
				var param = $dataWeapons[weaponId].params[3];
				break;	
			case 'mat':
				var param = $dataWeapons[weaponId].params[4];
				break;
			case 'mdf':
				var param = $dataWeapons[weaponId].params[5];
				break;
			case 'agi':
				var param = $dataWeapons[weaponId].params[6];
				break;
			case 'luk':
				var param = $dataWeapons[weaponId].params[7];
				break;				
		}
		switch (args[3]) {
			case 'more':
				if (param > args[2]) {
					return true;
				}
				return false;
			case 'moreE':
				if (param >= args[2]) {
					return true;
				}
				return false;	
			case 'less':
				if (param < args[2]) {
					return true;
				}
				return false;
			case 'lessE':
				if (param <= args[2]) {
					return true;
				}
				return false;	
			case 'equal':
				if (param == args[2]) {
					return true;
				}
				return false;
		};
	};

	// varW element
	function select_wElement() {
		var args = Array.prototype.slice.call(arguments);
		var weaponId = $gameVariables.value(args[0]);
		var elemental = $dataSystem.elements;
		var traits = $dataWeapons[weaponId].traits;
		for (var i = 0; i < traits.length; i++) {
			if (traits[i].code == 31) {
				var elementId = traits[i].dataId;
				if (elemental[elementId] == args[1]) {
					return true;
				}
				return false;
			}
		}
		return false;
	};
	
	// varItem name
	function select_itemName() {
		var args = Array.prototype.slice.call(arguments);
		var itemId = $gameVariables.value(args[0]);
		var itemName = $dataItems[itemId].name;
		if (itemName.includes(args[1])) {
			return true;
		}
		return false;
	};
	
	// varItem Regular/Key/HiddenA/HiddenB
	function select_itemType() {
		var args = Array.prototype.slice.call(arguments);
		var itemId = $gameVariables.value(args[0]);
		var itypeId = $dataItems[itesmId].itypeId;
		var type = args[1].toLowerCase();
		switch (type) {
			case 'regular':
				if (itypeId == 1) {
					return true;
				}
				return false;
			case 'key':
				if (itypeId == 2) {
					return true;
				}
				return false;
			case 'hiddena':
				if (itypeId == 3) {
					return true;
				}
				return false;
			case 'hiddenb':
				if (itypeId == 4) {
					return true;
				}
				return false;	
		}
	};
	
	// varItem
	function select_itemConsumable() {
		var args = Array.prototype.slice.call(arguments);
		var itemId = $gameVariables.value(args[0]);
		return $dataItems[itemId].consumable;
	};
	
	// varItem element
	function select_itemElement() {
		var args = Array.prototype.slice.call(arguments);
		var itemId = $gameVariables.value(args[0]);
		var elementId = $dataItems[itemId].damage.elementId;
		var elemental = $dataSystem.elements;
		if (elemental[elementId] == args[1]) {
			return true;
		}
		return false;
	};
	
	// varItem, price, more/moreE/less/lessE/equal
	function select_itemPrice() {
		var args = Array.prototype.slice.call(arguments);
		var itemId = $gameVariables.value(args[0]);
		var price = $dataItems[itemId].price;
		switch (args[2]) {
			case 'more':
				if (price > args[1]) {
					return true;
				}
				return false;
			case 'moreE':
				if (price >= args[1]) {
					return true;
				}
				return false;	
			case 'less':
				if (price < args[1]) {
					return true;
				}
				return false;
			case 'lessE':
				if (price <= args[1]) {
					return true;
				}
				return false;	
			case 'equal':
				if (price == args[1]) {
					return true;
				}
				return false;
		};
		return false;
	};
	
	// varItem
	function get_itemCategory() {
		var args = Array.prototype.slice.call(arguments);
		var itemId = $gameVariables.value(args[0]);
		var notecontents = $dataItems[itemId].note;
		var notearray = notecontents.split(/[\r\n]+/); 
		var regex2 = /(?:<MENU CATEGORIES: )(.*)>/i;
		var regex1 = /(?:<MENU CATEGORY: )(.*)>/i
		for (var i = 0; i < notearray.length; i++) {
			if (notearray[i].match(regex1)) {
				var category = regex1.exec(notearray[i])[1]; 
				return category;
			} else if (notearray[i].match(regex2)) {
				var temp = regex2.exec(notearray[i])[1];
				var precategories = temp.split(',');
				var categories = [];
				for (var j = 0; j < precategories.length; j++) {
					categories.push(precategories[j].trim());
				}; console.log(categories);
				return categories;
			}
		}
		return false;
	};
	
	//varItem, category
	function select_itemCategory() {
		var args = Array.prototype.slice.call(arguments);
		var category = get_itemCategory(args[0]);
		if (Array.isArray(category)) {
			for (var i = 0; i < category.length; i++) {
				if (category[i] == args[1]) {
					return true;
				}
			}
		} else if (category == args[1]) {
			return true;
		}
		return false;
	};
	
})();	