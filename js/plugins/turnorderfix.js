BattleManager.getActorInputOrder = function() {
  let members = $gameParty.members();
  let order = $gameSwitches.value(7) ? [8, 10, 9, 11] : [1, 2, 3, 4, 5];
  let list = []
  // Go through order
  for (let i = 0; i < order.length; i++) {
    let index = members.indexOf($gameActors.actor(order[i]));
    if (index > -1 && members[index].isAlive() && members[index].isBattleMember()) { list.push(index); }
  }
  // Return List
  return list;
};