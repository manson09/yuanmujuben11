// ====================== 【配置区】======================
const PROXY_URL = "/api/llm";
const MODEL_NAME = "anthropic/claude-sonnet-4.6";
const MAX_RETRY = 5;
const API_CALL_DELAY = 3000;
const DELAY_BETWEEN_EPISODES = 5000;

// ====================== 【金手指框架】======================
const GOLD_FINGER_FRAMEWORK = `
## 🔧 金手指分类与匹配框架

### 金手指三大维度
1. 感知维度：隐性（主角不自知）/ 显性-隐忍（主角知道但藏着）/ 显性-系统（系统/面板可见）/ 半显性（知道一部分不知全貌）
2. 存在形式：内生型（天赋/血脉/经历）/ 外挂型（系统/宝物/外部力量）
3. 作用方式：主动型（主角主动使用）/ 被动型（自动生效主角不知情）

### 爽梗→金手指自动匹配表
| 核心爽梗 | 金手指类型 | 感知维度 | 透底形式 | 配角需求 |
|---------|-----------|---------|---------|---------|
| 扮猪吃虎/天赋异禀/不按常理 | 内生·天赋流 | 隐性 | 知情配角OS/吐槽 | 必须有1个知情长辈/师父 |
| 实力碾压/一呼百应/幕后大佬 | 身份·实力流 | 显性-隐忍 | 旧部下/手下震惊反应 | 至少1个知道身份的旧部 |
| 挥金如土/万千宠爱 | 身份·财富流 | 显性-隐忍 | 主角回忆/证件/旧物 | 可选知情配角 |
| 预判对手/渔翁得利/职场宫斗 | 重生·先知流 | 显性-隐忍 | 主角内心OS+记忆闪回 | 不强制 |
| 信息差赚钱/囤货致富/返城创业 | 重生·先知流 | 显性-隐忍 | 主角内心OS+记忆闪回 | 不强制 |
| 打脸极品亲戚/薅集体羊毛 | 重生·先知流 | 显性-隐忍 | 主角内心OS+记忆闪回 | 不强制 |
| 直播打脸/弹幕封神/花式怼粉/黑料澄清 | 外挂·系统流 | 显性-系统 | 系统弹窗/面板 | 不强制 |
| 反向带货 | 外挂·系统流或内生·眼力流 | 显性-系统或半显性 | 系统提示或行为反差 | 不强制 |
| 破解规则/卡bug刷分/副本通关 | 外挂·系统流或重生·先知流 | 显性-系统或显性-隐忍 | 系统提示或主角OS | 不强制 |
| 极限逃生/戏耍NPC | 重生·先知流 | 显性-隐忍 | 主角OS+行为反差 | 不强制 |
| 开卦算命/风水改运/预知吉凶 | 内生·天赋流 | 半显性 | 主角行为+事主震惊反应 | 不强制 |
| 驱邪破煞/功德加身 | 内生·天赋流+外挂·功德系统 | 半显性 | 主角行为+系统辅助 | 不强制 |
| 夺宝奇兵/慧眼识珠/神器认主 | 内生·眼力流或重生·先知流 | 隐性或显性-隐忍 | 旁人不识货的反差反应 | 不强制 |
| 收服帮派 | 身份·实力流 | 显性-隐忍 | 行为碾压+旁人震惊 | 可选旧部 |
| 绝境逃脱/极限反杀/逆风翻盘/反杀小人 | 内生·潜力流或身份·底牌流 | 隐性或显性-隐忍 | 绝境中知情配角/回忆透底 | 可选 |
| 力挽狂澜/英雄救美/拯救公司/解救家人 | 身份·实力流 | 显性-隐忍 | 行为反差+旁人震惊 | 可选 |
| 大仇得报/诛杀坏人/反向PUA | 重生·先知流或身份·证据流 | 显性-隐忍 | 证据展示+回忆闪回 | 不强制 |
| 劫富济贫 | 身份·实力流或内生·天赋流 | 显性-隐忍或隐性 | 行为反差+旁人震惊 | 可选 |
| 无心插柳/一夜暴富/因祸得福 | 内生·气运流 | 隐性 | 旁人震惊反应 | 不强制 |
| 偷听秘闻 | 内生·天赋流或外挂·异能流 | 半显性 | 主角行为+信息反差 | 不强制 |
| 持之以恒/认祖归宗/重情重义/知恩图报 | 内生·品格流 | 不适用 | 行为本身就是爽点 | 不强制 |

### 匹配规则
1. 先选定核心爽梗 → 查表确定金手指全套参数
2. 隐性型：天然信息差，不需要隐忍理由
3. 显性-隐忍型：必须有明确隐忍理由
4. 显性-系统型：仅直播/规则怪谈类使用
5. 半显性型：主角知道自己有某种能力但低估了自身实力

### 金手指量化公式
金手指必须可量化——不能是"很强"，必须是"强到什么程度"。
示例：
- ❌ "他武功很高" → ✅ "一拳打穿30cm钢板/10秒内制服12个武装人员"
- ❌ "他很有钱" → ✅ "个人可调动资产9700亿/一个电话能借调军方直升机"
- ❌ "他医术很好" → ✅ "银针扎入3秒后病人睁眼/世界公认不治之症他能治"
- ❌ "他右眼有能力" → ✅ "右眼能看穿人体经络/能看到3公里外蚂蚁/能预判所有攻击轨迹"

### 透底形式优先级
Tier 1：知情配角OS/吐槽/震惊反应
Tier 2：主角不经意行为暴露实力
Tier 3：碎片化回忆/闪回
Tier 4：纯文字字幕
Tier 5：系统弹窗（仅直播/怪谈类）

### ⚠️ 透底的本质定义（最重要的规则之一）
透底不是"告诉观众主角过去有多强"。
透底是"让观众知道一个只有观众知道、所有剧内角色都不知道的具体信息，这个信息让观众能预期主角以后靠它翻盘"。

#### 透底三要素检验（缺一不可）：
1. 【独占性】：这个信息只有观众知道，剧内角色（包括反派、身边人）都不知道
2. 【具体性】：观众能用一句话说出"主角的底牌是XXX"，而不是"主角好像很厉害"
3. 【可期待性】：观众知道这个信息后，能产生"他什么时候用这个底牌翻盘？"的期待

#### 透底失败的常见错误：
❌ "观众知道他过去是战神" → 过去式，不等于现在有底牌
❌ "观众知道他右眼受伤了" → 观众和剧内角色知道的一样多，没有信息差
❌ "观众知道他很厉害但不知道具体厉害在哪" → 没有具体性，无法形成期待
❌ "配角念了一遍主角的履历" → 这是信息展示不是信息差

✅ 正确透底举例：
- 观众看到他私下摘开绷带，右眼完好且有异能（金色瞳孔/能看到常人看不到的东西） → 剧内角色都以为他瞎了
- 观众看到师父OS"练气九十九万层" → 主角和所有人都以为他是废物
- 观众看到他翻出一本通讯录，里面全是国家级大佬的私人号码 → 所有人以为他无权无势
- 观众看到系统面板"宿主当前资产：9700亿" → 所有人以为他是穷鬼

#### 骨架阶段必须回答的问题：
"第1集结束后，观众知道了什么只有观众知道的信息？这个信息是什么？剧内角色对此的错误认知是什么？"
如果答不上来 → 透底失败，必须重做。

### 禁止事项
- 禁止所有题材一律用系统弹窗
- 禁止金手指类型和爽梗不匹配
- 禁止隐性金手指下主角主动使用
- 禁止无透底
- 禁止透底信息不通过三要素检验
`;

