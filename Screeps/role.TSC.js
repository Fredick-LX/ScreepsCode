module.exports = {
    run: function() {
        var Towers = Game.spawns['Main'].room.find(FIND_MY_STRUCTURES, {filter: { structureType:STRUCTURE_TOWER}});
        for(var tower of Towers){
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => structure.hits < structure.hitsMax});
            if(closestHostile){
                tower.attack(closestHostile);
            }
            else if(closestDamagedStructure&&(tower.store[RESOURCE_ENERGY]>tower.store.getCapacity(RESOURCE_ENERGY)*0.5)){
                tower.repair(closestDamagedStructure);
            }
        }
    }

};