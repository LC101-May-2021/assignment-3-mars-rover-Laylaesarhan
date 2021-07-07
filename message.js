class Message {
  constructor(name, commands){
    this.name = name;
      if (!name) {
       throw new Error("Message name required.");
       }
    this.commands = commands;
  }
}

module.exports = Message;