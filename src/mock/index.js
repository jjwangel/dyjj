import Mock from 'mockjs'
import {
  VerifyToken,
  VerifyUser,
  GetUserList,
  SyncU8User,
  resetUserPassword,
  deleteUser,
} from './user'

import {
  getUfAccountInfo,
  getDepartmentDetailInfo,
  getDepartmentData,
  getPersonInfo,
  getInventoryClassData,
  getInventoryClassDetailInfo,
  getInventoryDetailInfo,
  getCustomerClassData,
  getCustomerDetailInfo,
  verifyFunction,
  getSaleAmountDetailByInventory,
  getSaleAmountChartByInventoryTpl,
  getSaleQuantityDetailByInventory,
  getSaleQuantityChartByInventoryTpl,
} from './app'

Mock.mock(/\/User\/VerifyToken/, VerifyToken);
Mock.mock(/\/User\/VerifyUser/, VerifyUser);
Mock.mock(/\/User\/GetUserList/, GetUserList);
Mock.mock(/\/User\/SyncU8User/, SyncU8User);
Mock.mock(/\/User\/ResetUserPassword/, resetUserPassword);
Mock.mock(/\/User\/DeleteUser/, deleteUser);

Mock.mock(/\/Common\/GetUfAccountInfo/, getUfAccountInfo);
Mock.mock(/\/Common\/GetDepartmentDetailInfo/, getDepartmentDetailInfo);
Mock.mock(/\/Common\/GetDepartmentData/, getDepartmentData);
Mock.mock(/\/Common\/GetPersonInfo/, getPersonInfo);
Mock.mock(/\/Common\/GetInventoryClassData/, getInventoryClassData);
Mock.mock(/\/Common\/GetInventoryClassDetailInfo/, getInventoryClassDetailInfo);
Mock.mock(/\/Common\/GetInventoryDetailInfo/, getInventoryDetailInfo);
Mock.mock(/\/Common\/GetCustomerClassData/, getCustomerClassData);
Mock.mock(/\/Common\/GetCustomerDetailInfo/, getCustomerDetailInfo);
Mock.mock(/\/Common\/VerifyFunction/, verifyFunction);
Mock.mock(/\/SaleAmount\/Detail\/GetDataByInventory/, getSaleAmountDetailByInventory);
Mock.mock(/\/SaleAmount\/Chart\/GetDataByInventory/, getSaleAmountChartByInventoryTpl);
Mock.mock(/\/SaleQuantity\/Detail\/GetDataByInventory/, getSaleQuantityDetailByInventory);
Mock.mock(/\/SaleQuantity\/Chart\/GetDataByInventory/, getSaleQuantityChartByInventoryTpl);

export default Mock
