module.exports = {
    run: function(creep) {
        if(creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
            creep.say("harvest……");
	    }
	    if(!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
	        creep.memory.repairing = true;
	        creep.say("repair……");
	    }
	    if(!creep.memory.repairing) {
           const sources = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            const targets = creep.room.find(FIND_STRUCTURES, {
            filter: object => object.hits < object.hitsMax
            });

    targets.sort((a,b) => a.hits - b.hits);

    if(targets.length > 0) {
        if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
	}
};