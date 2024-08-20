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
export const a11y_cloud_DSL_DEMO = {
  'desc': '会话列表 - 单个会话条目',       // 云标签描述
  'attrs': {                    // 直接将attrs内的属性设置在目标元素上
    'role': 'listitem',
    'tabindex': '0'
  },
  'aid': 'sdf23s',                        // 目标云标签选择器（通过a11y-id）
  'query': '.btn',                        // 目标云标签选择器（通过css Selector）
  'calcAttrs': {
    'label': [                                // 句子
      {                                     // 单词
        'list': [                         // 片段
          {
            'query': '.avatar-tag',    // 元素片段选择器（通过css Selector）
            'scope': 1    // 元素选择器作用域，默认为子节点搜索，1为全局
          }
        ]
      },
      {                                     // 片段
        'list': [
          {
            'aid': 'd3dsfvs',       // 元素片段选择器（通过a11y-id）
            'map': {               // 通过识别属性字段映射读屏文案
              'type': 'attr',
              'attr': 'src',
              'match': {
                'aaa.jpg': '已读'
              }
            }
          },
          {
            'value': '条未读',    // 固定文案
            'opt': '-'           // 拼接方式，默认追加，"-"为删减文案
          }
        ],
        'terms': [
          {
            'bool': true,
            'check': 'number',    // exist/number
            'query': 'm09out'
          }
        ]
      }
    ]
  },
  'disableAttrs': []
};