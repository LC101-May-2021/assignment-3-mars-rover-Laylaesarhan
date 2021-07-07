class Rover {
  constructor(position = 0) {
    this.position = position;
    this.mode = 'NORMAL';
    this.generatorWatts = 110;
  }

  receiveMessage(message) {
    const results = [];

    for (let i = 0; i < message.commands.length; i++) {
      const command = message.commands[i];

      if (command.commandType === 'MODE_CHANGE') {
        this.mode = command.value;
        results.push({completed: true});
      } else if (command.commandType === 'STATUS_CHECK') {
        results.push(
          {
            completed: true, 
            roverStatus: {
              mode: this.mode, generatorWatts: this.generatorWatts, position: this.position
            }
          }
          );
      } else if (command.commandType === 'MOVE') {
        if (this.mode === 'LOW_POWER') {
         results.push({ completed: false });
         
        } else {
 // update the position to the command's value
        this.position = command.value;
        results.push({ completed: true });
        }
       
      }

    }

    return  {
        message: message.name, 
        results
      }
  }
}

module.exports = Rover;

module.exports = Rover;