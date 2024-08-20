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
module.exports = {
  data: [
    {
      route: '*',
      _id: '7301993979497924645',
      data: [
        {
          desc: '评论内容',
          attrs: {
            tabindex: '0',
            'aria-hidden': 'true',
          },
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query:
                      '.xzjbH9pV .VjrdhTqP .F7ubq_7y.HfWacTUC .oUPTYnUM.comment-item-info-wrap .b2riW_HJ .ax6MlHvK .hY8lWHgA span .j5WZzJdp.E7y2ZDk0 span span span span',
                  },
                  {
                    value: '，在',
                  },
                  {
                    query:
                      '.xzjbH9pV .VjrdhTqP .F7ubq_7y.HfWacTUC .GOkWHE6S span',
                  },
                  {
                    value: '评论，文字内容：',
                  },
                  {
                    query:
                      '.xzjbH9pV .VjrdhTqP .F7ubq_7y.HfWacTUC .LvAtyU_f .sU2yAQQU span .j5WZzJdp span span span span',
                  },
                  {
                    value: '，图片内容：',
                  },
                  {
                    query:
                      '.xzjbH9pV .VjrdhTqP .F7ubq_7y.HfWacTUC .LvAtyU_f .mSFR8H0D .tHnrVm8U.MsjpljmI .KmtK5Tva .AXaKGat3.IMPvx05u',
                    target: 'llm',
                  },
                  {
                    value: '，共',
                  },
                  {
                    query:
                      '.xzjbH9pV .VjrdhTqP .F7ubq_7y.HfWacTUC .qfuN5lMO .AK8I6J9Z.XxZglyYd.comment-item-stats-container .TRWauD80.zEsK61S1 .wiQmZrKV span',
                  },
                  {
                    value: '人点赞，',
                  },
                  {
                    query:
                      '.xzjbH9pV .VjrdhTqP .jlqd8usT.comment-reply-expand-btn .VZWu521O span',
                  },
                ],
              },
            ],
          },
          query: '.xzjbH9pV',
          _id: 'n8h6q-1710837526010',
        },
        {
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '用户',
                  },
                  {
                    query: '.j5WZzJdp > span > span > span > span',
                  },
                  {
                    value: '在',
                  },
                  {
                    query: '.GOkWHE6S > span',
                  },
                  {
                    value: '评论：',
                  },
                  {
                    query: '.j5WZzJdp > span > span > span',
                  },
                  {
                    value: '，包含图片',
                  },
                  {
                    query: '.RlLOO79h',
                    target: 'llm',
                  },
                  {
                    query: '.wiQmZrKV > span',
                  },
                  {
                    value: '人点赞',
                  },
                ],
              },
            ],
          },
          query: '.xzjbH9pV====',
          _id: '1x9s8n-1709641744679',
          attrs: {
            tabindex: 0,
          },
        },
        {
          _id: 'kf2h3m-1703003087537',
          desc: '视频侧边栏：关注按钮',
          attrs: {
            role: 'button',
            tabindex: '0',
          },
          query: '.t6VrNKJ0 .B10aL8VQ',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '关注',
                  },
                ],
                terms: [
                  {
                    check: 'exist',
                    query: '.vMQD6aai',
                    bool: true,
                  },
                ],
              },
              {
                list: [
                  {
                    value: '取消关注',
                  },
                ],
                terms: [
                  {
                    query: '.vMQD6aai',
                    bool: false,
                    check: 'exist',
                  },
                ],
              },
            ],
          },
        },
        {
          _id: '0b2njh-1703003087537',
          desc: '视频侧边栏：评论输入框',
          query: '.DraftEditor-root',
          attrs: {
            tabindex: '0',
          },
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '评论输入框',
                  },
                ],
              },
            ],
          },
        },
        {
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '搜索你感兴趣的内容',
                  },
                ],
              },
            ],
          },
          _id: '3c4poi-1703003087537',
          desc: 'banner-搜索框',
          attrs: {
            tabindex: '0',
            role: 'input',
          },
          query: '.igFQqPKs',
        },
        {
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '返回抖音主页',
                  },
                ],
              },
            ],
          },
          _id: 'kqrxfe-1703003087537',
          desc: '直播间：返回抖音主页',
          attrs: {
            role: 'link',
            tabindex: '0',
          },
          query: '.sfZOz62F',
        },
        {
          query: '.SF3pU6By .zoqF3hZ1',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.zoqF3hZ1',
                  },
                ],
              },
            ],
          },
          _id: 'qd6vz7-1703003087537',
          desc: '搜索：抖音热榜item',
          attrs: {
            role: 'link',
            tabindex: '0',
          },
        },
        {
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '回复评论',
                  },
                ],
              },
            ],
          },
          _id: 'fn2pya-1703003087537',
          desc: '回复评论',
          attrs: {
            tabindex: '0',
            role: 'button',
          },
          query: '.NvTzAVts',
        },
        {
          query: '.VK6ualeA',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.je43h7sY',
                  },
                  {
                    value: '视频',
                  },
                ],
              },
              {
                list: [
                  {
                    query: '.jjKJTf4P',
                  },
                  {
                    value: '人点赞',
                  },
                ],
              },
            ],
          },
          _id: 'rpzzbq-1703003087537',
          desc: '视频侧边栏：视频item',
          attrs: {
            tabindex: '0',
          },
        },
        {
          desc: '视频弹窗',
          attrs: {
            tabindex: '0',
            role: 'dialog',
          },
          query: '.Hk7Yo3Ed',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '视频',
                  },
                ],
              },
            ],
          },
          _id: 'b67uvf-1703003087537',
        },
        {
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '打开作者主页',
                  },
                ],
              },
            ],
          },
          _id: '0pmzc9-1703003087537',
          desc: '放映厅：作者链接',
          attrs: {
            tabindex: '0',
            role: 'link',
          },
          query: '.Pp4BruLD .B3AsdZT9',
        },
        {
          attrs: {
            role: 'button',
            tabindex: '0',
          },
          query: '.dy-account-close',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '关闭登录框',
                  },
                ],
              },
            ],
          },
          _id: 'ggh4lb-1703003087537',
          desc: '登陆框：关闭按钮',
        },
        {
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.B3AsdZT9',
                  },
                ],
              },
              {
                list: [
                  {
                    query: '.GsuT_hjh',
                  },
                ],
              },
            ],
          },
          _id: 'mgpmvs-1703003087537',
          desc: '热点：热榜item',
          attrs: {
            role: 'link',
            tabindex: '0',
          },
          query: '.hMNE3E7I .BHgRhxNh',
        },
        {
          desc: '主菜单：链接item',
          attrs: {
            tabindex: '0',
            role: 'link',
          },
          query: '.HLKZ9U4X .B3AsdZT9',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.B3AsdZT9',
                  },
                ],
              },
            ],
          },
          _id: 'vqdos-1703003087537',
        },
        {
          desc: '关注：发表评论按钮',
          attrs: {
            role: 'button',
            tabindex: '0',
          },
          query: '.OGIa7O6a',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '发表评论',
                  },
                ],
              },
            ],
          },
          disableAttrs: [],
          _id: 'n6meq-1703003087537',
        },
        {
          _id: 'miggm9-1703003087537',
          desc: '搜索：二级菜单tab',
          attrs: {
            tabindex: '0',
          },
          query: '.Tw44MG9s',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.Tw44MG9s',
                  },
                ],
              },
            ],
          },
        },
        {
          hiddenChildren: true,
          _id: '865yvf-1703003087537',
          desc: '导航栏链接隐藏',
          attrs: {
            tabindex: '-1',
          },
          query: '.wQmC940F',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '',
                  },
                ],
              },
            ],
          },
          disableAttrs: ['label'],
        },
        {
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.HzHqxWVm',
                  },
                ],
              },
              {
                list: [
                  {
                    query: '.eWllZSWV',
                  },
                ],
              },
            ],
          },
          disableAttrs: ['role'],
          _id: 'kksex7-1703003087537',
          desc: '放映厅：视频内容',
          attrs: {
            role: '',
            tabindex: '0',
          },
          query: '.dLEM7yPS',
        },
        {
          _id: 'yjn5ac-1703003087537',
          desc: '直播间：标题',
          attrs: {
            tabindex: '0',
          },
          query: '.ZWzkmVza',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.cgFXa7ct',
                  },
                ],
              },
              {
                list: [
                  {
                    query: '.m3lpRfsY',
                  },
                  {
                    query: '人在线',
                  },
                ],
              },
              {
                list: [
                  {
                    value: '主播：',
                  },
                  {
                    query: '.zJ7EJM5c',
                  },
                ],
              },
            ],
          },
        },
        {
          _id: 'frvsg-1703003087537',
          desc: '视频详情：推荐视频标题',
          attrs: {
            tabindex: '0',
          },
          query: '.r3zuuG3C',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.kseoAw3U',
                  },
                ],
              },
            ],
          },
        },
        {
          _id: '9fmz62f-1703003087537',
          desc: '放映厅：观看历史',
          attrs: {
            tabindex: '0',
            role: 'link',
          },
          query: '.xClihOqV',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '观看历史',
                  },
                ],
              },
            ],
          },
        },
        {
          query: '.X9XrWxV7',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '弹幕',
                  },
                ],
              },
            ],
          },
          _id: 'wh77s9-1703003087537',
          desc: '直播间：弹幕区',
          attrs: {
            tabindex: '0',
            role: 'complementary',
          },
        },
        {
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.zGy2VrQq',
                  },
                ],
              },
              {
                list: [
                  {
                    query: '.lsZ5I2jg',
                  },
                ],
              },
            ],
          },
          _id: 'f4xgd-1703003087537',
          desc: '放映厅：节目简介',
          attrs: {
            tabindex: '0',
          },
          query: '.fna5R7SM',
        },
        {
          desc: 'banner-菜单',
          attrs: {
            role: 'menu',
            tabindex: '0',
          },
          query: '.lC4tlkED',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: 'banner菜单',
                  },
                ],
              },
            ],
          },
          _id: 'ale44h-1703003087537',
        },
        {
          query: '.HFTtyIME',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '点击切换直播间',
                  },
                ],
              },
              {
                list: [
                  {
                    value: '标题',
                  },
                ],
              },
              {
                list: [
                  {
                    query: '.qQTHepPa',
                  },
                ],
              },
            ],
          },
          disableAttrs: ['role'],
          _id: 'yob967-1703003087537',
          desc: '直播：侧边栏直播间',
          attrs: {
            tabindex: '0',
            role: '',
          },
        },
        {
          query: '.jtyFqENC',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: 'jtyFqENC',
                  },
                  {
                    value: '人点赞评论',
                  },
                ],
              },
            ],
          },
          _id: 'a6qdi-1703003087537',
          desc: '点赞评论',
          attrs: {
            role: 'button',
            tabindex: '0',
          },
        },
        {
          desc: '首页：抖音热榜item',
          attrs: {
            tabindex: '0',
          },
          query: '.xJD9icEc .B3AsdZT9',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.R6Mjb818',
                  },
                ],
              },
              {
                list: [
                  {
                    query: '.dVMxIfS8',
                  },
                ],
              },
            ],
          },
          _id: 'dhkj2x-1703003087537',
        },
        {
          desc: '通知框',
          attrs: {
            role: '',
            tabindex: '0',
          },
          query: '.GykJNvQ5',
          autoFocus: true,
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '通知框',
                  },
                ],
              },
            ],
          },
          disableAttrs: ['role'],
          _id: 'ih24va-1703003087537',
        },
        {
          attrs: {
            tabindex: '0',
          },
          query: '.d9a7mo9v',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.d9a7mo9v',
                  },
                ],
              },
            ],
          },
          _id: 'o3acj-1703003087537',
          desc: '首页：编辑精选列表项',
        },
        {
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.lkxAA716',
                  },
                ],
              },
            ],
          },
          _id: 'yxiss-1703003087537',
          desc: '搜索：抖音热榜',
          attrs: {
            role: 'list',
            tabindex: '0',
          },
          query: '.SF3pU6By',
        },
        {
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.rmEibxTi',
                  },
                  {
                    query: 'button',
                    opt: '-',
                  },
                ],
              },
            ],
          },
          _id: 'deobf-1703003087537',
          desc: '通知：消息',
          attrs: {
            tabindex: '0',
          },
          query: '.rmEibxTi',
        },
        {
          desc: '视频，音量按钮',
          attrs: {
            role: 'none',
            tabindex: '0',
          },
          query: '.xgplayer-volume',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '通过shift加减组合键调整音量',
                  },
                ],
              },
            ],
          },
          disableAttrs: ['role'],
          _id: '9ulev-1703003087537',
        },
        {
          query: '.web-login-area-code__input-wrapper__input',
          calcAttrs: {},
          _id: '30auis-1703003087537',
          desc: '登录框，选国家禁用',
          attrs: {
            tabindex: '-1',
          },
        },
        {
          query: '.TrQGad_d',
          autoFocus: true,
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '私信：弹窗',
                  },
                ],
              },
            ],
          },
          _id: 'jgj8ad-1703003087537',
          desc: '私信：弹窗',
          attrs: {
            tabindex: '0',
          },
        },
        {
          _id: 'lb35rb-1703003087537',
          desc: '视频侧边栏：tab',
          attrs: {
            tabindex: '0',
          },
          query: '.zRLIVppw',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.zRLIVppw',
                  },
                ],
              },
            ],
          },
        },
        {
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '视频侧边栏',
                  },
                ],
              },
            ],
          },
          disableAttrs: [],
          _id: 't9klmu-1703003087537',
          desc: '视频侧边栏',
          attrs: {
            tabindex: '0',
          },
          query: '#videoSideBar',
        },
        {
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '查看',
                  },
                  {
                    query: '.J9zL1Z55',
                  },
                  {
                    value: '主页',
                  },
                ],
              },
            ],
          },
          _id: '5775zf-1703003087537',
          desc: '首页：猜你喜欢查看作者',
          attrs: {
            tabindex: '0',
            role: 'link',
          },
          query: '.NSXS9tqw',
        },
        {
          query: '.QMqJQ9ub',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.dIG7opeF',
                  },
                ],
              },
              {
                list: [
                  {
                    value: '作者',
                  },
                ],
              },
              {
                list: [
                  {
                    query: '.haF9cvlj',
                  },
                ],
              },
              {
                list: [
                  {
                    value: '观看人数',
                  },
                  {
                    query: '.LzWLVBx2',
                  },
                ],
              },
              {
                list: [
                  {
                    query: '点击进入',
                  },
                ],
              },
            ],
          },
          _id: '57cbi-1703003087537',
          desc: '直播：点击进入直播',
          attrs: {
            role: 'link',
            tabindex: '0',
          },
        },
        {
          query: '#qdblhsHs .B10aL8VQ',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '登陆',
                  },
                ],
              },
            ],
          },
          disableAttrs: [],
          _id: 'kgpznn-1703003087537',
          desc: '登陆按钮',
          attrs: {
            tabindex: '0',
            role: 'button',
          },
        },
        {
          _id: '93gzhs-1703003087537',
          desc: '首页：查看更多精选视频',
          attrs: {
            role: 'button',
            tabindex: '0',
          },
          query: '.twVc54Uy',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.twVc54Uy',
                  },
                ],
              },
            ],
          },
        },
        {
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '点赞',
                  },
                  {
                    query: '.PK0tKym9',
                  },
                ],
              },
            ],
          },
          _id: 'z5rrhe-1703003087537',
          desc: '视频，点赞',
          attrs: {
            role: 'button',
            tabindex: '0',
          },
          query: '.kEqb4PZ6',
        },
        {
          _id: '32q05a-1703003087537',
          desc: '放映厅：菜单',
          attrs: {
            tabindex: '0',
            role: 'link',
          },
          query: '.epnaNuKS',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.S1RqUClk',
                  },
                ],
              },
              {
                list: [
                  {
                    query: '.NFktHbD6',
                  },
                ],
              },
            ],
          },
        },
        {
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '搜索',
                  },
                ],
              },
            ],
          },
          _id: 'xb5rw-1703003087537',
          desc: 'banner-搜索按钮',
          attrs: {
            tabindex: '0',
            role: '',
          },
          query: '.rB8dMXOc',
        },
        {
          _id: '1l1k8h-1703003087537',
          desc: '视频，收藏',
          attrs: {
            role: 'button',
            tabindex: '0',
          },
          query: '.CT3y5rWY',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '收藏',
                  },
                  {
                    query: '.qc4FQDvn',
                  },
                ],
              },
            ],
          },
        },
        {
          query: '#login-panel',
          autoFocus: false,
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '登陆窗口',
                  },
                ],
              },
            ],
          },
          disableAttrs: [],
          _id: 'm77tw9-1703003087537',
          desc: '登陆窗口',
          attrs: {
            tabindex: '0',
            role: 'dialog',
          },
        },
        {
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.Nu66P_ba',
                  },
                ],
              },
              {
                list: [
                  {
                    query: '.EsUCShUO',
                  },
                ],
              },
            ],
          },
          _id: '8iicci-1703003087537',
          desc: '视频侧边栏：粉丝与获赞',
          attrs: {
            tabindex: '0',
          },
          query: '.AVi4_ejO',
        },
        {
          _id: 'yoyxwu-1703003087537',
          desc: '登录框：同意协议禁用',
          attrs: {
            tabindex: '-1',
          },
          query: '.web-login-confirm-info',
          calcAttrs: {},
        },
        {
          query: '.VM6maVM0',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.VM6maVM0',
                  },
                ],
              },
            ],
          },
          _id: 'zwj0r4-1703003087537',
          desc: '直播：热门直播',
          attrs: {
            role: 'link',
            tabindex: '0',
          },
        },
        {
          attrs: {
            tabindex: '0',
            role: 'link',
          },
          query: '.Vnmnhxkb',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '查看',
                  },
                  {
                    query: '.Vnmnhxkb',
                  },
                  {
                    value: '主页',
                  },
                ],
              },
            ],
          },
          _id: 'cvk2ig-1703003087537',
          desc: '首页：抖音热榜查看用户',
        },
        {
          attrs: {
            tabindex: '0',
          },
          query: '.oEz5WKYD',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.Yvdo1Kkf',
                  },
                ],
              },
              {
                list: [
                  {
                    query: '.ITtcmtbb',
                  },
                ],
              },
            ],
          },
          _id: 'r0vffg-1703003087537',
          desc: '放映厅：正片选集',
        },
        {
          attrs: {
            role: '',
            tabindex: '0',
          },
          query: '.IutmjIX8',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.IutmjIX8',
                  },
                  {
                    opt: '-',
                    query: '.f7ppeZln',
                  },
                ],
              },
            ],
          },
          disableAttrs: ['role'],
          _id: 'e0qxku-1703003087537',
          desc: '放映厅：热门推荐banner',
        },
        {
          query: '.ZDK9u7Xb',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.ZDK9u7Xb',
                  },
                ],
              },
            ],
          },
          _id: 'eon3-1703003087537',
          desc: '放映厅：滚动链接',
          attrs: {
            role: 'link',
            tabindex: '0',
          },
        },
        {
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.j7EeNMUZ ',
                  },
                ],
              },
              {
                list: [
                  {
                    query: '.P0MQ0x1R',
                  },
                ],
              },
            ],
          },
          _id: '2kpwkj-1703003087537',
          desc: '放映厅：正片选集item',
          attrs: {
            tabindex: '0',
            role: 'link',
          },
          query: '.J6AdpTCG',
        },
        {
          desc: '视频，操作栏',
          attrs: {
            role: '',
            tabindex: '0',
          },
          query: '.OFZHdvpl',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '视频操作栏',
                  },
                ],
              },
            ],
          },
          disableAttrs: ['role'],
          _id: '4uyqup-1703003087537',
        },
        {
          _id: 'yls06y-1703003087537',
          desc: '放映厅：更多节目标题',
          attrs: {
            tabindex: '0',
            role: '',
          },
          query: '.nSbLZ7Rx',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.nSbLZ7Rx',
                  },
                ],
              },
            ],
          },
          disableAttrs: ['role'],
        },
        {
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.c0Lzp5NM',
                  },
                ],
              },
            ],
          },
          _id: '1z3iyd-1703003087537',
          desc: '搜索：百科',
          attrs: {
            tabindex: '0',
          },
          query: '.c0Lzp5NM',
        },
        {
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.Uvaas5kD',
                  },
                ],
              },
              {
                list: [
                  {
                    value: '说',
                  },
                ],
              },
              {
                list: [
                  {
                    query: '.a9uirtCT',
                  },
                  {
                    query: '.SlSbcMqT',
                    opt: '-',
                  },
                ],
              },
            ],
          },
          _id: 'xc0q7-1703003087537',
          desc: '视频评论',
          attrs: {
            tabindex: '0',
          },
          query: '.CDx534Ub',
        },
        {
          autoFocus: false,
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.u42WaXYd',
                  },
                ],
              },
            ],
          },
          disableAttrs: ['accesskey'],
          _id: 'zj1r3-1703003087537',
          desc: '推荐视频：取消静音按钮',
          attrs: {
            accesskey: '',
            role: 'button',
            tabindex: '1',
          },
          query: '.u42WaXYd',
        },
        {
          _id: '351s0q-1703003087537',
          desc: '私信：弹窗item',
          attrs: {
            tabindex: '0',
          },
          query: '.u72nAX2v',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.u72nAX2v',
                  },
                ],
              },
            ],
          },
        },
        {
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '发送弹幕',
                  },
                ],
              },
            ],
          },
          _id: 'fjcmqf-1703003087537',
          desc: '放映厅：发弹幕按钮',
          attrs: {
            role: 'button',
            tabindex: '0',
          },
          query: '.hOO9c5Le span:nth-of-type(2)',
        },
        {
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.video-info-detail',
                  },
                ],
              },
            ],
          },
          disableAttrs: ['role'],
          _id: 'edrzku-1703003087537',
          desc: '视频主区域',
          attrs: {
            role: '',
            tabindex: '0',
          },
          query: '.vRlffofL',
        },
        {
          desc: '视频，播放暂停按钮',
          attrs: {
            role: 'button',
            tabindex: '0',
          },
          query: '.xgplayer-play',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.xg-tips',
                  },
                ],
              },
            ],
          },
          _id: 'o3ipp8-1703003087537',
        },
        {
          query: '.ARHQtNo4',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.l7d3hUrN span',
                  },
                  {
                    value: '人喜欢',
                  },
                ],
              },
              {
                list: [
                  {
                    value: '时长',
                  },
                  {
                    query: '.Co9I7FaL',
                  },
                ],
              },
              {
                list: [
                  {
                    query: '.NDykH66P',
                  },
                ],
              },
              {
                list: [
                  {
                    query: '.J9zL1Z55',
                  },
                  {
                    query: '.J9lFopic',
                  },
                  {
                    value: '发布',
                  },
                ],
              },
            ],
          },
          disableAttrs: ['role'],
          _id: 'lqxtw-1703003087537',
          desc: '首页：猜你喜欢item',
          attrs: {
            tabindex: '0',
            role: '',
          },
        },
        {
          _id: 'nyudoq-1703003087537',
          desc: '展开更多评论',
          attrs: {
            tabindex: '0',
          },
          query: '.N10j3PcL',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.N10j3PcL',
                  },
                ],
              },
            ],
          },
        },
        {
          query: '.ePAmHZ9n',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '',
                  },
                ],
              },
            ],
          },
          disableAttrs: ['label'],
          _id: 'v0gz1t-1703003087537',
          desc: '区域-banner',
          attrs: {
            role: 'banner',
            tabindex: '0',
          },
        },
        {
          disableAttrs: [],
          _id: 'r7ayop-1703003087537',
          desc: '主菜单：icon',
          attrs: {
            tabindex: '0',
            role: 'link',
          },
          query: '.BmcsyffA',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '返回抖音推荐页',
                  },
                ],
              },
            ],
          },
        },
        {
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '进入当前直播间',
                  },
                ],
              },
            ],
          },
          _id: 'x8seag-1703003087537',
          desc: '直播：进入当前直播间',
          attrs: {
            tabindex: '0',
            role: 'button',
          },
          query: '.FqE3q4s5',
        },
        {
          desc: '视频详情：推荐视频item',
          attrs: {
            tabindex: '0',
            role: '',
          },
          query: '.Vu4BBhlr .B3AsdZT9',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.B3AsdZT9',
                  },
                ],
              },
            ],
          },
          disableAttrs: ['role'],
          _id: 'doeuzy-1703003087537',
        },
        {
          desc: '直播间：关注',
          attrs: {
            role: 'button',
            tabindex: '0',
          },
          query: '.PefK2M9x',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.PefK2M9x',
                  },
                ],
              },
            ],
          },
          _id: '2em9lq-1703003087537',
        },
        {
          query: '.WknhxyGl',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '查看',
                  },
                  {
                    query: '.WknhxyGl',
                  },
                  {
                    query: '主页',
                  },
                ],
              },
            ],
          },
          _id: '78j8c-1703003087537',
          desc: '首页：编辑精选查看主页',
          attrs: {
            tabindex: '0',
            role: 'link',
          },
        },
        {
          attrs: {
            role: 'menu',
            tabindex: '0',
          },
          query: '.NGQINMAa',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '直播：分类菜单',
                  },
                ],
              },
            ],
          },
          _id: '4oew6-1703003087537',
          desc: '直播：分类菜单',
        },
        {
          query: '.Pp4BruLD',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.Pp4BruLD',
                  },
                ],
              },
            ],
          },
          disableAttrs: ['role'],
          _id: 'r2ss2b-1703003087537',
          desc: '放映厅：侧边栏，作者',
          attrs: {
            role: '',
            tabindex: '0',
          },
        },
        {
          query: '.hMNE3E7I',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '抖音热榜',
                  },
                ],
              },
            ],
          },
          _id: 'mrhxy-1703003087537',
          desc: '热点：热榜区域',
          attrs: {
            tabindex: '0',
            role: 'complementary',
          },
        },
        {
          _id: '27psnn-1703003087537',
          desc: '首页：抖音热榜',
          attrs: {
            tabindex: '0',
          },
          query: '.AdR7nx0s',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '抖音热榜',
                  },
                ],
              },
            ],
          },
        },
        {
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.I6ivXmaS',
                  },
                ],
              },
            ],
          },
          _id: 'n92r9r-1703003087537',
          desc: '首页引导层：键盘鼠标',
          attrs: {
            tabindex: '2',
          },
          query: '.I6ivXmaS',
          autoFocus: false,
        },
        {
          _id: '17w8nq-1703003087537',
          desc: '直播间：评论框',
          attrs: {
            tabindex: '0',
            role: 'input',
          },
          query: '.webcast-chatroom___textarea',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '弹幕',
                  },
                ],
              },
            ],
          },
        },
        {
          query: '.KTBfvwdu',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.wiqwDybA',
                  },
                ],
              },
              {
                list: [
                  {
                    query: '.OBTB5uUk',
                  },
                ],
              },
            ],
          },
          _id: 'l7av1-1703003087537',
          desc: '我的头像，个人点赞收藏',
          attrs: {
            role: 'button',
            tabindex: '0',
          },
        },
        {
          desc: '视频侧边栏：推出作品',
          attrs: {
            tabindex: '0',
          },
          query: '.ULoXQ8XC',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '退出他的作品',
                  },
                ],
              },
            ],
          },
          _id: 'xaja1o-1703003087537',
        },
        {
          _id: '2m1v9s-1703003087537',
          desc: '展开评论',
          attrs: {
            tabindex: '0',
            role: 'button',
          },
          query: '.zeyRYM2J',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.zeyRYM2J',
                  },
                ],
              },
            ],
          },
        },
        {
          query: '.AwIKR2fG',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.AwIKR2fG',
                  },
                ],
              },
            ],
          },
          _id: '03ecmf-1703003087537',
          desc: '搜索：项目header',
          attrs: {
            tabindex: '0',
          },
        },
        {
          disableAttrs: ['role'],
          _id: 'f6v6mp-1703003087537',
          desc: '直播：当前直播',
          attrs: {
            role: '',
            tabindex: '0',
          },
          query: '.tGBLU2eM',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '当前直播间',
                  },
                ],
              },
            ],
          },
        },
        {
          attrs: {
            tabindex: '0',
          },
          query: '.z8_VexPf',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.z8_VexPf',
                  },
                ],
              },
            ],
          },
          _id: 'c7jh7n-1703003087537',
          desc: '视频详情：标题',
        },
        {
          _id: '7fqwzq-1703003087537',
          desc: '直播：更多热门直播按钮',
          attrs: {
            role: 'link',
            tabindex: '0',
          },
          query: '.pJF0j0PJ',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '更多热门直播按钮',
                  },
                ],
              },
            ],
          },
        },
        {
          attrs: {
            role: 'button',
            tabindex: '0',
          },
          query: '.webcast-chatroom___send-btn',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '发送弹幕',
                  },
                ],
              },
            ],
          },
          _id: 'h3kvwg-1703003087537',
          desc: '直播间：按钮',
        },
        {
          attrs: {
            tabindex: '0',
            role: 'button',
          },
          query: '.OMlv_Xup',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.OMlv_Xup',
                  },
                ],
              },
            ],
          },
          _id: '69kno5-1703003087537',
          desc: '我的头像，退出登陆',
        },
        {
          attrs: {},
          query: '.fTLFnWPf, .M445gid9',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.fTLFnWPf, .M445gid9',
                    map: {
                      match: {
                        '5201b5947efbe1dfe5b751c1af864292.png~tplv-obj.png':
                          '音为有你,1抖币',
                        'c5cbe708e2e0f7c97b504824e6cc835c~tplv-obj.png':
                          '糖果飞船,13140抖币',
                        'f0a7b7fd0f8c83235d37aae107fa56a5.png~tplv-obj.png':
                          '浪漫马车,28888抖币',
                        '4f5481830412aae4849a8b004ab5c2be.png~tplv-obj.png':
                          '阿拉丁神灯,1388抖币',
                        '802a21ae29f9fae5abe3693de9f874bd~tplv-obj.png':
                          '抖音,1抖币',
                        'eb87031ce3a76ab43b88a83b5851cf88.png~tplv-obj.png':
                          '环球旅行车,650抖币',
                        'a29d6cdc0abb7286fdd403915196eaa7.png~tplv-obj.png':
                          '玫瑰,1抖币',
                        'ce46a93993de80043df4522080d19005.png~tplv-obj.png':
                          '多喝热水,126抖币',
                        '5013d6ba52d57ce0c0c838f314534e9a~tplv-obj.png':
                          'disco,4999抖币',
                        '33812db14ff2e9e590c87a24a3d5ee8.png~tplv-obj.png':
                          '3月你好,3抖币',
                        '7d1eb0c7d591c1c88ae6059036380bfe.png~tplv-obj.png':
                          '花落长亭,1588抖币',
                        '883dec82db4b62d27c89a2cf2939be3f.png~tplv-obj.png':
                          'ONE礼挑一,299抖币',
                        '534fdd0fcb1c3682c30f262c97d87f99~tplv-obj.png':
                          '糖果大炮,6666抖币',
                        'c995468ed2bddf7a512f220970b592bc.png~tplv-obj.png':
                          '薰衣草庄园,3300抖币',
                        '31ceb9bd257e5e522415bcb14392e6ed.png~tplv-obj.png':
                          '游戏手柄,99抖币',
                        '5b5bac03256b268d42b9563a81379d19.png~tplv-obj.png':
                          '真爱永恒,8999抖币',
                        'f52803a40a3f22502b23fb0d51e90f09.png~tplv-obj.png':
                          '真的爱你,520抖币',
                        '8a37ccc3b8223dbffa8c77b61609156a.png~tplv-obj.png':
                          '加油鸭,15抖币',
                        '1a66c84003230437ea7c4778af2ebb3d.png~tplv-obj.png':
                          '为你而歌,999抖币',
                        'd04aa053c4488973e7609b76287d2ab8.png~tplv-obj.png':
                          '比心兔兔,299抖币',
                        'eee04e798ad7f08c9faf577f52e258f9.png~tplv-obj.png':
                          'Thuglife,99抖币',
                        'ae2307db309d265afa4e5f84877ef1f5.png~tplv-obj.png':
                          '黄桃罐头,99抖币',
                        '0a65906ec5bf8a2359c77c325e0ae960.png~tplv-obj.png':
                          '月伴星辰,8666抖币',
                        '0ea40b8376ef8157791b928a339ed9c9~tplv-obj.png':
                          '小心心,1抖币',
                        '6cc748756a40332fd73b981b742d6ed7.png~tplv-obj.png':
                          '送你花花,49抖币',
                        'cadd229a47b7fad58ba021c7d4638516~tplv-obj.png':
                          '棒棒糖,9抖币',
                        '94886a6f036fa6181712a418cb8c61d9~tplv-obj.png':
                          '爱的转圈圈,2333抖币',
                        '898bc8988a737b909e952854747c8f7e~tplv-obj.png':
                          '鲜花,10抖币',
                        '8d41e8692ec3a6513af229e535358793.png~tplv-obj.png':
                          '私人飞机,3000抖币',
                        '7e5ffdd6b8ba48e2f4f5b79fb9c1259c.png~tplv-obj.png':
                          '亲吻,99抖币',
                        '4908daf20212d3381103aaa50161fc9f.png~tplv-obj.png':
                          '万象烟花,688抖币',
                        '1797d95a124cd5db4b6c5f2ebf0e8a0f~tplv-obj.png':
                          '浪漫花火,599抖币',
                        '7e5e436bf493307759430ceae69be3d5.png~tplv-obj.png':
                          '钢琴恋人,3222抖币',
                        'dfa4d31f1816b8e9a4967362a935d6ba.png~tplv-obj.png':
                          '浪漫营地,1699抖币',
                        '63888fe7d4ea357fb906a2ad15ec2db9.png~tplv-obj.png':
                          '笑折叠了,1抖币',
                        'fbdb9e7566856d8fbab4bdc25b679310~tplv-obj.png':
                          '甜蜜送达,8888抖币',
                        'e1972046aa7cc5ae870041a655ddf016~tplv-obj.png':
                          '抖音1号,10001抖币',
                        'e0b4fb1d8c1b8d034d20e60f44527fd7.png~tplv-obj.png':
                          '奇幻八音盒,2399抖币',
                        '7194cd3e656785db52976b83535b3740.png~tplv-obj.png':
                          '闪耀星辰,99抖币',
                        '3bbf0e5a4d03b75d3c31f9946add620f.png~tplv-obj.png':
                          '鱼你相伴,1388抖币',
                        '23eb564bc711fce36b01db83a778970a.png~tplv-obj.png':
                          '礼花筒,199抖币',
                        'edce2d3e5de2193990bfab301458fbe2.png~tplv-obj.png':
                          '月下瀑布,6666抖币',
                        'dbdf519c73851373747e13f92b114013.png~tplv-obj.png':
                          '摩天大厦,8222抖币',
                        '8b95bb7e2576f941db7ce4bcc0c94c86~tplv-obj.png':
                          '娶你回家,599抖币',
                        'de5bb6a3c636109408c038d6209bcd9a.png~tplv-obj.png':
                          '爱你哟,52抖币',
                        '859cf68fdc017055be8737d64bbc8a8e.png~tplv-obj.png':
                          '嗨聊花花,666抖币',
                        '32b519902405bdd26787480ff9e6c7be.png~tplv-obj.png':
                          '为爱启航,10001抖币',
                        'c1ab40e19552d2df3840d23b3d4b560b.png~tplv-obj.png':
                          '星星点灯,268抖币',
                        'b550d01587338aeb256e5f91be23ea59.png~tplv-obj.png':
                          '心随你动,1566抖币',
                        '655f1cbf07809a9257ac89c1d5847597~tplv-obj.png':
                          '爱的纸鹤,99抖币',
                        '404f3ab5afce5b8a426b918274966ee3.png~tplv-obj.png':
                          '真爱玫瑰,366抖币',
                        'ce32041b8c0828bc7e90a81739ccc145.png~tplv-obj.png':
                          '日出相伴,726抖币',
                        '7211929855439059f75db6f9e31d4363.png~tplv-obj.png':
                          '浪漫列车,3999抖币',
                        '36cfaff119eac054390cf7cdfb3ab8c0~tplv-obj.png':
                          '直升机,2999抖币',
                        'b730a6aac1df38e45327728e68ee0a91~tplv-obj.png':
                          '爱的发射,999抖币',
                        '374d1a942d3b39fecb1429d7e1ca36f8.png~tplv-obj.png':
                          '情定三生,9666抖币',
                        'a24b3cc863742fd4bc3de0f53dac4487.png~tplv-obj.png':
                          '大啤酒,2抖币',
                        '1d2a82c0cc9f7168f03b7817788e7544.png~tplv-obj.png':
                          '复古飞机,3666抖币',
                        'c66ca2ecb2be3eccb8fd5da20162676b.png~tplv-obj.png':
                          '纸短情长,921抖币',
                        '9c9e0e2dda0fd0c20b86b64bde39fa81.png~tplv-obj.png':
                          '花开烂漫,466抖币',
                        '8dcd831347473d290a1f698c7622efaf.png~tplv-obj.png':
                          '浪漫恋人,1999抖币',
                        '351e161cdab972cf687bc90ca56f1f93.png~tplv-obj.png':
                          '壁上飞仙,4999抖币',
                        '5e0ba31aab561f2b8ca2bb2ed9de9406.png~tplv-obj.png':
                          '深情对唱,1488抖币',
                        '89cb169d0dcd7f5c0c251b972bc34963~tplv-obj.png':
                          '一直陪伴你,520抖币',
                        'c02a5ddf6e9d23d3c1bbc208c92485a4.png~tplv-obj.png':
                          '奏响人生,3666抖币',
                        'e98f92ed58bb9f89dbda20509fb70b0b.png~tplv-obj.png':
                          '告白惊喜,4214抖币',
                        '4960c39f645d524beda5d50dc372510e.png~tplv-obj.png':
                          '你最好看,2抖币',
                        '29ba4531495f89413f1eacbcbfc29a52~tplv-obj.png':
                          '比心,199抖币',
                        '11bcb8bdc16b66fb330346cb478c1c98~tplv-obj.png':
                          '为你点亮,9抖币',
                        'fe8b9dab42f7fc1f54e6f05d5b6aec74.png~tplv-obj.png':
                          '好戏',
                        '30c374a5e9e71324c26311810e4c83bc.png~tplv-obj.png':
                          '一路长虹,3188抖币',
                        'cf1f0090337e6871ca3d079f6f3d1bb5.png~tplv-obj.png':
                          '时尚代言,2188抖币',
                        'e9b7db267d0501b8963d8000c091e123.png~tplv-obj.png':
                          '人气票,1抖币',
                        '53b3b0e512c62bd1eb4ea9df9bf38cf7.png~tplv-obj.png':
                          '热气球,520抖币',
                        '757023e508e3b31f9fbfeb51e0ed72e0.png~tplv-obj.png':
                          '爱的守护,299抖币',
                        'fe084ea3a3351a6282c9edcf03bff28f.png~tplv-obj.png':
                          '复古老爷车,2588抖币',
                        '55ff8dc9da9ad7412fcfd909a4946dd7.png~tplv-obj.png':
                          '陪你的季节,15999抖币',
                        'ca483c429fd4d36c87b94a0b2046d4cc.png~tplv-obj.png':
                          '梦幻城堡,28888抖币',
                        '337190bdafa3290678c446e4bf55b4c4.png~tplv-obj.png':
                          '单车恋人,1899抖币',
                        'd20a4f2701a761c382970f6854cf814e~tplv-obj.png':
                          '宇宙之心,18888抖币',
                        '25ecc58724cabe42b0722826b1b56fbf.png~tplv-obj.png':
                          '心动丘比特,4321抖币',
                        'd1c75692e369466b4fd23546e513caed.png~tplv-obj.png':
                          '捏捏小脸,99抖币',
                        '25803badaa630065a0c34381c46969a6~tplv-obj.png':
                          '动次打次,2999抖币',
                        '0e46f236d34d21da5f513617bb9b16f9.png~tplv-obj.png':
                          '当代歌王,3188抖币',
                        'f840614dac7c879725666da865090c87.png~tplv-obj.png':
                          '云霄大厦,7888抖币',
                        'bd882c0274fcae8aa7bb96d809b3cfb7.png~tplv-obj.png':
                          '掌上萌猪,800抖币',
                        '722e56b42551d6490e5ebd9521287c67~tplv-obj.png':
                          '粉丝团灯牌,1抖币',
                        '13852f49d855af270758b0d0da97e6dd.png~tplv-obj.png':
                          '掌上明珠,888抖币',
                        'f0575ecf3117e26d39bc8f11fdd86f0f.png~tplv-obj.png':
                          '旅拍兔兔,399抖币',
                        '3338b8a583a28780f3ea63f4945fc5a3.png~tplv-obj.png':
                          '海上生明月,4166抖币',
                        '02a33705b04a56d3715b7b28718084f3.png~tplv-obj.png':
                          '荧光棒,99抖币',
                        'bd4ad62dfcc021fda39080166bcbd698.png~tplv-obj.png':
                          '保时捷,1200抖币',
                      },
                      attr: 'src',
                      type: 'attr',
                    },
                  },
                ],
              },
            ],
          },
          _id: '84vrak-1703003087537',
          desc: '直播：弹幕礼物icon',
        },
        {
          _id: '17hs7w-1703003087537',
          desc: '视频详情：作者介绍',
          attrs: {
            tabindex: '0',
          },
          query: '.CjPRy13J',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.CjPRy13J',
                  },
                ],
              },
            ],
          },
        },
        {
          attrs: {
            tabindex: '0',
          },
          query: '.MFb3tP0s .NRiH5zYV',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '我的头像',
                  },
                ],
              },
            ],
          },
          _id: 'h13l6p-1703003087537',
          desc: 'banner-头像',
        },
        {
          attrs: {
            tabindex: '-1',
          },
          query: '.WqAiN5_C',
          calcAttrs: {},
          _id: 'jvy47v-1703003087537',
          desc: '视频列表焦点隐藏',
        },
        {
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.B8CDxCkp',
                  },
                ],
              },
            ],
          },
          _id: 'oqqpfr-1703003087537',
          desc: '首页：猜你喜欢链接',
          attrs: {
            role: 'link',
            tabindex: '0',
          },
          query: '.B8CDxCkp',
        },
        {
          desc: '直播：分类菜单item',
          attrs: {
            role: 'link',
            tabindex: '0',
          },
          query: '.NGQINMAa .B3AsdZT9',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.B3AsdZT9',
                  },
                ],
              },
            ],
          },
          _id: 'llwkm-1703003087537',
        },
        {
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.gPRZQy7u',
                  },
                ],
              },
            ],
          },
          _id: 'qh78u-1703003087537',
          desc: '放映厅：关注作者',
          attrs: {
            tabindex: '0',
            role: 'button',
          },
          query: '.gPRZQy7u',
        },
        {
          _id: 'k8awx-1703003087537',
          desc: '通用视频链接',
          attrs: {
            role: 'link',
            tabindex: '0',
          },
          query: '.Y8lCUOL_',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.NDykH66P',
                  },
                ],
              },
              {
                list: [
                  {
                    query: '.J9lFopic',
                  },
                ],
              },
            ],
          },
        },
        {
          _id: 'ssfx1w-1703003087537',
          desc: '直播菜单区域',
          attrs: {
            role: 'complementary',
            tabindex: '0',
          },
          query: '.mNaEBJlG',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '直播菜单',
                  },
                ],
              },
            ],
          },
        },
        {
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.qwx22yjn',
                  },
                ],
              },
              {
                list: [
                  {
                    value: '已选中',
                  },
                ],
              },
            ],
          },
          _id: 'ffuq2-1703003087537',
          desc: '搜索：一级菜单',
          attrs: {
            tabindex: '0',
            role: 'menuitem',
          },
          query: '.qwx22yjn',
        },
        {
          query: '.gVAgxPt4',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.ck1_UmL3',
                  },
                ],
              },
            ],
          },
          _id: 'kmt7vn-1703003087537',
          desc: 'banner-菜单item',
          attrs: {
            tabindex: '0',
            role: 'menuitem',
          },
        },
        {
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.BL9IYM4m',
                  },
                ],
              },
            ],
          },
          _id: '8ixrwa-1703003087537',
          desc: '搜索：一级菜单未选中',
          attrs: {
            tabindex: '0',
            role: 'menuitem',
          },
          query: '.BL9IYM4m',
        },
        {
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '视频弹窗关闭',
                  },
                ],
              },
            ],
          },
          _id: 'gnid3-1703003087537',
          desc: '视频弹窗：关闭',
          attrs: {
            role: 'button',
            tabindex: '0',
          },
          query: '.bFdMjgdW',
        },
        {
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '评论',
                  },
                  {
                    query: '.hfgGrUTS',
                  },
                ],
                terms: [],
              },
            ],
          },
          disableAttrs: [],
          _id: 'zi0f20h-1703003087537',
          desc: '视频，评论',
          attrs: {
            role: 'button',
            tabindex: '0',
          },
          query: '.pBxTZJeH',
        },
        {
          desc: '侧边栏：全部评论',
          attrs: {
            tabindex: '0',
          },
          query: '.k_GzrwDi',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.k_GzrwDi',
                  },
                ],
              },
            ],
          },
          _id: 'u3hkc5-1703003087537',
        },
        {
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.feFCSiH6',
                  },
                ],
              },
            ],
          },
          _id: 'k13nk-1703003087537',
          desc: '直播：菜单item',
          attrs: {
            tabindex: '0',
            role: 'link',
          },
          query: '.feFCSiH6',
        },
        {
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '猜你喜欢',
                  },
                ],
              },
            ],
          },
          _id: 'ywdbro-1703003087537',
          desc: '首页：猜你喜欢',
          attrs: {
            tabindex: '0',
          },
          query: '.P0JKdlC1',
        },
        {
          attrs: {
            tabindex: '0',
          },
          query: '.Wwq81adB',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.Wwq81adB',
                  },
                ],
              },
            ],
          },
          _id: 'ayhhl-1703003087537',
          desc: '搜索：视频文案',
        },
        {
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '热门直播',
                  },
                ],
              },
            ],
          },
          _id: 'vp0hin-1703003087537',
          desc: '直播：热门直播',
          attrs: {
            role: 'menu',
            tabindex: '0',
          },
          query: '.yrUa_U_L',
        },
        {
          attrs: {
            tabindex: '0',
            role: 'button',
          },
          query: '.otZjcQr3',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '收起展开视频侧边栏',
                  },
                  {
                    query: '.Nu66P_ba.xhDopcQ_.Jn1tVXor',
                    scope: 1,
                  },
                ],
              },
            ],
          },
          _id: 'tu0yv-1703003087537',
          desc: '收起展开视频侧边栏',
        },
        {
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '侧边栏',
                  },
                ],
              },
            ],
          },
          _id: '76oxd8-1703003087537',
          desc: '放映厅：侧边栏',
          attrs: {
            role: 'complementary',
            tabindex: '0',
          },
          query: '.z2oIXD_J',
        },
        {
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '菜单',
                  },
                ],
              },
            ],
          },
          disableAttrs: [],
          _id: 'cmjc9a-1703003087537',
          desc: '区域：左边栏',
          attrs: {
            role: 'complementary',
            tabindex: '0',
          },
          query: '.N_HNXA04',
        },
        {
          desc: '首页：编辑精选列表',
          attrs: {
            tabindex: '0',
            role: 'menu',
          },
          query: '.cfW6wgRZ',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '编辑精选',
                  },
                ],
              },
            ],
          },
          _id: 'ddec6c-1703003087537',
        },
        {
          attrs: {
            role: 'button',
            tabindex: '0',
          },
          query: '.UeGquf3d',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '查看更多热榜内容',
                  },
                ],
              },
            ],
          },
          _id: '32m04-1703003087537',
          desc: '首页：查看更多热榜内容',
        },
        {
          _id: 'p7lypd-1703003087537',
          desc: '视频详情：点赞回复收藏信息',
          attrs: {
            tabindex: '0',
          },
          query: '.UwvcKsMK',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.kr4MM4DQ:nth-of-type(1)',
                  },
                  {
                    value: '人点赞',
                  },
                ],
              },
              {
                list: [
                  {
                    query: '.kr4MM4DQ:nth-of-type(2)',
                  },
                  {
                    value: '人评论',
                  },
                ],
              },
              {
                list: [
                  {
                    query: '.kr4MM4DQ:nth-of-type(3)',
                  },
                  {
                    value: '人收藏',
                  },
                ],
              },
              {
                list: [
                  {
                    query: '.kr4MM4DQ:nth-of-type(4)',
                  },
                  {
                    value: '人分享',
                  },
                ],
              },
            ],
          },
        },
        {
          _id: 'lp2aj-1703003087537',
          desc: '首页：抖音热榜item打开',
          attrs: {
            tabindex: '0',
            role: 'link',
          },
          query: '.dVMxIfS8',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '打开热点',
                  },
                ],
              },
            ],
          },
        },
        {
          query: '.VbwqOKjg',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.BaypFdAa',
                  },
                ],
              },
              {
                list: [
                  {
                    query: '.kpIYq2zX',
                  },
                ],
              },
            ],
          },
          _id: '1momh-1703003087537',
          desc: '热门推荐：视频item',
          attrs: {
            role: 'link',
            tabindex: '0',
          },
        },
        {
          _id: 'b5q1rs-1703003087537',
          desc: '视频，关注作者',
          attrs: {
            tabindex: '0',
            role: 'button',
          },
          query: '.H2HjqV3h',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '关注作者',
                  },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      desc: '亚运会',
      route: '/asiangames',
      _id: '7301993979497941029',
      data: [
        {
          attrs: {},
          calcAttrs: {},
          _id: 'r1dac5-1703003087537',
          query: '俄武器',
          desc: '',
        },
        {
          desc: '热榜链接',
          attrs: {
            tabindex: '0',
            role: 'link',
          },
          query: '.B3AsdZT9',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.B3AsdZT9',
                  },
                ],
              },
            ],
          },
          _id: 'jqq5-1703003087537',
        },
        {
          query: '.OJDYbVHb',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.OJDYbVHb',
                  },
                ],
                terms: [],
              },
              {
                list: [
                  {
                    value: '已选中',
                  },
                ],
                terms: [
                  {
                    query: '.lmw0ZyBs',
                    bool: true,
                    check: 'exist',
                  },
                ],
              },
            ],
          },
          _id: '3qbf6j-1703003087537',
          desc: '日期item',
          attrs: {
            tabindex: '0',
            role: 'tab',
          },
        },
        {
          attrs: {
            role: 'tab',
            tabindex: '0',
          },
          query: '.P9RV21Yv',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.P9RV21Yv',
                  },
                ],
              },
              {
                terms: [
                  {
                    bool: true,
                    check: 'exist',
                    query: '.kq1ItmrX',
                  },
                ],
                list: [
                  {
                    value: '已选中',
                  },
                ],
              },
            ],
          },
          _id: 'svwmsp-1703003087537',
          desc: '频道tab',
        },
        {
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '当前直播间',
                  },
                ],
              },
            ],
          },
          _id: '63xux-1703003087537',
          desc: '主直播',
          attrs: {
            role: 'button',
            tabindex: '0',
          },
          query: '.vhjNlYZT',
        },
        {
          _id: '91ml6e-1703003087537',
          desc: '亚运热榜',
          attrs: {
            role: '',
            tabindex: '0',
          },
          query: '.fgzKsW4_',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '标题，',
                  },
                  {
                    query: '.fgzKsW4_',
                  },
                ],
              },
            ],
          },
          disableAttrs: ['role'],
        },
        {
          attrs: {
            tabindex: '0',
          },
          query: '.qknGMZ74',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.EIwy0vYe',
                  },
                ],
              },
              {
                list: [
                  {
                    query: '.Jh6AmzvX',
                  },
                ],
              },
            ],
          },
          _id: '9nq85-1703003087537',
          desc: '赛程卡',
        },
        {
          disableAttrs: [],
          _id: 'bj7a4n-1703003087537',
          desc: '头图',
          attrs: {
            tabindex: '0',
            role: 'banner',
          },
          query: '.QsNVSnFt',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '头图，上抖音看亚运直播',
                  },
                ],
              },
            ],
          },
        },
        {
          attrs: {
            tabindex: '0',
          },
          query: '.CUUF_d66',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    query: '.CUUF_d66',
                  },
                ],
              },
              {
                terms: [
                  {
                    bool: true,
                    check: 'exist',
                    query: '.pHzWRb1y',
                  },
                ],
                list: [
                  {
                    value: '按钮1',
                  },
                ],
              },
            ],
          },
          disableAttrs: ['role'],
          _id: '28hk5-1703003087537',
          desc: '赛程按钮',
        },
        {
          query: '.lMZsftv7',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '其他直播间',
                  },
                ],
              },
            ],
          },
          _id: '4ofzag-1703003087537',
          desc: '其他直播间',
          attrs: {
            tabindex: '0',
            role: 'button',
          },
        },
        {
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '日期选择',
                  },
                ],
              },
            ],
          },
          _id: 'hp4pwo-1703003087537',
          desc: '日期选择',
          attrs: {
            role: 'tablist',
            tabindex: '0',
          },
          query: '.yaNdJ0_U',
        },
        {
          desc: 'tab栏',
          attrs: {
            role: 'tablist',
            tabindex: '0',
          },
          query: '.HeuhCCgX',
          calcAttrs: {
            label: [
              {
                list: [
                  {
                    value: '频道选择',
                  },
                ],
              },
            ],
          },
          _id: 'xmebn-1703003087537',
        },
      ],
    },
  ],
};
