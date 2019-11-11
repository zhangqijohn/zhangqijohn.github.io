<template>
  <div class="app-container">
    <el-form :inline="true">
      <el-row style="float:right">
        <el-form-item>
          <el-radio-group v-model="queryData.status" @change="getMessages()">
            <el-radio-button label="0">待处理</el-radio-button>
            <el-radio-button label="1">被封禁</el-radio-button>
            <el-radio-button label="2">不封禁</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-input style=" width: 250px;" v-model="queryData.keyword"
                    placeholder="角色名、匹配词或游戏世界" @keyup.enter.native="getMessages()"
                    clearable></el-input>
        </el-form-item>
        <el-form-item >
          <el-input style=" width: 118px;" v-model="queryData.maxMatchedWords"
                    placeholder="匹配单词数" @keyup.enter.native="getMessages()"
                    clearable></el-input>
        </el-form-item>
        <el-form-item >
          <el-input style=" width: 118px;" v-model="queryData.maxKeywordTimes"
                    placeholder="匹配次数" @keyup.enter.native="getMessages()"
                    clearable>
          </el-input>
        </el-form-item>
        <el-form-item >
          <el-checkbox style=" width: 118px;" v-model="queryData.hasRecharge" label="有充值" border
                       @change="getMessages()"></el-checkbox>
        </el-form-item>
        <el-form-item >
          <el-button style=" width: 118px;" type="primary" icon="el-icon-search" @click="getMessages()"> 查询</el-button>
        </el-form-item>
      </el-row>
      <el-row style="float:left">
        <el-form-item>
          <el-dropdown @command="postFreeze">
            <el-button type="primary">封号操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
            <el-dropdown-menu slot="dropdown">

              <el-dropdown-item
                v-for="item in freezeTypes"
                :key="item.id"
                :command="item.id"
              >
                {{item.label}}
              </el-dropdown-item>
              <el-dropdown-item command="other"
              >
                其他
              </el-dropdown-item>

            </el-dropdown-menu>
          </el-dropdown>
        </el-form-item>
        <el-form-item>
          <el-dropdown @command="postMute">
            <el-button type="primary">禁言操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="item in muteTypes"
                :key="item.id"
                :command="item.id"
              >
                {{item.label}}
              </el-dropdown-item>
              <el-dropdown-item command="other"
              >
                其他
              </el-dropdown-item>

            </el-dropdown-menu>
          </el-dropdown>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="postKick">不处理</el-button>
        </el-form-item>
      </el-row>

    </el-form>
    <el-dialog title="请输入你需要禁言的时间" :visible.sync="muniteFormVisible" width="360px">
      <el-form ref="muniteForm" :model="muniteRuleForm" :rules="muniteRules" label-width="50px">
        <el-form-item label="分钟" prop="otherMunite" align="center">
          <el-input v-model="muniteRuleForm.otherMunite"/>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="submitOtherMunite()" style="width:100%">提交</el-button>
    </el-dialog>
    <el-dialog title="请输入你需要封号的天数" :visible.sync="dayFormVisible" width="360px">
      <el-form ref="dayForm" :model="dayRuleForm" :rules="dayRules" label-width="50px">
        <el-form-item label="天数" prop="otherDay" align="center">
          <el-input v-model="dayRuleForm.otherDay"/>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="submitOtherDay()" style="width:100%">提交</el-button>
    </el-dialog>
    <el-table
      ref="multipleTable"
      @sort-change="sortChange"
      :data="messages"
      tooltip-effect="light"
      @selection-change="handleSelectionChange"
      row-key="id"
      :expand-row-keys="expandKeys"
      @expand-change="getChatRecords"
      v-loading="loadingFullScreen"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.8)"
    >

      <el-table-column
        type="selection"
        width="55"
        align="center"
      >
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline v-loading="loading"
                   element-loading-text="拼命加载中"
                   element-loading-spinner="el-icon-loading"
                   element-loading-background="rgba(255, 255, 255, 0.8)">
            <el-form-item label="聊天内容：">

              <div v-for="item in props.row.messages" :key="item.id"> <!--@click="getMessagesDialog(props.row)"-->
                [{{item.sendTime | formatDate}}]

                <span v-for="(index) in channelTypes" :key="index" v-if="item.channel === (index)">
                 [{{channelTypes[index].label}}频道]
                </span>

                <span v-if="item.receiverName !==''">对“{{item.receiverName}}”</span>说：
                <span v-for="n in selectedNum" v-if="highLightShow === true && selected === n" v-html="highLightData(item.content)"></span>

                <span class="col-cont" v-for="(el,index) in item.keywords" :key="index"
                      v-if="index===0 && subStrShow === true">
                     <span v-html="item.content.substr(0,item.content.indexOf(el))"></span><span style="color:#f00">{{el}}</span><span
                  v-html="item.content.substr(item.content.indexOf(el)+el.length)"></span>
                </span>

              </div>

            </el-form-item>

          </el-form>

        </template>
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名"
        align="center"
        width="130"
      >
      </el-table-column>
      <el-table-column
        prop="server"
        label="游戏世界"
        align="center"
        width="120"
      >
      </el-table-column>

      <el-table-column
        prop="roleLevel"
        label="等级"
        align="center"
        width="80"
        sortable="custom"

      >
      </el-table-column>
      <el-table-column
        prop="roleRecharge"
        label="充值"
        align="center"
        width="80"
      >

      </el-table-column>
      <el-table-column
        prop="matchedScore"
        label="匹配度"
        align="center"
        width="80"
        sortable="custom"

      >
      </el-table-column>
      <el-table-column
        prop="keywordAudits"
        label="匹配词"
        align="center"
        width="270"
        sortable="custom"
      >
        <template slot-scope="scope">
          <span v-for="(item,index) in scope.row.keywordAudits.slice(0,3)" :key="index">
          <el-badge class="item"
                    :value="item.times" :max="99">
            <el-button size="small"
                       @click="keywordHighLight(index,scope.row,item.text)">{{ item.text}}</el-button>
          </el-badge>

            </span>

          <span v-if="scope.row.keywordAudits.length > 3">
          <el-dropdown trigger="hover" class="el-dropdown-item">
  <span class="el-dropdown-link"><i class="el-icon-caret-bottom el-icon--right"></i></span>
            <el-dropdown-menu slot="dropdown">

              <el-dropdown-item class="clearfix" v-for="(item,index) in scope.row.keywordAudits.slice(3)" :key="index">
                <span @click="keywordHighLight(index+3,scope.row,item.text)">
                {{item.text}}
                <el-badge class="mark" :value="item.times"></el-badge>
                  </span>
              </el-dropdown-item>

            </el-dropdown-menu>
          </el-dropdown>

            </span>

        </template>
      </el-table-column>
      <el-table-column
        prop="maxMatchedWords"
        label="匹配单词数"
        align="center"
        width="95"
        sortable="custom"
      >
        <template slot-scope="scope">
          {{ scope.row.maxMatchedWords }}
        </template>
      </el-table-column>
      <el-table-column
        prop="maxMatchedRatio"
        label="匹配比率"
        align="center"
        width="80"
        sortable="custom"
      >
        <template slot-scope="scope">
          {{ Math.floor(scope.row.maxMatchedRatio*100) }}%
        </template>
      </el-table-column>
      <el-table-column
        prop="content"
        label="内容"
        align="center"

      >
        <template slot-scope="scope">
          <div style=" text-align: left" v-html="scope.row.content"></div>
        </template>
      </el-table-column>
      <el-table-column
        prop="lastSendTime"
        label="最后发布时间"
        align="center"
        width="105"
        sortable="custom"
      >
        <template slot-scope="scope">
          <el-tooltip placement="top" effect="light">
            <div slot="content">{{ scope.row.lastSendTime | formatDate }}</div>
            <span>{{ scope.row.lastSendTime | formatDate(11) }}</span>
          </el-tooltip>

        </template>
      </el-table-column>
      <el-table-column label="历史相关情况" align="center">

        <el-table-column
          prop="roleAudits"
          label="本角色"
          width="100"
          align="center">
          <template slot-scope="scope">
            <span>禁:{{scope.row.roleMuteNum}}</span>
            <span>封:{{scope.row.roleFreezeNum}}</span>

            <!--<el-tooltip placement="top" effect="light">
              <div slot="content">

                <el-table
                  :data="scope.row.roleAudits && scope.row.roleAudits.filter(function (r) {return r.type === 0 })"
                  style="width: 100%"
                >
                  <el-table-column
                    prop="type"
                    label="处理"
                    width="80"
                    align="center">
                    <template slot-scope="scope">
                      禁言
                    </template>

                  </el-table-column>
                  <el-table-column
                    prop="unit"
                    label="分钟"
                    width="80"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="operator"
                    label="操作人"
                    width="90"
                    align="center">

                    <template slot-scope="scope">
                      <span
                        v-if="scope.row.operator === null || scope.row.operator === '' || scope.row.operator === undefined">&#45;&#45;</span>
                      <span v-else>{{ scope.row.operator.name }}</span>
                    </template>

                  </el-table-column>
                  <el-table-column
                    prop="time"
                    label="操作时间"
                    width="160"
                    align="center">
                    <template slot-scope="scope">
                      {{ scope.row.time | formatDate }}
                    </template>

                  </el-table-column>
                  <el-table-column
                    prop="isEffectived"
                    label="结果"
                    align="center">
                    <template slot-scope="scope">
                      <span v-if="scope.row.isEffectived === false">未生效</span>
                      <span v-if="scope.row.isEffectived === true">已生效</span>
                    </template>

                  </el-table-column>
                  <el-table-column
                    prop="remark"
                    label="备注"
                    width="180"
                    align="center">
                    <template slot-scope="scope">
                      <span
                        v-if="scope.row.remark === null || scope.row.remark === '' || scope.row.remark === undefined">&#45;&#45;</span>
                      <span v-else>{{ scope.row.remark }}</span>
                    </template>

                  </el-table-column>
                </el-table>
              </div>

              <span>禁:{{scope.row.roleMuteNum}}</span>
            </el-tooltip>-->
          <!--  <el-tooltip placement="top" effect="light">
              <div slot="content">

                <el-table
                  :data="scope.row.roleAudits && scope.row.roleAudits.filter(function (r) {return r.type === 1})"
                  style="width: 100%">
                  <el-table-column
                    prop="type"
                    label="处理"
                    width="80">
                    align="center"
                    <template slot-scope="scope">
                      封号
                    </template>

                  </el-table-column>
                  <el-table-column
                    prop="unit"
                    label="天数"
                    width="80"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="operator"
                    label="操作人"
                    width="90"
                    align="center">

                    <template slot-scope="scope">
                      <span
                        v-if="scope.row.operator === null || scope.row.operator === '' || scope.row.operator === undefined">&#45;&#45;</span>
                      <span v-else>{{ scope.row.operator.name }}</span>
                    </template>

                  </el-table-column>
                  <el-table-column
                    prop="time"
                    label="操作时间"
                    width="160"
                    align="center">
                    <template slot-scope="scope">
                      {{ scope.row.time | formatDate }}
                    </template>

                  </el-table-column>
                  <el-table-column
                    prop="isEffectived"
                    label="结果"
                    align="center">
                    <template slot-scope="scope">
                      <span v-if="scope.row.isEffectived === false">未生效</span>
                      <span v-if="scope.row.isEffectived === true">已生效</span>
                    </template>

                  </el-table-column>
                  <el-table-column
                    prop="remark"
                    label="备注"
                    width="180"
                    align="center">
                    <template slot-scope="scope">
                      <span
                        v-if="scope.row.remark === null || scope.row.remark === '' || scope.row.remark === undefined">&#45;&#45;</span>
                      <span v-else>{{ scope.row.remark }}</span>
                    </template>

                  </el-table-column>
                </el-table>
              </div>
              <span>封:{{scope.row.roleFreezeNum}}</span>
            </el-tooltip>-->

          </template>

        </el-table-column>
        <el-table-column
          prop="accountAudits"
          label="本账号"
          width="100"
          align="center">
          <template slot-scope="scope">--
          </template>
        </el-table-column>
        <el-table-column
          prop="deviceAudits"
          label="本设备"
          width="100"
          align="center">
          <template slot-scope="scope">--
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
        prop="modifier"
        label="最后|操作人"
        align="center"
        width="80"
        :render-header="renderHeader"
      >
        <template slot-scope="scope">
          <span
            v-if="scope.row.modifier === null || scope.row.modifier === '' || scope.row.modifier === undefined">--</span>
          <span v-else>{{ scope.row.modifier.name }}</span>
        </template>
      </el-table-column>
    </el-table>

    <el-row class="pages">
      <el-pagination
        background
        @current-change="pageIndexChange"
        @size-change="pageSizeChange"
        :current-page="queryData.pageIndex"
        :page-size="queryData.pageSize"
        :total="queryData.total"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </el-row>

    <!--  <el-dialog title="聊天记录" :visible.sync="messagesDialogVisible"

      >
        <div class="dialogMessages"
             v-loading="loading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(255, 255, 255, 0.8)">
          <div v-for="item in dialogMessages" :key="item.id">[{{item.sendTime | formatDate}}] {{item.content}}</div>
        </div>
      </el-dialog>-->
  </div>
