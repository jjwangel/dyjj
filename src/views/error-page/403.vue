<template>
  <div style="width:300px;height:300px">
      <Button type="primary" size="large" @click="render">Large</Button>
      <p>{{errinfo}}</p>
  </div>

  </template>

  <script>
    export default {
      data() {
        return {
          err_info:'',
        }
      },
      props:{
        errinfo:String,
      },
      methods: {
        render(){
          this.$emit('retruninfo', 'newValue');
        }
      },
      computed: {

      }
    }

  </script>

  <style>

  </style>
