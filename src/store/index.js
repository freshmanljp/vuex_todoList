import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataList: [],
    inputValue: 'do something',
    nextId: 5,
    listType: 'all'
  },
  mutations: {
    initList(state, data) {
      state.dataList = data
    },
    inputValueChange(state, value) {
      state.inputValue = value
    },
    addInputValue(state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      state.dataList.push(obj)
      state.nextId++
      state.inputValue = ''
    },
    deleteItem(state, id) {
      const itemId = state.dataList.findIndex(item => item.id === id)
      if (itemId !== -1) state.dataList.splice(itemId, 1)
    },
    doneChange(state, params) {
      const itemId = state.dataList.findIndex(item => item.id === params.id)
      if (itemId !== -1) {
        state.dataList[itemId].done = params.value
      }
    },
    clearAllDone(state) {
      state.dataList = state.dataList.filter(item => item.done === false)
    },
    listChange(state, type) {
      state.listType = type
    }
  },
  actions: {
    getdata(context) {
      axios.get('data.json').then(res => {
        context.commit('initList', res.data)
      })
    }
  },
  getters: {
    unDoneLength(state) {
      return state.dataList.filter(item => item.done === false).length
    },
    showList(state) {
      if (state.listType === 'all') return state.dataList
      else if (state.listType === 'undone') return state.dataList.filter(item => !item.done)
      else return state.dataList.filter(item => item.done)
    }
  },
  modules: {}
})
