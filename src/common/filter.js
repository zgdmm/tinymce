/**
 * Created by chenhuanlu on 2018/5/19.
 */
/**
 * 全局过滤器
 * @type {{Context: ((value, arr))}}
 */
const v_filter={
  Context(value,arr) {
    for(let i=0;i<arr.length;i++){
      if(arr[i].key==value){
        return arr[i].value;
      }
    }
  },

}
export  default v_filter;