</template>

<script>
import {getIllegalRecords, sendMute, sendFreeze, sendUnhandle} from '@/api/illegal-records'
import {getIllegalMessages} from '@/api/illegal-message'
import {getServers} from '@/api/server'
import {simpleFormat} from '@/util/date'
export default {
  name: 'illegal-message-index',
  data () {
    return {
      selected: '',
      selectedNum: [],
      subStrShow: false,
      highLightShow: false,
      channelTypes: [
        {id: 0, label: '系统'},
        {id: 1, label: '世界'},
        {id: 2, label: '国家'},
        {id: 3, label: '丐班'},
        {id: 4, label: '帮会'},
        {id: 5, label: '队伍'},
        {id: 6, label: '团队'},
        {id: 7, label: '同省'},
        {id: 8, label: '同城'},
        {id: 9, label: '当前'},
        {id: 10, label: '区域'},
        {id: 11, label: '联盟国'},
        {id: 12, label: '私聊'},
        {id: 13, label: '交易'},
        {id: 14, label: '语音'}

      ],
      field: '',
      loading: false,
      loadingFullScreen: false,
      dialogMessages: [],
      messagesDialogVisible: false,
      highLight: '',
      muniteRuleForm: {
        otherMunite: ''
      },
      muniteRules: {
        otherMunite: [{required: true, message: '请输入时间', trigger: 'blur'}]
      },
      dayRuleForm: {
        otherDay: ''
      },
      dayRules: {
        otherDay: [{required: true, message: '请输入时间', trigger: 'blur'}]
      },
      muniteFormVisible: false,
      dayFormVisible: false,

      expandKeys: [],
      messages: [],
      queryData: {
        pageIndex: 1,
        pageSize: 20,
        status: 0,
        keyword: '',
        maxMatchedWords: '',
        maxKeywordTimes: '20',
        field: 'keywordAudits',
        order: 'desc',
        hasRecharge: false
      },
      multipleSelection: [],
      freezeTypes: [{
        id: 1,
        day: 3,
        label: '封号3天'
      }, {
        id: 2,
        day: 365 * 20,
        label: '永久封号'
      }],

      muteTypes: [

        {
          id: 1,
          munite: 1 * 60,
          label: '禁言60分钟'
        }, {
          id: 2,
          munite: 5 * 60,
          label: '禁言300分钟'
        }, {
          id: 3,
          munite: 24 * 60,
          label: '禁言1440分钟'
        }

      ],
      messageIdsData: [],

      postFreezeData: {
        ids: [],
        days: ''
      },

      postMuteData: {
        ids: [],
        munites: ''
      },

      postUnhandleData: {
        ids: []
      },
      selectedMuteType: '',
      selectedFreezeType: '',
      roleAuditsMute: [],
      roleAuditsFreeze: [],
      keyWords: [],
      servers:[
/*
        {"id":241,"name":"1 - 玉虚"},
        {"id":300,"name":"1 - 九宫"},
        {"id":301,"name":"1 - 仙尘"},
        {"id":1217,"name":"1 - 远征137服 铁血"},
        {"id":1217,"name":"1 - 远征137服 铁血"},*/



      ]
    }
  },
  created () {
    this.getMessages()
    this.test()
    this.getServers()
  },
  methods: {
    // 获取大区和服务器
    getServers () {
      getServers()
        .then(response => {
          this.servers = response
          console.log(this.servers)

        })
    },


    // 获取数据
    getMessages (isPage) {
      this.loadingFullScreen = true
      this.postFreezeData.days = ''
      this.postMuteData.munites = ''
      /* let queryData = JSON.parse(JSON.stringify(this.queryData))
            if (queryData.maxMatchedRatio !== '') {
              queryData.maxMatchedRatio = queryData.maxMatchedRatio / 100
            } */
      if (isPage !== 'page') {
        this.queryData.pageIndex = 1
      }
      getIllegalRecords(this.queryData)
        .then(response => {
          this.messages = response.records
          this.queryData.pageIndex = response.pageIndex
          this.queryData.pageSize = response.pageSize
          this.queryData.total = response.total
          this.loadingFullScreen = false
          console.log(this.messages)
        })
    },

    test () {
      console.log(this.messages)
      console.log(this.servers)
      /*for (let item of this.servers) {
        for(let value of this.messages){
          if (this.item.id === value.id) {
            value.name = item.name
          }

        }

      }*/
    },
    // 获取聊天记录
    /* getMessagesDialog (row) {
            this.messagesDialogVisible = true
            this.loading = true

            this.dialogMessages = []
            var query = {gameId: row.gameId, serverId: row.serverId, roleId: row.roleId}
            getMessages(query)
              .then(response => {
                this.dialogMessages = response
                this.loading = false
              })
          }, */
    // 获取匹配词内容
    getChatRecords (row) {
      if (this.expandKeys.indexOf(row.id) >= 0) {
        this.expandKeys.shift()
        return
      }
      this.loading = true
      this.subStrShow = true
      this.highLightShow = false
      this.selectedNum = []

      let _this = this
      var query = {gameId: row.gameId, serverId: row.serverId, roleId: row.roleId}
      return getIllegalMessages(query)
        .then(response => {
          row.messages = response
          _this.expandKeys.shift()
          _this.expandKeys.push(row.id)
          this.loading = false
          for (let i = 0, len = row.keywordAudits.length; i < len; i++) {
            this.selectedNum.push(i)
            // console.log(this.selectedNum)
          }
        })
    },

    pageIndexChange (val) {
      this.queryData.pageIndex = val
      this.getMessages('page')
    },
    pageSizeChange (val) {
      this.queryData.pageSize = val
      this.getMessages('page')
    },
    // 选择用户
    handleSelectionChange (val) {
      this.messageIdsData = []
      for (let i = 0, len = val.length; i < len; i++) {
        this.messageIdsData.push(val[i].id)
      }
    },
    // 封号处理
    postFreeze (command) {
      if (this.messageIdsData.length === 0) {
        this.postFreezeData.days = ''
        this.$message({
          message: '请选择你需要操作的玩家！',
          type: 'warning'
        })
      } else {
        if (command === 'other') {
          this.creatingDay()
        } else {
          this.postFreezeData.days = this.freezeTypes[command - 1].day
          this.selectedFreezeType = this.freezeTypes[command - 1].label
          this.$confirm('对玩家进行 [' + this.selectedFreezeType + '] ， 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.postFreezeData.ids = this.messageIdsData
            sendFreeze(this.postFreezeData).then(response => {
              this.$message({
                type: 'success',
                message: '操作成功!'
              })
              this.getMessages()
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
        }
      }
    },
    // 禁言处理
    postMute (command) {
      if (this.messageIdsData.length === 0) {
        this.postMuteData.munites = ''
        this.$message({
          message: '请选择你需要操作的玩家！',
          type: 'warning'
        })
      } else {
        if (command === 'other') {
          this.creatingMunite()
        } else {
          this.postMuteData.munites = this.muteTypes[command - 1].munite
          this.selectedMuteType = this.muteTypes[command - 1].label
          this.$confirm('对玩家进行 [' + this.selectedMuteType + '] ， 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
          ).then(() => {
            this.postMuteData.ids = this.messageIdsData
            sendMute(this.postMuteData).then(response => {
              this.$message({
                type: 'success',
                message: '操作成功!'
              })
              this.getMessages()
            }
            )
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
        }
      }
    },
    // dialog
    creatingMunite () {
      this.muniteRuleForm.otherMunite = ''
      this.muniteFormVisible = true
    },
    creatingDay () {
      this.dayRuleForm.otherDay = ''
      this.dayFormVisible = true
    },
    // 其他时间禁言
    submitOtherMunite () {
      this.$refs['muniteForm'].validate((valid) => {
        if (valid) {
          this.postMuteData.munites = this.muniteRuleForm.otherMunite
          this.postMuteData.ids = this.messageIdsData
          sendMute(this.postMuteData).then(response => {
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
            this.muniteFormVisible = false
            this.getMessages()
          })
        } else {
          return false
        }
      })
    },
    // 其他时间封号
    submitOtherDay () {
      this.$refs['dayForm'].validate((valid) => {
        if (valid) {
          this.postFreezeData.days = this.dayRuleForm.otherDay
          this.postFreezeData.ids = this.messageIdsData
          sendFreeze(this.postFreezeData).then(response => {
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
            this.dayFormVisible = false
            this.getMessages()
          })
        } else {
          return false
        }
      })
    },
    // 不处理
    postKick () {
      if (this.messageIdsData.length === 0) {
        this.$message({
          message: '请选择你需要操作的玩家',
          type: 'warning'
        })
      } else {
        this.$confirm('该操作无法撤销, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postUnhandleData.ids = this.messageIdsData
          sendUnhandle(this.postUnhandleData).then(response => {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.getMessages()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      }
    },
    //  关键字点击打开内容 高亮显示
    keywordHighLight (index, row, text) {
      this.$refs.multipleTable.toggleRowExpansion(row, true)
      if (this.highLightShow === true) {
        this.highLightShow = false
        this.subStrShow = true
      } else {
        this.highLightShow = true
        this.subStrShow = false
      }
      if (index !== this.selected) {
        this.highLightShow = true
        this.subStrShow = false
      }
      this.highLight = text
      this.selected = index
    },
    // 筛选变色
    highLightData (val) {
      val = val.replace(new RegExp(this.highLight, 'gi'), '<font color="#f00">' + this.highLight + '</font>')
      return val
    },
    /*  goAnchor (selector) {
              var anchor = this.$el.querySelector(selector)
              document.body.scrollTop = anchor.offsetTop
            } */
    sortChange (column, prop, order) {
      this.queryData.field = column.prop
      this.queryData.order = column.order
      if (this.queryData.order === 'ascending') {
        this.queryData.order = 'asc'
      }
      if (this.queryData.order === 'descending') {
        this.queryData.order = 'desc'
      }
      this.getMessages()
    },
    // 表头换行
    renderHeader (h, {column}) {
      return h('span', {}, [
        h('span', {}, column.label.split('|')[0]),
        h('br'),
        h('span', {}, column.label.split('|')[1])
      ])
    }
  },
  //  filters
  filters: {
    formatDate (value, num) {
      if (num) {
        return simpleFormat(value).substr(5, num)
      } else {
        return simpleFormat(value)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-container {
    margin-top: 20px;

  }

  .btn-row {
    margin-bottom: 10px;
    float: right;
  }

  .clickable {
    position: relative;
    cursor: pointer;
    color: #2196F3;
    margin-left: 2px;
  }

  .input-item {
    //width: 160px;

  }

  .el-button--primary {
    width: 140px
  }

  .pages {
    margin-top: 20px
  }
  .item {
    margin-top: 10px;
    margin-right: 25px;
  }

  .el-dropdown-link {

    color: #2196F3;
    cursor: pointer;
  }

  .el-dropdown-item {
    top: 5px
  }

  .el-form-item__labe {
    text-align: left
  }

  .el-button--small {
    padding: 9px 10px;

  }

  .el-badge__content.is-fixed {
    z-index: 10;
  }
</style>
