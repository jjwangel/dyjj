// import axios from 'axios';
// import env from '../../build/env';
// import store from '@/store';
import {
  getUfAccountInfo
} from '@/api/app';

import _ from 'lodash';

let util = {

};

util.title = function (title) {
  title = title ? title + ' - Home' : 'DYJJ project';
  window.document.title = title;
};


//获取用友账套数据
util.GetUfAccountInfo = function () {
  return getUfAccountInfo();
}

/**
 * @description 设备当前路径（面包屑）
 * @param {any} vm vue实例
 * @param {any} name 当前页面名称
 */
util.setCurrentPath = function (vm, name) {
  let currentPathArr = [{
    title: '首页',
    path: '/home',
    name: 'home'
  }];

  vm.$store.state.app.menu_list.forEach(item => {
    item.children.forEach(child => {
      if (child.name === name) {
        currentPathArr.push({
          title: item.meta.title,
          path: '',
          name: ''
        });
        currentPathArr.push({
          title: child.meta.title,
          path: child.path,
          name: child.name
        })
      }
    });
  });

  vm.$store.commit('SET_CURRENT_PATH', currentPathArr);
};

/**
 * @description 向数组arr添加一个对像
 * @param {Array} arr 原数组
 * @param {Array} obj 需要添加的对像
 * @param {String} keyName 判断的字段
 * @returns 如果arrTarget的keyName字段的值已存在arr中，则返回arr，否则添加Obj后返回arr
 */
util.addObjToArray = function (arrSource, arrTarget, keyName) {
  let arrClone = arrSource;
  arrClone.push(...arrTarget);
  return _.uniqBy(arrClone, keyName);
};


/**
 * @description 从数组中移除一个对像
 * @param {any} arr 原数组
 * @param {any} obj 需要移除的对像
 * @param {any} keyName 判断的字段
 * @returns 如果obj的keyName字段的值存在arr中，则移除Obj，最终返回新arr
 */
util.removeObjFromArray = function (arrSource, arrTarget, keyName) {
  return _.differenceBy(arrSource, arrTarget, keyName);
};

/**
 * @description 通过key对像在对像数组中查找
 * @param {any} data 对像数组
 * @param {any} argumentObj key对像
 * @returns 返回过滤后的对像数组
 */
util.searchByKey = function (data, argumentObj) {
  console.log(data);
  console.log(argumentObj);
  
  let res = data;
  let dataClone = data;
  for (let argu in argumentObj) {
    if (argumentObj[argu].length > 0) {
      res = dataClone.filter(d => {
        return d[argu].toString().indexOf(argumentObj[argu]) > -1;
      });
      dataClone = res;
    }
  }
  return res;
};

/**
 * @description 从数组中获取指定key的所有值，返回新数组
 * @param {Array} data 
 * @param {String} key 
 * @returns 从数组中获取指定key的所有值，返回新数组
 */
util.getOnekeyValue = function (data, key) {
  return _.map(data, key);
}



export default util;
