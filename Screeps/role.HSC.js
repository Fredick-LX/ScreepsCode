module.exports={
    /** @param {Creep} creep **/
    run: function(creep) {
        
        var target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
        
        var energy_Available = Game.spawns['Main'].room.energyAvailable;
        var energy_Capacity_Available = Game.spawns['Main'].room.energyCapacityAvailable;
        var total_energy_Available=energy_Available;
        var total_energy_Capacity_Available=energy_Capacity_Available;
        var Towers = Game.spawns['Main'].room.find(FIND_MY_STRUCTURES, {filter: { structureType:STRUCTURE_TOWER}});
        for(var tower of Towers){
            total_energy_Available+=tower.energyAvailable;
            total_energy_Capacity_Available+=tower.energyCapacityAvailable;
        }
        
        if(total_energy_Available==total_energy_Capacity_Available){
            
            creep.say("waiting……");
            creep.moveTo(Game.flags["HwaitPoint"], {visualizePathStyle: {stroke: '#ffffff'}});
            return;
        }
	    
	    if(creep.store.getFreeCapacity() > 0) {
           if(target) {
                if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
                    creep.say("harvest……");
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        else {
            if(energy_Available<energy_Capacity_Available){
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_SPAWN || 
                                structure.structureType == STRUCTURE_EXTENSION ) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
            }
            else{
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_SPAWN || 
                                structure.structureType == STRUCTURE_EXTENSION 
                                || structure.structureType == STRUCTURE_CONTAINER
                                || structure.structureType == STRUCTURE_TOWER
                                ) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                
            }
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.say("transfer……");
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
	}
};

