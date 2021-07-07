const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
 
it ("constructor sets position and default values for mode and generatorWatts", function(){
 let newRover = new Rover(6);
 expect(newRover.position).toEqual(6);
 expect(newRover.mode).toEqual('NORMAL');
 expect(newRover.generatorWatts).toEqual(110);
});

it ("response returned by receiveMessage contains name of message", function(){
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  let message = new Message('Test message with two commands', commands);
  let rover = new Rover(98382);
  let response = rover.receiveMessage(message);
expect(response.message).toEqual('Test message with two commands');
})


// Test 9
it ("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
   let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  let message = new Message('Test message with two commands', commands);
  let rover = new Rover(98382);
  let response = rover.receiveMessage(message);
expect(response.results.length).toEqual(2);
})

// Test 10
it ("responds correctly to status check command", function(){
   let commands = [new Command('STATUS_CHECK')];
  let message = new Message('Test message with two commands', commands);
  let rover = new Rover(98382);
  let response = rover.receiveMessage(message);
expect(response.results).toEqual([{completed: true, roverStatus: {mode: 'NORMAL', generatorWatts: 110, position: 98382}}]);
})


// Test 11
it ("responds correctly to mode change command", function(){
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
let message = new Message('Test message with two commands', commands);
let rover = new Rover(98382);
let response = rover.receiveMessage(message);
expect(response.results[0]).toEqual({completed:true});
expect(rover.mode).toEqual('LOW_POWER');
})

// Test 12
it ("responds with false completed value when attempting to move in LOW_POWER mode", function(){
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 5678)];
let message = new Message('Test message with two commands', commands);
let rover = new Rover(98382);
let response = rover.receiveMessage(message);
expect(response.results[1]).toEqual({completed:false});
});
// Test 13
it ("responds with position for move command", function(){
  let commands = [new Command('MOVE', 5678)];
let message = new Message('Test message with two commands', commands);
let rover = new Rover(98382);
let response = rover.receiveMessage(message);
expect(rover.position).toEqual(5678);
})
});


