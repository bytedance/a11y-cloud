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
import { debounce, throttle } from '@/utils';
import '@/index.less';

const { wsOrigin } = require('../../../config/deployment.config');
const consoleType = '[a11y mark]';
const stateEvents = ['pushState', 'replaceState', 'popstate', 'hashchange'];
const isLarkPc = window.navigator.userAgent.match(/Lark\/\d+\.\d+\.\d+/);

const removeExtAttrs = () => {
  Array.from(document.querySelectorAll('[a11yExt_cfg]')).forEach((dom) => {
    dom.removeAttribute('a11yExt_active');
    dom.removeAttribute('a11yExt_relative');
    dom.removeAttribute('a11yExt_index');
    dom.removeAttribute('a11yExt_per100');
    dom.removeAttribute('a11yExt_per60');
    dom.removeAttribute('a11yExt_per30');
    dom.removeAttribute('a11yExt_cfg');
  });
};

const getDomList = (data, range = document) => {
  let domList = [];
  try {
    if (data?.aid) {
      domList = Array.from(range.querySelectorAll(`[a11y-id="${data.aid}"]`));
    } else if (data?.query) {
      domList = Array.from(range.querySelectorAll(data.query));
    }
  } finally {
    return domList;
  }
};

class LarkStorage {
  set = (key, value) => {
    if (window?.chrome?.storage) {
      return window?.chrome.storage.sync.set({ [key]: value });
    }
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem(key, value);
        resolve();
      }, 0);
    });
    return promise;
  };
  get = (key) => {
    let promise;
    if (window?.chrome?.storage) {
      promise = window?.chrome.storage.sync.get(key).then((res) => res[key]);
    } else {
      promise = new Promise((resolve) => {
        setTimeout(() => {
          const value = localStorage.getItem(key);
          resolve(value);
        }, 0);
      });
    }
    return promise;
  };
}

class MarkSDK {
  storage;
  wsIO;
  roomId;
  updateCallback;
  product_id;
  path;
  observer;
  touchElement;
  touchStartTime;
  hoverConfig;
  hoverDom;
  isPolling;
  pollingTimer;

  constructor(options = {}) {
    const { product_id, updateCallback } = options;
    this.product_id = product_id;
    this.updateCallback = updateCallback || (() => {});
    this.path = this.getPath();
    this.storage = new LarkStorage();
  }

  async init() {
    console.log(consoleType, 'MarkSDK init');
    // this.roomId = await this.storage.get('a11y_room_id') || '';
    this.initAconfig();
    this.createSocketIo();
    this.addMutationEvent();
    this.addStateChangeEvent();
    this.addLightEvent();
    // new AutoMark({
    //   sendRoomMessage: this.sendRoomMessage
    // });
  }

  destroy() {
    console.log(consoleType, 'MarkSDK destroy');
    this.wsIO?.disconnect();
    this.wsIO = null;
    this.observer?.disconnect();
    this.observer = null;
    this.removeStateChangeEvent();
    this.clearLight();
    this.removeLightEvent();
  }

  initAconfig() {
    console.log(consoleType, 'initAconfig');
    if (!this.product_id) {
      return;
    }
  }

  createSocketIo() {
    console.log(consoleType, 'createSocketIo');

    if (this.wsIO) {
      return;
    }
    const socket = io(wsOrigin, {
      // path: SOCKET_PATH,
      timeout: 2500,
      reconnectionDelay: 2000,
      reconnectionDelayMax: 10000,
      transports: ['websocket'],
    });
    this.wsIO = socket;

    socket.on('connect', () => {
      console.log(consoleType, 'on connect,socket', socket.id);
      this.isPolling = false;
      if (this.pollingTimer) {
        clearInterval(this.pollingTimer);
      }
      this.joinRoom();
    });
    socket.on('message', (message) => {
      console.log(consoleType, 'on message', message);
    });
    socket.on('room_message', (message) => {
      const { senderRole, socketId } = message;

      if (senderRole !== 'mark' && socketId !== this.wsIO.id) {
        return;
      }
      console.log(consoleType, 'on room_message', message);
      this.handleMessage(message);
    });
    socket.io.on('error', (err) => {
      if (isLarkPc) {
        return;
      }
      if (!this.isPolling) {
        this.isPolling = true;
        console.log(consoleType, 'event error', err);
        this.beginPolling();
      }
    });
  }

  beginPolling() {
    this.pollingTimer = setInterval(() => {
      this.initAconfig(true);
    }, 2500);
  }

