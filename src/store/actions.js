import * as types from './mutation_type';
export default {
  setCount({commit},add){
    commit(types.SET_COUNT,add)
  },
  setDisc({commit}){
    commit(types.SET_DISC)
  },
  setBaseData({commit},userInfo){
    commit(types.SET_BASEDATA,userInfo)
  },
  setProjectBaseInfo({commit},projectBaseInfo){
    commit(types.SET_PROJECTBASEINFO,projectBaseInfo)
  },
  setStepNumber({commit},stepNumber){
    commit(types.SET_STEPNUMBER,stepNumber)
  },
}
