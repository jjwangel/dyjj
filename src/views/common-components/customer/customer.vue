<style lang="less" scoped>
  @import './customer.less';

</style>

<template>
  <div class="comm-contenter">
    <div class="contenter-struct">
      <Button type="primary" @click="refreshStructTree" long>刷新客户分类</Button>
      <Tree :data="struct_tree_data" @on-select-change="handelSturctSelect"></Tree>
    </div>
    <div class="contenter-data">
      <Card shadow>
        <template slot="title">
          <Row>
            <Col span="6">
            <Input v-model="search_by_code" @on-change="handleSearchInTable" icon="ios-search" placeholder="客户编码..." style="width: 150px;"></Input>
            </Col>
            <Col span="6">
            <Input v-model="search_by_name" @on-change="handleSearchInTable" icon="ios-search" placeholder="客户名称..." style="width: 150px"></Input>
            </Col>
            <Col span="10">
            <Input v-model="search_all_info" placeholder="全文检索..." style="width: 250px;">
            <Button slot="append" :loading="SearchAll_loading" icon="ios-search" @click="handleSearchAllInfo"></Button>
            </Input>
            </Col>
            <Col span="2">
            <Poptip placement="bottom" width="500">
              <Badge :count="getSelectedCount">
                <Button type="primary" shape="circle" icon="ios-medical-outline"></Button>
              </Badge>
              <div slot="content">
                <Table border size="small" height="250" :columns="selected_column" :data="selected_data"></Table>
                <Button type="primary" long style="margin-top: 10px;" @click="handleClearSelected">清空所选</Button>
              </div>
            </Poptip>
            </Col>
          </Row>
        </template>
        <Table border ref="tabDetail" :loading="detail_loading" size="small" height="350" :columns="detail_column" :data="detail_data"
          @on-select="handleSelectOne" @on-select-cancel="handleCancelSelectOne" @on-selection-change="handleSelectChange"></Table>
      </Card>
    </div>
  </div>
</template>

<script>
  import util from '@/libs/util';
  import {
    getCustomerClassData,
    getCustomerDetailInfo,
  } from '@/api/app.js';

  export default {
    data() {
      return {
        detail_loading: false,
        SearchAll_loading: false,
        search_by_code: "",
        search_by_name: "",
        search_all_info: "",
        struct_tree_data: [],
        detail_column: [{
            type: 'selection',
            width: 50,
            fixed:'left',
            align: 'center',
          },
          {
            title: '客户编码',
            width: 120,
            fixed:'left',
            key: 'cus_code'
          },
          {
            title: '客户名称',
            width: 385,
            key: 'cus_name'
          },
          {
            title: '所属分类',
            width: 150,
            key: 'class_name'
          },
        ],
        selected_column: [{
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '客户编码',
            width: 100,
            key: 'cus_code'
          },
          {
            title: '客户名称',
            key: 'cus_name',
            width: 210,
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            width: 85,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.handleDelOneSelected(params.row);
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        detail_data: [],
        detail_init_data: [],
        selected_data: [],
        selected_count: 0,
      }
    },
    methods: {
      init() {
        getCustomerClassData().then((response) => {
          if (response.data.retrun_code === "000000") {
            this.struct_tree_data = response.data.class_data;
          } else {
            console.log(response.data.retrun_code);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      initSelected(selected) {
        this.$refs.tabDetail.selectAll(false);
        this.selected_data = [...selected];
      },
      refreshStructTree() {
        getCustomerClassData().then((response) => {
          if (response.data.retrun_code === "000000") {
            this.struct_tree_data = response.data.class_data;
          } else {
            console.log(response.data.retrun_code);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      getDetailInfoByCode(code) {
        this.detail_loading = true;
        getCustomerDetailInfo(code).then((response) => {
          if (response.data.retrun_code === "000000") {
            this.detail_data = response.data.cus_data;
            this.detail_init_data = this.detail_data;
          } else {
            console.log(response.data.retrun_code);
          }
        }).catch(err => {
          console.log(err);
        });

        this.detail_loading = false;
      },
      handelSturctSelect(value) {
        if (value.length > 0 && value[0].dep_code != "") {
          this.getDetailInfoByCode(value[0].cus_code);
        }
      },
      handleSearchInTable() {
        this.detail_data = util.searchByKey(this.detail_init_data, {
          cus_code: this.search_by_code,
          cus_name: this.search_by_name
        });
      },
      handleSearchAllInfo() {
        if (this.search_all_info.trim() != "") {
          this.detail_loading = true;
          this.SearchAll_loading = true;
          getCustomerDetailInfo(this.search_all_info.trim()).then((response) => {
            if (response.data.retrun_code === "000000") {
              this.detail_data = response.data.cus_data;
              this.detail_init_data = this.detail_data;
            } else {
              console.log(response.data.retrun_code);
            }
          }).catch(err => {
            console.log(err);
          });

          this.detail_loading = false;
          this.SearchAll_loading = false;

        } else {
          this.$Message.warning('请输入检索内容');
        }
      },
      handleClearSelected() {
        this.selected_data = [];
        this.$refs.tabDetail.selectAll(false);
      },
      handleSelectOne(selection, row) {
        this.selected_data = util.addObjToArray(this.selected_data, Array.of(row), "cus_code");
      },
      handleSelectChange(selection) {
        if (selection.length == this.detail_data.length) {
          this.selected_data = util.addObjToArray(this.selected_data, this.detail_data, "cus_code");
        } else if (selection.length == 0) {
          this.selected_data = util.removeObjFromArray(this.selected_data, this.detail_data, "cus_code");
        }
      },
      handleCancelSelectOne(selection, row) {
        this.selected_data = util.removeObjFromArray(this.selected_data, Array.of(row), "cus_code");
      },
      handleDelOneSelected(row) {
        this.selected_data = util.removeObjFromArray(this.selected_data, Array.of(row), "cus_code");
        let i = this.detail_data.findIndex(item => {
          return item.cus_code == row.cus_code;
        });
        if (i >= 0) {
          this.$refs.tabDetail.objData[i]._isChecked = false;
        }
      },
    },
    computed: {
      getSelectedCount() {
        return this.selected_data.length;
      },
    },
    mounted() {
      this.init();
    },
    watch: {
      selected_data() {
        this.$emit('dataSelected', this.selected_data);
      }
    }
  }

</script>
