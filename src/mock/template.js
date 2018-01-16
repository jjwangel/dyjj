import _ from 'lodash';

// mock数据模版文件

// 用户相关数据模版 //////////////////////////////////////////////////////////////
export const UserListTpl = {
  'retrun_code': '000000',
  'user_data|10-100': [{
    'user_id': '@guid',
    'user_acct': '@string("lower", 5)',
    'user_name': '@cname',
    'user_sex|1': ["男", "女"],
    'user_dep|1': ["销售一部", "销售二部", "销售三部", "销售四部", "销售五部", "销售六部", ],
    'user_post|1': ["普通人员", "管理人员", "部门经理", "产品经理"],
  }]
}

export const U8UserTpl = {
  'retrun_code': '000000',
  'user_data|1-50': [{
    'user_id': '@guid',
    'user_acct': '@string("lower", 5)',
    'user_name': '@cname',
    'user_sex|1': ["男", "女"],
    'user_dep|1': ["销售一部", "销售二部", "销售三部", "销售四部", "销售五部", "销售六部", ],
    'user_post|1': ["普通人员", "管理人员", "部门经理", "产品经理"],
  }]
}

// ///////////////////////////////////////////////////////////////////////////


// 应用相关数据模版////////////////////////////////////////////////////////////
export const DepartmentDetailInfoTpl = {
  'retrun_code': "000000",
  'dep_data|5-20': [{
    'dep_code|+1': 200,
    'dep_name|1': ["销售一部", "销售二部", "销售三部", "销售四部", "销售五部", "销售六部", ],
  }]
}

export const PersonInfoTpl = {
  'retrun_code': "000000",
  'psn_data|5-30': [{
    'psn_code|+1': 600,
    'psn_name|1': '@cname',
  }]
}

export const InventoryClassDetailInfoTpl = {
  'retrun_code': "000000",
  'class_data|5-30': [{
    'class_code|+1': 300,
    'class_name|1': '@cword(3, 8)',
  }]
}

export const InventoryClassDataTpl = {
  'retrun_code': '000000',
  'class_data': [{
    'title': '所有分类',
    'class_name': "所有分类",
    'class_code': '0',
    'expand': true,
    'children|3': [{
      'title|+1': ['成品', '半成品', '原材料'],
      'class_name': function () {
        return this.title
      },
      'class_code|+1': 10,
      'children|2-10': [{
        'title': '@cword(3, 8)',
        'class_name': function () {
          return this.title
        },
        'class_code|+1': 200,
      }]
    }]
  }]
}

export const DepartmentDataTpl = {
  'retrun_code': '000000',
  'dep_data': [{
    'title': '所有部门',
    'dep_name': function () {
      return this.title
    },
    'dep_code': '0',
    'expand': true,
    'children|4': [{
      'title|+1': ['采购部门', '销售部', '财务部', '仓储部'],
      'dep_name': function () {
        return this.title
      },
      'dep_code|+1': 10,
      'children|3-10': [{
        'title': '@cword(3, 8)',
        'dep_name': function () {
          return this.title
        },
        'dep_code|+1': 200,
      }]
    }]
  }]
}

export const InventoryDetailInfoTpl = {
  'retrun_code': "000000",
  'inv_data|10-30': [{
    'inv_code': '@integer(10000000, 99999999)',
    'inv_name': '@cword(3, 8)',
    'inv_std': '@string("lower", 10)',
    'inv_addcode': "@string('upper', 5,10)",
    'inv_unit|1': ['件', '张', '把', '台', '套', '支', '平方'],
    'class_name': "@cword(4, 10)"
  }]
}

export const CustomerDetailInfoTpl = {
  'retrun_code': "000000",
  'cus_data|5-30': [{
    'cus_code': '@integer(10000000, 99999999)',
    'cus_name': '@cword(5, 15)',
    'class_name': '@cword(3, 8)',
  }]
}

export const CustomerClassDataTpl = {
  'retrun_code': '000000',
  'class_data': [{
    'title': '所有分类',
    'class_name': "所有分类",
    'class_code': '0',
    'expand': true,
    'children|10-20': [{
      'title': "@province",
      'class_name': function () {
        return this.title
      },
      'class_code': '@integer(10000, 99999)',
      'children|5-10': [{
        'title': '@city',
        'class_name': function () {
          return this.title
        },
        'class_code': '@integer(1000, 9999)',
      }]
    }]
  }]
}

// ////////////////////////////////////////////////////////////////////////////


export const GetSaleAmountDetailByInventoryTpl = {
  'retrun_code': "000000",
  'token': 'aaaaaa',
  'result|10-30': [{
    'bill_no': '@integer(10000000, 99999999)',
    'bill_date': '@date("yyyy-MM-dd")',
    'customer': '@cword(5,10)',
    'department|1': ['采购部门', '销售部', '财务部', '仓储部'],
    'salesman': '@cname',
    'inv_code': "@word(5, 10)",
    'inv_name': "@cword(4, 10)",
    'inv_standard': "@word(4, 10)",
    'quantity': "@integer(10, 100)",
    'price': "@float(10, 100, 2, 2)",
    'sum': function () {
      return (this.quantity * this.price).toFixed(2);
    },
    'total_quantity': "@integer(1000, 10000)",
    'total_sum': "@float(5000, 50000, 2, 2)",
  }]
}

export const GetSaleAmountChartByInventoryTpl = {
  'retrun_code': "000000",
  'token': 'aaaaaa',
  'result': {
    'column|20':[/\d{5,5}-\S{5,10}/],
    'values1|20':['@float(100, 1000, 2, 2)'],
    'values2|20':['@float(500, 5000, 2, 2)'],
  }
}

export const GetSaleQuantityDetailByInventoryTpl = {
  'retrun_code': "000000",
  'token': 'aaaaaa',
  'result|10-30': [{
    'bill_no': '@integer(10000000, 99999999)',
    'bill_date': '@date("yyyy-MM-dd")',
    'customer': '@cword(5,10)',
    'department|1': ['采购部门', '销售部', '财务部', '仓储部'],
    'salesman': '@cname',
    'inv_code': "@word(5, 10)",
    'inv_name': "@cword(4, 10)",
    'inv_standard': "@word(4, 10)",
    'quantity': "@integer(10, 100)",
    'price': "@float(10, 100, 2, 2)",
    'sum': function () {
      return (this.quantity * this.price).toFixed(2);
    },
    'total_quantity': "@integer(1000, 10000)",
    'total_sum': "@float(5000, 50000, 2, 2)",
  }]
}

export const GetSaleQuantityChartByInventoryTpl = {
  'retrun_code': "000000",
  'token': 'aaaaaa',
  'result': {
    'column|20':[/\d{5,5}-\S{5,10}/],
    'values1|20':['@integer(10, 100)'],
    'values2|20':['@integer(50, 500)'],
  }
}