// ====================== 【第1集开场策略】======================
const EPISODE_1_STRATEGIES = `
## 🎬 第1集开场策略（按爽梗类型，严格执行对应策略）

### 策略A：先炸后藏（适用于：扮猪吃虎/战神归来/赘婿逆袭/身份隐藏类）
核心逻辑：先让观众看到主角最强的样子 → 交代为什么要藏 → 画面一转进入"废物"状态 → 反差拉满
执行结构：
  场景1（前30秒·炸场）：直接给主角最强状态的劲爆画面（战场碾压/一击毙敌/单挑几十人），画面有视觉冲击力，动作干脆利落，配角反应衬托碾压
  场景2（藏的理由·不超过30秒）：简短交代退隐/隐藏原因
  场景3（反差登场）：时间跳转，主角以最普通/最狼狈的样子出现在日常场景，被人当废物/被拦/被看不起
  ⚠️ 透底时机：在炸场画面中或画面结束后的独处瞬间，给观众展示一个只有观众知道的秘密（透底三要素必须通过）
⚠️ 禁止：禁止第1集全程都在"藏"的状态；禁止炸场画面只是配角念简历

### 策略B：日常暴露（适用于：天赋异禀/不自知/气运流/隐性金手指类）
核心逻辑：主角做日常小事 → 无意间做了逆天的事但不知道 → 知情人看到后量化反应
执行结构：
  场景1：主角做普通事，过程中做了不可能的事
  场景2：知情配角OS量化碾压级别
  场景3：主角离开安全环境进入主线世界，被人当废物/新人
⚠️ 禁止：禁止知情人不在场下透底

### 策略C：系统激活（适用于：直播爽文/规则怪谈/系统流）
核心逻辑：主角最低谷时系统激活 → 给出第一个任务/规则 → 完成后获得第一次小爽
执行结构：
  场景1：主角在最惨的状态（被开除/被甩/被网暴）
  场景2：系统弹窗激活，1-2句话说明规则
  场景3：主角完成第一个小任务，获得第一次奖励/小爽

### 策略D：重生闪回（适用于：重生复仇/先知流）
核心逻辑：前世最惨的死亡画面 → 睁眼回到过去 → 立刻做只有重生者才会做的事
执行结构：
  场景1（3-5秒）：前世惨死画面
  场景2：主角睁眼，确认回到过去
  场景3：立刻做一件只有重生者才会做的事（买股票/避开陷阱/提前布局）

### 如何选择策略
| 金手指感知维度 | 爽梗类型 | 开场策略 |
|--------------|---------|---------|
| 显性-隐忍 | 扮猪吃虎/战神归来/赘婿/身份隐藏 | 策略A：先炸后藏 |
| 隐性（不自知） | 天赋异禀/不按常理/气运流 | 策略B：日常暴露 |
| 显性-系统 | 直播/规则怪谈/系统流 | 策略C：系统激活 |
| 显性-隐忍 | 重生复仇/先知流 | 策略D：重生闪回 |

### 关键原则
不管用哪个策略，第1集前30秒必须让观众直观看到主角的碾压级底牌。
"直观"标准：观众看完能用一句话说出"这个主角牛在哪"。
第1集结束后观众必须掌握一个通过透底三要素检验的独占信息。
`;

