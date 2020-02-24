const generateUuidv4 = require("./uuidUtils");
const io = require("socket.io")();

const PORT = 4001;
let usernames = [];
let messages = [];

const createUser = username => ({
  id: generateUuidv4(),
  username
});

io.on("connection", socket => {
  console.log("client connected");

  socket.on("register.new", username => {
    usernames.push(createUser(username));
    socket.emit("register.connected", usernames.pop());
  });

  socket.on("register.existing", user => {
    const index = usernames.findIndex(u => u.id === user.id);

    usernames[index] = user;
  });

  socket.on("message", message => {
    const newMessage = {
      id: generateUuidv4(),
      value: message.value,
      username: message.username,
      userId: message.userId,
      datetime: new Date()
    };

    messages.push(newMessage);
    io.emit("message.new", newMessage);
  });

  socket.on("messages.get", () => {
    socket.emit("messages.success", messages);
  });
});

io.listen(PORT);
