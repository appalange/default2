var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleHybrid = require('role.hybrid');
//var levelUp = require('levelup');

module.exports.loop = function () {

    var stage1 = [WORK,WORK,MOVE,CARRY];
    var stage2 = [WORK,WORK,MOVE,MOVE,CARRY];
    var stage3 = [WORK,WORK,WORK,MOVE,CARRY];
    var stage4 = [WORK,WORK,WORK,MOVE,MOVE,CARRY];
    var stage5 = [WORK,WORK,WORK,WORK,MOVE,MOVE,CARRY];
    const bodyCostStage1 = _.sum(stage1, b => BODYPART_COST[b]);
    const bodyCostStage2 = _.sum(stage2, b => BODYPART_COST[b]);
    const bodyCostStage3 = _.sum(stage3, b => BODYPART_COST[b]);
    const bodyCostStage4 = _.sum(stage4, b => BODYPART_COST[b]);
    const bodyCostStage5 = _.sum(stage5, b => BODYPART_COST[b]);
    // console.log('bodyCostStage1 = ' +bodyCostStage1);
    // console.log('bodyCostStage2 = ' +bodyCostStage2);
    // console.log('bodyCostStage3 = ' +bodyCostStage3);
    // console.log('bodyCostStage4 = ' +bodyCostStage4);
    // console.log('bodyCostStage5 = ' +bodyCostStage5);

	for(var name in Game.rooms) {
        var AvailCap = Game.rooms[name].energyCapacityAvailable;
        var Avail = Game.rooms[name].energyAvailable; 
        if(Avail < AvailCap) {
            console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
            console.log('Room "'+name+'" has '+Game.rooms[name].energyCapacityAvailable+' capacity');
        }
    }

    var tower = Game.getObjectById('20733a3cdba5ece7efae40a7');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

	for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');

    if(harvesters.length < 0) {
        console.log('Harvesters: ' + harvesters.length);
        var newName = 'Harvester' + Game.time;
        //console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'harvester'}});
    }

	var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

    if(builders.length < 0) {
        console.log('Builders: ' + builders.length);
        var newName = 'Builder' + Game.time;
        //console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'builder'}});
    }

	var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

    if(upgraders.length < 1) {
        console.log('Upgraders: ' + upgraders.length);
        var newName = 'Upgrader' + Game.time;
        //console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(stage1, newName, 
            {memory: {role: 'upgrader'}});
    }

    var hybrids = _.filter(Game.creeps, (creep) => creep.memory.role == 'hybrid');

    var extensions = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, {
        filter: { structureType: STRUCTURE_EXTENSION }
      });
      //console.log('count Extentions = ' +extensions.length);

    if(hybrids.length < 10) {
        console.log('Hybrids: ' + hybrids.length);
        //console.log('hybrid onder 10');
        if(Game.rooms['sim'].controller.level == 1) {
            //console.log('controller lvl 1');
            var newName = 'Hybrid' + Game.time;
            //console.log('Spawning new hybrid: ' + newName);
            if(bodyCostStage1 <= AvailCap) {
                Game.spawns['Spawn1'].spawnCreep(stage1, newName, 
                    {memory: {role: 'hybrid'}});
            } else {
                console.log('BodyCost is te groot: ' +bodyCostStage1 +'/'+ AvailCap);
            }
        } else if(Game.rooms['sim'].controller.level == 2) {
            //console.log('controller lvl 2');
            var newName = 'BigHybrid' + Game.time;
            if(extensions.length == 0) {
                //console.log('extension 0');
                if(bodyCostStage1 <= AvailCap) {
                    Game.spawns['Spawn1'].spawnCreep(stage1, newName, 
                        {memory: {role: 'hybrid'}});
                } else {
                    console.log('BodyCost is te groot: ' +bodyCostStage1 +'/'+ AvailCap);
                }
            } else if(extensions.length == 1) {
                //console.log('extension 1');
                if(bodyCostStage2 <= AvailCap) {
                    Game.spawns['Spawn1'].spawnCreep(stage2, newName, 
                        {memory: {role: 'hybrid'}});
                } else {
                    console.log('BodyCost is te groot: ' +bodyCostStage1 +'/'+ AvailCap);
                }
            } else if(extensions.length == 2) {
                //console.log('extension 2');
                if(bodyCostStage3 <= AvailCap) {
                    Game.spawns['Spawn1'].spawnCreep(stage3, newName, 
                        {memory: {role: 'hybrid'}});
                } else {
                    console.log('BodyCost is te groot: ' +bodyCostStage1 +'/'+ AvailCap);
                }
            } else if(extensions.length == 3) {
                if(bodyCostStage4 <= AvailCap) {
                    Game.spawns['Spawn1'].spawnCreep(stage4, newName, 
                        {memory: {role: 'hybrid'}});
                } else {
                    console.log('BodyCost is te groot: ' +bodyCostStage1 +'/'+ AvailCap);
                }
            } else if(extensions.length == 4) {
                if(bodyCostStage4 <= AvailCap) {
                    Game.spawns['Spawn1'].spawnCreep(stage4, newName, 
                        {memory: {role: 'hybrid'}});
                } else {
                    console.log('BodyCost is te groot: ' +bodyCostStage1 +'/'+ AvailCap);
                }
            } else if(extensions.length == 5) {
                if(bodyCostStage5 <= AvailCap) {
                    Game.spawns['Spawn1'].spawnCreep(stage5, newName, 
                        {memory: {role: 'hybrid'}});
                } else {
                    console.log('BodyCost is te groot: ' +bodyCostStage1 +'/'+ AvailCap);
                }
            }
        }
    }
    
    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'hybrid') {
            roleHybrid.run(creep);
        }
    }
}