  async joinRoom() {
    console.log(consoleType, 'joinRoom');
    // let token = this.roomId;
    // if (!token) {
    //   token = await this.storage.get('a11y_room_id') || '';
    // }
    // if (!token) {
    //   token = Math.random().toString(36).substring(7);
    //   await this.storage.set('a11y_room_id', token);
    // }
    // this.mountRoomId();
    // this.roomId = token;
    const message = {
      roomId: '',
      senderRole: 'sdk',
      path: this.path,
      product_id: this.product_id,
    };
    this.wsIO?.emit('join', message);
  }

  handleMessage(message) {
    const { type, socketId, senderRole, content, product_id } = message;

    // When entering the room for the first time, broadcast a request for cloud tags
    // 第一次进入房间时，广播请求云标签
    if (
      type === 'a11y_new_join' &&
      senderRole === 'sdk' &&
      socketId === this.wsIO.id
    ) {
      this.sendRoomMessage({
        type: 'a11y_request_config',
      });
    }

    // When detecting that the annotation side has entered the room, request the cloud tags from the annotation side
    // 当监听到标注侧进入房间时，向标注侧请求云标签
    if (type === 'a11y_new_join' && senderRole === 'mark') {
      this.sendRoomMessage({
        type: 'a11y_request_config',
        receiver: socketId,
      });
    }

    if (type === 'a11y_update_aconfig') {
      const { Aconfig } = content;
      if (product_id !== this.product_id) {
        return;
      }
      this.updateCallback(Aconfig);
    }

    if (type === 'a11y_calc_light') {
      if (product_id !== this.product_id) {
        return;
      }
      const { Aconfig, hightLightConfig } = content;
      this.calcLight(Aconfig, hightLightConfig);
    }

    if (type === 'a11y_request_dom_count') {
      if (product_id !== this.product_id) {
        return;
      }
      const { Aconfig } = content;
      this.updateDomCount(Aconfig);
    }

    if (
      type === 'a11y_destroy' ||
      (type === 'a11y_new_leave' && senderRole === 'mark')
    ) {
      this.clearLight();
    }
  }

  getPath() {
    const pathReg = /\/\d+\.\d+\.\d+\.\d+\/(.*)/;
    return pathReg.exec(location.pathname)?.[1] || location.pathname;
  }

  // mountRoomId() {
  //   console.log(consoleType, 'mountRoomId roomId', this.roomId);
  //   if (!this.roomId) {
  //     return;
  //   }

  //   window.A11yMarkSDK.roomId = this.roomId;

  //   console.log(consoleType, 'roomId:', this.roomId);

  //   const textarea = document.createElement('textarea');
  //   document.body.appendChild(textarea);
  //   textarea.style.position = 'fixed';
  //   textarea.style.width = '0';
  //   textarea.style.height = '0';
  //   textarea.style.top = '10px';
  //   textarea.value = this.roomId;
  //   textarea.select();
  //   document.execCommand('copy', true);
  //   document.body.removeChild(textarea);
  // }

  sendRoomMessage(params) {
    console.log(consoleType, 'sendRoomMessage', params);
    const { type, receiver, content } = params;
    this.wsIO?.emit('room_message', {
      type,
      receiver,
      content,
      product_id: this.product_id,
      roomId: '',
      path: this.path,
      senderRole: 'sdk',
    });
  }

  aconfigCheckPath(Aconfig) {
    let concatArr = [];
    Aconfig.forEach((page) => {
      if (page.route === '*' || new RegExp(page.route).test(this.path)) {
        concatArr = concatArr.concat(page.data);
      }
    });
    return new Set(concatArr);
  }

  updateDomCount(Aconfig) {
    console.log(consoleType, 'Aconfig', Aconfig);
    const AconfigEnable = this.aconfigCheckPath(Aconfig);
    Aconfig.forEach((page) => {
      page.data.forEach((config) => {
        const enable = AconfigEnable.has(config);
        if (!enable) {
          return;
        }
        if (!config._temp) {
          config._temp = {};
        }
        config._temp.domCount = getDomList(config).length;
      });
    });
    this.sendRoomMessage({
      type: 'a11y_update_dom_count',
      content: { Aconfig },
    });
  }