// ====================== 【爽感曲线强制规则】======================
const SHUANG_CURVE_RULES = `
## 📈 爽感曲线强制规则（10集制）

### 爽感值标准（1-5星）
| 星级 | 定义 | 观众状态 |
|------|------|---------|
| ☆ | 最低谷，主角被全面压制 | 观众憋屈得想摔手机但因为信息差知道他有底牌所以继续看 |
| ★★ | 低位，主角被踩但有微小暗示 | 观众隐约期待 |
| ★★★ | 中位，有小爽点但没有大释放 | 观众觉得有意思 |
| ★★★★ | 高位，重大反转或半释放 | 观众发弹幕"爽" |
| ★★★★★ | 最高潮，全面碾压 | 观众爽到截图发朋友圈 |

### 10集爽感曲线模板
第1集★★★ → 第2集★★ → 第3集★★ → 第4集★ → 第5集☆ → 第6集★★★ → 第7集★★★★ → 第8集★★★★★ → 第9集★★ → 第10集★★★

### 关键规则
1. 第5集必须是最低谷（☆），不可在其他集出现最低谷
2. 第8集必须是最高潮（★★★★★），不可在其他集出现最高潮
3. 第1-5集整体下行趋势（允许第1集因炸场有★★★，但之后必须降）
4. 第6集必须是拐点：从最低谷开始回升，但只释放一口气（★★★）
5. 第6-8集必须连续上行，不允许中间下跌
6. 第9集必须回落（★★），不允许第8集后继续高潮
7. 第10集★★★左右，留悬念不留满足感

### ⚠️ 爽感曲线的本质
爽感 = 憋屈积累量 × 释放速度
- 如果没有足够的憋屈积累（第2-5集不够惨），第8集的碾压就不够爽
- 如果释放太分散（每集都赢一点），最终碾压就没有冲击力
- 所以：前5集越惨 → 第8集越爽。这是铁律。
`;const PER_EPISODE_ENGINE = `
## 🎯 逐集爽感引擎（10集制·每集必须严格执行对应引擎）

### 核心原理
每一集观众"划不走"的原因完全不同。不是每集都靠"主角赢"来留人。
AI必须明确知道：这一集靠什么让观众留下来。

---

### 第1集引擎：信息差炸弹
【观众心理】"卧槽他这么强？但所有人都不知道？"
【执行要点】
- 按开场策略执行（A/B/C/D）
- 第1集结束时，观众必须掌握一个"只有观众知道的秘密"（通过透底三要素检验）
- 这个秘密要具体到观众能复述
- 结尾制造反差：主角最强状态→被当成废物，观众急得不行
【本集留人靠】信息差带来的优越感
【禁止】禁止主角和剧内角色掌握相同信息量；禁止透底信息模糊不可量化

---

### 第2集引擎：忍耐极限
【观众心理】"他被骂成这样居然忍得住？他到底什么时候爆发？"
【执行要点】
- 主角进入核心场景，遭遇第一波社交羞辱
- 羞辱必须具体且刺痛
- 主角明明有能力反击但选择忍
- 唯一的暗示：主角有1个不经意的微动作暴露实力
- 嘲讽者必须在本集出场并说出标志性嘲讽台词
- 旁观者三类到位
- 结尾：更大的羞辱/压迫即将到来
【本集留人靠】忍耐带来的期待感
【禁止】⚠️ 禁止主角本集出手；禁止嘲讽是泛泛的"众人纷纷嘲笑"

---

### 第3集引擎：情感绑定
【观众心理】"他身边这个人挺好的/这个反派太可恶了"
【执行要点】
- 冲突升级到第二层（从社交羞辱→经济打压/断生路）
- 塑造情感锚点和仇恨锚点
- 主角有一个"差点暴露"的瞬间
- 嘲讽者继续加码
- 结尾：反派盯上了主角身边人
【本集留人靠】情感投入
【禁止】禁止主角出手；禁止冲突和第2集同类型

---

### 第4集引擎：底线触碰
【观众心理】"这也太过分了！他不可能再忍了吧？"
【执行要点】
- 反派手段升级到人身威胁/派打手
- 主角身边的情感锚点被波及
- ⚠️ 暗线启动：主角悄悄做了一件事（只有观众看到）
- 嘲讽者第三轮加码
- 结尾：主角一个人站在某处，背对镜头
【本集留人靠】愤怒 + 暗中布局的期待
【禁止】禁止主角正面出手反击；禁止暗线行动被剧内角色发现

---

### 第5集引擎：绝境感
【观众心理】"不会吧？这也太惨了。"
【执行要点】
- 最低谷，所有方向同时收紧
- 反派最嚣张的瞬间
- 嘲讽者达到顶峰
- ⚠️ 暗线微小进展（只有观众看到）
- 结尾：主角做了一个标志性动作，眼神变了
【本集留人靠】憋到极致的窒息感 + 要爆发了的预感
【禁止】⚠️ 绝对禁止主角出手/赢任何一次

---

### 第6集引擎：释放一口气
【观众心理】"终于！他开始动了！"
【执行要点】
- 主角终于出手，但只解决1个具体问题
- 出手快准狠，展示部分实力
- 旁观者反应：嘲讽者困惑，察觉者审视
- ⚠️ 立刻引入更大的威胁
- 暗线继续推进
【本集留人靠】小爽 + 更强对手来了的紧张
【禁止】禁止解决超过1个核心问题；禁止没有引入更高层级威胁

---

### 第7集引擎：反转揭底
【观众心理】"卧槽原来他早就布好局了！"
【执行要点】
- ⚠️ 暗线全面引爆
- 反转必须有伏笔支撑
- 主角出手但还没全力（70%实力）
- 至少1个嘲讽者被打脸，回扣其具体嘲讽台词
- 结尾：主角和主反派正面相对——戛然而止
【本集留人靠】智商碾压爽感 + 最终对决的期待
【禁止】⚠️ 禁止反转没有对应前面的伏笔

---

### 第8集引擎：全面碾压
【观众心理】"爽！太爽了！"
【执行要点】
- 全阶段最爽的一集，所有憋屈清算
- 主角全力出手，碾压级别
- 旁观者反应至少3层
- 打脸必须回扣具体台词
- 主角态度：碾压时轻描淡写
- 结尾：新的威胁浮出水面
【本集留人靠】全面释放前7集的憋屈感
【禁止】禁止打脸不回扣具体台词；禁止旁观者反应少于3层

---

### 第9集引擎：新悬念
【观众心理】"这个新出来的人什么来头？"
【执行要点】
- 战果消化（不超过30%篇幅）
- 新威胁具象化（至少50%篇幅）
- 终极钩子强化
【本集留人靠】升级感 + 危机感
【禁止】⚠️ 禁止整集都是日常戏；禁止主角出手

---

### 第10集引擎：升级恐惧
【观众心理】"这个新威胁这么强？"
【执行要点】
- 新威胁展示实力
- 主角面临更大的抉择
- 终极钩子再强化
- 结尾：强钩子画面
【本集留人靠】升级感 + 悬念
【禁止】禁止新威胁只是口头上"很强"

### ⚠️ 贯穿10集的强制规则

#### 主角出手次数硬控制
| 集数 | 出手上限 |
|------|---------|
| 第1集 | 1次（炸场画面） |
| 第2-5集 | 0次 |
| 第6集 | 1次 |
| 第7集 | 1-2次 |
| 第8集 | 不限 |
| 第9集 | 0次 |
| 第10集 | 0-1次 |

#### 每集结尾钩子类型不能重复
第1集反差钩子 → 第2集威胁升级 → 第3集身边人危险 → 第4集暗线启动 → 第5集暴风雨前 → 第6集更大危机 → 第7集终极对决 → 第8集新威胁 → 第9集新敌亮牙 → 第10集终极悬念
`;

