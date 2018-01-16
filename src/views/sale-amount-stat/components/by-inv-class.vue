<template>
  <div>
    <Button type="primary" size="large" @click="handleShowDep">选择部门</Button>
    <Button type="primary" size="large" @click="handleShowPsn">选择业务员</Button>
    <Button type="primary" size="large" @click="handleShowInvClass">选择存货分类</Button>
    <Button type="primary" size="large" @click="handleShowInventory">选择存货档案</Button>
    <Button type="primary" size="large" @click="handleShowCustomer">选择客户</Button>

    <template>
      <Modal width="900" title="选择部门" v-model="showDepartment" @on-ok="handleDepConfirm" :mask-closable="false">
        <commDepartment ref="commDep" @dataSelected="handleDepSelected"></commDepartment>
      </Modal>
    </template>

    <template>
      <Modal width="900" title="选择业务员" v-model="showPerson" @on-ok="handlePsnConfirm" :mask-closable="false">
        <commPerson ref="commPsn" @dataSelected="handlePsnSelected"></commPerson>
      </Modal>
    </template>

    <template>
      <Modal width="900" title="选择存货分类" v-model="showInvClass" @on-ok="handleInvClassConfirm" :mask-closable="false">
        <commInventoryClass ref="commInvClass" @dataSelected="handleInvClassSelected"></commInventoryClass>
      </Modal>
    </template>
    
    <template>
      <Modal width="900" title="选择存货档案" v-model="showInventory" @on-ok="handleInventoryConfirm" :mask-closable="false">
        <commInventory ref="commInventory" @dataSelected="handleInventorySelected"></commInventory>
      </Modal>
    </template>
    
    <template>
        <Modal width="900" title="选择客户" v-model="showCustomer" @on-ok="handleCustomerConfirm" :mask-closable="false">
          <commCustomer ref="commCustomer" @dataSelected="handleCustomerSelected"></commCustomer>
        </Modal>
      </template>

  </div>

</template>

<script>
  import commDepartment from '@/views/common-components/department/department.vue';
  import commPerson from '@/views/common-components/person/person.vue';
  import commInventoryClass from '@/views/common-components/inventory-class/inventory-class.vue';
  import commInventory from '@/views/common-components/inventory/inventory.vue';
  import commCustomer from '@/views/common-components/customer/customer.vue';

  export default {
    data() {
      return {
        showDepartment: false,
        showPerson: false,
        showInvClass: false,
        showInventory: false,
        showCustomer: false,
        dep_selected_data: [],
        psn_selected_data: [],
        inv_class_selected_data: [],
        inventory_selected_data: [],
        customer_selected_data: [],
        temp_selected_data: [],
      }
    },
    components: {
      commDepartment,
      commPerson,
      commInventoryClass,
      commInventory,
      commCustomer,
    },
    methods: {
      handleShowDep() {
        this.$refs.commDep.initSelected(this.dep_selected_data);
        this.showDepartment = true;
      },
      handleShowPsn() {
        this.$refs.commPsn.initSelected(this.psn_selected_data);
        this.showPerson = true;
      },
      handleShowInvClass() {
        this.$refs.commInvClass.initSelected(this.inv_class_selected_data);
        this.showInvClass = true;
      },
      handleShowInventory() {
        this.$refs.commInventory.initSelected(this.inventory_selected_data);
        this.showInventory = true;
      },
      handleShowCustomer() {
        this.$refs.commCustomer.initSelected(this.customer_selected_data);
        this.showCustomer = true;
      },
      handleDepSelected(values) {
        this.temp_selected_data = values;
      },
      handlePsnSelected(values) {
        this.temp_selected_data = values;
      },
      handleInvClassSelected(values) {
        this.temp_selected_data = values;
      },
      handleInventorySelected(values) {
        this.temp_selected_data = values;
      },
      handleCustomerSelected(values) {
        this.temp_selected_data = values;
      },
      handleDepConfirm() {
        this.dep_selected_data = this.temp_selected_data;
      },
      handlePsnConfirm() {
        this.psn_selected_data = this.temp_selected_data;
      },
      handleInvClassConfirm() {
        this.inv_class_selected_data = this.temp_selected_data;
      },
      handleInventoryConfirm() {
        this.inventory_selected_data = this.temp_selected_data;
      },
      handleCustomerConfirm() {
        this.customer_selected_data = this.temp_selected_data;
      },
    },
    computed: {

    }
  }

</script>

<style>


</style>
