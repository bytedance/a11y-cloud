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
const { serverOrigin } = require('../../../../config/deployment.config');

export const submitMark = ({
  data: { product_id: producId, edit_time },
  delete_url_list,
  opType,
  editData,
  editPage,
  editType,
  pageId,
  platform,
}) => {
  if (opType === 2) {
    const sendPageconfig = JSON.parse(JSON.stringify(editPage));
    sendPageconfig[
      ['ios', 'android'].includes(platform) ? 'rules' : 'data'
    ].forEach((config) => {
      delete config._temp;
    });
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    // myHeaders.append("x-use-ppe", "1");
    // myHeaders.append("x-tt-env", "ppe_a11y");
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify({
        product_id: producId,
        page: sendPageconfig,
        type: editType,
        platform,
      }),
    };
    return fetch(`${serverOrigin}/submit_page_mark`, requestOptions).then(
      async (data) => {
        if (data.status === 401) {
          window.location.replace(
            `/login?returnTo=${encodeURIComponent(window.location.href)}`,
          );
        }
        return {
          httpCode: data.status,
          detail:
            data.status === 200 || data.status === 403 ? await data.json() : {},
        };
      },
    );
  } else if (opType === 1) {
    const sendLabel = JSON.parse(JSON.stringify(editData));
    delete sendLabel._temp;
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    // myHeaders.append("x-use-ppe", "1");
    // myHeaders.append("x-tt-env", "ppe_a11y");
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify({
        product_id: producId,
        label: sendLabel,
        delete_url_list,
        page_id: pageId,
        type: editType,
        platform,
      }),
    };
    return fetch(`${serverOrigin}/submit_label_mark`, requestOptions).then(
      async (data) => {
        if (data.status === 401) {
          window.location.replace(
            `/login?returnTo=${encodeURIComponent(window.location.href)}`,
          );
        }
        return {
          httpCode: data.status,
          detail:
            data.status === 200 || data.status === 403 ? await data.json() : {},
        };
      },
    );
  }
};

export const getDomList = (data, range = document) => {
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

export const findQuery = (target, config) => {
  if (getDomList(config).indexOf(target) !== -1) {
    return target;
  }
  return getDomList(config, target)[0];
};

export class Console {
  name = '[a11y]';
  constructor(name) {
    if (name) {
      this.name = name;
    }
  }
  log(...text) {
    window.console.log(this.name, ...text);
  }
  warn(...text) {
    window.console.warn(this.name, ...text);
  }
  error(...text) {
    window.console.error(this.name, ...text);
  }
}

export const getSystem = () => {
  const p = window.navigator.platform;
  if (p.indexOf('Mac') > -1) {
    return 'mac';
  }
  return 'windows';
};

export const console = new Console('[a11yExt]');

export const IsMacOS = getSystem() === 'mac';

export const debounce = (fn, t) => {
  let timer;
  function run(...arg) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn && fn.apply(this, arg);
    }, t);
  }
  run.clear = () => {
    if (timer) {
      clearTimeout(timer);
    }
  };
  return run;
};

export const throttle = (fn, t) => {
  let time = 0;
  return function (...arg) {
    const curT = new Date().getTime();
    if (curT - time < t) {
      return;
    }
    time = curT;
    fn && fn.apply(this, arg);
  };
};

export const zIndex = (num) => 2147000000 + num;

export const termMap = {
  1: {
    bool: true,
    check: 'exist',
  },
  2: {
    bool: false,
    check: 'exist',
  },
  3: {
    bool: true,
    check: 'number',
  },
  4: {
    bool: false,
    check: 'number',
  },
  5: {
    bool: true,
    check: 'existText',
  },
  6: {
    bool: false,
    check: 'existText',
  },
  7: {
    bool: true,
    check: 'matchReg',
  },
  8: {
    bool: false,
    check: 'matchReg',
  },
};

export const getTermIndex = (term) => {
  const { bool, check } = term;
  if (check === 'exist' && bool) {
    return 1;
  } else if (check === 'exist' && !bool) {
    return 2;
  } else if (check === 'number' && bool) {
    return 3;
  } else if (check === 'number' && !bool) {
    return 4;
  } else if (check === 'existText' && bool) {
    return 5;
  } else if (check === 'existText' && !bool) {
    return 6;
  } else if (check === 'matchReg' && bool) {
    return 7;
  } else if (check === 'matchReg' && !bool) {
    return 8;
  }
};