// ====================== 【前3集节奏规则】======================
const FIRST_3_EPISODES_RULES = `
## 📐 前3集强制节奏规则

### 通用禁止项
- 禁止第1集主角全程不出场只靠配角念简历
- 禁止前3集主角全程沉默被动
- 禁止连续2集相同冲突
- 主角前3集至少3句个性台词
- 禁止第2-3集主角正面出手赢冲突（隐性金手指的"无意识出手"除外）
`;

// ====================== 【S级核心爽点库】======================
const SHUANGDIAN_LIBRARY = `
## 📚 可选S级核心爽点库
1. 装逼打脸类：扮猪吃虎 / 实力碾压 / 解决难题 / 上帝视角 / 万千宠爱 / 一呼百应 / 幕后大佬 / 挥金如土 / 天赋异禀 / 不按常理
2. 荣获至宝类：夺宝奇兵 / 慧眼识珠 / 神器认主 / 收服帮派
3. 意外之喜类：无心插柳 / 一夜暴富 / 偷听秘闻 / 因祸得福
4. 惩戒恶人类：大仇得报 / 诛杀坏人 / 劫富济贫 / 反向PUA
5. 人格魅力类：持之以恒 / 认祖归宗 / 重情重义 / 知恩图报
6. 拯救危难类：力挽狂澜 / 英雄救美 / 拯救公司 / 解救家人
7. 智商碾压类：预判对手 / 渔翁得利 / 职场宫斗 / 规则破解
8. 绝地反杀类：绝境逃脱 / 极限反杀 / 逆风翻盘 / 反杀小人
9. 直播爽感类：直播打脸 / 弹幕封神 / 反向带货 / 花式怼粉 / 黑料澄清
10. 玄学爽感类：开卦算命 / 风水改运 / 驱邪破煞 / 功德加身 / 预知吉凶
11. 年代逆袭类：信息差赚钱 / 薅集体羊毛 / 打脸极品亲戚 / 返城创业 / 囤货致富
12. 规则怪谈类：破解规则 / 戏耍NPC / 极限逃生 / 副本通关 / 卡bug刷分
`;

// ====================== 【子流派规则】======================
const SUB_GENRE_RULES = `
## 🎭 子流派专属规则
| 子流派 | 核心规则 | 推荐金手指类型 |
|--------|---------|--------------|
| 玄幻修仙 | 终极钩子绑定生死/复仇；打脸主角自己出手 | 隐性·天赋流 |
| 都市赘婿 | 终极钩子绑定身份揭晓；底牌最高潮才揭 | 显性-隐忍·身份流 |
| 战神归来 | 终极钩子绑定护妻护女；先装弱再打脸 | 显性-隐忍·身份实力流 |
| 都市异能 | 终极钩子绑定异能暴露/救危机 | 半显性·天赋流 |
| 穿越历史 | 终极钩子绑定改命运/夺嫡 | 显性-隐忍·先知流 |
| 校园爽文 | 终极钩子绑定逆袭考学 | 隐性或显性均可 |
| 年代创业 | 终极钩子绑定发家致富 | 显性-隐忍·先知流 |
| 玄学爽文 | 终极钩子绑定化劫/积功德 | 半显性·天赋流 |
| 直播爽文 | 终极钩子绑定成顶流 | 显性-系统·系统流 |
| 规则怪谈 | 终极钩子绑定通关所有副本 | 显性-系统或显性-隐忍 |
| 都市家庭 | 终极钩子绑定家庭痛点 | 显性-隐忍·证据流 |
`;

// ====================== 【爽点执行规则】======================
const SHUANGDIAN_EXEC_RULES = `
## ⚙️ 爽点执行规则

### 通用要求
- 每个核心爽点搭配至少1个辅助爽感元素，避免单一
- 单阶段核心爽梗1个，可搭配最多2个辅助爽梗，辅助占比≤30%

### 按爽点类型核心要求
| 爽点类型 | 铺垫要求 | 禁止事项 |
|---------|---------|---------|
| 装逼打脸 | 先铺嘲讽→打脸干脆+全场震惊 | 禁止代打 |
| 荣获至宝 | 先铺宝物稀缺→得宝特写 | 得宝后隐瞒 |
| 意外之喜 | 先铺倒霉→揭晓旁人震惊 | 禁止提前剧透 |
| 惩戒恶人 | 先铺恶行→惩罚够解气 | 符合公序良俗 |
| 拯救危难 | 先铺危难→主角出手干脆 | 禁止金手指直接解决 |
| 智商碾压 | 先铺对手诡计→层层拆穿 | 预判有线索支撑 |
| 绝地反杀 | 先铺绝境→反杀快狠准 | 禁止第三方救场 |
| 直播爽感 | 先铺黑粉网暴→弹幕反转 | 每集至少3次弹幕画面 |
| 玄学爽感 | 先铺不信→点私密细节 | 算命有实锤 |
| 年代逆袭 | 先铺不看好→公布收入震惊 | 不出现不符年代物品 |
| 规则怪谈 | 先铺规则恐怖→卡bug通关 | 规则不矛盾 |
`;
const GLOBAL_TOP_RULES = `
## 🔝 全局最高优先级规则

### 最高顶层原则
所有规则为剧情自然度服务。核心规则必须达标，细节形式灵活调整。禁止为了卡规则硬塞内容。

### ⚠️ 格式最高规则（违反直接重写）
标准竖屏短剧剧本格式：
- 场景头：序号、日/夜、内/外、出场人物
- 动作描写：△开头，一句话一个镜头
- 台词：角色名：台词 / 角色名（情绪）：台词
- 内心独白：角色名（情绪）OS：内容
- 字幕：行内（字幕：XXX）
- 切场：△切
- 集结尾：△黑幕。
绝对禁止【场景】【画面】【台词】分块式结构。

### 核心创作规则
1. 【信息差强制规则】所有爽点必须营造至少2层认知差
2. 【透底规则】第1集按开场策略完成透底，必须通过三要素检验
3. 【金手指规则】主角必须有碾压级底牌
4. 【旁观者烘托规则】冲突场景至少2-3类旁观者
5. 【钩子规则】每集结尾在最刺激瞬间戛然而止
6. 【冲突梯度规则】①口头嘲讽→②经济打压→③人身威胁→④威胁核心关系人→⑤动用权力
7. 【人物规则】主角有标志性动作/口头禅；嘲讽者有名有姓有标志性台词
8. 【爽感曲线规则】第5集最低谷，第8集最高潮
9. 【主角出手硬控制】第2-5集0次→第6集1次→第7集1-2次→第8集不限
10. 【暗线规则】第4集埋→第5集微进展→第6集部分使用→第7集引爆
11. 【伏笔闭环】所有伏笔本阶段回收
12. 【打脸闭环】每个嘲讽者必须有打脸回报，回扣具体嘲讽台词
13. 【禁止同质化重复】禁止连续2集相同冲突
`;

