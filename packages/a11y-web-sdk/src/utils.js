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
  return getDomList(config, config?.scope === 1 ? document : target)[0];
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

export const debounce = (fn, t) => {
  let timer;
  function run (...arg) {
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
  let timer = null;

  return function (...arg) {
    if (timer) {
      return;
    }

    timer = setTimeout(() => {
      fn && fn.apply(this, arg);
      timer = null;
    }, t);
  };
};

