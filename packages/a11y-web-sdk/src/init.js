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
import { Accessibility } from '@/accessibility';

const consoleType = '[a11y]';
export default class A11yCloud {
  configs;
  isInit;

  init() {
    try {
      if (this.isInit) {
        return;
      }
      this.isInit = true;
      if (document.body) {
        if (!localStorage.getItem('a11y_device_id')) {
          localStorage.setItem(
            'a11y_device_id',
            Math.random().toString(36).substring(2),
          );
        }
        this.loadOpener();
      }
    } catch (e) {
      console.log(consoleType, e);
    }
  }

  isOpen() {
    const a11yOpener = localStorage.getItem('a11y_switch1');
    if (!a11yOpener) {
      return false;
    }
    if (new Date().getTime() > Number(a11yOpener)) {
      localStorage.removeItem('a11y_switch1');
      return false;
    }
    return true;
  }

  liveReader() {
    const livea11y = document.getElementById('a11y-live-assertive1');
    if (!livea11y) {
      return;
    }
    for (const text of Array.from(arguments)) {
      if (livea11y.innerText !== text) {
        livea11y.innerText = text;
        break;
      }
    }
  }

  loadOpener() {
    window.a11yConfigs = {
      InitInstance: this,
      OpenStatus: 0,
    };
    const hiddenBtnStyle =
      'position:fixed;z-index:-1;left:0;top:0;width:0;height:0;opacity:0;';

    const livea11y = document.createElement('div');
    livea11y.style = hiddenBtnStyle;
    livea11y.id = 'a11y-live-assertive1';
    livea11y.setAttribute('aria-live', 'assertive');
    document.body.insertBefore(livea11y, document.body.firstChild);

    const opena11y = document.createElement('button');
    opena11y.style = hiddenBtnStyle;
    opena11y.id = 'a11y-open-btn';
    opena11y.setAttribute('tabindex', '1');
    document.body.insertBefore(opena11y, document.body.firstChild);

    const changeText = (type = 0) => {
      if (type === 1) {
        opena11y.innerText = '关闭读屏标签';
        livea11y.innerText = '读屏标签已加载';
      } else {
        opena11y.innerText = '开启读屏标签';
        livea11y.innerText = '读屏标签已关闭';
      }
    };

    const setA11ySwitch = () => {
      const day = 1;
      localStorage.setItem(
        'a11y_switch1',
        (new Date().getTime() + day * 24 * 60 * 60 * 1000).toString(),
      );
    };

    const initAria = () => {
      if (window.a11yConfigs.OpenStatus === 0) {
        window.a11yConfigs.OpenStatus = 1;
        console.log(consoleType, 'opening...');
        this.getSdkUrl();
      }
    };

    if (this.isOpen()) {
      changeText(1);
      initAria();
    } else {
      changeText(0);
    }

    const trigger = () => {
      if (this.isOpen()) {
        changeText();
        localStorage.removeItem('a11y_switch1');
      } else {
        changeText(1);
        setA11ySwitch();
      }
      initAria();
    };

    opena11y.addEventListener(
      'click',
      () => {
        try {
          trigger();
        } catch (e) {
          console.log(consoleType, e);
        }
      },
      false,
    );

    window.addEventListener(
      'keydown',
      (evt) => {
        try {
          if (evt.ctrlKey && evt.keyCode === 192) {
            trigger();
          }
        } catch (e) {
          console.log(consoleType, e);
        }
      },
      true,
    );
  }

  async getSdkUrl() {
    try {
      new Accessibility();
    } catch (e) {
      console.log(consoleType, e);
      return;
    }
  }
}

if (window.fetch) {
  window.localStorage.setItem('a11y_switch1', '4095273600000');
  window.localStorage.setItem('a11y_mark_test', '1');
  const a11y = new A11yCloud();
  a11y.init();
}
