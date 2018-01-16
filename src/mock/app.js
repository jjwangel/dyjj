import Mock from 'mockjs';
import {
  DepartmentDetailInfoTpl,
  PersonInfoTpl,
  InventoryClassDetailInfoTpl,
  InventoryClassDataTpl,
  DepartmentDataTpl,
  InventoryDetailInfoTpl,
  CustomerDetailInfoTpl,
  CustomerClassDataTpl,
  GetSaleAmountDetailByInventoryTpl,
  GetSaleAmountChartByInventoryTpl,
  GetSaleQuantityDetailByInventoryTpl,
  GetSaleQuantityChartByInventoryTpl,
} from './template.js';

export const getDepartmentDetailInfo = Mock.mock(DepartmentDetailInfoTpl);
export const getPersonInfo = Mock.mock(PersonInfoTpl);
export const getInventoryClassDetailInfo = Mock.mock(InventoryClassDetailInfoTpl);
export const getInventoryClassData = Mock.mock(InventoryClassDataTpl);
export const getDepartmentData = Mock.mock(DepartmentDataTpl);
export const getInventoryDetailInfo = Mock.mock(InventoryDetailInfoTpl);
export const getCustomerDetailInfo = Mock.mock(CustomerDetailInfoTpl);
export const getCustomerClassData = Mock.mock(CustomerClassDataTpl);
export const getSaleAmountDetailByInventory = Mock.mock(GetSaleAmountDetailByInventoryTpl);
export const getSaleAmountChartByInventoryTpl = Mock.mock(GetSaleAmountChartByInventoryTpl);
export const getSaleQuantityDetailByInventory = Mock.mock(GetSaleQuantityDetailByInventoryTpl);
export const getSaleQuantityChartByInventoryTpl = Mock.mock(GetSaleQuantityChartByInventoryTpl);


export const getUfAccountInfo = {
  retrun_code: "000000",
  uf_acct_list: {
    default_acct_no: "001",
    list: [{
        disable: false,
        acct_no: "001",
        acct_name: "东业家具",
      },
      {
        disable: true,
        acct_no: "002",
        acct_name: "南业家具",
      },
      {
        disable: false,
        acct_no: "003",
        acct_name: "西业家具",
      },
      {
        disable: true,
        acct_no: "004",
        acct_name: "北业家具",
      },
    ]
  }
};

export const verifyFunction = {
  retrun_code: "000000",
}
