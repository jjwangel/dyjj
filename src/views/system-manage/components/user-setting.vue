<style lang="less" scoped>
  @import './user-setting.less';

</style>

<template>
  <div>
    <div class="user-setting-header">
      <ButtonGroup>
          <Button type="primary" @click="handleSyncUser" :loading="sync_loading" icon="arrow-swap">同步U8用户</Button>
          <Button type="primary" icon="android-sync" >刷新列表</Button>
          <Button type="primary" icon="nuclear" >权限设置</Button>
          <Button type="primary" @click="handleResetPwd" :loading="reset_pwd_loading" icon="unlocked" >重置密码</Button>
      </ButtonGroup>

      <Dropdown @on-click="handleDelUser" style="margin-left: 10px">
        <Button type="error">
          删除用户
          <Icon type="arrow-down-b"></Icon>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem name="delBySelected">删除所选</DropdownItem>
          <DropdownItem name="delByAll" divided>删除所有</DropdownItem>
        </DropdownMenu>
      </Dropdown>

    </div>
    <div class="user-setting-content">
      <Table size="small" stripe border :loading="detail_loading" :columns="detail_columns" :data="detail_data" @on-selection-change="handleUserSelectChange"></Table>
    </div>

    <div class="user-setting-footer">
      <Page :total="100" size="small" placement="top" :page-size-opts="page_size_opts" show-elevator show-sizer show-total></Page>
    </div>
  </div>

</template>

