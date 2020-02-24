import io from "socket.io-client";

const SERVER_URI = "http://localhost:4001";

export const connect = () => {
  const socket = io.connect(SERVER_URI);

  return socket;
};
