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
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import {
  debounce,
  escapeRegExp,
  findCurKey,
  roleList,
  getTermIndex,
  termMap,
  submitMark,
} from '@/common/utils';
import * as cs from './index.module.less';
import { MarkSocket } from '@/common/socket';
import DynamicHighlight from '@/common/light';
import {
  Collapse,
  Card,
  Divider,
  Button,
  Message,
  Popover,
  Tag,
  Modal,
  Input,
  InputNumber,
  Checkbox,
  Select,
  Switch,
  AutoComplete,
  Tooltip,
  Popconfirm,
  Empty,
  Table,
} from '@arco-design/web-react';
import {
  IconPlus,
  IconMenu,
  IconEdit,
  IconInfoCircle,
} from '@arco-design/web-react/icon';
import { useTranslation } from 'react-i18next';

const url = new URLSearchParams(window.location.search);
const isH5 = url.get('type') === 'h5';
const maskStleDetail = {
  height: 'calc(100% - 60px)',
  top: 60,
};
const otherStyle = window.a11yElectronApi
  ? {
    wrapStyle: maskStleDetail,
    style: {
      width: '70%',
    },
    maskStyle: maskStleDetail,
  }
  : {
    style: {
      width: '70%',
    },
  };

const selectorKey = 'query';
const App = () => {
  const [_, forceUpdate] = useState(Symbol());
  const [editData, setEditData] = useState(null);
  const [searchWord, setSearchWord] = useState({ value: '' });
  const [pageEditData, setPageEditData] = useState(null);
  const [postLoding, setPostLoading] = useState(false);
  const dynamicLight = useRef();
  const AconfigNow = useRef({});
  const markSocket = useRef();
  const lightMap = useRef({});
  const finalLight = useRef({});
  const editTime = useRef({});
  const { t } = useTranslation();

  const [seeItOpen, setSeeItOpen] = useState(false);

  useEffect(() => {
    const socketParams = {
      // roomId: curRoom,
      updateConfigCallback,
      updateDomCountCallback,
      mutationCallback,
      socketsChangeCallback,
      editSelectedConfigCallback,
    };
    markSocket.current = new MarkSocket(socketParams);
    markSocket.current.init();
    dynamicLight.current = new DynamicHighlight();
  }, []);

  const calcFinalLight = () => {
    const lightCalc = {};
    Object.keys(lightMap.current).forEach((key) => {
      if (key.split('|')[0] === AconfigNow.current.productId) {
        lightMap.current[key].forEach(({ aid, query, _temp: { route } }) => {
          if (!lightCalc[route]) {
            lightCalc[route] = new Set();
          }
          lightCalc[route].add(aid || query || null);
        });
      }
    });
    finalLight.current = lightCalc;
  };

  const updateConfigCallback = (params) => {
    const { product_id, detail, Aconfig, socketId: receiver } = params;
    console.log('dev updateConfigCallback params', params);
    Aconfig.forEach((page) => {
      page.data.forEach((config) => {
        config._temp = {
          route: page.route,
          desc: page.desc,
        };
      });
    });
    AconfigNow.current = {
      socketId: receiver,
      Aconfig,
      productId: product_id,
      appName: detail.data.app_name,
      platform: detail.data.platform,
    };
    editTime.current[product_id] = new Date(detail.data.edit_time);
    if (receiver) {
      dynamicLight.current.calcLight({ receiver, product_id, Aconfig });
      dynamicLight.current.requestDomCount({ receiver, product_id, Aconfig });
    }
    forceUpdate(Symbol());
  };

  const updateDomCountCallback = (params) => {
    const { product_id, Aconfig: calcAconfig, path, socketId } = params;
    const { Aconfig } = AconfigNow.current;
    console.log('dev updateDomCountCallback params', params);
    const curLight = dynamicLight.current.updateDomCount({
      Aconfig: calcAconfig,
      thisAconfig: Aconfig,
      path,
    });
    lightMap.current[`${product_id}|${socketId}`] = curLight;
    calcFinalLight();
    forceUpdate(Symbol());
  };

  const mutationCallback = (params) => {
    const { product_id, socketId: receiver } = params;
    const { Aconfig, productId } = AconfigNow.current;
    console.log('dev mutationCallback params', { product_id, receiver });
    if (productId === product_id) {
      dynamicLight.current.calcLight({ receiver, product_id, Aconfig });
      dynamicLight.current.requestDomCount({ receiver, product_id, Aconfig });
    }
  };

  const socketsChangeCallback = (params) => {
    const { sockets, product_id, senderRole, socketId } = params;
    console.log('dev socketsChangeCallback params', params);
    if (senderRole !== 'sdk') {
      return;
    }
    let isLeave = true;
    sockets.forEach(({ product_id, socketId: socketIdc }) => {
      if (
        product_id === AconfigNow.current.productId &&
        socketIdc === socketId
      ) {
        isLeave = false;
      }
    });
    if (isLeave) {
      // setEditData(null);
      // setPageEditData(null);
      delete lightMap.current[`${product_id}|${socketId}`];
      if (!Object.keys(lightMap.current).length) {
        delete AconfigNow.current.socketId;
      }
      calcFinalLight();
      forceUpdate(Symbol());
    }
  };

  const editSelectedConfigCallback = (params) => {
    const { product_id, config, path, socketId } = params;
    console.log('dev editSelectedConfigCallback params', config);
    if (product_id !== AconfigNow.current.productId) {
      return;
    }
    AconfigNow.current.Aconfig.some((routeData) => {
      const { route, data } = routeData;
      if (route === config._temp.route) {
        data.some((configSearch) => {
          if (
            (config.query && configSearch.query === config.query) ||
            (config.aid && configSearch.aid === config.aid)
          ) {
            joinEdit(configSearch, false, routeData);
            return true;
          }
        });
        return true;
      }
    });
  };

  const joinEdit = (config, isNew, page) => {
    setEditData({
      old: config,
      edit: JSON.parse(JSON.stringify(config)),
      isNew,
      page,
    });
  };

  const postAconfigMsg = useCallback(
    async ({ opType, editData, editType, editPage, pageId }) => {
      const { Aconfig, productId } = AconfigNow.current;
      console.log(AconfigNow.current);
      setPostLoading(true);
      const result = await submitMark({
        data: {
          product_id: productId,
          edit_time: editTime.current[productId].getTime(),
        },
        opType,
        editData,
        editPage,
        editType,
        platform: 'web',
        pageId,
      }).then((res) => {
        const { httpCode, detail } = res;
        if (httpCode === 200) {
          if (detail.statusCode === 0) {
            if (editData) {
              editData._id = detail.data.label._id;
            }
            if (editPage) {
              editPage._id = detail.data.page._id;
            }
            dynamicLight.current.calcLight({ product_id: productId, Aconfig });
            dynamicLight.current.requestDomCount({
              product_id: productId,
              Aconfig,
            });
            markSocket.current.sendRoomMessage({
              type: 'a11y_update_aconfig',
              product_id: productId,
              content: { Aconfig },
            });
            Message.success(t('edit_success'));
            editTime.current[productId] = new Date(detail.data.edit_time);
          } else {
            Message.error(detail.message);
          }
        } else if (httpCode === 403) {
          window.open(detail.data, '_blank');
        }
        return detail;
      });
      setPostLoading(false);
      return result;
    },
    [],
  );

  const renderEdit = useMemo(() => {
    if (!editData) {
      return null;
    }
    const { edit, old, isNew, page } = editData;
    const labelOpen =
      'label' in edit.calcAttrs &&
      (!edit.disableAttrs || edit.disableAttrs.indexOf('label') === -1);
    const tabindexOpen =
      'tabindex' in edit.attrs &&
      (!edit.disableAttrs || edit.disableAttrs.indexOf('tabindex') === -1);
    const roleOpen =
      'role' in edit.attrs &&
      (!edit.disableAttrs || edit.disableAttrs.indexOf('role') === -1);
    const accessKeyOpen =
      'accesskey' in edit.attrs &&
      (!edit.disableAttrs || edit.disableAttrs.indexOf('accesskey') === -1);
    const label = edit.calcAttrs?.label || [];
    const tabindex = edit.attrs?.tabindex;
    const role = edit.attrs?.role;
    const accesskey = edit.attrs?.accesskey;
    const { autoFocus, hiddenChildren } = edit;

    const changeQuery = (key, value) => {
      edit[key] = value;
      setEditData({ ...editData });
    };
    const changeEditType = (value) => {
      delete edit.query;
      delete edit.aid;
      edit[value] = '';
      setEditData({ ...editData });
    };
    const changeDesc = (value) => {
      edit.desc = value;
      setEditData({ ...editData });
    };
    const changeCheck = (key, isChecked) => {
      if (key === 'autoFocus') {
        edit.autoFocus = isChecked;
      } else if (key === 'hiddenChildren') {
        edit.hiddenChildren = isChecked;
      } else if (!isChecked) {
        if (!edit.disableAttrs) {
          edit.disableAttrs = [];
        }
        const tempSet = new Set(edit.disableAttrs);
        tempSet.add(key);
        edit.disableAttrs = Array.from(tempSet);
      } else {
        if (edit.disableAttrs) {
          const tempSet = new Set(edit.disableAttrs);
          tempSet.delete(key);
          edit.disableAttrs = Array.from(tempSet);
        }
        switch (key) {
          case 'tabindex':
            if (!(key in edit.attrs)) {
              edit.attrs[key] = '0';
            }
            break;
          case 'role':
          case 'accesskey':
            if (!(key in edit.attrs)) {
              edit.attrs[key] = '';
            }
            break;
          case 'label':
            if (!(key in edit.calcAttrs)) {
              edit.calcAttrs[key] = [
                {
                  list: [
                    {
                      [selectorKey]: '',
                    },
                  ],
                },
              ];
            }
            break;
        }
      }
      setEditData({ ...editData });
    };
    const changeRoute = (route) => {
      edit._route = route;
    };
    const createRoute = (option) => {
      edit._route = option.value;
    };
    const changeTabindex = (value) => {
      edit.attrs.tabindex = value.toString();
      setEditData({ ...editData });
    };
    const changeRole = (value) => {
      edit.attrs.role = value;
      setEditData({ ...editData });
    };
    const changeAccesskey = (value) => {
      edit.attrs.accesskey = value;
      setEditData({ ...editData });
    };
    const changeLabelType = (item, value) => {
      delete item.query;
      delete item.aid;
      delete item.value;
      item[value] = '';
      setEditData({ ...editData });
    };
    const changeLabelValue = (item, key, value) => {
      item[key] = value;
      setEditData({ ...editData });
    };
    const changeTermType = (term, value) => {
      delete term.query;
      delete term.aid;
      term[value] = '';
      setEditData({ ...editData });
    };
    const changeTermQuery = (term, key, value) => {
      term[key] = value;
      setEditData({ ...editData });
    };
    const changeTermResult = (term, value) => {
      Object.assign(term, termMap[value]);
      setEditData({ ...editData });
    };
    const addBigLabelCut = (labelItem, index) => {
      labelItem.splice(index, 0, {
        list: [
          {
            [selectorKey]: '',
          },
        ],
      });
      setEditData({ ...editData });
    };
    const removeBigLabelCut = (labelItem, index) => {
      labelItem.splice(index, 1);
      setEditData({ ...editData });
    };
    const addSmallLabelCut = (listItem, index, opt) => {
      const newItem = {
        [selectorKey]: '',
      };
      if (opt) {
        newItem.opt = opt;
      }
      listItem.splice(index, 0, newItem);
      setEditData({ ...editData });
    };
    const removeSmallLabelCut = (listItem, index) => {
      listItem.splice(index, 1);
      setEditData({ ...editData });
    };
    const addLabelTerm = (labelRow) => {
      if (!labelRow.terms) {
        labelRow.terms = [];
      }
      labelRow.terms.push({
        ...termMap[1],
        query: '',
      });
      setEditData({ ...editData });
    };
    const removeLabelTerm = (terms, index) => {
      terms.splice(index, 1);
      setEditData({ ...editData });
    };
    const changeSwitch = (key, v, item) => {
      if (v) {
        item[key] = 1;
      } else {
        delete item[key];
      }
      setEditData({ ...editData });
    };
    const handleEditBack = () => {
      setEditData(null);
    };
    const changePlat = (value) => {
      if (value === '-1') {
        delete edit.platform;
      } else {
        edit.platform = value;
      }
      setEditData({ ...editData });
    };
    const handleEditSave = () => {
      const key = findCurKey(edit);
      const queryText = edit[key].trim();
      if (!queryText) {
        Message.error(t('empty_check'));
        return;
      }
      delete old.aid;
      delete old.query;
      delete old.platform;
      Object.assign(old, edit);
      if (isNew) {
        page.data.unshift(old);
      }
      setEditData({
        old,
        edit,
        page,
      });
      postAconfigMsg({
        opType: 1,
        editData: old,
        editType: isNew ? 'add' : 'update',
        pageId: page._id,
      });
    };
    const onDeleteConfirm = () => {
      page.data.splice(page.data.indexOf(old), 1);
      postAconfigMsg({
        opType: 1,
        editData: old,
        editType: 'delete',
        pageId: page._id,
      });
      handleEditBack();
    };
    const renderLabel = () =>
      label.map((labelRow, index) => {
        const { terms = [], list = [] } = labelRow;
        return (
          <React.Fragment key={index}>
            <div className={cs.labelGroup}>
              <div className={cs.labelCofig}>
                {list.map((item, index2) => {
                  const res = [];
                  if (item.opt === '-') {
                    res.push(
                      <div className={cs.splitCut} key={`${index2}opt`}>
                        -
                      </div>,
                    );
                  } else if (index2 !== 0) {
                    res.push(
                      <div className={cs.splitCut} key={`${index2}opt`}>
                        +
                      </div>,
                    );
                  }
                  const key = findCurKey(item);
                  let deletBtnDisable = false;
                  if (
                    list.length <= 1 ||
                    (index2 === 0 && list[index2 + 1].opt === '-')
                  ) {
                    deletBtnDisable = true;
                  }
                  res.push(
                    <div className={cs.labelOne} key={index2}>
                      <div className={cs.labelOneLeft}>
                        <Input.Group compact>
                          <Select
                            className={cs.labelTypeSelect}
                            options={[
                              { value: 'query', label: t('selector') },
                              { value: 'value', label: t('text') },
                              { value: 'aid', label: 'a11y-id' },
                            ]}
                            value={key}
                            onChange={(value) => changeLabelType(item, value)}
                          />
                          <AutoComplete
                            className={`${cs.labelAutoInput} ${key === 'aid' ? cs.small : ''}`}
                            value={item[key]}
                            onChange={(value) =>
                              changeLabelValue(item, key, value)
                            }
                          />
                        </Input.Group>
                        {/* {key === 'aid' && <IconCustomize className={cs.chooseCssDom} onClick={beginSelectDom} />} */}
                      </div>
                      <div>
                        <Button
                          type="primary"
                          size="small"
                          onClick={() => addSmallLabelCut(list, index2 + 1)}
                        >
                          {t('insert')}
                        </Button>
                        <Button
                          size="small"
                          onClick={() => removeSmallLabelCut(list, index2)}
                          disabled={deletBtnDisable}
                        >
                          {t('delete')}
                        </Button>
                        <Popover
                          content={
                            <div className={cs.moreLabelEdit}>
                              <Button
                                className={cs.labelPotMore}
                                size="small"
                                type="outline"
                                onClick={() =>
                                  addSmallLabelCut(list, index2 + 1, '-')
                                }
                              >
                                {t('crop')}
                              </Button>
                              {key !== 'value' && (
                                <>
                                  <Divider type="vertical" margin={10} />
                                  <label className={cs.toolCardItemLabel}>
                                    {t('global_selector')}
                                  </label>
                                  <Switch
                                    size="small"
                                    checked={item.scope === 1}
                                    onChange={(v) =>
                                      changeSwitch('scope', v, item)
                                    }
                                  />
                                </>
                              )}
                            </div>
                          }
                        >
                          <Button
                            className={cs.labelPotMore}
                            size="small"
                            type="outline"
                            icon={<IconMenu />}
                          />
                        </Popover>
                      </div>
                    </div>,
                  );
                  return <React.Fragment key={index2}>{res}</React.Fragment>;
                })}
              </div>
              {Boolean(terms.length) && (
                <div className={cs.labelDividerTerm}>
                  {terms.map((term, index3) => {
                    const key = findCurKey(term);
                    return (
                      <div className={cs.item} key={index3}>
                        <Input.Group compact style={{ flex: 1 }}>
                          <Select
                            className={cs.labelTypeSelect}
                            options={[
                              { value: 'query', label: t('selector') },
                              { value: 'aid', label: 'a11y-id' },
                            ]}
                            value={key}
                            onChange={(value) => changeTermType(term, value)}
                          />
                          <Input
                            className={cs.input3}
                            value={term[key]}
                            onChange={(value) =>
                              changeTermQuery(term, key, value)
                            }
                          />
                        </Input.Group>
                        {/* {key === 'aid' &&<IconCustomize className={`${cs.chooseCssDomTerm} ${cs.chooseCssDom}`} onClick={beginSelectDom} />} */}
                        <Divider type="vertical" margin={10} />
                        <Select
                          className={cs.select1}
                          options={[
                            { value: 1, label: t('exist') },
                            { value: 2, label: t('no_exist') },
                            { value: 3, label: t('number') },
                            { value: 4, label: t('no_number') },
                          ]}
                          value={getTermIndex(term)}
                          onChange={(value) => changeTermResult(term, value)}
                        />
                        <Button
                          size="small"
                          onClick={() => removeLabelTerm(terms, index3)}
                        >
                          {t('del')}
                        </Button>
                        <Popover
                          content={
                            <div className={cs.moreLabelEdit}>
                              <>
                                <label className={cs.toolCardItemLabel}>
                                  {t('global_selector')}
                                </label>
                                <Switch
                                  size="small"
                                  checked={term.scope === 1}
                                  onChange={(v) =>
                                    changeSwitch('scope', v, term)
                                  }
                                />
                              </>
                            </div>
                          }
                        >
                          <Button
                            className={cs.labelPotMore}
                            size="small"
                            type="outline"
                            icon={<IconMenu />}
                          />
                        </Popover>
                      </div>
                    );
                  })}
                </div>
              )}
              <div className={cs.labelDividerBtn}>
                <Button
                  className={cs.moreLabelGrpBtn}
                  size="small"
                  type="outline"
                  onClick={() => addLabelTerm(labelRow)}
                >
                  {t('add_condition')}
                </Button>
                <Button
                  className={cs.moreLabelGrpBtn}
                  type="primary"
                  size="small"
                  onClick={() => addBigLabelCut(label, index + 1)}
                >
                  {t('insert_paragraph')}
                </Button>
                <Button
                  className={cs.moreLabelGrpBtn}
                  size="small"
                  onClick={() => removeBigLabelCut(label, index)}
                  disabled={label.length === 1}
                >
                  {t('del_paragraph')}
                </Button>
              </div>
            </div>
            {index < label.length - 1 && <div className={cs.splitCut}>+</div>}
          </React.Fragment>
        );
      });

    const key = findCurKey(edit);
    return (
      <div>
        <div className={cs.maxContent}>
          <div className={cs.row}>
            <div className={cs.labelCol}>
              <span className={cs.mustAcco}>*</span>
              {t('selector')}
            </div>
            <div className={cs.contentColMain}>
              <Input.Group compact className={cs.selectorInit}>
                <Select
                  className={cs.labelTypeSelect}
                  options={[
                    { value: 'query', label: t('selector') },
                    { value: 'aid', label: 'a11y-id' },
                  ]}
                  value={key}
                  onChange={(value) => changeEditType(value)}
                />
                <Input
                  value={edit[key]}
                  onChange={(value) => changeQuery(key, value)}
                />
              </Input.Group>
              {/* <IconCustomize className={cs.chooseCssDom} onClick={beginSelectDom} /> */}
            </div>
          </div>
          <div className={cs.row}>
            <div className={cs.row1}>
              <div className={cs.labelCol}>{t('note')}</div>
              <div className={cs.contentColMain}>
                <Input
                  placeholder={t('suggestion_to_fill')}
                  value={edit.desc}
                  onChange={changeDesc}
                />
              </div>
            </div>
            {AconfigNow.current.platform === 'h5' && (
              <div className={cs.row11}>
                <div className={cs.labelCol}>{t('os')}</div>
                <div className={cs.contentColMain}>
                  <Select
                    options={[
                      { value: '-1', label: t('all') },
                      { value: 'ios', label: 'IOS' },
                      { value: 'android', label: 'Android' },
                    ]}
                    value={edit.platform || '-1'}
                    onChange={(value) => changePlat(value)}
                  />
                </div>
              </div>
            )}
          </div>
          <div className={cs.row}>
            <div className={cs.labelCol}>{t('page_path')}：</div>
            <div className={cs.contentColMain}>{edit._temp.route}</div>
          </div>
          <Divider orientation="center" className={cs.diverText}>
            {t('set_attr')}
          </Divider>
          <div className={cs.row}>
            <div className={cs.labelCol}>
              <Checkbox
                checked={tabindexOpen}
                onChange={(e) => changeCheck('tabindex', e)}
              >
                tabindex
              </Checkbox>
              <Tooltip
                content={
                  <div>
                    <p>
                      <span className={cs.tabindexTipText}>1～32767</span>
                      ：t('order')
                    </p>
                    <p>
                      <span className={cs.tabindexTipText}>0</span>
                      ：t('default_order')
                    </p>
                    <p>
                      <span className={cs.tabindexTipText}>-1</span>
                      ：t('remove_focus')
                    </p>
                  </div>
                }
              >
                <IconInfoCircle className={cs.tabindexDesc} />
              </Tooltip>
            </div>
            <div
              className={`${cs.contentCol} ${!tabindexOpen ? cs.disable : ''}`}
            >
              <InputNumber
                className={cs.input2}
                onChange={changeTabindex}
                precision={0}
                value={tabindex}
                min={-1}
                max={32767}
              />
              {!tabindexOpen && <div className={cs.rowDisable} />}
            </div>
            <Divider type="vertical" margin={10} />
            <div className={cs.labelCol}>
              <Checkbox
                checked={autoFocus}
                onChange={(e) => changeCheck('autoFocus', e)}
              >
                autoFocus
              </Checkbox>
            </div>
            <div className={cs.labelCol}>
              <Checkbox
                checked={hiddenChildren}
                onChange={(e) => changeCheck('hiddenChildren', e)}
              >
                hidden
              </Checkbox>
            </div>
          </div>
          <div className={cs.row}>
            <div className={cs.labelCol}>
              <Checkbox
                checked={roleOpen}
                onChange={(e) => changeCheck('role', e)}
              >
                role
              </Checkbox>
            </div>
            <div className={`${cs.contentCol} ${!roleOpen ? cs.disable : ''}`}>
              <Select
                showSearch
                showClear
                options={roleList}
                onChange={changeRole}
                value={role}
                className={cs.selectRole}
              />
              {!roleOpen && <div className={cs.rowDisable} />}
            </div>
            <Divider type="vertical" margin={10} />
            <div className={cs.labelCol}>
              <Checkbox
                checked={accessKeyOpen}
                onChange={(e) => changeCheck('accesskey', e)}
              >
                accesskey
              </Checkbox>
            </div>
            <div
              className={`${cs.contentCol} ${!accessKeyOpen ? cs.disable : ''}`}
            >
              <Input
                onChange={changeAccesskey}
                value={accesskey}
                className={cs.input2}
              />
              {!accessKeyOpen && <div className={cs.rowDisable} />}
            </div>
          </div>
          {/* <div className={cs.row}>

        </div> */}
          <div className={cs.row}>
            <div className={cs.labelCol}>
              <Checkbox
                checked={labelOpen}
                onChange={(e) => changeCheck('label', e)}
              >
                label
              </Checkbox>
            </div>
            <div
              className={`${cs.contentCol2} ${!labelOpen ? cs.disable : ''}`}
            >
              {renderLabel()}
              {!labelOpen && <div className={cs.rowDisable} />}
            </div>
          </div>
        </div>
        <div className={cs.editBottom}>
          {!isNew && (
            <Popconfirm title={t('ask_for_sure')} onOk={onDeleteConfirm}>
              <Button status="danger" type="primary">
                {t('del')}
              </Button>
            </Popconfirm>
          )}
          <div className={cs.editBtnRight}>
            <Button onClick={handleEditBack}>
              {isNew ? t('cancel') : t('return')}
            </Button>
            <Button
              type="primary"
              className={cs.saveBtn}
              onClick={handleEditSave}
            >
              {isNew ? t('new') : t('save')}
            </Button>
          </div>
        </div>
      </div>
    );
  }, [editData]);

  const createTag = (e, page) => {
    e.stopPropagation();
    joinEdit(
      {
        desc: '',
        [selectorKey]: '',
        attrs: {},
        calcAttrs: {},
        _temp: {},
      },
      true,
      page,
    );
  };

  const joinPageEdit = (e, page) => {
    e.stopPropagation();
    setPageEditData({
      old: page,
      edit: JSON.parse(JSON.stringify(page)),
    });
  };

  const confirmDelPage = async (e, page) => {
    e.stopPropagation();
    const { Aconfig } = AconfigNow.current;
    Aconfig.splice(Aconfig.indexOf(page), 1);
    const { statusCode } = await postAconfigMsg({
      opType: 2,
      editType: 'delete',
      editPage: page,
    });
    if (statusCode === 1) {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  const cancelPageEdit = () => {
    setPageEditData(null);
  };

  const savePage = async () => {
    if (!AconfigNow.current.productId) {
      Message.warning(t('re_connect'));
      setPageEditData(null);
      return;
    }
    const { edit, old, isNew } = pageEditData;
    if (!edit.route) {
      Message.error(t('path_no_empty'));
      return;
    } else if (!edit.desc) {
      Message.error(t('des_no_empty'));
      return;
    }
    Object.assign(old, edit);
    if (isNew) {
      AconfigNow.current.Aconfig.push(old);
    }
    const { statusCode } = await postAconfigMsg({
      opType: 2,
      editPage: old,
      editType: isNew ? 'add' : 'update',
    });
    if (statusCode === 1) {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
    setPageEditData(null);
  };

  const addPage = () => {
    const old = {
      route: '',
      desc: '',
      data: [],
    };
    setPageEditData({
      isNew: true,
      old,
      edit: JSON.parse(JSON.stringify(old)),
    });
  };

  const copyH5code = () => {
    if (window.a11yElectronApi) {
      const textarea = document.createElement('textarea');
      document.body.appendChild(textarea);
      textarea.style.position = 'fixed';
      textarea.style.width = '0';
      textarea.style.height = '0';
      textarea.style.top = '10px';
      textarea.value = `localStorage.setItem('a11y_room_ip', '${window.a11yElectronApi.ip}');location.reload()`;
      textarea.select();
      document.execCommand('copy', true);
      document.body.removeChild(textarea);
      Message.success(t('pass_copied'));
    } else {
      Message.warning(t('use_pc'));
    }
  };

  const renderPageEdit = () => {
    const { edit } = pageEditData;
    const changeInput = (val, key) => {
      edit[key] = val;
      setPageEditData({ ...pageEditData });
    };
    return (
      <>
        <div className={cs.row}>
          <label className={cs.rowLabel}>
            {t('now_program')}：
            <span className={cs.labelMust} />
          </label>
          <p>
            ({AconfigNow.current.productId}){AconfigNow.current.appName}
          </p>
        </div>
        <div className={cs.row}>
          <label className={cs.rowLabel}>
            {t('path')}
            <span className={cs.labelMust}>*</span>
          </label>
          <Input
            value={edit.route}
            onChange={(val) => changeInput(val, 'route')}
          />
        </div>
        <div className={cs.row}>
          <label className={cs.rowLabel}>
            {t('name')}
            <span className={cs.labelMust}>*</span>
          </label>
          <Input
            value={edit.desc}
            onChange={(val) => changeInput(val, 'desc')}
          />
        </div>
      </>
    );
  };

  const lightHoverDom = useCallback(
    debounce((hightLightConfig) => {
      dynamicLight.current.lightHoverDom({
        product_id: AconfigNow.current.productId,
        Aconfig: AconfigNow.current.Aconfig,
        hightLightConfig,
      });
    }, 100),
    [],
  );

  const changeSearchWord = (value) => {
    setSearchWord({
      value,
    });
  };

  const renderContent = () => {
    if (!Object.keys(AconfigNow.current).length) {
      return (
        <Empty
          description={t('no_connect')}
          style={{
            paddingTop: 50,
            fontSize: '14px',
          }}
        />
      );
    }
    const test = () => {
      const a = AconfigNow.current.Aconfig.map((routeData) => {
        let fillData = routeData.data;
        if (searchWord.value) {
          fillData = routeData.data.filter((record) => {
            const key = findCurKey(record);
            if (
              record[key].match(
                new RegExp(escapeRegExp(searchWord.value), 'i'),
              ) ||
              record.desc?.match(
                new RegExp(escapeRegExp(searchWord.value), 'i'),
              ) ||
              searchWord.value === record.attrs?.tabindex
            ) {
              return true;
            }
            return false;
          });
        }
        const columns = [
          {
            title: t('selector'),
            dataIndex: 'query',
            render: (_, record) => {
              const key = findCurKey(record);
              const text = record[key];
              let res;
              if (searchWord.value) {
                const matchWord = text.match(
                  new RegExp(escapeRegExp(searchWord.value), 'i'),
                );
                if (matchWord) {
                  res = (
                    <div>
                      {text.slice(0, matchWord.index)}
                      <span className={cs.searchLight}>{matchWord[0]}</span>
                      {text.slice(matchWord.index + searchWord.value.length)}
                    </div>
                  );
                } else {
                  res = text;
                }
              } else {
                res = text;
              }
              if (key === 'aid') {
                return (
                  <Tag size="large" className={cs.a11yTag}>
                    {res}
                  </Tag>
                );
              }
              return res;
            },
            sorter: (a, b) => {
              const akey = findCurKey(a);
              const bkey = findCurKey(b);
              return a[akey].localeCompare(b[bkey]);
            },
          },
          {
            title: t('des'),
            render: (_, record) => {
              if (searchWord.value) {
                const text = record.desc;
                const matchWord = text.match(
                  new RegExp(escapeRegExp(searchWord.value), 'i'),
                );
                if (matchWord) {
                  return (
                    <div>
                      {text.slice(0, matchWord.index)}
                      <span className={cs.searchLight}>{matchWord[0]}</span>
                      {text.slice(matchWord.index + searchWord.value.length)}
                    </div>
                  );
                }
              }
              return record.desc;
            },
            sorter: (a, b) => a.desc.localeCompare(b.desc),
          },
          {
            title: 'tabindex',
            render: (_, record) => {
              if (record.disableAttrs?.includes('tabindex')) {
                return null;
              }
              if (searchWord.value === record.attrs?.tabindex) {
                return (
                  <span className={cs.searchLight}>
                    {record.attrs?.tabindex}
                  </span>
                );
              }
              return record.attrs?.tabindex;
            },
            sorter: (a, b) =>
              Number(a.attrs.tabindex) - Number(b.attrs.tabindex),
          },
          {
            title: t('edit'),
            width: 90,
            render(_, record) {
              return (
                <>
                  <Button
                    type="outline"
                    size="small"
                    icon={<IconEdit />}
                    onClick={() => joinEdit(record, false, routeData)}
                  />
                </>
              );
            },
          },
        ];
        return (
          <Collapse.Item
            header={
              <div className={cs.pageHead}>
                <Tag color="blue" type="light" className={cs.pageHeadTag}>
                  {routeData.route}
                </Tag>
                <span className={cs.pageHeadText}>
                  {routeData.route === '*' ? '全局配置' : routeData.desc}
                </span>
                <Tag className={cs.pageHeadTextNum}>{fillData.length}</Tag>
                <Popover
                  content={
                    <div
                      className={cs.pageHandleMenu}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        type="primary"
                        size="small"
                        className={cs.pageMenuBtn}
                        disabled={routeData.route === '*'}
                        onClick={(e) => joinPageEdit(e, routeData)}
                      >
                        {t('edit')}
                      </Button>
                      <Button
                        type="primary"
                        size="small"
                        status="danger"
                        disabled={
                          routeData.route === '*' ||
                          Boolean(routeData.data.length)
                        }
                        className={cs.pageMenuBtn}
                        onClick={(e) => confirmDelPage(e, routeData)}
                      >
                        {t('del')}
                      </Button>
                    </div>
                  }
                >
                  <Button
                    type="outline"
                    size="small"
                    icon={<IconMenu />}
                    className={cs.pageMenuEnter}
                    onClick={(e) => e.stopPropagation()}
                  />
                </Popover>
                <Button
                  type="primary"
                  size="small"
                  onClick={(e) => createTag(e, routeData)}
                  className={cs.newRuleBtn}
                >
                  <IconPlus />
                  {t('tag')}
                </Button>
              </div>
            }
            name={routeData.route}
            key={routeData.route}
          >
            <Table
              key={routeData._id + fillData.length}
              data={fillData}
              rowKey={(record) => record._id || Math.random()}
              columns={columns}
              pagination={false}
              size="small"
              onRow={(record, index) => {
                let className, style;
                const checkSet = finalLight.current[record._temp?.route];
                if (
                  checkSet &&
                  (checkSet.has(record.aid) || checkSet.has(record.query))
                ) {
                  className = 'lightTableRow';
                } else if (seeItOpen) {
                  style = { display: 'none' };
                }
                return {
                  onMouseOver: () => lightHoverDom(record),
                  onMouseEnter: (e) => e.stopPropagation(),
                  onMouseLeave: () => {
                    !editData && lightHoverDom();
                  },
                  style,
                  className,
                };
              }}
            />
          </Collapse.Item>
        );
      });
      return a;
    };
    return (
      <>
        <Card className={cs.toolCard}>
          <Button size="small" type="primary" onClick={addPage}>
            <IconPlus />
            {t('page')}
          </Button>
          <Divider type="vertical" margin="10px" />
          <div className={cs.toolCardItem}>
            <label className={cs.toolCardItemLabel}>
              {t('filter_highlight')}
            </label>
            <Switch size="small" checked={seeItOpen} onChange={setSeeItOpen} />
          </div>
          <Divider type="vertical" margin="10px" />
          <label className={cs.toolCardItemLabel}>{t('search')}</label>
          <Input
            className={cs.searchTag}
            allowClear
            value={searchWord.value}
            onChange={changeSearchWord}
          />
        </Card>
        {AconfigNow.current.Aconfig ? (
          <div className={cs.main}>
            <Collapse
              style={{
                width: '100vw',
              }}
            >
              {test()}
            </Collapse>
          </div>
        ) : null}
      </>
    );
  };

  return (
    <div className={cs.root}>
      <div className={cs.header}>
        <div className={cs.headerLeft}>
          {AconfigNow.current.socketId ? (
            <Tag color="green" className={cs.headerRoomDesc}>
              {t('connected')}
            </Tag>
          ) : (
            <Tag color="red" className={cs.headerRoomDesc}>
              {t('disconnected')}
            </Tag>
          )}
          <Divider type="vertical" margin="12px" />
          {Object.keys(AconfigNow.current).length ? (
            <span>
              （{AconfigNow.current.productId}）{AconfigNow.current.appName}
            </span>
          ) : null}
        </div>
        {isH5 && (
          <Button
            type="outline"
            className={cs.headerRoomButton}
            onClick={copyH5code}
          >
            {t('pass_copy')}
          </Button>
        )}
      </div>
      {renderContent()}
      <Modal
        className={cs.semiModalRule}
        visible={Boolean(editData)}
        footer={null}
        // onCancel={cancelEdit}
        okText={editData && editData.isNew ? t('new') : t('save')}
        // onOk={saveConfig}
        closable={false}
        {...otherStyle}
      >
        {editData ? renderEdit : null}
      </Modal>
      <Modal
        visible={Boolean(pageEditData)}
        onCancel={cancelPageEdit}
        okText={pageEditData && pageEditData.isNew ? t('new') : t('save')}
        confirmLoading={postLoding}
        onOk={savePage}
        closable={false}
        {...otherStyle}
      >
        {pageEditData ? renderPageEdit() : null}
      </Modal>
    </div>
  );
};

export default App;
