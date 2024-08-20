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
import { io } from 'socket.io-client';
import { console } from './utils';
const {
  serverOrigin,
  wsOrigin,
} = require('../../../../config/deployment.config');

class MarkSocket {
  wsIO;
  roomId;
  updateConfigCallback;
  updateDomCountCallback;
  mutationCallback;
  socketsChangeCallback;
  editSelectedConfigCallback;
  hoverDomCallback;

  constructor(params = {}) {
    window.markSocket = this;
    const {
      roomId,
      updateConfigCallback,
      updateDomCountCallback,
      mutationCallback,
      socketsChangeCallback,
      editSelectedConfigCallback,
      hoverDomCallback,
      aiMarkCallback,
    } = params;
    this.roomId = roomId;
    this.updateConfigCallback = updateConfigCallback || (() => {});
    this.updateDomCountCallback = updateDomCountCallback || (() => {});
    this.mutationCallback = mutationCallback || (() => {});
    this.socketsChangeCallback = socketsChangeCallback || (() => {});
    this.editSelectedConfigCallback = editSelectedConfigCallback || (() => {});
    this.hoverDomCallback = hoverDomCallback || (() => {});
    this.aiMarkCallback = aiMarkCallback || (() => {});
  }

  init() {
    console.log('init MarkSocket');
    this.createSocketIo();
  }

  destroy() {
    this.disconnect();
  }

  createSocketIo() {
    console.log('createSocketIo');
    if (this.wsIO) {
      return;
    }
    const socket = io(wsOrigin, {
      // path: '/api/socket',
      transports: ['websocket'],
    });
    this.wsIO = socket;

    socket.on('connect', () => {
      console.log('socket', socket.id);
      this.joinRoom();
    });
    socket.on('message', (message) => {
      console.log('on message', message);
    });
    socket.on('room_message', (message) => {
      console.log('on room_message', message);
      this.handleMessage(message);
    });
  }

  joinRoom() {
    console.log('joinRoom');
    const message = {
      roomId: this.roomId,
      senderRole: 'mark',
    };
    console.log('wsIO', this.wsIO);
    this.wsIO?.emit('join', message);
  }

  handleMessage(message) {
    const { type, socketId, product_id, senderRole, content, path } = message;

    if (type === 'a11y_new_join' || type === 'a11y_new_leave') {
      const { sockets } = content;
      this.socketsChangeCallback({
        sockets,
        socketId,
        product_id,
        senderRole,
        path,
      });
    }

    if (senderRole !== 'sdk') {
      return;
    }

    if (type === 'a11y_request_config' && product_id) {
      fetch(
        `${serverOrigin}/get_a11y_data?${new URLSearchParams({
          product_id,
        }).toString()}`,
      )
        .then(async (res) => {
          const detail = await res.json();
          console.log('detail', detail);
          const Aconfig = detail.data;
          this.sendRoomMessage({
            type: 'a11y_update_aconfig',
            product_id,
            receiver: socketId,
            content: { Aconfig },
          });
          this.updateConfigCallback({
            product_id,
            detail,
            Aconfig,
            socketId,
            path,
          });
        })
        .catch((err) => {
          console.log(err);
        });

      // fetch(
      //   `${origin.taskPlatform}/api/application/get_json_dev?${(new URLSearchParams({
      //     product_id,
      //   })).toString()}`
      // ).then(async (res) => {
      //   const detail = await res.json();
      //   console.log('detail', detail);
      //   const Aconfig = detail.data.a11y_json_dev.data;
      //   this.sendRoomMessage({
      //     type: 'a11y_update_aconfig',
      //     product_id,
      //     receiver: socketId,
      //     content: {Aconfig},
      //   });
      //   this.updateConfigCallback({
      //     product_id,
      //     detail,
      //     Aconfig,
      //     socketId,
      //     path,
      //   })
      // }).catch((err) => { console.log(err); })
    }

    if (type === 'a11y_update_dom_count' && product_id) {
      const { Aconfig } = content;
      this.updateDomCountCallback({ product_id, Aconfig, path, socketId });
    }

    if (type === 'a11y_edit_selected_config' && product_id) {
      const { config } = content;
      this.editSelectedConfigCallback({ product_id, config, path, socketId });
    }

    console.log('type', type, product_id);
    if (type === 'a11y_hover_dom' && product_id) {
      const { config } = content;
      this.hoverDomCallback({ product_id, config, path, socketId });
    }

    if (type === 'a11y_dom_mutation' && product_id) {
      this.mutationCallback({ product_id, socketId });
    }

    if (
      ['a11y_ai_clear_target', 'a11y_ai_select_target'].includes(type) &&
      product_id
    ) {
      this.aiMarkCallback(type, content);
    }
  }

  sendRoomMessage(params) {
    console.log('sendRoomMessage', params);
    const { type, product_id, receiver, content } = params;
    this.wsIO?.emit('room_message', {
      type,
      product_id,
      receiver,
      roomId: this.roomId,
      senderRole: 'mark',
      content,
    });
  }

  disconnect() {
    this.wsIO.disconnect();
  }
}

export { MarkSocket };