  calcLight(Aconfig, hightLightConfig) {
    removeExtAttrs();
    const AconfigEnable = this.aconfigCheckPath(Aconfig);
    Aconfig.forEach((page) => {
      page.data.forEach((config) => {
        const enable = AconfigEnable.has(config);
        if (!enable) {
          return;
        }
        const domList = getDomList(config);
        const actDomSet = new Set(getDomList(hightLightConfig));
        domList.forEach((dom) => {
          const pos = window.getComputedStyle(dom).position;
          if (pos === 'static') {
            dom.setAttribute('a11yExt_relative', '');
          }
          const { width, height } = dom.getBoundingClientRect();
          const size = Math.min(width, height);
          if (
            !(
              !config.attrs.tabindex ||
              config.disableAttrs?.indexOf('tabindex') >= 0
            )
          ) {
            dom.setAttribute('a11yExt_index', config.attrs.tabindex);
            if (size >= 60) {
              dom.setAttribute('a11yExt_per100', '');
            } else if (size >= 10) {
              dom.setAttribute('a11yExt_per60', '');
            } else {
              dom.setAttribute('a11yExt_per30', '');
            }
          }
          dom.setAttribute('a11yExt_cfg', '');
          if (actDomSet.has(dom)) {
            dom.setAttribute('a11yExt_active', '');
          }
          dom.aconfig = config;
        });
      });
    });
    // hover element
    // 当前 hover 元素
    this.hoverDom && this.hoverDom.setAttribute('a11yExt_active', '');
  }

  clearLight() {
    removeExtAttrs();
  }

  addMutationEvent() {
    const config = {
      attributes: false,
      childList: true,
      subtree: true,
      characterData: false,
    };
    const callback = throttle((mutationsList) => {
      // console.log(consoleType, 'mutation mutationsList', mutationsList);

      const mutationFlag = mutationsList?.filter(
        (mutation) => mutation.type === 'childList',
      )?.length;
      mutationFlag &&
        this.sendRoomMessage({
          type: 'a11y_dom_mutation',
        });
    }, 300);
    this.observer = new MutationObserver(callback);
    this.observer.observe(document.body, config);
  }

  stateEventCallback = () => {
    this.path = this.getPath();
  };

  addStateChangeEvent() {
    stateEvents.forEach((item) => {
      window.addEventListener(item, this.stateEventCallback);
    });
  }

  removeStateChangeEvent() {
    stateEvents.forEach((item) => {
      window.removeEventListener(item, this.stateEventCallback);
    });
  }

  addLightEvent() {
    document.addEventListener('touchstart', this.touchstart);
    document.addEventListener('touchend', this.touchend);
    document.addEventListener('keydown', this.keydown);
    document.body.addEventListener('mouseover', this.mouseover);
  }

  removeLightEvent() {
    document.removeEventListener('touchstart', this.touchstart);
    document.removeEventListener('touchend', this.touchend);
    document.removeEventListener('keydown', this.keydown);
    document.body.removeEventListener('mouseover', this.mouseover);
  }

  touchstart = (e) => {
    console.log(consoleType, 'touchstart', e);
    const { target } = e;
    this.touchElement = target;
    this.touchStartTime = Date.now();
  };

  touchend = (e) => {
    console.log(consoleType, 'touchend', e);
    const { target } = e;
    const touchEndTime = Date.now();
    if (
      target === this.touchElement &&
      this.touchStartTime &&
      touchEndTime - this.touchStartTime > 1000
    ) {
      console.log(consoleType, 'target', target);
      const config = this.getDomConfig(target);
      if (config) {
        this.sendRoomMessage({
          type: 'a11y_edit_selected_config',
          content: { config },
        });
      }
    }

    this.touchElement = null;
    this.touchStartTime = 0;
  };

  keydown = (e) => {
    const { shiftKey, keyCode } = e;
    if (shiftKey && keyCode === 69) {
      const config = this.hoverConfig;
      console.log(consoleType, 'hoverConfig', config);
      // const config = this.getDomConfig(document.activeElement);
      if (config) {
        this.sendRoomMessage({
          type: 'a11y_edit_selected_config',
          content: { config },
        });
      }
    }
  };

  mouseover = debounce((e) => {
    const config = this.getDomConfig(e.target);
    const dom = this.getDom(e.target);
    if (this.hoverDom && this.hoverDom !== dom) {
      this.hoverDom.removeAttribute('a11yExt_active', '');
    }
    if (dom) {
      dom.setAttribute('a11yExt_active', '');
    }
    this.hoverDom = dom;
    this.hoverConfig = config;
    if (config) {
      this.sendRoomMessage({
        type: 'a11y_hover_dom',
        content: { config },
      });
    }
  }, 100);

  getDomConfig = (dom) => {
    let curDom = dom;
    while (curDom && curDom !== document.body) {
      if (curDom.getAttribute('a11yExt_cfg') !== null) {
        break;
      }
      curDom = curDom.parentNode;
    }
    return curDom?.aconfig || null;
  };

  getDom = (dom) => {
    let curDom = dom;
    while (curDom && curDom !== document.body) {
      if (curDom.getAttribute('a11yExt_cfg') !== null) {
        break;
      }
      curDom = curDom.parentNode;
    }
    return curDom && curDom !== document.body ? curDom : null;
  };
}

window.A11yMarkSDK = MarkSDK;

export { MarkSDK };