<script>
  import util from '@/libs/util';
  import {
    getUserList,
    syncU8User,
    resetUserPassword,
    deleteUser,
  } from '@/api/user.js';
  import {
    verifyFunction,
  } from '@/api/app.js';

  import _ from 'lodash';
  export default {
    data() {
      return {
        detail_loading: false,
        sync_loading: false,
        reset_pwd_loading: false,
        del_one_loading: false,
        page_size_opts:[10,30,50,80,100],
        detail_columns: [{
            type: 'selection',
            width: 50,
            align: 'center',
          },
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '登录账号',
            width: 200,
            sortable: true,
            key: 'user_acct'
          },
          {
            title: '用户名称',
            width: 200,
            sortable: true,
            key: 'user_name',
          },
          {
            title: '性别',
            width: 100,
            sortable: true,
            key: 'user_sex',
          },
          {
            title: '所属部门',
            width: 200,
            sortable: true,
            key: 'user_dep',
          },
          {
            title: '所属职务',
            sortable: true,
            width: 200,
            key: 'user_post',
          },
          {
            title: '操作',
            key: 'action',
            width: 100,
            align: 'center',
            render: (h, params) => {
              return h('Poptip', {
                props: {
                  confirm: true,
                  title: '您确定要删除这个用户吗?',
                  transfer: true
                },
                on: {
                  'on-ok': () => {
                    this.handleDelOneSelected(params.row);
                  }
                }
              }, [
                h('Button', {
                  style: {
                    margin: '0 5px'
                  },
                  props: {
                    type: 'error',
                    placement: 'top',
                    loading: this.del_one_loading,
                  }
                }, '删除')
              ]);
            }
          },
          {
            title: ' ',
            key: 'space',
          },
        ],
        detail_data: [],
        selected_data: [],
      }
    },
    components: {

    },
    methods: {
      init() {
        this.detail_loading = true;
        getUserList().then((response) => {
          if (response.data.retrun_code === "000000") {
            this.detail_data = response.data.user_data;
          } else {
            console.log(response.data.retrun_code);
          }
          this.detail_loading = false;
        }).catch(err => {
          this.detail_loading = false;
          console.log(err);
        });
      },
      handleSyncUser() {
        this.sync_loading = true;
        verifyFunction(this.$store.getters.user_id, 'function_id').then((response) => {
          let verifyData = response.data;
          if (verifyData.retrun_code == "000000") {
            this.$Modal.confirm({
              title: '同步U8用户',
              content: '确定同步U8用户吗？新导入用户初始密码为：000000',
              onOk: () => {
                this.syncUser();
              },
              onCancel: () => {
                this.sync_loading = false;
              },
            });
          } else if (verifyData.retrun_code == "SYS0005") {
            this.sync_loading = false;
            this.$Message.warning({
              content: '你没有执行该功能的权限！',
              duration: 2,
            });
          } else {
            console.log(verifyData.retrun_code);
            this.sync_loading = false;
          }
        }).catch(err => {
          console.log(err);
          this.sync_loading = false;
        })
      },
      syncUser() {
        this.detail_loading = true;
        syncU8User().then((response) => {
          if (response.data.retrun_code === "000000") {
            this.detail_data = response.data.user_data;
            this.$Message.info('同步U8用户成功！');
          } else {
            console.log(response.data.retrun_code);
          }
          this.detail_loading = false;
          this.sync_loading = false;
        }).catch(err => {
          this.detail_loading = false;
          console.log(err);
        })
      },
      handleUserSelectChange(selection) {
        this.selected_data = selection;
      },
      handleResetPwd() {
        if (this.selected_data.length > 0) {
          this.reset_pwd_loading = true;
          verifyFunction(this.$store.getters.user_id, 'function_id').then((response) => {
            let verifyData = response.data;
            if (verifyData.retrun_code == "000000") {
              this.$Modal.confirm({
                title: '重置密码',
                content: '确定重置所选用户的密码吗？重置后密码为：000000',
                onOk: () => {
                  this.resetPwd();
                },
                onCancel: () => {
                  this.reset_pwd_loading = false;
                },
              });
            } else if (verifyData.retrun_code == "SYS0005") {
              this.reset_pwd_loading = false;
              this.$Message.warning({
                content: '你没有执行该功能的权限！',
                duration: 2,
              });
            } else {
              console.log(verifyData.retrun_code);
              this.reset_pwd_loading = false;
            }
          }).catch(err => {
            console.log(err);
            this.reset_pwd_loading = false;
          })
        } else {
          this.$Message.warning({
            content: '请至少选择一个用户！',
            duration: 2,
          });
        }
      },
      resetPwd() {
        resetUserPassword(util.getOnekeyValue(this.selected_data, 'user_acct')).then((response) => {
          if (response.data.retrun_code === "000000") {
            this.$Message.info('密码重置成功！');
          } else {
            console.log(response.data.retrun_code);
          }
          this.reset_pwd_loading = false;
        }).catch(err => {
          this.reset_pwd_loading = false;
          console.log(err);
        })
      },
      handleDelOneSelected(row) {
        this.deleteUserByAcct(Array.of(row.user_acct));
      },
      handleDelUser(type) {
        if (type == "delBySelected") {
          if (this.selected_data.length > 0) {
            this.$Modal.confirm({
                title: '删除用户',
                content: '确定删除所选用户吗？',
                onOk: () => {
                  this.deleteUserByAcct(util.getOnekeyValue(this.selected_data, 'user_acct'));
                },
                onCancel: () => {
                  this.reset_pwd_loading = false;
                },
              });
          } else {
            this.$Message.warning('请至少选择一个用户！');
          }
        } else if (type == "delByAll") {
          this.$Modal.confirm({
                title: '删除用户',
                content: '确定删除所有用户吗？',
                onOk: () => {
                  this.deleteUserByAcct(util.getOnekeyValue(this.detail_data, 'user_acct'));
                },
                onCancel: () => {
                  this.reset_pwd_loading = false;
                },
              });
        }

      },
      deleteUserByAcct(user_acct_list) {
        this.del_one_loading = true;
        verifyFunction(this.$store.getters.user_id, 'function_id').then((response) => {
          let verifyData = response.data;
          if (verifyData.retrun_code == "000000") {
            deleteUser(user_acct_list).then(response => {
              if (response.data.retrun_code == "000000") {
                if (this.detail_data.length == user_acct_list.length) {
                  this.detail_data = [];
                  this.selected_data = [];
                } else {
                  this.detail_data = _.filter(this.detail_data, (o) => {
                    return _.indexOf(user_acct_list, o.user_acct) < 0;
                  });
                }

                this.$Message.info('删除用户成功！');
              } else if (response.data.retrun_code == "BUS0002") {

              }
              this.del_one_loading = false;
            }).catch(err => {
              console.log(err);
              this.del_one_loading = false;
            })
          } else if (verifyData.retrun_code == "SYS0005") {
            this.reset_pwd_loading = false;
            this.$Message.warning({
              content: '你没有执行该功能的权限！',
              duration: 2,
            });
          } else {
            console.log(verifyData.retrun_code);
            this.del_one_loading = false;
          }
        }).catch(err => {
          console.log(err);
          this.del_one_loading = false;
        })
      },
    },
    computed: {

    },
    mounted() {
      this.init();
    }
  }

</script>

<style>


</style>