// ====================== 【标准剧本格式范本】======================
const SCRIPT_FORMAT_EXAMPLE = `
## 📝 标准剧本格式范本（学习格式和信息密度，禁止照搬内容）

第一集
1、日、外、林凡、逍遥子
△山巅，云雾缭绕，茅草屋旁的深潭，林凡戴着斗笠，嘴角吊着一根狗尾巴坐在那里闭着眼（字幕：林凡），一旁是竹竿鱼竿。
△水下镜头，水潭内，黑龙游动，面前蚯蚓闪烁金光，黑龙冲上去一口吞下，疯狂挣扎。
△水上，鱼漂猛然下坠，林凡睁眼一把抓住鱼竿，嘴角带笑。
林凡：上钩了！
△深潭中黑龙被鱼线拉着急速向上。
△砰！黑龙破水而出，水花漫天金光闪烁，黑龙悲鸣变成黑鱼掉在地上，林凡嘿嘿一笑。
△切
△火堆前，黑鱼被木棍串着架在火上烤，林凡哼着小曲往黑鱼上撒作料。
林凡：来点葱花，撒点香菜，这小味挠一下就上来了！
△金光一闪，逍遥子入镜（字幕：逍遥子，林凡师父，绝世高人），看着被烤的黑鱼气急败坏。
逍遥子：逆徒！老夫圈养了万年的金仙境黑龙，你就这么给我烤了？
林凡（翻白眼）：什么黑龙？不就是一条黑鱼吗？小气扒拉的！
逍遥子（瞪眼）OS：你丫头两个月修炼到了练气九十九万层，弹指间仙帝都要飞灰湮灭！你还想怎样？
林凡：我想下山了。
逍遥子（瞬间大喜）：下山好啊！不过徒儿啊！山下金丹多如狗，元婴满地走，你一个小小的练气，切记低调行事。
林凡（认真点头）：我记住了！
△林凡起身化作金光消失。
△黑幕。

【从范本中必须学习的要点】
1. 格式：场景头+△动作+角色名：台词
2. 信息密度极高
3. 主角有个性有魅力
4. 透底自然
5. 钩子：最刺激瞬间△黑幕
`;

// ====================== 【防踩坑规则】======================
const ANTI_BUG_RULES = `
## 🚫 防踩坑规则
1. 显性-隐忍型必须有隐忍理由；隐性型无需理由
2. 隐性金手指：主角不可主动使用不知道的能力
3. 伏笔本阶段回收
4. 打脸闭环：所有嘲讽者有打脸回报，必须回扣原话
5. 禁止连续2集相同冲突/手段
6. 每集必须有新信息/新冲突/新人物
7. ⚠️ 禁止第1集主角全程不出场只靠配角念简历透底
8. ⚠️ 禁止前3集主角全程沉默被动
9. ⚠️ 透底必须通过三要素检验
10. ⚠️ 主角出手硬控制：第2-5集禁止出手
11. ⚠️ 暗线必须从第4集埋设、第7集引爆
12. ⚠️ 每集结尾钩子类型不能与相邻集重复
13. ⚠️ 嘲讽者必须有名有姓有标志性台词
14. ⚠️ 第5集必须是最低谷，第8集必须是最高潮
15. ⚠️ 第8集打脸必须精确回扣嘲讽者原话
`;
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchWithTimeout(url: string, options: RequestInit, timeoutMs: number = 120000): Promise<Response> {
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const timer = setTimeout(() => {
      controller.abort();
      reject(new Error(`请求超时（${timeoutMs / 1000}秒）`));
    }, timeoutMs);
    fetch(url, { ...options, signal: controller.signal })
      .then(response => { clearTimeout(timer); resolve(response); })
      .catch(err => {
        clearTimeout(timer);
        reject(err.name === 'AbortError' ? new Error(`请求超时（${timeoutMs / 1000}秒）`) : err);
      });
  });
}

