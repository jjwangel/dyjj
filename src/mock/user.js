import Mock from 'mockjs';
import {
  UserListTpl,
  U8UserTpl,
} from './template.js';

export const GetUserList = Mock.mock(UserListTpl);
export const SyncU8User = Mock.mock(U8UserTpl);



export const VerifyToken = {
  retrun_code: '000000',
  token: 'new_token',
  user_acct: 'admin',
  user_id: '02e03707-7adf-4d14-8aee-6709a5319d5c',
  user_name: '系统管理员',
  user_dept: '开发部',
  limits: ['70ff9860-b44c-43ac-8e6d-a55efc5519e7', '43db26d4-b543-4474-96d7-e221fb475f8e'],
  uf_acct: {
    acct_no: '001',
    acct_name: '东业家具',
    acct_year: '2017'
  },
}

export const VerifyUser = {
  retrun_code: '000000',
  token: 'token',
  user_acct: 'admin',
  user_id: '02e03707-7adf-4d14-8aee-6709a5319d5c',
  user_name: '系统管理员',
  user_dept: '开发部',
  limits: ['70ff9860-b44c-43ac-8e6d-a55efc5519e7', '43db26d4-b543-4474-96d7-e221fb475f8e'],
  uf_acct: {
    acct_no: '001',
    acct_name: '东业家具-开发部',
    acct_year: '2017'
  },
}

export const resetUserPassword = {
  retrun_code: "000000",
}

export const deleteUser = {
  token: '',
  retrun_code: '000000',
  err_acct: [],
}
