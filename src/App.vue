<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" v-model="inputValue" />
    <a-button type="primary" @click="addTodo">添加事项</a-button>

    <a-list bordered :dataSource="showList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox
          :checked="item.done"
          @change="
            e => {
              doneChange(e, item.id);
            }
          "
        >{{ item.info }}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="delItemById(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{unDoneLength}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="listType === 'all' ? 'primary' : 'default'" @click="listChange('all')">全部</a-button>
          <a-button :type="listType === 'undone' ? 'primary' : 'default'" @click="listChange('undone')">未完成</a-button>
          <a-button  :type="listType === 'done' ? 'primary' : 'default'" @click="listChange('done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clearAll">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'app',
  data() {
    return {}
  },
  created() {
    this.$store.dispatch('getdata')
  },
  computed: {
    ...mapState(['listType']),
    ...mapGetters(['unDoneLength', 'showList']),
    inputValue: {
      get() {
        return this.$store.state.inputValue
      },
      set(value) {
        this.$store.commit('inputValueChange', value)
      }
    }
  },
  methods: {
    addTodo: function() {
      if (this.inputValue.trim().length <= 0) {
        return this.$message.error('The input Todo can not be null!')
      }
      this.$store.commit('addInputValue')
      this.$message.success('Add new Todo can successfully!')
    },
    delItemById: function(id) {
      this.$store.commit('deleteItem', id)
    },
    doneChange: function(e, id) {
      this.$store.commit('doneChange', {
        id: id,
        value: e.target.checked
      })
    },
    clearAll: function() {
      this.$store.commit('clearAllDone')
    },
    listChange: function(type) {
      this.$store.commit('listChange', type)
    }
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
