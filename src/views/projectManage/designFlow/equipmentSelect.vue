<template>
    <div>
      <el-form :model="ruleForm"  :rules="rules" ref="ruleForm">
      <table style="margin: 0 auto">
        <tr>
          <td style="background: #ffffff">设备名称</td>
          <td>设备型号</td>
          <td>设备数量</td>
        </tr>
        <tr>
          <td>
            <el-form-item>
              <div><span style="color: red">*</span>组件选型</div>
            </el-form-item>

          </td>
          <td>
            <el-form-item  prop="component">
              <el-select clearable @change="change" data-type="1"  @focus="focus" style="width: 100%" v-model="ruleForm.component" placeholder="请选择型号">
                <el-option  id="outputPowerMax"  v-for="item in componentSelectArr" :key="item.productCode" :label="item.productModel.split(',')[0]" :name="item.outputPowerMax" :value="item.productModel">
                </el-option>
              </el-select>
            </el-form-item>
          </td>
          <td>
            <el-form-item  prop="componentNumber">
            <el-input clearable :disabled="true" v-model="ruleForm.componentNumber" placeholder="请输入数量"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item>
              <span style="color: red">*</span>逆变器选型
            </el-form-item>
          </td>
          <td>
            <el-form-item  prop="inverter">
            <el-select clearable style="width: 100%" v-model="ruleForm.inverter" placeholder="请选择型号">
              <el-option  v-for="item in inverterSelectArr" :key="item.productCode" :label="item.productModel.split(',')[0]" :value="item.productModel"></el-option>
            </el-select>
            </el-form-item>
          </td>
          <td>
            <el-form-item  prop="inverterNumber">
            <el-input clearable v-model="ruleForm.inverterNumber" placeholder="请输入数量"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item>
              <span style="color: red">*</span>配电箱选型
            </el-form-item>
          </td>
          <td>
            <el-form-item  prop="powerBox">
            <el-select clearable style="width: 100%" v-model="ruleForm.powerBox" placeholder="请选择型号">
              <el-option  v-for="item in powerBoxSelectArr"
                          :key="item.productCode"
                          :label="item.productModel.split(',')[0]"
                          :value="item.productModel">

              </el-option>

            </el-select>
            </el-form-item>
          </td>
          <td>
            <el-form-item  prop="powerBoxNumber">
            <el-input clearable v-model="ruleForm.powerBoxNumber" placeholder="请输入数量"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item>
              交流电缆选型
            </el-form-item>
          </td>
          <td>
            <el-select clearable style="width: 100%" v-model="ruleForm.ac" placeholder="请选择型号">
              <el-option  v-for="item in acSelectArr"
                          :key="item.productCode"
                          :label="item.productModel.split(',')[0]"
                          :value="item.productModel">

              </el-option>
            </el-select>
          </td>
          <td>
            <el-input clearable v-model="ruleForm.acNumber" placeholder="请输入数量"></el-input>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item>
              接地电缆
            </el-form-item>
          </td>
          <td>
            <el-select clearable style="width: 100%" v-model="ruleForm.Grounding" placeholder="请选择型号">
              <el-option  v-for="item in GroundingSelectArr"
                          :key="item.productCode"
                          :label="item.productModel.split(',')[0]"
                          :value="item.productModel">

              </el-option>
            </el-select>
          </td>
          <td>
            <el-input clearable v-model="ruleForm.GroundingNumber" placeholder="请输入数量"></el-input>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item>
              直流电缆
            </el-form-item>

          </td>
          <td>
            <el-select clearable style="width: 100%" v-model="ruleForm.dcPower" placeholder="请选择型号">
              <el-option  v-for="item in dcPowerSelectArr"
                          :key="item.productCode"
                          :label="item.productModel.split(',')[0]"
                          :value="item.productModel">

              </el-option>

            </el-select>
          </td>
          <td>
            <el-input clearable v-model="ruleForm.dcPowerNumber" placeholder="请输入数量"></el-input>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item>
              直流连接器
            </el-form-item>
          </td>
          <td>
            <el-select clearable style="width: 100%" v-model="ruleForm.dc" placeholder="请选择型号">
              <el-option  v-for="item in dcSelectArr"
                          :key="item.productCode"
                          :label="item.productModel.split(',')[0]"
                          :value="item.productModel">

              </el-option>

            </el-select>
          </td>
          <td>
            <el-input clearable v-model="ruleForm.dcNumber" placeholder="请输入数量"></el-input>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item>
              <span style="color: red">*</span>支架组合
            </el-form-item>
          </td>
          <td>
            <el-form-item  prop="bracket">
            <el-select clearable style="width: 100%" v-model="ruleForm.bracket" placeholder="请选择型号">
              <el-option  v-for="item in bracketSelectArr"
                          :key="item.productCode"
                          :label="item.productModel.split(',')[0]"
                          :value="item.productModel">

              </el-option>
            </el-select>
            </el-form-item>
          </td>
          <td>
            <el-form-item  prop="bracketNumber">
            <el-input clearable v-model="ruleForm.bracketNumber" placeholder="请输入数量"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td> <el-form-item>其他1</el-form-item></td>
          <td>
            <el-select clearable style="width: 100%" v-model="ruleForm.other1" placeholder="请选择型号">
              <el-option  v-for="item in other1SelectArr"
                          :key="item.productCode"
                          :label="item.productModel.split(',')[0]"
                          :value="item.productModel">

              </el-option>
            </el-select>
          </td>
          <td>
            <el-input clearable v-model="ruleForm.other1Number" placeholder="请输入数量"></el-input>
          </td>
        </tr>
        <tr>
          <td><el-form-item>其他2</el-form-item></td>
          <td>
            <el-select clearable style="width: 100%" v-model="ruleForm.other2" placeholder="请选择型号">
              <el-option  v-for="item in other2SelectArr"
                          :key="item.productCode"
                          :label="item.productModel.split(',')[0]"
                          :value="item.productModel">

              </el-option>

            </el-select>
          </td>
          <td>
            <el-input clearable v-model="ruleForm.other2Number" placeholder="请输入数量"></el-input>
          </td>
        </tr>
      </table>

