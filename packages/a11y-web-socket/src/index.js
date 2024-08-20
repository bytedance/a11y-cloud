/*
Copyright (2024) Bytedance Ltd. and/or its affiliates
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
const { Server } = require('socket.io');
const { exec } = require('child_process');
const chalk = require('chalk');
const { socketPort } = require('../../../config/deployment.config');

let io;
const roomId = 'localhost';

const createSocketIOServer = async () => {
  const portOpen = await isPortOpen(socketPort);
  try {
    if (!portOpen) {
      io = new Server(socketPort, {
        cors: {
          origin: '*',
        },
        transports: ['websocket'],
      });
    }
  } catch (e) {
    console.log(e);
  }

  // Client send connect message
  // 客户端连接消息
  io?.on('connection', (socket) => {
    // console.log('on connection');
    let isHeartbeatActivated = false;
    let intervalMarker;
    const socketId = socket && socket.id;

    socket.on('join', async (message) => {
      // console.log(
      //   `join request: ${JSON.stringify(message, null, 2)}; 'socketId:', ${
      //     socketId
      //   }`,
      // );
      const { senderRole, path, product_id } = message;

      socket.roomId = roomId;
      socket.senderRole = senderRole;
      socket.path = path;
      socket.product_id = product_id;
      socket.join(roomId);

      let sockets = await io.in(roomId).fetchSockets();
      sockets = sockets
        ?.map((item) => ({
          roomId,
          socketId: item.id,
          senderRole: item.senderRole,
          path: item.path,
          product_id: item.product_id,
        }))
        .filter((item) => item.senderRole === 'sdk');
      // console.log(`rooms sockets: ${JSON.stringify(sockets, null, 2)}`);

      io.to(roomId).emit('room_message', {
        type: 'a11y_new_join',
        roomId,
        socketId,
        senderRole,
        path: socket.path,
        product_id: socket.product_id,
        content: {
          msg: socketId + 'enter room' + roomId,
          sockets,
        },
      });
    });

    socket.on('message', (message) => {
      // console.log('on message', message);
    });

    socket.on('room_message', (message) => {
      const { receiver } = message;
      socket.to(receiver || roomId).emit('room_message', {
        socketId,
        ...message,
      });
    });

    socket.on('disconnect', async (reason) => {
      // console.log(
      //   `on disconnect: ${JSON.stringify(reason, null, 2)}; 'socketId:', ${
      //     socketId
      //   }`,
      // );
      const { senderRole } = socket;

      socket.leave(roomId);

      let sockets = await io.in(roomId).fetchSockets();
      sockets = sockets
        ?.map((item) => ({
          roomId,
          socketId: item.id,
          senderRole: item.senderRole,
          path: item.path,
          product_id: item.product_id,
        }))
        .filter((item) => item.senderRole === 'sdk');
      // console.log(`rooms sockets: ${JSON.stringify(sockets, null, 2)}`);

      io.to(roomId).emit('room_message', {
        type: 'a11y_new_leave',
        roomId,
        socketId,
        senderRole,
        path: socket.path,
        product_id: socket.product_id,
        content: {
          msg: socketId + 'leave room' + roomId,
          sockets,
        },
      });
    });

    socket.on('activateHeartbeat', () => {
      if (isHeartbeatActivated) {
        socket.send({
          message: 'Heartbeat has already been activated',
          ts: Date.now(),
        });
      } else {
        isHeartbeatActivated = true;
        intervalMarker = setInterval(() => {
          socket.send({ message: 'Heartbeat response', ts: Date.now() });
        }, 1000);
      }
    });

    socket.on('deactivateHeartbeat', () => {
      intervalMarker && clearInterval(intervalMarker);
      socket.send({ message: 'Heartbeat stopped', ts: Date.now() });
      isHeartbeatActivated = false;
    });
  });
};

const isPortOpen = (port) => {
  const useList = `lsof -i :${port}`;
  return new Promise((resolve, reject) => {
    exec(useList, function (error, stdout, stderr) {
      resolve(stdout !== '');
    });
  });
};

console.log(
  chalk.yellow(
    `【A11y-socket】socket server start success at ${socketPort} 🚀🚀🚀`,
  ),
);

createSocketIOServer();
