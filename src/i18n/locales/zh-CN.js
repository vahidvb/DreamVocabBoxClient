export default {
  app: {
    title: "梦想词汇盒",
    language: "中文"
  },
  pages: {
    app: {
      myAccount: "我的账户",
      editProfile: "编辑资料",

      boxScenarios: "盒子复习方案",
      scenario1Title: "半日盒",
      scenario1Desc: "每半天复习一次（例如早上和晚上）。",

      scenario2Title: "每日盒",
      scenario2Desc: "每天复习一次。",

      scenario3Title: "按盒子编号",
      scenario3Desc: "根据盒子编号安排复习间隔（例如：第3盒每3天复习一次）。",

      username: "用户名",
      usernameHint: "用于登录的唯一用户名",

      name: "昵称",
      nameHint: "希望别人如何称呼你？",

      email: "电子邮箱",
      emailHint: "用于找回密码（可选）",

      changePassword: "修改密码",
      changePasswordHint: "如果不想修改密码，请留空（可选）",

      logout: "退出登录",
      confirmLogout: "确认退出",
      confirmLogoutText: "确定要退出登录吗？",
      cancel: "取消",

      updateProfile: "更新资料",

      myWords: "我的单词",
      addNewWord: "添加新单词/短语",
      boxes: "单词盒",

      applicationSettings: "应用设置",

      autoSuggestOnPageLoad: "页面加载时自动推荐单词",
      autoSpeechOnChecking: "检查时自动播放发音",
      autoDetectClipboardChange: "自动检测剪贴板变化",

      clipboardPermissionText: "应用需要在浏览器设置中获得剪贴板权限。点击此处查看帮助。",

      clipboardHelpTitle: "如何启用剪贴板权限",

      chrome: "Chrome",
      firefox: "Firefox",
      safari: "Safari",

      chromeStep1: "打开 Chrome 浏览器。",
      chromeStep2: "进入浏览器设置。",
      chromeStep3: "找到“站点设置”。",
      chromeStep4: "在“权限”中启用剪贴板。",

      firefoxStep1: "打开 Firefox 浏览器。",
      firefoxStep2: "进入浏览器设置。",
      firefoxStep3: "在“权限”中启用剪贴板访问。",

      safariStep1: "打开手机的“设置”应用。",
      safariStep2: "进入 Safari。",
      safariStep3: "找到剪贴板相关设置并启用。",

      otherBrowserTitle: "如果你使用其他浏览器",
      otherBrowserStep1: "在浏览器设置中找到类似“权限”或“站点设置”的选项并启用剪贴板。",

      speechNotSupported: "你的浏览器不支持语音合成功能",

      ttsSettings: "语音设置",
      sampleText: "用于测试发音的文本",

      rate: "语速",
      rateHint: "控制语音播放速度。",

      pitch: "音调",
      pitchHint: "调整声音的高低。",

      volume: "音量",
      volumeHint: "控制语音音量。",

      friends: "好友",
      messages: "消息",

      addToMyWords: "将 {word} 添加到我的单词",
      viewInMyList: "在我的列表中查看 {word}",

      wordSuggestion: "单词推荐",
      goToAddWord: "前往添加新单词页面",

      updateCompleted: "更新成功",
      latestChanges: "最近版本更新内容",
      version: "版本",
      gotIt: "知道了"
    },

    addVocabulary: {
      title: "添加新单词",
      add: "添加",
      word: "单词 / 短语",
      meaning: "含义",
      example: "例句",
      description: "描述"
    },

    reviewVocabulary: {
      showMeaning: "显示含义",
      hideMeaning: "隐藏含义",
      meaning: "含义",
      example: "例句",
      description: "描述",
      playPhrase: "PlayPhrase.me",
      prev: "上一条",
      next: "下一条"
    },

    vocabularies: {
      searchLabel: "搜索单词",
      listLength: "每页数量",
      boxNumber: "盒子编号",
      nothingFound: "未找到任何内容！！！",
      adjustFilters: "请尝试调整筛选条件",
      tableWord: "单词",
      tableAction: "操作",
      showDetails: "查看详情",
      completeInfo: "完整信息",
      meaning: "含义",
      example: "例句",
      description: "描述",
      close: "关闭",
      editTitle: "编辑单词",
      editBtn: "编辑",
      deleteTitle: "删除单词 {word}",
      deleteConfirmText: "确定要删除这个单词吗？删除后将无法恢复。",
      yes: "是的",
      no: "否"
    },

    messages: {
      wordSuggestions: "单词推荐"
    },

    login: {
      signInTitle: "登录",
      signInBtn: "登录",
      registerTitle: "注册",
      registerBtn: "注册",
      registerLink: "注册",
      username: "用户名",
      password: "密码",
      nickname: "昵称",
      email: "电子邮箱",
      noAccount: "还没有账户？",
      haveAccount: "我已有账户",
      usernameHint: "唯一用户名",
      nicknameHint: "你希望显示的名称",
      emailHint: "用于找回密码（可选）",
      passwordHint: "不限长度或格式",
      orContinueWith: "或使用以下方式继续",
      guestRegister: "快速游客注册 😒"
    },

    checkVocabulary: {
      showMeaning: "显示含义",
      hideMeaning: "隐藏含义",
      wordsRemain: "剩余单词",
      lastOne: "最后一个",
      meaning: "含义",
      example: "例句",
      description: "描述",
      playPhrase: "PlayPhrase.me",
      iRemember: "记得",
      iDontRemember: "不记得"
    },

    boxes: {
      box: "盒子",
      empty: "空",
      needsChecking: "需要复习",
      checked: "已复习",

      total: "总数",
      waiting: "等待中",
      waitingForCheck: "等待复习",

      closestReview: "最近复习时间",
      notScheduled: "尚未安排",

      deeplyMemorized: "你已经牢牢记住了 {count} 个单词。",
      notReachedYet: "你还没有达到这个盒子。",

      startChecking: "开始复习",
      review: "复习",
      viewAllWords: "查看所有单词",
      addNew: "添加新单词",
      itsEmpty: "当前为空"
    },

    friends: {
      searchInUsers: "搜索用户",
      searchList: "搜索结果",
      noUsersYet: "暂无用户。",
      searchUsersAndSendRequest: "你可以搜索用户并发送好友请求",
      friendList: "好友列表",
      noFriendsYet: "暂无好友。"
    }
  },

  plugins: {
    axios: {
      postRequestError: "请求发送失败"
    }
  },

  components: {
    shareButton: {
      shareTitle: "分享 {word}",
      messageOptional: "消息（可选）"
    },
    userList: {
      cancelRequest: "取消请求",
      unfriend: "解除好友",
      sendRequest: "发送请求",
      accept: "接受",
      reject: "拒绝",

      share: "分享",
      addedBefore: "已添加",

      deeplyMemorized: "{name} 已经记住了 {count} 个单词。",
      notReachedBox: "{name} 还没有达到这个盒子。",

      totalVocabularies: "单词总数",
      registerAge: "注册时长",
      lastCheck: "最近复习",
      lastAddedVocabulary: "最近添加的单词",
      totalChecks: "总复习次数",
      averageDailyCheck: "每日平均复习",
      averageDailyLearnedCheck: "每日平均记住",
      averageDailyNotLearnedCheck: "每日平均未记住",
      averageDailyAdd: "每日平均添加"
    }
  },

  public: {
    close: "关闭"
  },
  "apiResultStatusCodes": {
    "0": "操作失败",
    "1": "操作成功",
    "2": "发生错误",
    "3": "发送的参数无效",
    "4": "未找到",
    "5": "身份验证错误",
    "6": "该项目已被注册",
    "7": "该用户已被注册",
    "8": "指定的用户不存在",
    "9": "密码错误",
    "10": "参数无效",
    "11": "登录失败",
    "12": "访问被拒绝",
    "13": "未找到该项目",
    "14": "该用户名已被使用",
    "15": "该邮箱已被使用",
    "16": "用户名是必填项",
    "17": "昵称是必填项",
    "18": "密码是必填项",
    "19": "用户名不能包含空格",
    "20": "注册成功",
    "21": "登录成功",
    "22": "密码不能包含空格",
    "23": "单词添加成功",
    "24": "单词更新成功",
    "25": "单词删除成功",
    "26": "你已经添加过这个单词",
    "27": "单词是必填项",
    "28": "没有找到任何单词",
    "29": "恭喜！此盒中的所有单词都已检查完成",
    "30": "你不能修改单词字段",
    "31": "请填写必填字段",
    "32": "未检测到任何更改",
    "33": "仓库中不存在指定的用户",
    "34": "好友请求发送成功",
    "35": "好友请求接受成功",
    "36": "好友请求取消成功",
    "37": "你已成功解除好友关系",
    "38": "你已成功拒绝请求",
    "39": "消息发送成功"
  },
  "time": {
    "day": "天",
    "hour": "小时",
    "minute": "分钟"
  }


}
