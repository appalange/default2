var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

var roleHybrid = {

    /** @param {Creep} creep **/
    run: function(creep) {

        var freeCapacityStructures = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && 
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });

        var freeConstructions = creep.room.find(FIND_CONSTRUCTION_SITES);
        
        if(freeCapacityStructures.length > 0) {
            roleHarvester.run(creep);
        } else if(freeConstructions.length > 0) {
            roleBuilder.run(creep);
        } else {
            roleUpgrader.run(creep);
        }

        // if(creep.memory.upgrading) {
	    //     creep.say('⚡ upgrade');
	    // }
        // if(creep.memory.building) {
	    //     creep.say('🚧 build');
	    // }
        // if(creep.memory.harvester) {
	    //     creep.say('🔄 harvest');
	    // }


	}
};

module.exports = roleHybrid;