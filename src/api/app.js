import service from '@/libs/service';


//获取友账套数据
export function getUfAccountInfo() {
  const data = {};

  return service({
    url: '/Common/GetUfAccountInfo',
    method: 'get',
    data
  })
}

// 获取部门详细数据
export function getDepartmentDetailInfo(dep_code) {
  const data = {
    dep_code,
  };

  return service({
    url: '/Common/GetDepartmentDetailInfo',
    method: 'post',
    data
  });
}

// 获取部门数据（用于树型过滤）
export function getDepartmentData() {
  const data = {};

  return service({
    url: '/Common/GetDepartmentData',
    method: 'post',
    data
  });
}

// 跟据部门编码获取人同数据
export function getPersonInfo(dep_code) {
  const data = {
    dep_code,
  };

  return service({
    url: '/Common/GetPersonInfo',
    method: 'post',
    data
  });
}

/**
 * @description 获取存货分类结构数据
 * @author Michael Jian
 * @export
 * @returns 
 */
export function getInventoryClassData() {
  const data = {};

  return service({
    url: '/Common/GetInventoryClassData',
    method: 'post',
    data
  });
}

/**
 * @description 跟据存货分类编码获取存货分类数据
 * @author Michael Jian
 * @export
 * @param {any} class_code 
 * @returns 
 */
export function getInventoryClassDetailInfo(class_code) {
  const data = {
    class_code,
  };

  return service({
    url: '/Common/GetInventoryClassDetailInfo',
    method: 'post',
    data
  });
}

/**
 * @description 跟据存货分类编码获取存货档案数据
 * @author Michael Jian
 * @export
 * @param {String} class_code 
 * @returns 
 */
export function getInventoryDetailInfo(class_code) {
  const data = {
    class_code,
  };

  return service({
    url: '/Common/GetInventoryDetailInfo',
    method: 'post',
    data
  });
}

/**
 * @description 获取客户分类结构数据
 * @author Michael Jian
 * @export
 * @returns 
 */
export function getCustomerClassData() {
  const data = {};

  return service({
    url: '/Common/GetCustomerClassData',
    method: 'post',
    data
  });
}

/**
 * @description 跟据客户分类编码获取客户数据
 * @author Michael Jian
 * @export
 * @param {String} class_code 
 * @returns 
 */
export function getCustomerDetailInfo(class_code) {
  const data = {
    class_code,
  };

  return service({
    url: '/Common/GetCustomerDetailInfo',
    method: 'post',
    data
  });
}

/**
 * @description 验证用户是否有功能权限
 * @author Michael Jian
 * @export
 * @param {String} user_id 
 * @param {String} function_id 
 * @returns 
 */
export function verifyFunction(user_id,function_id) {
  const data = {
    user_id,
    function_id,
  };

  return service({
    url: '/Common/VerifyFunction',
    method: 'post',
    data
  });
}

/**
 * @description 按存货档案获取销售金额明细数据
 * @author Michael Jian
 * @export
 * @returns 
 */
export function getSaleAmountDetailByInventory() {
  const data = {};

  return service({
    url: '/SaleAmount/Detail/GetDataByInventory',
    method: 'post',
    data
  });
}

/**
 * @description 按存货档案获取销售金额统计数据
 * @author Michael Jian
 * @export
 * @returns 
 */
export function getSaleAmountChartByInventory() {
  const data = {};

  return service({
    url: '/SaleAmount/Chart/GetDataByInventory',
    method: 'post',
    data
  });
}

/**
 * @description 按存货档案获取销售总量明细数据
 * @author Michael Jian
 * @export
 * @returns 
 */
export function getSaleQuantityDetailByInventory() {
  const data = {};

  return service({
    url: '/SaleQuantity/Detail/GetDataByInventory',
    method: 'post',
    data
  });
}

/**
 * @description 按存货档案获取销售总量统计数据
 * @author Michael Jian
 * @export
 * @returns 
 */
export function getSaleQuantityChartByInventory() {
  const data = {};

  return service({
    url: '/SaleQuantity/Chart/GetDataByInventory',
    method: 'post',
    data
  });
}


