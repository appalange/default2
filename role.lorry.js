var roleMiner = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
	    if(creep.carry.energy == 0) {
            var droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES);
            if(droppedEnergy) {
                if(creep.pickup(droppedEnergy[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(droppedEnergy[0].pos, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } 
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_CONTAINER ||
                            structure.structureType == STRUCTURE_TOWER) && 
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                let findSpawn = creep.room.find(FIND_MY_SPAWNS);
                creep.moveTo(findSpawn[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
	}
};

module.exports = roleMiner;