<div style="margin: 0 auto;width: 711px">
  <el-form-item  label-width="130px"style="margin-bottom: 10px;margin-top: 10px"  label="组串数量（路）" prop="comBunchNum">
    <el-input style="width: 360px;text-align: left" size="small" v-model="ruleForm.comBunchNum"></el-input>
  </el-form-item>
  <el-form-item v-for="(item,index) in componetNumArr" :key="index" label-width="130px" :label="'组串'+Number(index+1)+'片'" required>
    <el-col :span="1" style="width: 150px">
      <el-form-item  prop="componetNum">
        <el-input style="width: 360px"   size="small" v-model="item.number"></el-input>
      </el-form-item>
    </el-col>
  </el-form-item>

  <el-form-item label-width="130px"  label="装机容量(kWp)">
    <div>{{installedCapacity}}</div>
  </el-form-item>
  <el-row style="margin-top: 46px" type="flex" justify="center">
    <el-row type="flex">
      <el-button  @click="nextFlow('ruleForm')"  type="primary">下一步</el-button>
      <el-button  @click="goBack()">上一步</el-button>

      <el-button  @click="reset('ruleForm')">重置</el-button>
    </el-row>
  </el-row>
</div>



      </el-form>
    </div>
</template>

<script>
    export default {
        name: "equipment-Select",
        data(){
            return {
                editdata:{},
                submitArr:[],
                submitArrJson:[],
              installedCapacity:'3.54',//装机容量 kWp
              outputPowerMax:0,
              /**
               * 下拉值
               */
              componentSelectArr:[],//组件选型
              inverterSelectArr:[],//逆变器选型
              powerBoxSelectArr:[],//配电箱选型
              acSelectArr:[],//交流电缆选型
              GroundingSelectArr:[],//接地电缆
              dcPowerSelectArr:[],//直流电缆
              dcSelectArr:[],//直流连接器
              bracketSelectArr:[],//支架组合
              other1SelectArr:[],
              other2SelectArr:[],//

              ruleForm: {
                component: '',
                componentNumber: '',
                inverter: '',
                inverterNumber: '',
                powerBox: '',
                powerBoxNumber: '',
                ac: '',
                acNumber: '',
                Grounding: '',
                GroundingNumber: '',
                dcPower: '',
                dcPowerNumber: '',
                dc: '',
                dcNumber: '',
                bracket: '',
                bracketNumber: '',
                other1: '',
                other1Number: '',
                other2: '',
                other2Number: '',
                comBunchNum:'',
                installedCapacity:'',//装机容量
              },
              componetNumArr:[],
              rules: {
                component: [
                  { required: true, message: '请选择组件型号', trigger: 'change' }
                ],
                componentNumber: [
                  { required: true, message: '请填写组件数量', trigger: 'change' }
                ],
                inverter: [
                  { required: true, message: '请选择逆变器型号', trigger: 'change' }
                ],
                inverterNumber: [
                  { required: true, message: '请填写逆变器数量', trigger: 'change' }
                ],
                powerBox: [
                  { required: true, message: '请选择配电箱型号', trigger: 'change' }
                ],
                powerBoxNumber: [
                  { required: true, message: '请填写配电箱数量', trigger: 'change' }
                ],
                bracket: [
                  { required: true, message: '请选择支架型号', trigger: 'change' }
                ],
                bracketNumber: [
                  { required: true, message: '请填写支架数量', trigger: 'change' }
                ],
                comBunchNum: [
                  { required: true, message: '请填写组串数量', trigger: 'change' }
                ],

              }
            }
        },
      mounted(){
        this.getEquipType();
        if(localStorage.editdata){
          let editdata =JSON.parse(localStorage.editdata);
          console.log(editdata)
          let productTypeArr = [];
          this.ruleForm.comBunchNum = editdata.comBunchNum;
          let tempArr=JSON.parse(editdata.componetNum);
          this.$nextTick(function () {
            for(let i=0;i<this.componetNumArr.length;i++){
              this.componetNumArr[i].number = tempArr[i]
            }
          })
          for(let i = 0;i<editdata.deviceList.length;i++){

              productTypeArr.push(Number(editdata.deviceList[i].productType));

              let productType = Number(editdata.deviceList[i].productType);

            switch (productType){
                case 1:
                  let index1 = productTypeArr.indexOf(productType)
                  this.ruleForm.component = editdata.deviceList[index1].deviceVersion;
                  this.ruleForm.componentNumber = editdata.deviceList[index1].deviceSum;
                  break;
                case 2:
                  let index2= productTypeArr.indexOf(productType)

                  this.ruleForm.inverter = editdata.deviceList[index2].deviceVersion;
                  this.ruleForm.inverterNumber = editdata.deviceList[index2].deviceSum;
                  break;
                case 3:
                  let index3= productTypeArr.indexOf(productType)

                  this.ruleForm.powerBox = editdata.deviceList[index3].deviceVersion;
                  this.ruleForm.powerBoxNumber = editdata.deviceList[index3].deviceSum;
                  break;
                case 4:
                  let index4= productTypeArr.indexOf(productType)

                  this.ruleForm.ac = editdata.deviceList[index4].deviceVersion;
                  this.ruleForm.acNumber = editdata.deviceList[index4].deviceSum;
                  break;
                case 5:
                  let index5= productTypeArr.indexOf(productType)
                  this.ruleForm.Grounding = editdata.deviceList[index5].deviceVersion;
                  this.ruleForm.GroundingNumber = editdata.deviceList[index5].deviceSum;
                  break;
                case 6:
                  let index6= productTypeArr.indexOf(productType)

                  this.ruleForm.dcPower = editdata.deviceList[index6].deviceVersion;
                  this.ruleForm.dcPowerNumber = editdata.deviceList[index6].deviceSum;
                  break;
                case 7:
                  let index7= productTypeArr.indexOf(productType)
                  this.ruleForm.dc = editdata.deviceList[index7].deviceVersion;
                  this.ruleForm.dcNumber = editdata.deviceList[index7].deviceSum;
                  break;
                case 8:
                  let index8= productTypeArr.indexOf(productType)

                  this.ruleForm.bracket = editdata.deviceList[index8].deviceVersion;
                  this.ruleForm.bracketNumber = editdata.deviceList[index8].deviceSum;
                  break;
                case 9:
                  let index9= productTypeArr.indexOf(productType)
                  this.ruleForm.other1 = editdata.deviceList[index9].deviceVersion;
                  this.ruleForm.other1Number = editdata.deviceList[index9].deviceSum;
                  break;
                case 10:
                  let index10= productTypeArr.indexOf(index10)

                  this.ruleForm.other2 = editdata.deviceList[index10].deviceVersion;
                  this.ruleForm.other2Number = editdata.deviceList[index10].deviceSum;
                  break;
                default:
              }
          }

        }


      },

      methods:{
        goBack(){
          this.$store.dispatch('setStepNumber',3);
        },
        focus(){
        },
        change(item){
          let obj = document.getElementById('outputPowerMax');
          this.outputPowerMax =Number(obj.getAttribute('name'));

        },
        nextFlow(formName){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              let Str = JSON.stringify(this.submitArrJson);
              let numArr = [];
              let val=this.componetNumArr;
              for(let i = 0;i<val.length;i++){
                numArr.push(val[i].number);
              }
              let result = {list:'',obj:{}};
              result.list = Str;
              result.obj.componetNum = JSON.stringify(numArr)+'';//组件数量字符串 [“1”,”5”,”4”]
              result.obj.comBunchNum =this.ruleForm.comBunchNum;//组串数量
              result.obj.installedCapacity = this.installedCapacity;//装机容量 kWp

              let submitArrJson =  JSON.stringify(result);
//              console.log("submitArrJson",submitArrJson);
              localStorage.setItem('equipmentSelectData',submitArrJson+'')
              this.$store.dispatch("setStepNumber",5);
            } else {
              console.log('error submit!!');
              return false;
            }
          });

        },
        reset(formName){
          this.$refs[formName].resetFields();
        },
        getEquipType(){
          this.$http.post('/product/selectAllProduct',{},response => {
            if(response.code==200){
              let data = response.data?response.data:[];
              let typeArr = [];
              for(let i=0;i<data.length;i++){
                switch(i+1){
                  case (1):
                    this.componentSelectArr=data[i];
                    break;
                  case (2):
                    this.inverterSelectArr=data[i];
                    break;
                  case (3):
                    this.powerBoxSelectArr=data[i];
                    break;
                  case (4):
                    this.acSelectArr=data[i];
                    break;
                  case (5):
                    this.GroundingSelectArr=data[i];
                    break;
                  case (6):
                    this.dcPowerSelectArr=data[i];
                    break;
                  case (7):
                    this.dcSelectArr=data[i];
                    break;
                  case (8):
                    this.bracketSelectArr=data[i];
                    break;
                  case (9):
                    this.other1SelectArr=data[i];
                    break;
                  case (10):
                    this.other2SelectArr=data[i];
                    break;
                  default:
                }
//                  for(let j=0;j<data[i].length;j++){
//                    typeArr.push(
//                      {productModel:data[i][j].productModel,productCode:data[i][j].productCode}
//                    )
//                  }

              }


            }else {
              this.$message({
                message:response.message,
                type: 'warning'
              });
            }
          });
        }
      },
      watch:{
        "ruleForm.comBunchNum":function (val) {
            if(val){
              this.componetNumArr = [];
              for(let i=0;i<val;i++){
                this.componetNumArr.push({number:''})
              }
            }


        },
        "componetNumArr":{
          handler:function (val) {
              let numArr = [];
              let totalNumber = 0;
              for(let i = 0;i<val.length;i++){
                numArr.push(val[i].number);
                totalNumber+=Number(val[i].number);
              }
              this.installedCapacity = totalNumber*this.outputPowerMax;
            console.log('this.installedCapacity',this.installedCapacity)
            this.ruleForm.componentNumber = totalNumber;
              let componetNum=JSON.stringify(numArr);
              localStorage.setItem('componetNum',componetNum+'')

          },
          deep: true
        },
        ruleForm: {
          handler: function (val, oldVal) {
            this.submitArr=[];
              for( var item in val){
                this.submitArr.push(val[item]);
              }
            let allData = []; //用来装处理完的数组
            let currData = []; //子数组用来存分割完的数据
            //循环需要处理的数组
            for(var i = 0; i < this.submitArr.length; i++) {
              //将chartArr[i]添加到子数组
              currData.push(this.submitArr[i]);
              //在这里求2的余数,如果i不等于0,且可以整除 或者考虑到不满2个或等于2个的情况就要加上  i等于当前数组长度-1的时候
              if((i != 0 && (i + 1) % 2 == 0) || i == this.submitArr.length - 1) {
                //把currData加到allData里
                allData.push(currData);
                //在这里清空currData
                currData = [];
              }
            };
            this.submitArrJson=[];
            for(let i =0;i<allData.length;i++){
                if(allData[i][0]&&allData[i][1]){
                    this.submitArrJson.push(
                      {productType:i+1,deviceVersion:allData[i][0].split(',')[0],deviceSum:allData[i][1],productCode:allData[i][0].split(',')[1]}
                    )
                }
            }

          },
          deep: true
        }
      }
    }
</script>

<style scoped lang="less">
  table tr td{
    border: 1px solid #E9E9E9;
  }
  table{
    padding: 10px;
  }
  td:nth-child(1){
    background: #F8F8F8;
    width: 138px;
    font-family: PingFangSC-Semibold;
    font-size: 12px;
    color: rgba(0,0,0,0.75);
    line-height: 18px;

  }
  td:nth-child(even){
    background: #ffffff;
    width: 360px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: rgba(0,0,0,0.65);
    line-height: 18px;

  }
  td
  {
    padding: 10px 5px;
    font-size: 12px;
  }
  .el-form-item {
     margin-bottom: 0px;
  }
  design-flow .el-form-item__content {
    text-align: center;
  }
</style>
