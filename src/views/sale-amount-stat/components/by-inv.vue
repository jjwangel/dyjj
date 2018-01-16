<style lang="less" scoped>
  @import './by-inv.less';

</style>

<template>
  <div>
    <div class="by-inv-header">
      <DatePicker type="month" placeholder="统计月份" :value="stat_date" :editable="false" :clearable='false' style="width: 120px"></DatePicker>
      <Select v-model="search_type" style="width:140px;margin-left: 10px;" @on-change="handelSearchTypeChange">
        <Option value="ranking">按排名检索</Option>
        <Option value="record">按存货档案检索</Option>
      </Select>
      <InputNumber v-show="show_by_ranking" v-model="sort_min" :max="20" :min="1" :editable="false" style="width:90px;margin-left: 10px;"></InputNumber>
      <p v-show="show_by_ranking" style="margin-left: 10px;">至</p>
      <InputNumber v-show="show_by_ranking" v-model="sort_max" :max="20" :min="1" :editable="false" style="width:90px;margin-left: 10px;"></InputNumber>

      <Input v-show="!show_by_ranking" v-model="search_inv_code" style="width:212px;margin-left: 10px;">
      <Button slot="append" icon="social-buffer-outline" @click="handleShowInventory"></Button>
      </Input>

      <Select v-model="sort_type" style="width:140px;margin-left: 10px;">
        <Option value="sort_by_month">按当月排序</Option>
        <Option value="sort_by_amount">按总额排序</Option>
      </Select>

      <Checkbox v-model="comp_last_year" size="large" style="margin-left: 10px;">同期对比</Checkbox>

      <ButtonGroup style="margin-left: 10px;">
        <Button type="primary" :loading="sync_loading" icon="search" @click="handleSearchResult">检索数据</Button>
        <Button type="primary" icon="share">导出列表</Button>
      </ButtonGroup>
    </div>

    <div class="by-inv-content">
      <div id="stat-char" class="by-inv-char">

      </div>

      <div class="by-inv-detail">
        <Table size="small" stripe border :loading="detail_loading" :columns="detail_columns" :data="detail_data"></Table>
      </div>
    </div>

    <div class="by-inv-footer">
      <Page :total="100" size="small" placement="top" :page-size-opts="page_size_opts" show-elevator show-sizer show-total></Page>
    </div>


    <template>
      <Modal width="900" title="选择存货档案" v-model="showInventory" @on-ok="handleInventoryConfirm" :mask-closable="false">
        <commInventory ref="commInventory" @dataSelected="handleInventorySelected"></commInventory>
      </Modal>
    </template>
  </div>
  </div>

</template>

