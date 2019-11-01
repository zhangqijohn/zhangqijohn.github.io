# 创建活动

## 目录
- [页面业务流程图](#页面业务流程图)
- [程序目录结构](#程序目录结构)
- [调用接口](#调用接口)
- [使用第三方插件](#使用第三方插件)
- [页面注意点](#页面注意点)

### 页面业务流程图

新服自启优化: 活动创建-服务器ID，增加 渠道新服自启活动（含公共区）勾选项

<center>图 1.1.1</center>

[TOP](#创建活动)

### 程序目录结构

###### 视图层
```
.
├─ src/view/Activity
    ├─ create-list

```
###### API层
```
.
├─ src/api
    ├─ type.js
       └─ getEnabledTypes()
    ├─ activity 
       └─ gcreateActivity()
    ├─ syssetting 
       └─ getGames()
    ├─ proxy 
       ├─ getAreas()
       └─ getWorlds()
```
[TOP](#创建活动)

### 调用接口
| API名称 | 方法 | 路由地址 | 备注 |
|--------|--------|--------|--------|
|  |  |  |  |

[TOP](#创建活动)

### 使用第三方插件

**无**

[TOP](#创建活动)

### 页面注意点

###### 1.

[TOP](#创建活动)

←[类型管理](client/typeManage) 下一页[活动管理](client/activityManage)