async function callLLM(prompt: string, needJson: boolean = true, retries: number = MAX_RETRY): Promise<any> {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await fetchWithTimeout(PROXY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: MODEL_NAME,
          messages: [
            {
              role: "system",
              content: needJson
                ? `你是专业短剧创作助手。输出JSON用<json></json>标签包裹，标签外无任何内容。JSON严格规范：双引号key、字符串内双引号转义、无trailing comma。`
                : `你是专业短剧编剧。写标准短剧格式（△动作+角色名：台词），绝对不用【场景】【画面】【台词】分块格式。台词口语化短句有个性。结尾在最刺激瞬间△黑幕。`
            },
            { role: 'user', content: prompt }
          ],
          temperature: 0.3,
          max_tokens: 16000,
        }),
      }, 180000);

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        if (response.status === 401) throw new Error('API_KEY错误');
        if (response.status === 404) throw new Error('模型未找到');
        if (response.status === 429) {
          const retryAfter = parseInt(response.headers.get('retry-after') || '10', 10);
          await delay(retryAfter * 1000);
          continue;
        }
        throw new Error(`API请求失败(${response.status}): ${JSON.stringify(errData)}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content?.trim();
      if (!content) throw new Error('API返回内容为空');

      if (needJson) {
        const jsonMatch = content.match(/<json>([\s\S]*?)<\/json>/i);
        if (!jsonMatch) throw new Error('未返回<json>标签包裹的JSON');
        let jsonStr = jsonMatch[1].trim()
          .replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '')
          .replace(/\n/g, ' ').replace(/\t/g, ' ').replace(/\r/g, '')
          .replace(/,\s*([\]}])/g, '$1');
        await delay(API_CALL_DELAY);
        return JSON.parse(jsonStr);
      }
      await delay(API_CALL_DELAY);
      return content;
    } catch (error: any) {
      if (error.message?.includes('API_KEY') || error.message?.includes('模型未找到')) throw error;
      if (attempt === retries - 1) throw error;
      const baseMs = error.message?.includes('超时') ? 8000 : 5000;
      await delay(Math.min(baseMs * Math.pow(2.5, attempt), 120000));
    }
  }
  throw new Error('LLM调用失败：已耗尽所有重试次数');
}

function matchShuangdianType(coreShuangdian: string): string {
  const typeMap: Record<string, string[]> = {
    '装逼打脸类': ['扮猪吃虎', '实力碾压', '幕后大佬', '挥金如土', '天赋异禀', '不按常理', '万千宠爱', '一呼百应', '解决难题', '上帝视角'],
    '荣获至宝类': ['夺宝奇兵', '慧眼识珠', '神器认主', '收服帮派'],
    '意外之喜类': ['无心插柳', '一夜暴富', '偷听秘闻', '因祸得福'],
    '惩戒恶人类': ['大仇得报', '诛杀坏人', '劫富济贫', '反向PUA'],
    '拯救危难类': ['力挽狂澜', '英雄救美', '拯救公司', '解救家人'],
    '智商碾压类': ['预判对手', '渔翁得利', '职场宫斗', '规则破解'],
    '绝地反杀类': ['绝境逃脱', '极限反杀', '逆风翻盘', '反杀小人'],
    '直播爽感类': ['直播打脸', '弹幕封神', '反向带货', '花式怼粉', '黑料澄清'],
    '玄学爽感类': ['开卦算命', '风水改运', '驱邪破煞', '功德加身', '预知吉凶'],
    '年代逆袭类': ['信息差赚钱', '薅集体羊毛', '打脸极品亲戚', '返城创业', '囤货致富'],
    '规则怪谈类': ['破解规则', '戏耍NPC', '极限逃生', '副本通关', '卡bug刷分'],
  };
  for (const [type, keywords] of Object.entries(typeMap)) {
    if (keywords.some(kw => coreShuangdian.includes(kw))) return type;
  }
  return '装逼打脸类';
}

function matchGoldFingerPerception(coreShuangdian: string): { perception: string; strategy: string } {
  const perceptionMap: Record<string, { keywords: string[]; perception: string; strategy: string }[]> = {
    '显性-隐忍': [
      { keywords: ['扮猪吃虎', '实力碾压', '幕后大佬', '挥金如土', '万千宠爱', '一呼百应', '收服帮派', '力挽狂澜', '英雄救美', '拯救公司', '解救家人', '劫富济贫'], perception: '显性-隐忍', strategy: 'A' },
      { keywords: ['预判对手', '渔翁得利', '职场宫斗', '大仇得报', '诛杀坏人', '反向PUA', '信息差赚钱', '薅集体羊毛', '打脸极品亲戚', '返城创业', '囤货致富'], perception: '显性-隐忍', strategy: 'D' },
    ],
    '隐性': [
      { keywords: ['天赋异禀', '不按常理', '无心插柳', '一夜暴富', '因祸得福'], perception: '隐性', strategy: 'B' },
    ],
    '显性-系统': [
      { keywords: ['直播打脸', '弹幕封神', '反向带货', '花式怼粉', '黑料澄清', '破解规则', '戏耍NPC', '极限逃生', '副本通关', '卡bug刷分'], perception: '显性-系统', strategy: 'C' },
    ],
    '半显性': [
      { keywords: ['开卦算命', '风水改运', '驱邪破煞', '功德加身', '预知吉凶', '慧眼识珠', '偷听秘闻'], perception: '半显性', strategy: 'B' },
    ],
  };
  for (const entries of Object.values(perceptionMap)) {
    for (const entry of entries) {
      if (entry.keywords.some(kw => coreShuangdian.includes(kw))) {
        return { perception: entry.perception, strategy: entry.strategy };
      }
    }
  }
  return { perception: '显性-隐忍', strategy: 'A' };
}

// ====================== 【导出类】======================
export class GeminiService {
  private settings: any = null;
  private outline: any = null;

  // ==================== 方法1：分析原著 ====================
  async analyzeNovel(novel: string): Promise<string> {
    const prompt = `
你是专业短剧编剧AI。分析以下原著小说，提取骨架信息并判定最适合的改编方向。

${SHUANGDIAN_LIBRARY}
${SUB_GENRE_RULES}
${GOLD_FINGER_FRAMEWORK}

原著内容（节选）：
${novel.slice(0, 8000)}

请输出详细的分析报告（纯文本，不需要JSON），包含：

## 一、原著骨架提取
1. 核心人物关系图（主角、女主、反派、配角及关系）
2. 核心冲突主线（一句话概括）
3. 主角的底层动机（为什么而战）
4. 原著中最有爽感潜力的3个情节点

## 二、流派判定
1. 最适合的子流派（从子流派规则表中选）
2. 判定依据
3. 推荐的核心爽梗（从S级爽点库中选1个最核心的）
4. 推荐的辅助爽梗（2个）

## 三、金手指设计建议
1. 推荐金手指类型及感知维度
2. 量化描述建议（必须具体到数字/级别）
3. 透底形式建议
4. 隐忍理由建议（如适用）

## 四、魔改方向建议
1. 原著中需要保留的核心骨架（不可改动的部分）
2. 需要强化/魔改的部分（让爽感更强）
3. 需要删减的部分（拖节奏的内容）
4. 建议新增的爽点元素

## 五、终极钩子建议
1. 推荐的终极钩子（明确的二元悬念）
2. 观众追到底要看的是什么

请直接输出分析报告，语言专业但易懂。
`;

    const result = await callLLM(prompt, false);
    return result;
  }

  // ==================== 方法2：生成大纲 ====================
  async generateOutline(novel: string, analysisReport: string): Promise<string> {
    // 步骤1：生成基础设定
    const settingsPrompt = `
你是短剧编剧AI。根据原著分析报告，生成短剧基础设定。

${SHUANGDIAN_LIBRARY}
${SUB_GENRE_RULES}
${GOLD_FINGER_FRAMEWORK}
${EPISODE_1_STRATEGIES}

原著内容（节选）：
${novel.slice(0, 5000)}

分析报告：
${analysisReport}

请输出JSON，包含以下字段：
{
  "title": "短剧标题",
  "genre": "子流派",
  "core_shuangdian": "核心爽梗",
  "auxiliary_shuangdian": ["辅助爽梗1", "辅助爽梗2"],
  "shuangdian_type": "爽梗大类",
  "gold_finger": {
    "type": "金手指类型",
    "perception": "感知维度",
    "form": "存在形式",
    "action": "作用方式",
    "quantified_description": "量化描述",
    "reveal_method": "透底形式",
    "hide_reason": "隐忍理由"
  },
  "episode_1_strategy": "开场策略（A/B/C/D）",
  "protagonist": {
    "name": "主角姓名",
    "surface_identity": "表面身份",
    "true_identity": "真实底牌",
    "personality_tags": ["性格1", "性格2", "性格3"],
    "signature_actions": ["动作1", "动作2"],
    "catchphrase": "口头禅",
    "bottom_line": "底线"
  },
  "female_lead": {
    "name": "女主姓名",
    "relationship": "与主角关系",
    "personality": "性格特点"
  },
  "main_villain": {
    "name": "主反派姓名",
    "motivation": "具体利益动机",
    "escalation_path": "手段升级路径"
  },
  "mockers": [
    {
      "name": "嘲讽者姓名",
      "identity": "身份",
      "signature_taunt": "标志性嘲讽台词",
      "face_slap_episode": "被打脸集数",
      "face_slap_method": "打脸方式"
    }
  ],
  "ultimate_hook": "终极钩子",
  "setting_summary": "一句话概括设定"
}
`;

    this.settings = await callLLM(settingsPrompt);
    this.settings.shuangdian_type = matchShuangdianType(this.settings.core_shuangdian);
    const gfMatch = matchGoldFingerPerception(this.settings.core_shuangdian);
    this.settings.gold_finger.perception = gfMatch.perception;
    this.settings.episode_1_strategy = gfMatch.strategy;

    // 步骤2：生成10集大纲
    const outlinePrompt = `
你是短剧编剧AI。根据基础设定，生成10集大纲。

${GLOBAL_TOP_RULES}
${SHUANG_CURVE_RULES}
${PER_EPISODE_ENGINE}
${SHUANGDIAN_EXEC_RULES}

基础设定：
${JSON.stringify(this.settings, null, 2)}

爽感曲线：第1集★★★→第2集★★→第3集★★→第4集★→第5集☆→第6集★★★→第7集★★★★→第8集★★★★★→第9集★★→第10集★★★

请输出JSON：
{
  "outline": [
    {
      "episode": 1,
      "engine": "引擎名称",
      "title": "集标题",
      "shuang_level": "★数量",
      "protagonist_action_count": 0,
      "conflict_level": "冲突梯度层级",
      "core_conflict": "核心冲突",
      "key_scenes": ["场景1", "场景2", "场景3"],
      "info_gap_status": "信息差状态",
      "dark_line_status": "暗线状态",
      "mocker_activity": "嘲讽者动态",
      "hook_type": "钩子类型",
      "hook_content": "钩子内容",
      "foreshadowing_plant": ["伏笔"],
      "foreshadowing_payoff": ["回收"]
    }
  ],
  "dark_line_detail": {
    "ep4_action": "",
    "ep5_progress": "",
    "ep6_partial_use": "",
    "ep7_full_reveal": "",
    "audience_realization": ""
  },
  "face_slap_map": [
    {
      "mocker_name": "",
      "taunt_episode": "",
      "taunt_line": "",
      "slap_episode": "",
      "slap_method": "",
      "callback_line": ""
    }
  ]
}
`;

    this.outline = await callLLM(outlinePrompt);

    // 组装输出文本
    let output = `# 📋 《${this.settings.title}》基础设定\n\n`;
    output += `子流派：${this.settings.genre}\n`;
    output += `核心爽梗：${this.settings.core_shuangdian}（${this.settings.shuangdian_type}）\n`;
    output += `金手指：${this.settings.gold_finger.type}（${this.settings.gold_finger.perception}）\n`;
    output += `量化描述：${this.settings.gold_finger.quantified_description}\n`;
    output += `开场策略：${this.settings.episode_1_strategy}\n`;
    output += `终极钩子：${this.settings.ultimate_hook}\n`;
    output += `主角：${this.settings.protagonist.name}（表面：${this.settings.protagonist.surface_identity}，真实：${this.settings.protagonist.true_identity}）\n`;
    output += `口头禅：${this.settings.protagonist.catchphrase}\n`;
    output += `女主：${this.settings.female_lead.name}（${this.settings.female_lead.personality}）\n`;
    output += `主反派：${this.settings.main_villain.name}（${this.settings.main_villain.motivation}）\n\n`;

    output += `## 嘲讽者\n`;
    (this.settings.mockers || []).forEach((m: any) => {
      output += `- ${m.name}："${m.signature_taunt}" → 第${m.face_slap_episode}集打脸\n`;
    });

    output += `\n# 📺 10集大纲\n\n`;
    (this.outline.outline || []).forEach((ep: any) => {
      output += `## 第${ep.episode}集 ${ep.title}  [${ep.engine}] ${ep.shuang_level}\n`;
      output += `冲突层级：${ep.conflict_level} | 出手次数：${ep.protagonist_action_count}\n`;
      output += `核心冲突：${ep.core_conflict}\n`;
      output += `关键场景：${(ep.key_scenes || []).join(' → ')}\n`;
      output += `信息差：${ep.info_gap_status}\n`;
      output += `暗线：${ep.dark_line_status}\n`;
      output += `嘲讽者：${ep.mocker_activity}\n`;
      output += `钩子：${ep.hook_type} — ${ep.hook_content}\n\n`;
    });

    if (this.outline.dark_line_detail) {
      output += `## 暗线详情\n`;
      output += `第4集：${this.outline.dark_line_detail.ep4_action}\n`;
      output += `第5集：${this.outline.dark_line_detail.ep5_progress}\n`;
      output += `第6集：${this.outline.dark_line_detail.ep6_partial_use}\n`;
      output += `第7集：${this.outline.dark_line_detail.ep7_full_reveal}\n`;
      output += `观众恍然大悟：${this.outline.dark_line_detail.audience_realization}\n`;
    }

    return output;
  }

  // ==================== 方法3：生成剧本 ====================
  async generateScripts(
    outlineText: string,
    phase: number,
    novel: string,
    formattingRef?: string
  ): Promise<string> {
    if (!this.settings || !this.outline) {
      throw new Error('请先完成分析和大纲生成');
    }

    const allScripts: string[] = [];
    const startEp = (phase - 1) * 10 + 1;
    const endEp = phase * 10;

    for (let ep = startEp; ep <= endEp; ep++) {
      const epOutline = (this.outline.outline || []).find((e: any) => e.episode === ep);
      if (!epOutline) continue;

      let previousSummary = '';
      if (allScripts.length > 0) {
        previousSummary = `上一集剧本结尾：\n...${allScripts[allScripts.length - 1].slice(-200)}`;
      }

      let specialRules = '';
      if (ep <= 3) specialRules = FIRST_3_EPISODES_RULES;
      if (ep === 1) specialRules += '\n' + EPISODE_1_STRATEGIES;

      let darkLineContext = '';
      if (ep >= 4 && ep <= 7 && this.outline.dark_line_detail) {
        darkLineContext = `
暗线详情：
- 第4集：${this.outline.dark_line_detail.ep4_action}
- 第5集：${this.outline.dark_line_detail.ep5_progress}
- 第6集：${this.outline.dark_line_detail.ep6_partial_use}
- 第7集：${this.outline.dark_line_detail.ep7_full_reveal}
`;
      }

      let faceSlipContext = '';
      if ((ep === 7 || ep === 8) && this.outline.face_slap_map) {
        const relevantSlaps = this.outline.face_slap_map.filter((fs: any) => {
          const slapEp = String(fs.slap_episode).replace(/[^0-9]/g, '');
          return slapEp === String(ep);
        });
        if (relevantSlaps.length > 0) {
          faceSlipContext = `本集打脸：\n${relevantSlaps.map((fs: any) => `- ${fs.mocker_name}：原话"${fs.taunt_line}" → 回扣："${fs.callback_line}"`).join('\n')}`;
        }
      }

      const formatRef = formattingRef ? `\n排版参考：\n${formattingRef.slice(0, 1000)}\n请严格模仿以上排版格式。` : '';

      const prompt = `
你是短剧编剧。根据大纲写第${ep}集剧本。

${GLOBAL_TOP_RULES}
${SCRIPT_FORMAT_EXAMPLE}
${specialRules}
${ANTI_BUG_RULES}
${formatRef}

基础设定：
- 标题：${this.settings.title}
- 主角：${this.settings.protagonist.name}（表面：${this.settings.protagonist.surface_identity}，真实：${this.settings.protagonist.true_identity}）
- 性格：${(this.settings.protagonist.personality_tags || []).join('、')}
- 标志性动作：${(this.settings.protagonist.signature_actions || []).join('、')}
- 口头禅：${this.settings.protagonist.catchphrase}
- 金手指：${this.settings.gold_finger.quantified_description}（${this.settings.gold_finger.perception}）
- 女主：${this.settings.female_lead.name}（${this.settings.female_lead.personality}）
- 主反派：${this.settings.main_villain.name}（${this.settings.main_villain.motivation}）
- 嘲讽者：${(this.settings.mockers || []).map((m: any) => `${m.name}（"${m.signature_taunt}"，第${m.face_slap_episode}集打脸）`).join('；')}

第${ep}集大纲：
- 引擎：${epOutline.engine}
- 爽感：${epOutline.shuang_level}
- 出手次数：${epOutline.protagonist_action_count}
- 冲突层级：${epOutline.conflict_level}
- 核心冲突：${epOutline.core_conflict}
- 场景：${(epOutline.key_scenes || []).join(' → ')}
- 信息差：${epOutline.info_gap_status}
- 暗线：${epOutline.dark_line_status}
- 嘲讽者：${epOutline.mocker_activity}
- 钩子：${epOutline.hook_type} — ${epOutline.hook_content}
- 埋伏笔：${(epOutline.foreshadowing_plant || []).join('、') || '无'}
- 收伏笔：${(epOutline.foreshadowing_payoff || []).join('、') || '无'}

${darkLineContext}
${faceSlipContext}
${previousSummary}

⚠️ 硬性要求：
1. 字数500-700字
2. 标准竖屏短剧格式：场景头+△动作+角色名：台词
3. 台词口语化短句有个性
4. 主角出手${epOutline.protagonist_action_count}次
5. 结尾在"${epOutline.hook_content}"最刺激瞬间△黑幕
${ep === 8 ? '6. 高潮集！打脸回扣原话！碾压彻底！旁观者至少3层！' : ''}
${ep === 7 ? '6. 暗线引爆！反转回扣第4-5集伏笔！' : ''}

直接输出剧本正文。
`;

      const script = await callLLM(prompt, false);
      allScripts.push(`${'─'.repeat(40)}\n第${ep}集\n${'─'.repeat(40)}\n\n${script}`);

      if (ep < endEp) {
        await delay(DELAY_BETWEEN_EPISODES);
      }
    }

    return allScripts.join('\n\n');
  }
}
