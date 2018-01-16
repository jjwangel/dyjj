const getters = {
  token: state => state.user.token,
  user_id: state => state.user.user_id,
  user_limits: state => state.user.limits,

  menu_list: state => state.app.menu_list,
}

export default getters
