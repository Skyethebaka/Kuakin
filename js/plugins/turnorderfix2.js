BattleManager.getActorInputOrder = function() {
  let members = $gameParty.members();
  let order = [1, 2, 3, 4, 5, 8, 10, 9, 11];
  let list = []
  for (let i = 0; i < order.length; i++) {
    let index = members.indexOf($gameActors.actor(order[i]));
    if (index > -1 && members[index].isAlive() && members[index].isBattleMember()) { list.push(index); }
  }
  return list;
};