export const VALUE_TYPE_TERM_LIST = [5, 6, 7, 8];

export const removeExtAttrs = () => {
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

export const escapeRegExp = (stringToGoIntoTheRegex) =>
  stringToGoIntoTheRegex.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

export const findCurKey = (item) => {
  let key;
  if ('value' in item) {
    key = 'value';
  } else if ('query' in item) {
    key = 'query';
  } else if ('aid' in item) {
    key = 'aid';
  }
  return key;
};
export const compareVersion = (version1, version2) => {
  const newVersion1 =
    `${version1}`.split('.').length < 3
      ? `${version1}`.concat('.0')
      : `${version1}`;
  const newVersion2 =
    `${version2}`.split('.').length < 3
      ? `${version2}`.concat('.0')
      : `${version2}`;

  function toNum(a) {
    const c = a.toString().split('.');
    const num_place = ['', '0', '00', '000', '0000'];
    const r = num_place.reverse();
    for (let i = 0; i < c.length; i++) {
      const len = c[i].length;
      c[i] = r[len] + c[i];
    }
    return c.join('');
  }

  function checkPlugin(a, b) {
    const numA = toNum(a);
    const numB = toNum(b);
    return numA > numB ? 1 : numA < numB ? -1 : 0;
  }
  return checkPlugin(newVersion1, newVersion2);
};

export const roleList = [
  { value: 'alert' },
  { value: 'alertdialog' },
  { value: 'application' },
  { value: 'article' },
  { value: 'banner' },
  { value: 'button' },
  { value: 'cell' },
  { value: 'checkbox' },
  { value: 'columnheader' },
  { value: 'combobox' },
  { value: 'command' },
  { value: 'comment' },
  { value: 'complementary' },
  { value: 'composite' },
  { value: 'contentinfo' },
  { value: 'definition' },
  { value: 'dialog' },
  { value: 'document' },
  { value: 'feed' },
  { value: 'figure' },
  { value: 'form' },
  { value: 'generic' },
  { value: 'grid' },
  { value: 'gridcell' },
  { value: 'group' },
  { value: 'heading' },
  { value: 'img' },
  { value: 'input' },
  { value: 'landmark' },
  { value: 'link' },
  { value: 'list' },
  { value: 'listbox' },
  { value: 'listitem' },
  { value: 'log' },
  { value: 'main' },
  { value: 'mark' },
  { value: 'marquee' },
  { value: 'math' },
  { value: 'menu' },
  { value: 'menubar' },
  { value: 'menuitem' },
  { value: 'menuitemcheckbox' },
  { value: 'menuitemradio' },
  { value: 'meter' },
  { value: 'navigation' },
  { value: 'none' },
  { value: 'note' },
  { value: 'option' },
  { value: 'presentation' },
  { value: 'progressbar' },
  { value: 'radio' },
  { value: 'radiogroup' },
  { value: 'range' },
  { value: 'region' },
  { value: 'roletype' },
  { value: 'row' },
  { value: 'rowgroup' },
  { value: 'rowheader' },
  { value: 'scrollbar' },
  { value: 'search' },
  { value: 'searchbox' },
  { value: 'section' },
  { value: 'sectionhead' },
  { value: 'select' },
  { value: 'separator' },
  { value: 'slider' },
  { value: 'spinbutton' },
  { value: 'status' },
  { value: 'structure' },
  { value: 'suggestion' },
  { value: 'switch' },
  { value: 'tab' },
  { value: 'table' },
  { value: 'tablist' },
  { value: 'text' },
  { value: 'tabpanel' },
  { value: 'term' },
  { value: 'textbox' },
  { value: 'timer' },
  { value: 'toolbar' },
  { value: 'tooltip' },
  { value: 'tree' },
  { value: 'treegrid' },
  { value: 'widget' },
  { value: 'window' },
].map((item) => Object.assign(item, { label: item.value }));

export function getPageData(data, path, routeKey = 'lynxPath') {
  return data?.filter((item) => {
    if (Object.prototype.toString.call(item[routeKey]) === '[object Array]') {
      return item[routeKey].includes(path);
    } else {
      return item[routeKey] === path;
    }
  })[0];
}

export function isSamePage(dataLynxPath, path) {
  if (Object.prototype.toString.call(dataLynxPath) === '[object Array]') {
    return dataLynxPath.includes(path);
  } else {
    return dataLynxPath === path;
  }
}
