module.exports = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.say("harvest……");
            creep.memory.building = false;
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.say("build……");
	        creep.memory.building = true;
	    }

	    if(creep.memory.building) {
            const target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if(target) {
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else{
                creep.say("waiting……");
                creep.moveTo(Game.flags["BwaitPoint"], {visualizePathStyle: {stroke: '#ffffff'}});
                return;
            }
        }
        else {
            const sources = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
	}
};
