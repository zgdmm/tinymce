import * as types from './mutation_type'
const mutations = {
  [types.SET_COUNT](state, count) {
    state.count += count;
  },
  [types.SET_DISC](state, disc) {
    state.disc = disc;
  },
  [types.SET_ISLOAD](state, isload) {
    state.isload = isload;
  },
  [types.SET_BASEDATA](state, baseData) {
    state.baseData = baseData;
  },
  [types.SET_PROJECTBASEINFO](state, projectBaseInfo) {
    state.projectBaseInfo = projectBaseInfo;
  },
  [types.SET_STEPNUMBER](state, stepNumer) {
    state.stepNumer = stepNumer;
  },

}
export default mutations
