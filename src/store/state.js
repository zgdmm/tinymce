/**
 *  这里定义初始值
 * @type {{count: number, disc: string}}
 */
const state = {
  count: 10,
  disc: '',
  isLoad: false,
  baseData: {}, //登录人信息
  projectBaseInfo: {}, //项目管理-项目基本信息
  stepNumer:1,
  roofType: [{
      key: '1',
      value: "瓦屋面"
    },
    {
      key: '2',
      value: "混凝土平屋面"
    },
    {
      key: '3',
      value: "预制板平屋面"
    },
    {
      key: '4',
      value: "彩钢瓦屋面"
    },
    {
      key: '5',
      value: "阳光房"
    },
  ],
  productTypeList: [ //产品类型
    {
      key: '1',
      value: "组件类型"
    },
    {
      key: '2',
      value: "逆变器选型"
    },
    {
      key: '3',
      value: "配电箱选型"
    },
    {
      key: '4',
      value: "交流电缆选型"
    },
    {
      key: '5',
      value: "接地电缆"
    },
    {
      key: '6',
      value: "直流电缆"
    },
    {
      key: '7',
      value: "直流连接器"
    },
    {
      key: '8',
      value: "支架组合"
    },
    {
      key: '9',
      value: "其他1"
    },
    {
      key: '10',
      value: "其他2"
    },
  ],
  projectStatus: [
    {
      key: 'design-3',
      value: "驳回"
    },
    {
      key: 'design-21',
      value: "待一级方案审核"
    },
    {
      key: 'design-22',
      value: "待二级方案审核"
    },
    {
      key: 'check-11',
      value: "待一级校验审核"
    },
    {
      key: 'check-12',
      value: "待二级校验审核"
    },
    {
      key: 'patrol-11',
      value: "待一级巡检"
    },
    {
      key: 'patrol-12',
      value: "待二级巡检"
    },
    {
      key: 'survey-1',
      value: "待勘察"
    },

    {
      key: 'assign-1',
      value: "待签约"
    },
    {
      key: 'install-1',
      value: "待安装"
    },
    {
      key: 'check-1',
      value: "待校验审核"
    },

    {
      key: 'reform-check-1',
      value: "待整改"
    },
    {
      key: 'patrol-check-1',
      value: "待整改"
    },
    {
      key: 'finish-1',
      value: "可并网"
    },
    {
      key: 'finish-2',
      value: "已并网"
    },
    {
      key: 'patrol-1',
      value: "待巡检"
    },
    {
      key: 'patrol-2',
      value: "项目完成"
    }
  ],
  projectStatusList: [
    {
      key: 'survey-1',
      value: "待勘察"
    },
    { key: 'design-1',
      value: '待设计方案'
    },
    { key: 'design-2',
      value: '待方案审核'
    },
    {
      key: 'assign-1',
      value: "待签约"
    },
    {
      key: 'install-1',
      value: "待安装"
    },
    {
      key: 'check-1',
      value: "待校验审核"
    },

    {
      key: 'reform-check-1',
      value: "待整改"
    },
    {
      key: 'finish-1',
      value: "可并网"
    },
    {
      key: 'finish-2',
      value: "已并网"
    },
    {
      key: 'patrol-1',
      value: "待巡检"
    },
    {
      key: 'patrol-2',
      value: "项目完成"
    },
    {
      key: 'close',
      value: '已关闭'
    },
  ]
}
export default state
