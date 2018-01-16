import service from '@/libs/service';


//验证Token有效性
export function verifyToken(token, init_user_info) {
  const data = {
    token,
    init_user_info,
  };

  return service({
    url: '/User/VerifyToken',
    method: 'post',
    data
  })
}

// 首次进入系统时初始化用户
export function initUserInfo(token) {
  const data = {
    token,
  }

  return service({
    url: '/Login/InitUserInfo',
    method: 'post',
    data
  })
}

// 验证登录用户
export function verifyUser(form) {
  const data = {
    user_acct: form.user_acct,
    user_pwd: form.user_pwd,
    uf_acct_no: form.uf_acct_no,
  }

  return service({
    url: '/User/VerifyUser',
    method: 'post',
    data
  })
}
/**
 * @description 获取用户列表
 * @author Michael Jian
 * @export
 * @returns 
 */
export function getUserList(){
  const data = {};

  return service({
    url: '/User/GetUserList',
    method: 'post',
    data
  });
}
/**
 * @description 同步U8用户
 * @author Michael Jian
 * @export
 * @returns 
 */
export function syncU8User(){
  const data = {};

  return service({
    url: '/User/SyncU8User',
    method: 'post',
    data
  });
}

/**
 * @description 重置用户密码
 * @author Michael Jian
 * @export
 * @param {Array} user_id_list 
 * @returns 
 */
export function resetUserPassword(user_id_list){
  const data = {
    user_id_list,
  };

  return service({
    url: '/User/ResetUserPassword',
    method: 'post',
    data
  });
}

/**
 * @description 删除用户
 * @author Michael Jian
 * @export
 * @param {Array} user_acct_list 
 * @returns 
 */
export function deleteUser(user_acct_list){
  const data = {
    user_acct_list,
  };

  return service({
    url: '/User/DeleteUser',
    method: 'post',
    data
  });
}


