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
import { debounce, console } from './utils';

class DynamicHighlight {
  hightLightConfig;

  constructor() {
    window.dynamicHighlight = this;
  }

  destroy() {
    window.markSocket?.sendRoomMessage({
      type: 'a11y_destroy',
    });
    window.markSocket?.disconnect();
  }

  calcLight = ({ receiver, product_id, Aconfig }) => {
    console.log('calcLight', { receiver, product_id, Aconfig });
    window.markSocket?.sendRoomMessage({
      type: 'a11y_calc_light',
      product_id,
      receiver,
      content: { Aconfig, hightLightConfig: this.hightLightConfig },
    });
  };

  requestDomCount = debounce(({ receiver, product_id, Aconfig }) => {
    console.log('requestDomCount', { receiver, product_id, Aconfig });
    window.markSocket?.sendRoomMessage({
      type: 'a11y_request_dom_count',
      product_id,
      receiver,
      content: { Aconfig },
    });
  }, 100);

  updateDomCount(params) {
    const { Aconfig, thisAconfig, path } = params;
    console.log('temp Aconfig, thisAconfig, path', Aconfig, thisAconfig, path);
    if (!Aconfig || !thisAconfig) {
      return;
    }
    const accessLabels = [];
    const AconfigEnable = this.aconfigCheckPath(thisAconfig, path);
    thisAconfig.forEach((page, pageIndex) => {
      page.data.forEach((config, itemIndex) => {
        const enable = AconfigEnable.has(config);
        if (!enable) {
          return;
        }
        config._temp.domCount = Aconfig[pageIndex]?.data?.[itemIndex]?._temp?.domCount;

        if (config._temp.domCount > 0) {
          accessLabels.push(config);
        }
      });
    });
    return accessLabels;
  }

  lightHoverDom(params) {
    const { product_id, Aconfig, hightLightConfig } = params;
    if (hightLightConfig === this.hightLightConfig) {
      return;
    }
    this.hightLightConfig = hightLightConfig;
    this.calcLight({ product_id, Aconfig });
  }

  aconfigCheckPath(Aconfig, path) {
    let concatArr = [];
    Aconfig.forEach(page => {
      if (page.route === '*' || new RegExp(page.route).test(path)) {
        concatArr = concatArr.concat(page.data);
      }
    });
    return new Set(concatArr);
  }
}

export default DynamicHighlight;