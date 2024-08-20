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
import { getDomList, findQuery } from '@/utils';
import { MarkSDK } from '@/index';

const { serverOrigin } = require('../../../config/deployment.config');
const consoleType = '[a11y]';

export class Accessibility {
  AconfigEnable = new Set(); // Active cloud tag（生效的云标签）
  Aconfig; // All cloud tag（所有云标签）
  setAttrWaiting = false; // Set Attribute Property Frequency Throttle Switch（设置属性频率截流开关）
  autoFocusList = new Set(); // Set auto focus DOMs（需要自动聚焦的元素）
  shouldFoucsDom = null; // Focus when set next attribute（在下一次setAttr时有需要被聚焦的元素）
  setAttrTimer; // Set property frequency throttle timer（设置属性频率截流定时器）
  setAttrSpace = 300; // Refresh timer（动态刷新间隔）
  observer; // Mutation Instance（mutation 实例）
  triggerDialogDom = []; // Stack of button components that trigger the pop-up window（唤起弹窗的按钮组件栈）

  constructor() {
    window.a11yConfigs.SdkInstance = this;
    if (!window.requestIdleCallback) {
      window.requestIdleCallback = (cb) => cb();
    }
    this.init();
  }

  // Get cloud-tag data from CDN（从CDN获取云标签数据）
  async setAconfigFromCDN() {
    if (this.Aconfig) {
      return true;
    }
    const cdnRes = await fetch(`${serverOrigin}/get_a11y_data?
      product_id=${window.location.host}
    `).catch(() => ({ status: 4 }));
    const Aconfig = (await cdnRes.json()).data;
    if (!Array.isArray(Aconfig)) {
      return false;
    }
    return true;
  }

  async init() {
    const isMarkMode = localStorage.getItem('a11y_mark_test') === '1';
    const initCb = () => {
      window.addEventListener('message', this.messageCallback);
      this.open();
      this.proxyHistoryEvent();
      // const { OpenType } = window.a11yConfigs;
      // if (OpenType === 1 && livea11y) {
      //   livea11y.innerText = '读屏标签已加载';
      //   if (opena11y) {
      //     opena11y.innerText = '读屏标签已加载';
      //   }
      // }
      window.a11yConfigs.OpenStatus = 2;
      // if (this.swiperObProduct) {
      //   window.a11ySwitch = true; // 抖音web根据无障碍开启取消tab禁用
      // }
      window.a11ySwitch = true;
    };
    const tabEvt = async (evt) => {
      if (evt.code !== 'Tab') {
        return;
      }
      window.removeEventListener('keydown', tabEvt, true);

      // const livea11y = document.querySelector('#a11y-live-assertive');
      // const opena11y = document.querySelector('#a11y-open-btn');
      if (isMarkMode) {
        this.markSDK = new MarkSDK({
          updateCallback: (Aconfig) => {
            if (!this.Aconfig) {
              this.Aconfig = Aconfig;
              initCb();
            } else {
              this.Aconfig = Aconfig;
              this.aconfigCheckPath(true);
            }
          },
          product_id: window.location.host,
        });
        this.markSDK.init();
      } else {
        const cdnStatus = await this.setAconfigFromCDN();
        if (cdnStatus) {
          initCb();
        }
      }
    };
    if (this.Aconfig || isMarkMode) {
      tabEvt({ code: 'Tab' });
    } else {
      window.addEventListener('keydown', tabEvt, true);
    }
  }

  // Check if the current URL matches the cloud tag path
  // 检查当前url与云标签path是否匹配
  aconfigCheckPath = (update) => {
    let concatArr = [];
    this.Aconfig.forEach((page) => {
      if (
        page.route === '*' ||
        new RegExp(page.route).test(window.location.href)
      ) {
        concatArr = concatArr.concat(page.data);
      }
    });
    this.AconfigEnable = new Set(concatArr);
    this.autoFocusList = new Set();
    for (const config of concatArr) {
      if (config.attrs.role === 'dialog' || config.autoFocus) {
        this.autoFocusList.add(config);
      }
    }
    if (update) {
      this.setAriaAttr();
    }
  };

  // Receive messages from the Chrome annotation plugin to debug the cloud tag, and update in real-time
  // 接收chrome标注插件发送消息调试云标签，实时更新
  messageCallback = (req) => {
    if (req.data?.type === 'a11y_update_aconfig') {
      this.Aconfig = req.data.Aconfig;
      this.aconfigCheckPath(true);
    }
  };

