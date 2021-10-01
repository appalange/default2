var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleHybrid = require('role.hybrid');
var roleMiner = require('role.miner');
var roleRepairer = require('role.repairder');
var roleWarrior = require('role.warrior');
const roleLorry = require('./role.lorry');
require('role.lorry');

/*
Inhoudsopgave

- Energie Levels
- Creeps
- Spawn
- Creep Functies

*/




module.exports.loop = function () { 

    // Presenteren van de hoeveelheid energie en de capaciteit
	for(var name in Game.rooms) {
        var AvailCap = Game.rooms[name].energyCapacityAvailable;
        var Avail = Game.rooms[name].energyAvailable;
        //var allSources = Game.rooms[name].find(FIND_SOURCES);
        var activeSources = Game.rooms[name].find(FIND_SOURCES_ACTIVE);
        var constructionSites = Game.rooms[name].find(FIND_CONSTRUCTION_SITES);
        if(Avail < AvailCap) {
            console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
            console.log('Room "'+name+'" has '+Game.rooms[name].energyCapacityAvailable+' capacity');
            //console.log('Room name: ' +name);
        }
    }

    // Ophalen alle sources in een room
    //.findClosestByPath(FIND_SOURCES_ACTIVE);
    // for(var Sources in creep.room.find(FIND_SOURCES)) {
    //     let listSources = creep.room.find(FIND_SOURCES);
    //     console.log('Source nr 0: ' + listSources[0]);
    //     console.log('Source nr 1: ' + listSources[1]);
    //     console.log('Source nr 2: ' + listSources[2]);
    //     console.log('Source nr 3: ' + listSources[3]);
    // }

    //console.log('LIST sources: ' + activeSources);


    // Leegmaken van de creep memory
	for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var warriors = _.filter(Game.creeps, (creep) => creep.memory.role == 'warrior');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair');
    var lorries = _.filter(Game.creeps, (creep) => creep.memory.role == 'lorry');
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var hybrids = _.filter(Game.creeps, (creep) => creep.memory.role == 'hybrid');
    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');

    // De variabelen om het maximale aantal creeps te bepalen.
    let noHybrids = 1;
    let noHarvesters = 0;
    let noBuilders = 1; //1
    let noUpgraders = 2; //2
    let noMiners = 2; //2
    let noLorries = 1; //1
    let noRepairer = 0;
    let noWarriors = 10; //10

    // Spawnen van de warriors

    if(warriors.length < noWarriors) {
        console.log('Warriors: ' + warriors.length + '/' + noWarriors);
        var newName = 'Warrior' + Game.time;
        Game.spawns['Spawn1'].spawnCreep(getBodyWarrior(getLevel()), newName, 
            {memory: {role: 'warrior'}});
    }

    // Spawnen van de repairers

    if(repairers.length < noRepairer) {
        console.log('Repairers: ' + repairers.length + '/' + noRepairer);
        var newName = 'Repairer' + Game.time;
        Game.spawns['Spawn1'].spawnCreep(getBodyGeneral(getLevel()), newName, 
            {memory: {role: 'repair'}});
    }

    // Spawnen van de lorries

    if(lorries.length < noLorries) {
        console.log('Lorries: ' + lorries.length + '/' + noLorries);
        var newName = 'Lorry' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'lorry'}});
    }

    // Spawnen van de harvesters

    if(harvesters.length < noHarvesters) {
        console.log('Harvesters: ' + harvesters.length + '/' + noHarvesters);
        var newName = 'Harvester' + Game.time;
        Game.spawns['Spawn1'].spawnCreep(getBodyGeneral(getLevel()), newName, 
            {memory: {role: 'harvester'}});
    }

    // Spawnen van de builders

    if(builders.length < noBuilders) {
        console.log('Builders: ' + builders.length + '/' + noBuilders);
        var newName = 'Builder' + Game.time;
        Game.spawns['Spawn1'].spawnCreep(getBodyGeneral(getLevel()), newName, 
            {memory: {role: 'builder'}});
    }

    // Spawnen van de upgraders

    if(upgraders.length < noUpgraders) {
        console.log('Upgraders: ' + upgraders.length + '/' + noUpgraders);
        var newName = 'Upgrader' + Game.time;
        Game.spawns['Spawn1'].spawnCreep(getBodyGeneral(getLevel()), newName, 
            {memory: {role: 'upgrader'}});
    }

    // Uitvoeren van de functies van Harvesters, Builderss, Upgraders, Hybrids (zie eigen js)
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
        if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        if(creep.memory.role == 'lorry') {
            roleLorry.run(creep);
        }
        if(creep.memory.role == 'repair') {
            roleRepairer.run(creep);
        }
        if(creep.memory.role == 'warrior') {
            roleWarrior.run(creep);
        }
    }

    // Haal het huidige level op, op basis van de available capacity energy
    function getLevel() {
        if (AvailCap == 0)
            return 0;
        else if (AvailCap < 550)
            return 1;
        else if (AvailCap < 800)
            return 2;
        else if (AvailCap < 1300)
            return 3;
        else if (AvailCap < 1800)
            return 4;
        else if (AvailCap < 2300)
            return 5;
        else if (AvailCap < 5600)
            return 6;
        else if (AvailCap < 12900)
            return 7;
        else
            return 8;
    }

    // General Body per level
    function getBodyGeneral(level) {
        switch (level) {
			case 1:
				return [
					WORK,
					CARRY, CARRY,
					MOVE, MOVE
                ];
			case 2:
				return [
					WORK, WORK,
					CARRY, CARRY,
					MOVE, MOVE, MOVE, MOVE
                ];
			case 3:
				return [
					WORK, WORK, WORK,
					CARRY, CARRY, CARRY, CARRY,
					MOVE, MOVE, MOVE, MOVE
                ];
			case 4:
				return [
					WORK, WORK, WORK, WORK, WORK,
					CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
					MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
                ];
            }
    }

    // Warrior Body per level
    function getBodyWarrior(level) {
        switch (level) {
			case 1:
				return [
					ATTACK, ATTACK,
					MOVE, MOVE
                ];
			case 2:
				return [
					ATTACK, ATTACK, ATTACK, ATTACK,
					MOVE, MOVE, MOVE, MOVE
                ];
			case 3:
				return [
					ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,
					MOVE, MOVE, MOVE, MOVE, MOVE
                ];
			case 4:
				return [
					ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,
					MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
                ];
            }
    }

    // Bereken de body cost
    let bodyCostGeneral = _.sum(getBodyGeneral(getLevel()), b => BODYPART_COST[b]);
    let bodyCostWarrior = _.sum(getBodyWarrior(getLevel()), b => BODYPART_COST[b]);
    console.log('Current Level: ' + getLevel());
    //console.log('Current General Body Cost: ' + bodyCostGeneral);
    //console.log('Current Warrior Body Cost: ' + bodyCostWarrior);

    // Spawnen van de hybrids

    if(hybrids.length < noHybrids) {
        console.log('Hybrids: ' + hybrids.length + '/' + noHybrids);
        var newName = 'Hybrid' + Game.time;
        Game.spawns['Spawn1'].spawnCreep(getBodyGeneral(getLevel()), newName, 
            {memory: {role: 'hybrid'}});
    }

    // Spawnen van de miners

    if(miners.length < noMiners) {
        console.log('Miners: ' + miners.length + '/' + noMiners);
        var newName = 'Miner' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,MOVE], newName, 
            {memory: {role: 'miner'}});
    }

};