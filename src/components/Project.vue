<template>
  <div class="project">
    <div class="operation">
      <Button type="success" shape="circle" icon="plus" @click="modal.show = true">新增项目</Button>
    </div>
    <Table :columns="columns" :data="projectData"></Table>

    <!-- 新增项目的model -->
    <Modal
      v-model="modal.show"
      :title="modal.title"
      :closable="false"
      :mask-closable="false"
      :loading='modal.loading'
      @on-ok="modalOnOk"
      @on-cancel="initModalData"
      class-name="vertical-center-modal">
      <div class="label">项目名称</div>
      <Input type="text"
        v-model="modal.name" 
        placeholder="请输入项目名称" 
        autofocus 
        clearable
        required/>
        <div class="label">项目域名</div>
        <Input type="text" 
          v-model="modal.url" 
          placeholder="请输入项目域名" 
          clearable
          required>
          <Select v-model="modal.protocol" slot="prepend" style="width: 80px">
            <Option value="http">http://</Option>
            <Option value="https">https://</Option>
          </Select>
        </Input>   
        <div class="tip" v-show="modal.tip">
          <Icon type="asterisk" :style="{fontSize: '12px', marginRight: '5px'}"></Icon>
          {{modal.tip}}
        </div>         
    </Modal>
  </div>
</template>
<script>
import { getProject, addProject, updateProject } from '../api';

export default {
  computed: {
  },
  data() {
    return {
      columns: [
        {
          title: '项目名称',
          key: 'name',
        },
        {
          title: 'URL',
          key: 'url',
          render: (h, params) => h('div', [
            h('Tag', {
              props: {
                color: params.row.protocol === 'http' ? 'blue' : 'red',
                checkable: false,
              },
              style: {
                minWidth: '42px',
                textAlign: 'center', 
              },
            }, params.row.protocol),
            params.row.url,
          ]),
        },
        {
          title: '上次更新时间',
          key: 'updateTime',
        },
        {
          title: '操作',
          key: 'opreation',
          align: 'center',
          render: (h, params) => h('div', [
            h('Button', {
              props: {
                type: 'text',
                size: 'small',
              },
              style: {
                marginRight: '5px',
              },
              on: {
                click: () => {
                  this.edit(params);
                },
              },
            }, [
              h('Icon', {
                props: {
                  type: 'edit',
                },
                style: {
                  marginRight: '5px',
                },
              }),
              '编辑',
            ]),
            h('Button', {
              props: {
                type: 'text',
                size: 'small',
              },
              on: {
                click: () => {
                  this.delete(params);
                },
              },
            }, [
              h('Icon', {
                props: {
                  type: 'trash-a',
                },
                style: {
                  marginRight: '5px',
                },
              }),
              '删除',
            ]),
          ]),
        },
      ],
      projectData: [],
      modal: {
        id: '',
        name: '',
        url: '',
        show: false,
        title: '新增',
        loading: true,
        protocol: 'http',
        tip: '',
      },
      editTableIndex: 0,
    };
  },
  methods: {
    get() {
      getProject().then(({ data: res }) => {
        if (res.data && res.data.length) {
          this.projectData = res.data;
        }
      });
    },
    add() {
      addProject(this.modal).then(({ data: res }) => {
        if (res.code === 200 && res.data) {
          this.$Message.success('新增成功！');
          this.projectData.unshift(res.data);
        } else {
          this.$Message.error(res.message || '新增失败！');
        }
        this.initModalData();
        this.modal.show = false;
      });
    },
    update() {
      updateProject(this.modal).then(({ data: res }) => {
        if (res.code === 200 && res.data) {
          this.$Message.success('修改成功');
          this.$set(this.projectData, this.editTableIndex, Object.assign({}, res.data));
          console.log(res.data);
        } else {
          this.$Message.error(res.message || '修改失败');
        }
        this.get();
        this.initModalData();
        this.modal.show = false;
      });
    },
    edit(param) {
      const row = param.row;
      this.modal.name = row.name;
      const url = String(row.url);
      this.modal.url = url.slice(url.indexOf('//') + 2, url.lastIndexOf('.com'));
      this.modal.id = row.id;
      this.modal.protocol = row.protocol;

      this.modal.title = '编辑';
      this.modal.show = true;
      this.editTableIndex = param.index;
    },
    delete(index) {
      console.log(index);
    },
    modalOnOk() {
      if (!this.modal.name) {
        this.modal.tip = '项目名称不能为空';
        this.modal.loading = false;
      } else if (!this.modal.url) {
        this.modal.tip = '项目地址不能为空';
        this.modal.loading = false;
      } else {
        this.modal.tip = '';
      }

      if (this.modal.loading) {
        if (this.modal.title === '新增') {
          this.add();
        } else {
          this.update();
        }
      }
      setTimeout(() => {
        this.modal.loading = true;
      });
    },
    initModalData() {
      this.modal.name = '';
      this.modal.title = '新增';
      this.modal.url = '';
      this.modal.tip = '';
      this.modal.protocol = 'http';
    },
  },
  created() {
    this.get();
  },
};
</script>

<style scoped lang="scss">
  @import '../scss/config.scss';
  .project {

  }

  .project .operation {
    margin-bottom: 10px;
  }

  // modal 框居中显示样式
  .vertical-center-modal{
  display: flex;
  align-items: center;
  justify-content: center;

  .label {
    padding: 5px;
    font-size: 14px;
    color: $second_grey;
    font-weight: bold;
  }

  .tip {
    position: relative;
    top: 8px;
    left: 10px;
    font-size: 12px;
    color: $warn_red;
    height: 15px;
  }
  .ivu-modal{
    top: 0;
  }
}

</style>