<script>
  import echarts from 'echarts';
  import util from '@/libs/util';
  import {
    getSaleAmountDetailByInventory,
    getSaleAmountChartByInventory,
  } from '@/api/app.js';

  import commInventory from '@/views/common-components/inventory/inventory.vue';




  export default {
    data() {
      return {
        comp_last_year: false,
        chart: {},
        chart_data: {},
        detail_loading: false,
        sync_loading: false,
        showInventory: false,
        show_by_ranking: true,
        sort_min: 1,
        sort_max: 10,
        sort_type: 'sort_by_month',
        search_type: 'ranking',
        search_inv_code: '',
        stat_date: new Date(),
        page_size_opts: [10, 30, 50, 80, 100],
        inventory_selected_data: [],
        temp_selected_data: [],
        detail_data: [],
        detail_columns: [{
            type: 'index',
            fixed: 'left',
            width: 60,
            align: 'center'
          },
          {
            title: '单据编号',
            fixed: 'left',
            width: 200,
            sortable: true,
            key: 'bill_no'
          },
          {
            title: '单据日期',
            width: 200,
            sortable: true,
            key: 'bill_date',
          },
          {
            title: '客户名称',
            width: 200,
            sortable: true,
            key: 'customer',
          },
          {
            title: '销售部门',
            width: 200,
            sortable: true,
            key: 'department',
          },
          {
            title: '销售业务员',
            sortable: true,
            width: 200,
            key: 'salesman',
          },
          {
            title: '存货编码',
            sortable: true,
            width: 200,
            key: 'inv_code',
          },
          {
            title: '存货名称',
            sortable: true,
            width: 200,
            key: 'inv_name',
          },
          {
            title: '存货规格',
            sortable: true,
            width: 200,
            key: 'inv_standard',
          },
          {
            title: '数量',
            sortable: true,
            width: 200,
            key: 'quantity',
          },
          {
            title: '合税单价',
            sortable: true,
            width: 200,
            key: 'price',
          },
          {
            title: '价税合计',
            sortable: true,
            width: 200,
            key: 'sum',
          },
          {
            title: '数量合计',
            sortable: true,
            width: 200,
            key: 'total_quantity',
          },
          {
            title: '金额合计',
            sortable: true,
            width: 200,
            key: 'total_sum',
          },
        ],
      }
    },
    components: {
      commInventory,
    },
    methods: {
      init() {
        this.initChart();
      },
      initChart() {
        this.chart = echarts.init(document.getElementById('stat-char'));

        this.chart.on('click', this.handleChartClick);


        let option = {
          title: {
            text: ''
          },
          toolbox: {
            show: true,
            feature: {
              dataView: {
                show: false,
                readOnly: false
              },
              magicType: {
                show: true,
                type: ['line', 'bar']
              },
              restore: {
                show: true
              },
              saveAsImage: {
                show: true
              }
            }
          },
          color: ['#003366', '#4cabce'],
          dataZoom: [{ // 这个dataZoom组件，默认控制x轴。
              type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
              start: 0, // 左边在 10% 的位置。
              end: 60 // 右边在 60% 的位置。
            },
            { // 这个dataZoom组件，也控制x轴。
              type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
              start: 10, // 左边在 10% 的位置。
              end: 60 // 右边在 60% 的位置。
            }
          ],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['2017年12月', '2017年01-12月'],
            orient: 'vertical',
            align: 'left',
            x: 'right',
            y: 'center',
          },
          grid: {
            left: '5%',
            right: '12%',
            bottom: '11%',
            containLabel: true
          },
          xAxis: {
            splitLine: {
              show: false
            },
            data: []
          },
          yAxis: {},
          series: [{
              name: '2017年12月',
              type: 'bar',
              label: {
                normal: {
                  show: true,
                  position: 'top',
                }
              },
              data: []
            },
            {
              name: '2017年01-12月',
              type: 'bar',
              label: {
                normal: {
                  show: true,
                  position: 'top',
                }
              },
              data: []
            }
          ]
        };

        this.chart.setOption(option);
      },
      handelSearchTypeChange(value) {
        this.show_by_ranking = value === 'ranking' ? true : false;
      },
      handleShowInventory() {
        this.$refs.commInventory.initSelected(this.inventory_selected_data);
        this.showInventory = true;
      },
      handleInventorySelected(values) {
        this.temp_selected_data = values;
      },
      handleInventoryConfirm() {
        if (this.temp_selected_data.length > 0) {
          this.inventory_selected_data = this.temp_selected_data;
          if (this.inventory_selected_data.length == 1) {
            this.search_inv_code = this.inventory_selected_data[0].inv_code;
          } else {
            this.search_inv_code = '多个存货档案';
          }

        } else {
          this.search_inv_code = '';
        }
      },
      handleSearchResult() {
        if (this.search_type === 'ranking') {
          if (this.sort_min > this.sort_max) {
            this.$Message.warning('起始排名不能大于结束排名');
            return;
          }
        } else {
          if (this.search_inv_code.trim === '') {
            this.$Message.warning('请选择存货档案或输入一个存货编码！');
            return;
          }
        }

        this.chart.showLoading();
        getSaleAmountChartByInventory().then((response) => {
          if (response.data.retrun_code === "000000") {
            this.chart_data1 = response.data;
            this.chart.setOption({
              xAxis: {
                data: response.data.result.column,
              },
              series: [{
                  // 根据名字对应到相应的系列
                  name: '2017年12月',
                  data: response.data.result.values1,
                },
                {
                  // 根据名字对应到相应的系列
                  name: '2017年01-12月',
                  data: response.data.result.values2,
                }
              ]
            });
          } else {
            console.log(response.data.retrun_code);
          }
          this.chart.hideLoading();
        }).catch(err => {
          this.chart.hideLoading();
          console.log(err);
        });
      },
      handleChartClick(params) {
        this.detail_loading = true;
        getSaleAmountDetailByInventory().then((response) => {
          if (response.data.retrun_code === "000000") {
            this.detail_data = response.data.result;
          } else {
            console.log(response.data.retrun_code);
          }
          this.detail_loading = false;
        }).catch(err => {
          this.detail_loading = false;
          console.log(err);
        });
      },
    },
    computed: {

    },
    mounted() {
      // 
      this.init();
    }
  }

</script>

<style>


</style>