  // destroy instance & remove listener
  // 销毁实例，移除监听器
  destroy() {
    window.removeEventListener('message', this.messageCallback);
    this.observer?.disconnect();
    clearTimeout(this.setAttrTimer);
    window.removeEventListener('pushState', this.aconfigCheckPath);
    window.removeEventListener('replaceState', this.aconfigCheckPath);
    window.removeEventListener('popstate', this.aconfigCheckPath);
    window.removeEventListener('hashchange', this.aconfigCheckPath);
  }
  // Monitor any changes to the page URL
  // 监听页面url的任何变化
  proxyHistoryEvent() {
    const historyWrap = function (type) {
      const orig = window.history[type];
      const e = new Event(type);
      return function () {
        const rv = orig.apply(this, arguments);
        e.arguments = arguments;
        window.dispatchEvent(e);
        return rv;
      };
    };
    window.history.pushState = historyWrap('pushState');
    window.history.replaceState = historyWrap('replaceState');
    window.addEventListener('pushState', this.aconfigCheckPath);
    window.addEventListener('replaceState', this.aconfigCheckPath);
    window.addEventListener('popstate', this.aconfigCheckPath);
    window.addEventListener('hashchange', this.aconfigCheckPath);
  }

  // On first entry, refresh all accessibility properties and enable MutationObserver
  // 首次进入刷新所有无障碍属性，并开启 MutationObserver
  open() {
    this.aconfigCheckPath();
    // let defaultFocus = null;
    // let firstShow = true;
    // for(const config of this.Aconfig) {
    //   if (config.defaultFocus) {
    //     defaultFocus = config;
    //   }
    // }
    this.setAriaAttr();
    const config = {
      attributes: false,
      childList: true,
      subtree: true,
      characterData: true,
    };
    const callback = (mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
          const addNodes = Array.from(mutation.addedNodes);
          const removedNodes = Array.from(mutation.removedNodes);
          if (addNodes.length >= 1) {
            addNodes.forEach((domtree) => {
              this.autoFocusList.forEach((configFocus) => {
                const dom = getDomList(configFocus)[0];
                if (domtree.contains(dom)) {
                  this.shouldFoucsDom = {
                    config: configFocus,
                    dom,
                  };
                }
              });
            });
            this.setAriaAttr();
          }
          if (removedNodes.length >= 1) {
            this.recoverFocus(removedNodes);
          }
        } else if (mutation.type === 'characterData') {
          this.setAriaAttr();
        }
      }
    };
    this.observer = new MutationObserver(callback);
    this.observer.observe(document.body, config);
    console.log(consoleType, 'finish opening');
    // if (document.querySelector(defaultFocus)) {
    //   document.querySelector(defaultFocus).focus();
    // }
  }

  // Parse DSL: After the pop-up window is closed, refocus on the button that triggered it
  // 解析DSL：弹窗关闭后，重新聚焦到唤起的按钮
  recoverFocus(removedNodes) {
    const len = this.triggerDialogDom.length;
    if (!len) {
      return;
    }
    for (let node of removedNodes) {
      const lastDialog = this.triggerDialogDom[len - 1];
      if (node.contains(lastDialog.target)) {
        if (lastDialog.from.parentNode) {
          lastDialog.from.focus();
        }
        this.triggerDialogDom.pop();
        this.setAriaAttr();
        return;
      }
    }
  }

  // Parse：aria-label
  // 解析：aria-label
  calcLabel(target, config) {
    const labelCfg = config.calcAttrs.label || [];
    let ariaLabel = '';
    labelCfg.forEach((row) => {
      const { list = [], terms = [] } = row;
      for (const term of terms) {
        const { check, bool } = term;
        if (check === 'exist') {
          const dom = findQuery(target, term);
          if ((!dom && bool) || (dom && !bool)) {
            return;
          }
        } else if (check === 'number') {
          const dom = findQuery(target, term);
          if (!dom && bool) {
            return;
          }
          const numberText = dom ? dom.innerText : '';
          const reg = /^[0-9]+\.?[0-9]*$/;
          if (
            (!reg.test(numberText) && bool) ||
            (reg.test(numberText) && !bool)
          ) {
            return;
          }
        }
      }
      const mapText = (dom, map) => {
        if (map) {
          if (map.type === 'attr') {
            const attrVal = dom.getAttribute(map.attr);
            if (attrVal) {
              for (const matchKey in map.match) {
                if (attrVal.match(matchKey)) {
                  const matchTemplate = map.match[matchKey];
                  const matchText = matchTemplate.replace(
                    '{self}',
                    dom.innerText,
                  );
                  return matchText;
                }
              }
            }
          }
        }
        return dom.innerText;
      };
      list.forEach((item) => {
        const { value, opt, map } = item;
        let text = '';
        if (value) {
          text = value;
        } else {
          const dom = findQuery(target, item);
          if (dom) {
            text = mapText(dom, map);
          }
        }
        if (opt === '-') {
          ariaLabel = ariaLabel.replace(text, '');
        } else {
          ariaLabel += text;
        }
      });
      ariaLabel += '，';
    });
    ariaLabel = ariaLabel.slice(0, ariaLabel.length - 1);
    target.setAttribute('aria-label', ariaLabel);
  }

  // Replay all cloud tag configurations, cyclically parse the DSL, and control the focus based on the configuration rules
  // 回放所有的云标签配置，循环进行解析DSL，同时根据配置规则控制焦点
  setAriaAttr() {
    if (this.setAttrWaiting) {
      return;
    }
    this.setAttrWaiting = true;
    this.setAttrTimer = setTimeout(() => {
      window.requestIdleCallback(() => {
        const startTime = new Date();
        this.Aconfig.forEach((page) => {
          page.data.forEach((config) => {
            const configDom = getDomList(config);
            const enable = this.AconfigEnable.has(config);
            for (const target of configDom) {
              config.attrs &&
                Object.keys(config.attrs).forEach((key) => {
                  if ((config.disableAttrs || []).indexOf(key) !== -1) {
                    return;
                  }
                  if (enable) {
                    const value = config.attrs[key];
                    if (key === 'tabindex' && target.a11yDisable) {
                      target.a11yTabindex = value;
                    } else {
                      if (value) {
                        target.setAttribute(key, value);
                      } else {
                        target.removeAttribute(key);
                      }
                    }
                    if (this.triggerDialogDom.length) {
                      if (
                        !this.triggerDialogDom[
                          this.triggerDialogDom.length - 1
                        ].target.contains(target)
                      ) {
                        target.setAttribute('tabindex', '-1');
                      }
                    }
                  } else {
                    target.removeAttribute(key);
                  }
                });
              config.calcAttrs &&
                Object.keys(config.calcAttrs).forEach((key) => {
                  if ((config.disableAttrs || []).indexOf(key) !== -1) {
                    return;
                  }
                  switch (key) {
                    case 'label':
                      if (enable) {
                        this.calcLabel(target, config);
                      } else {
                        target.removeAttribute('aria-label');
                      }
                      break;
                  }
                });
              if (config.hiddenChildren) {
                target.setAttribute('aria-hidden', 'true');
              }
            }

            if (this.shouldFoucsDom) {
              const { dom, config: focusConfig } = this.shouldFoucsDom;
              if (focusConfig.attrs.role === 'dialog') {
                this.triggerDialogDom.push({
                  from: document.activeElement,
                  target: dom,
                });
              }
              this.shouldFoucsDom = null;
              setTimeout(() => {
                dom.focus();
                this.setAriaAttr();
              }, 0);
            }
          });
        });
        const useTime = Math.min((new Date() - startTime) * 2, 1600);
        this.setAttrSpace = Math.max(300, useTime);
        this.setAttrWaiting = false;
      });
    }, this.setAttrSpace);
  }

  setTabindexDisable(dom, disable = true) {
    const changeTabindex = (d) => {
      if (disable) {
        if (!d.a11yDisable) {
          d.a11yDisable = true;
          d.a11yTabindex = d.getAttribute('tabindex');
          d.setAttribute('tabindex', '-1');
        }
      } else {
        delete d.a11yDisable;
        if (d.a11yTabindex) {
          d.setAttribute('tabindex', d.a11yTabindex);
        } else {
          d.removeAttribute('tabindex');
        }
        delete d.a11yTabindex;
      }
    };
    if (dom instanceof HTMLElement) {
      changeTabindex(dom);
      const iterator = document.createTreeWalker(dom, NodeFilter.SHOW_ELEMENT);
      let node = iterator.nextNode();
      while (node !== null) {
        changeTabindex(node);
        node = iterator.nextNode();
      }
    }
  }
}
