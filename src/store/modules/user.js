import Cookies from 'js-cookie';
import {
  verifyToken,
  initUserInfo,
  verifyUser
} from '@/api/user';

const user = {
  state: {
    token: Cookies.get('token') ? Cookies.get('token') : '',
    user_acct: '',
    user_id: '',
    user_name: '',
    user_dept: '',
    limits: [],
    uf_acct: {
      acct_no: '',
      acct_name: '',
      acct_year: '2017'
    },
  },
  mutations: {
    SET_USER_ACCT: (state, value) => {
      state.user_acct = value
    },
    SET_TOKEN: (state, value) => {
      state.token = value
    },
    SET_UF_ACCT_NO: (state, value) => {
      state.uf_acct.acct_no = value
    },
    SET_UF_ACCT_NAME: (state, value) => {
      state.uf_acct.acct_name = value
    },
    SET_UF_ACCT_YEAR: (state, value) => {
      state.uf_acct.acct_year = value
    },
    SET_USER_ID: (state, value) => {
      state.user_id = value
    },
    SET_USER_NAME: (state, value) => {
      state.user_name = value
    },
    SET_USER_DEPT: (state, value) => {
      state.user_dept = value
    },
    SET_USER_LIMITS: (state, value) => {
      state.limits = value
    },
  },
  actions: {
    VerifyToken({
      commit
    }, value) { // 验证token
      return new Promise((resolve, reject) => {
        verifyToken(value.token, value.init_user_info).then(response => {
          let data = response.data;
          if (data.retrun_code === '000000') {
            Cookies.set('token', data.token);
            commit('SET_TOKEN', data.token);
            if (value.init_user_info) {
              commit('SET_USER_ACCT', data.user_acct);
              commit('SET_UF_ACCT_NO', data.uf_acct.acct_no);
              commit('SET_UF_ACCT_NAME', data.uf_acct.acct_name);
              commit('SET_UF_ACCT_YEAR', data.uf_acct.acct_year);
              commit('SET_USER_ID', data.user_id);
              commit('SET_USER_NAME', data.user_name);
              commit('SET_USER_DEPT', data.user_dept);
              commit('SET_USER_LIMITS', data.limits);
            }
            resolve(data.retrun_code);
          } else {
            commit('SET_TOKEN', '');
            Cookies.set('token', '');
            resolve(data.retrun_code);
          }
        }).catch(err => {
          commit('SET_TOKEN', '');
          Cookies.set('token', '');
          reject(err)
        })
      })
    },
    VerifyUser({
      commit
    }, value) { // 验证登录用户
      return new Promise((resolve, reject) => {
        verifyUser(value).then(response => {
          let data = response.data;
          if (data.retrun_code === "000000") {
            Cookies.set('token', data.token);
            commit('SET_TOKEN', data.token);
            commit('SET_USER_ACCT', data.user_acct);
            commit('SET_UF_ACCT_NO', data.uf_acct.acct_no);
            commit('SET_UF_ACCT_NAME', data.uf_acct.acct_name);
            commit('SET_UF_ACCT_YEAR', data.uf_acct.acct_year);
            commit('SET_USER_ID', data.user_id);
            commit('SET_USER_NAME', data.user_name);
            commit('SET_USER_DEPT', data.user_dept);
            commit('SET_USER_LIMITS', data.limits);
          }
          resolve(data.retrun_code);
        }).catch(err => {
          reject(err);
        })
      })
    },
    UserLogout({commit}) {
      Cookies.remove('token');
      commit('SET_TOKEN', "");
    },
  }
};

export default user;
