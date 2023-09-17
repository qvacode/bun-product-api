import { Server } from "./config/server";

const server = new Server()
server.listen()

setTimeout(() => {
    server.close()
}, 3000)