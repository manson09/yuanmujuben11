# ====================== 【用户配置区，只需改这里】======================
# OpenRouter API Key 申请地址：https://openrouter.ai/keys
OPENAI_API_KEY = "你的OpenRouter_API_KEY"
# OpenRouter 官方固定请求地址（如果使用 Cloudflare AI Gateway，请替换为你的网关地址）
OPENAI_BASE_URL = "https://openrouter.ai/api/v1"
# 模型名：需要在 OpenRouter 上存在的模型，比如性价比高的 claude-3-haiku 或 gpt-4o-mini
MODEL_NAME = "anthropic/claude-3-haiku" 
# 调用失败最大重试次数
MAX_RETRY = 3
# ======================================================================

import os
import json
import time
import openai
from tenacity import retry, stop_after_attempt, wait_random_exponential, retry_if_exception_type

# 配置校验，避免用户忘记填API_KEY直接报错
if "你的OpenRouter" in OPENAI_API_KEY:
    raise ValueError("⚠️ 请先去 OpenRouter 平台申请 API_KEY，填到配置区的 OPENAI_API_KEY 位置！")

# 初始化大模型客户端
client = openai.OpenAI(
    api_key=OPENAI_API_KEY,
    base_url=OPENAI_BASE_URL,
    default_headers={
        # OpenRouter 官方建议携带以下两个 Header，用于在其排行榜上识别你的应用（可选）
        "HTTP-Referer": "https://your-cloudflare-worker-url.com", # 建议替换为你的 Cloudflare 部署域名
        "X-Title": "Novel to Script Auto Generator",             
    }
)

# ---------------------- 全局规则常量（可自行扩展）----------------------
# 1. 全局最高优先级规则（短剧生成用，100%执行）
GLOBAL_TOP_RULES = """
## 🔝 全局最高优先级规则（所有流程必须严格遵守，优先级高于其他所有规则）
### 🎯 强制新增规则（必须100%执行）
1. 【强制金手指规则】
   无论原著是否有金手指/穿越设定，必须给主角二选一强加金手指：
   - 选项1：穿越者身份（自带信息差/先知优势，比如穿越回10年前知道房价走势、穿越到古代知道历史走向）
   - 选项2：系统金手指（适配核心爽点类型，比如爽点是慧眼识珠就加鉴宝系统，爽点是扮猪吃虎就加战力检测系统）
   ✅ 金手指定位：仅作为给观众透底的铺垫工具，严格遵守各爽点的金手指使用边界，仅可在约定的铺垫阶段出现1次，绝对不抢核心爽梗的风头，禁止中途乱跳出来刷存在感
2. 【爽感优先魔改规则】
   无需贴合原著剧情，可自由魔改、加冲突、加反派、加爽点，只要保留主角核心人设（比如废柴/赘婿/战神）和核心钩子即可，所有改编以「爽」为第一标准，不需要遵守原著剧情走向
---
### 原有强制规则
### 一、前三集强制规则（不可修改）
1. 第1集强制要求：
   - 开篇3秒必须出强冲突画面（比如主角被押上斩仙台、反派甩离婚协议、女儿被踩在脚下），无冗余铺垫
   - 10秒内出核心矛盾：通过反派台词/旁白带出主角绝境
   - 30秒内完成2个动作：① 抛出全剧终极钩子 ② 仅给观众透底1次核心爽梗的前置信息（强制加的金手指/底牌，仅观众可见，剧内角色不知情），给足安全感
   - 核心爽梗仅做前置铺垫，不释放，禁止插入无关爽点
2. 第2集强制要求：
   - 全程围绕「强化反派/冲突压迫感+烘托大众对主角的轻视/绝境的严重性」走，拉满观众期待值
   - 必须展示核心冲突的严重性（比如反派硬实力、宝物稀缺性、绝境危险度），禁止空口装逼
   - 必须出现对应立场的旁观者，拉满氛围
   - 不释放核心爽点，仅做铺垫
3. 第3集强制要求：
   - 结尾必须留爆炸级钩子，直接关联全剧终极钩子，不能留小悬念
   - 钩子必须停在最极致的临界点（比如反派刀架在主角脖子上、宝物马上要被抢走），戛然而止
   - 可以有小反转，但绝对不释放核心大爽点
### 二、爽梗唯一原则
- 单段剧情/单集仅允许1个S级核心爽梗，其余所有元素（金手指、支线、配角）仅可作为铺垫工具，核心爽梗占比≥80%，辅助元素占比≤20%，绝对不能喧宾夺主
- 辅助元素（比如金手指）仅可在约定的铺垫阶段出现，不能抢核心爽梗的风头
### 三、钩子优先级原则
- 全剧终极钩子 > 10集阶段钩子 > 单集钩子，全剧终极钩子每10集至少强化1次，每集结尾必须留单集钩子，绝不允许断钩
"""

# 2. 8大类31小类爽点库（短剧生成用）
SHUANGDIAN_LIBRARY = """
## 📚 可选S级核心爽点库（必须从以下分类中选择，禁止自定义）
1. 装逼打脸类：扮猪吃虎 / 实力碾压 / 解决难题 / 上帝视角 / 万千宠爱 / 一呼百应 / 幕后大佬 / 挥金如土 / 天赋异禀 / 不按常理
2. 荣获至宝类：夺宝奇兵 / 慧眼识珠 / 神器认主 / 收服帮派
3. 意外之喜类：无心插柳 / 一夜暴富 / 偷听秘闻 / 因祸得福
4. 惩戒恶人类：大仇得报 / 诛杀坏人 / 劫富济贫
5. 人格魅力类：持之以恒 / 认祖归宗 / 重情重义 / 知恩图报
6. 拯救危难类：力挽狂澜 / 英雄救美
7. 智商碾压类：预判对手 / 渔翁得利
8. 绝地反杀类：绝境逃脱 / 极限反杀
"""

# 3. 子流派规则表（短剧生成用）
SUB_GENRE_RULES = """
## 🎭 子流派专属规则（对应流派必须严格遵守）
| 子流派 | 专属钩子规则 | 专属爽梗规则 |
|--------|--------------|--------------|
| 玄幻修仙 | 全剧终极钩子必须绑定「生死危机/终极复仇」，比如「被挖灵根的废柴，能不能在仙门大会上反杀仇人飞升？」；每10集阶段钩子绑定「越阶挑战/秘境夺宝」 | 核心爽梗金手指（混沌体/老爷爷/系统）仅可提前给观众透底1次，打脸必须主角自己出手，禁止代打 |
| 都市赘婿 | 全剧终极钩子必须绑定「身份揭晓/复仇」，比如「隐藏3年的首富继承人，能不能在妻子被赶出家门时反杀所有看不起他的人？」；每10集阶段钩子绑定「妻女受辱→反杀」 | 身份底牌仅可在打脸最高潮揭晓，之前必须把嘲讽拉满 |
| 战神归来 | 全剧终极钩子必须绑定「护妻护女/复仇」，比如「消失5年的战神，能不能在女儿被拐卖前反杀所有仇家？」；每10集阶段钩子绑定「家人受辱→反杀」 | 战力/身份仅可提前给观众透底1次，禁止直接喊手下上场，必须先装弱再打脸 |
| 都市异能 | 全剧终极钩子必须绑定「异能暴露/拯救危机」，比如「有读心术的职员，能不能在公司破产前揪出内奸？」；每10集阶段钩子绑定「异能隐藏→解决危机」 | 异能仅可提前给观众透底1次，爽点突出信息差反差 |
| 穿越历史 | 全剧终极钩子必须绑定「改变命运/夺嫡/救国」，比如「穿越成废太子的现代人，能不能在3个月后的废储大典上保住皇位？」；每10集阶段钩子绑定「朝堂危机→打脸政敌」 | 现代知识/历史记忆仅可提前给观众透底1次，爽点突出知识差 |
| 校园爽文 | 全剧终极钩子必须绑定「逆袭考学/打脸校霸」，比如「常年倒数的学渣，能不能在高考时考上清北反杀所有人？」；每10集阶段钩子绑定「考试/比赛→打脸」 | 金手指（过目不忘/系统）仅可提前给观众透底1次，爽点突出学渣→学霸的反差 |
"""

# 4. 各爽点大类专属执行规则（短剧生成用）
SHUANGDIAN_EXEC_RULES = """
## ⚙️ 爽点专属执行规则（对应爽点类型必须严格遵守）
### 1. 装逼打脸类（核心：反差感）
- 核心要求：所有内容围绕「别人看不起主角→主角用实力/身份打脸」走，爽感100%集中在主角反差高光
- 金手指边界：仅可在铺垫阶段向观众透底1次（比如系统提示【宿主是当朝太傅，在场官员品级都比你低】/ 穿越者提示【你知道这个反派下个月就要倒台】），仅此1次，后续全程隐身；禁止打脸过程中弹提示、给buff、替主角打脸
- 铺垫要求：先铺垫他人的轻视/嘲讽→主角可故意示弱放大反差→打脸瞬间干脆利落，跟上全场震惊反应
- 禁入内容：禁止中途插入得宝、升级、无关支线
### 2. 荣获至宝类（核心：价值感）
- 核心要求：所有内容围绕「宝物有多稀有→主角得到它的爽感」走，爽感100%集中在得宝本身
- 金手指边界：仅可在宝物出现时向观众透底1次价值（比如系统提示【这是上古混沌钟，可秒杀金丹】/ 穿越者提示【你知道这块石头里有千年暖玉】），仅此1次；禁止得宝过程中弹其他奖励、直接把宝物塞给主角
- 铺垫要求：先铺垫宝物的稀缺性（所有人抢破头/不识货）→得宝瞬间给特写→跟上旁人嫉妒/震惊反应
- 禁入内容：禁止中途插入反派挑衅、打脸、无关支线
### 3. 意外之喜类（核心：惊喜感）
- 核心要求：所有内容围绕「主角没抱希望→突然得到远超预期的收获」走，爽感100%集中在意外收获瞬间
- 金手指边界：仅可在收获揭晓时出现1次明确价值，仅此1次；禁止提前剧透收获，破坏意外感
- 铺垫要求：先铺垫「这件事没好处/倒霉」→揭晓收获时先给旁人震惊反应，再亮价值
- 禁入内容：禁止提前透底、插入其他爽点
### 4. 惩戒恶人类（核心：宣泄感）
- 核心要求：所有内容围绕「恶人有多坏→得到应有的惩罚」走，爽感100%集中在恶人受罚瞬间
- 金手指边界：仅可在铺垫阶段向观众透底1次主角有惩罚恶人的能力，仅此1次；禁止金手指直接替主角惩罚
- 铺垫要求：先铺垫恶人的恶行（欺负弱小/有前科）→惩罚够解气→跟上受害者拍手称快反应
- 禁入内容：禁止中途插入得宝、升级、洗白恶人
### 5. 人格魅力类（核心：认同感）
- 核心要求：所有内容围绕「主角坚持品格→最终得到认可/回报」走，爽感100%集中在主角品格高光
- 金手指边界：仅可在最终认可时出现1次明确回报价值，仅此1次；禁止金手指引导主角做选择
- 铺垫要求：先铺垫主角的困境（所有人劝他放弃/走捷径）→最终得到认可时跟上质疑者的愧疚/敬佩反应
- 禁入内容：禁止中途插入打脸、得宝等爽点
### 6. 拯救危难类（核心：成就感）
- 核心要求：所有内容围绕「危难有多严重→主角出手拯救」走，爽感100%集中在拯救高光瞬间
- 金手指边界：仅可在铺垫阶段向观众透底1次主角有能力解决危难，仅此1次；禁止金手指直接解决危难
- 铺垫要求：先铺垫危难的严重性（所有人束手无策/死伤惨重）→主角出手干脆利落→跟上所有人感激/崇拜反应
- 禁入内容：禁止中途插入反派挑衅、得宝等无关内容
### 7. 智商碾压类（核心：智力优越感）
- 核心要求：所有内容围绕「对手耍诡计→主角早有预判反坑对手」走，爽感100%集中在主角智商高光
- 金手指边界：仅可在铺垫阶段向观众透底1次主角有预判，仅此1次；禁止金手指直接给答案/证据
- 铺垫要求：先铺垫对手诡计的毒辣（所有人都被骗了）→拆穿时层层递进→跟上对手破防反应
- 禁入内容：禁止中途插入武力打脸、得宝等内容，必须突出智商优势
### 8. 绝地反杀类（核心：刺激感）
- 核心要求：所有内容围绕「主角陷入必死绝境→极限翻盘反杀」走，爽感100%集中在反杀瞬间
- 金手指边界：仅可在绝境铺垫阶段向观众透底1次主角有最后底牌，仅此1次；禁止金手指中途给buff/救场
- 铺垫要求：先铺垫绝境的绝望感（刀架脖子/所有人觉得他死定了）→反杀瞬间快狠准→跟上对手难以置信的反应
- 禁入内容：禁止中途插入第三方救场、得宝等内容
"""

# 5. 2024年热门网文流派分类（打标签/生成开篇用，可自行增删）
CATEGORY_LIST = {
    "男频热门": [
        "诡异怪谈", "规则类怪谈", "克苏鲁",
        "系统流", "签到系统", "盘点系统", "万界剧透",
        "诸天无限流", "副本闯关", "快穿任务",
        "都市新流派", "天师直播", "神豪", "鉴宝捡漏", "职场逆袭", "异能复苏",
        "历史脑洞", "穿朝代搞建设", "历史聊天群", "男频科举",
        "科幻废土", "深空航海", "赛博朋克", "星际殖民",
        "玄幻新流派", "模拟器修仙", "修仙搞科研", "万相流"
    ],
    "女频热门": [
        "穿书马甲文", "炮灰逆袭", "团宠万人迷", "反派洗白",
        "年代文", "八零九零搞事业", "知青逆袭", "囤货流",
        "古言权谋", "女扮男装科举", "宅斗", "宫斗", "嫡女逆袭",
        "现言爽文", "重生复仇", "娱乐圈顶流", "双向暗恋", "甜宠虐渣",
        "仙侠女强", "医妃毒妃", "仙途升级"
    ],
    "泛品类": [
        "短剧情感", "反转小故事", "脑洞怪谈",
        "末世囤货", "无限流小副本", "玄学科普",
        "二次元同人", "综漫", "轻小说"
    ]
}

# ---------------------- 通用工具函数 ----------------------
@retry(
    stop=stop_after_attempt(MAX_RETRY),
    wait=wait_random_exponential(multiplier=1, max=10),
    retry=retry_if_exception_type((openai.APIError, openai.APIConnectionError, openai.RateLimitError))
)
def call_llm(prompt: str, output_json: bool = True) -> dict | str:
    """通用大模型调用函数，支持重试和格式校验"""
    try:
        response = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.9,
            response_format={"type": "json_object"} if output_json else None
        )
        content = response.choices[0].message.content.strip()
        
        if output_json:
            return json.loads(content)
        return content
    except openai.AuthenticationError:
        raise ValueError("⚠️ API_KEY 错误，请检查 OpenRouter 密钥是否正确！")
    except openai.NotFoundError:
        raise ValueError("⚠️ 模型未找到，请检查填写的 MODEL_NAME 在 OpenRouter 上是否存在或拼写正确！")
    except Exception as e:
        print(f"调用出错：{e}，重试中...")
        time.sleep(2)
        raise e

# ---------------------- 功能1：网文自动打流派标签 ----------------------
def get_novel_category(novel_content: str) -> str:
    """给输入的网文片段自动匹配最新的流派标签"""
    prompt = f"""
    你是专业的网文分类编辑，参考以下最新的网文流派分类，给下面的网文内容打上最匹配的1-3个标签，只输出标签，用顿号分隔。
   
    可选分类：{str(CATEGORY_LIST)}
    
    网文内容：{novel_content[:1500]}
    """
    return call_llm(prompt, output_json=False)

# ---------------------- 功能2：生成指定流派网文开篇 ----------------------
def generate_novel_opening(category: str, word_count: int = 1000) -> str:
    """根据指定流派生成对应风格的网文开篇"""
    prompt = f"""
    你是资深网文作者，写一篇{category}流派的网文开篇，要求有钩子、符合该流派的爽点，字数{word_count}字左右，不要写老套过时的内容。
    """
    return call_llm(prompt, output_json=False)

# ---------------------- 功能3：网文转竖屏短剧全流程 ----------------------
def analyze_novel(novel_content: str) -> dict:
    """第一阶段：分析小说原文，提取结构化核心骨架，自动加金手指"""
    prompt = f"""
    {GLOBAL_TOP_RULES}
    {SHUANGDIAN_LIBRARY}
    {SUB_GENRE_RULES}
    
    【任务】
    基于输入的小说内容提炼核心卖点，可自由魔改，爽感优先，必须给主角强加穿越/系统金手指二选一，输出标准化的小说核心骨架。
    【输出要求（必须严格按照JSON格式输出，不要有多余内容）】
 
    {{
        "base_info": {{
            "book_name": "书名，可魔改得更有爽感",
            "core_genre": "男频/女频",
            "sub_genre": "从子流派规则表中选对应标签，最多3个",
            "protagonist": "主角姓名+身份+核心性格+隐藏底牌，必须包含强制加的穿越/系统金手指",
            "gold_finger": "强制加的金手指类型+能力+触发条件，明确使用边界（仅铺垫阶段出现1次）",
            "final_boss": "最终BOSS姓名+身份+核心战力+和主角的核心仇恨，可魔改得更嚣张更坏",
          
            "final_goal": "主角最终要完成的终极目标，可魔改得更有爽感"
        }},
        "ultimate_hook": {{
            "content": "全剧终极二元悬念，必须是明确的是非疑问，比如「被打入斩仙台的废仙，能不能在3日问斩前反杀所有众神？」，禁止模糊表述",
            "strengthen_nodes": ["第10集强化内容", "第20集强化内容", "...每10集1个"]
        }},
        "shuangdian_tags": [
            {{
                "episode_range": "爽点对应的集数范围，比如1-5集",
      
                "core_shuangdian": "从爽点库中选1个S级核心爽点",
                "forbidden_elements": ["该爽点的禁入元素，比如频繁系统提示、无关支线"],
                "gold_finger_boundary": "金手指的使用边界，比如仅在第1集铺垫阶段出现1次"
            }}
        ],
        "sub_genre_rules": "对应子流派的专属钩子+爽梗规则，从子流派规则表中提取"
    }}
    
    【校验规则】
    1. 必须给主角强加穿越/系统金手指二选一，没有则直接重写
    2. 终极钩子必须符合要求，不能模糊
    
    3. 核心爽点必须从给定的爽点库中选择，禁止自定义
    4. 所有字段不能为空，缺项直接重写
    
    【输入的小说内容】：
    {novel_content[:10000]}
    """
    return call_llm(prompt, output_json=True)

def generate_outline(novel_skeleton: dict, unit_num: int = 1) -> dict:
    """第二阶段：基于小说骨架生成分集大纲"""
    unit_start = (unit_num - 1) * 10 + 1
    unit_end = unit_num * 10
    prompt = f"""
    {GLOBAL_TOP_RULES}
    {SHUANGDIAN_LIBRARY}
    {SHUANGDIAN_EXEC_RULES}
    子流派规则：{novel_skeleton['sub_genre_rules']}
    
    【基础信息】
    全剧终极钩子：{novel_skeleton['ultimate_hook']['content']}
    本单元对应集数：{unit_start}-{unit_end}集
  
    本单元核心爽点：从以下爽点标签中匹配对应集数的爽点：{json.dumps(novel_skeleton['shuangdian_tags'], ensure_ascii=False)}
    强制金手指：{novel_skeleton['base_info']['gold_finger']}
    
    【任务】
    生成符合竖屏短剧要求的10集单元大纲，可自由魔改剧情、加冲突、加反派，爽感优先，无需拘泥原著细节。
    【输出要求（必须严格按照JSON格式输出，不要有多余内容）】
    {{
        "unit_base_info": {{
            "unit_num": {unit_num},
            "episode_range": "{unit_start}-{unit_end}集",
            "stage_goal": "本单元主角要完成的核心任务，可魔改得更有爽感",
            "stage_hook": "本单元的核心阶段悬念，比如「主角能不能在家族大考上拿到第一？」",
            
            "core_shuangdian": "本单元的S级核心爽点，从爽点库中选1个",
            "core_villain": "本单元核心反派的战力/智商/势力优势，必须足够强、足够坏，能和主角拉扯3回合以上，可魔改得更嚣张",
            "bystanders": ["踩主角的人群", "同情主角的人群", "看热闹的人群"]
        }},
        "episode_outlines": [
            {{
                "episode_num": 1,
                "core_plot": "30字以内概括本集核心剧情，可魔改加冲突",
        
                "single_hook": "本集结尾的单集悬念，必须停在冲突临界点",
                "shuangdian_padding": "本集对应的爽点铺垫内容，没有则填无",
                "ultimate_hook_strengthen": "本集是否强化全剧终极钩子，强化内容是什么，没有则填无"
            }}
            // 共10集，格式同上
        ]
    }}
    
    【校验规则】
    1. 必须有三层钩子：全剧终极钩子每10集至少强化1次，本单元有阶段钩子，每集有单集结尾钩子
    2. 核心爽点占比≥80%，辅助元素不越界，没有双核心爽点
  
    3. 反派足够强、足够坏，有明确的旁观者阵营
    4. 严格遵守对应子流派和爽点的专属规则，金手指不越界
    """
    return call_llm(prompt, output_json=True)

def generate_single_script(novel_skeleton: dict, episode_outline: dict, core_shuangdian: str) -> str:
    """第三阶段：基于单集大纲生成最终的竖屏短剧脚本"""
    # 自动匹配爽点大类规则
    shuangdian_type = ""
    if any(i in core_shuangdian for i in ["扮猪吃虎", "实力碾压", "幕后大佬", "挥金如土", "天赋异禀", "不按常理", "万千宠爱", "一呼百应", "解决难题", "上帝视角"]):
        shuangdian_type = "装逼打脸类"
    elif any(i in core_shuangdian for i in ["夺宝奇兵", "慧眼识珠", "神器认主", "收服帮派"]):
        shuangdian_type = "荣获至宝类"
    elif any(i in core_shuangdian for i in ["无心插柳", "一夜暴富", "偷听秘闻", "因祸得福"]):
        shuangdian_type = "意外之喜类"
    elif any(i in core_shuangdian for i in ["大仇得报", "诛杀坏人", "劫富济贫"]):
        shuangdian_type = "惩戒恶人类"
    elif any(i in core_shuangdian for i in ["持之以恒", "认祖归宗", "重情重义", "知恩图报"]):
        shuangdian_type = "人格魅力类"
    elif any(i in core_shuangdian for i in ["力挽狂澜", "英雄救美"]):
        shuangdian_type = "拯救危难类"
    elif any(i in core_shuangdian for i in ["预判对手", "渔翁得利"]):
        shuangdian_type = "智商碾压类"
    elif any(i in core_shuangdian for i in ["绝境逃脱", "极限反杀"]):
        shuangdian_type = "绝地反杀类"
    
    prompt = f"""
    {GLOBAL_TOP_RULES}
    {SHUANGDIAN_EXEC_RULES}
    本集核心爽点类型：{shuangdian_type}，核心爽点：{core_shuangdian}
    对应子流派规则：{novel_skeleton['sub_genre_rules']}
    全剧终极钩子：{novel_skeleton['ultimate_hook']['content']}
    强制金手指：{novel_skeleton['base_info']['gold_finger']}
    
    【任务】
    基于单集大纲生成1-2分钟的竖屏短剧脚本，300-500字，节奏快、冲突强、爽感足，可自由加细节加台词，不需要拘泥原著。
    【格式要求】
    严格按照以下格式输出，不要有多余内容：
    ### 第X集
    【场景】：一句话说明场景，比如「斩仙台 日 外」
   
    【画面】：分点描述画面，聚焦人物上半身/表情，每3秒一个小冲突点，适配竖屏
    【台词】：对应画面的人物台词，短句为主，无长句、无书面语，反派要够狂，主角要够稳
    【字幕/系统提示】：仅出现约定的1次铺垫用金手指提示/关键信息提示，仅观众可见，后续全程隐身
    
    【校验规则】
    1. 符合钩子要求：每集结尾留悬念，按时强化全剧终极钩子
    2. 核心爽梗占比≥80%，辅助元素不越界，金手指仅在约定阶段出现1次，没有抢戏
    3. 严格遵守对应爽点类型的专属规则
    4. 观众看完的第一感受是「爽」，注意力完全集中在核心爽梗上，没有被其他内容分散
    
    【单集大纲】：
    {json.dumps(episode_outline, ensure_ascii=False)}
    """
    return call_llm(prompt, output_json=False)

def generate_full_scripts(novel_content: str, generate_unit_num: int = 1) -> tuple[dict, dict, list]:
    """全流程生成函数：输入小说内容，输出骨架、大纲、全10集脚本"""
    print("🔄 第一步：正在分析小说骨架（自动加金手指）...")
    skeleton = analyze_novel(novel_content)
    print("✅ 小说骨架分析完成，强制金手指已添加：", skeleton['base_info']['gold_finger'])
    
    print("🔄 第二步：正在生成单元大纲（爽感优先，可魔改）...")
    outline = generate_outline(skeleton, unit_num=generate_unit_num)
    print("✅ 单元大纲生成完成，本单元核心爽点：", outline['unit_base_info']['core_shuangdian'])
    
    print("🔄 第三步：正在生成单集脚本...")
    scripts = []
    core_shuangdian = outline['unit_base_info']['core_shuangdian']
    for episode in outline['episode_outlines']:
        print(f"正在生成第{episode['episode_num']}集脚本...")
        script = generate_single_script(skeleton, episode, core_shuangdian)
        scripts.append(script)
        time.sleep(1)  # 避免接口限流
    print("✅ 所有脚本生成完成")
    
    return skeleton, outline, scripts

# ---------------------- 主程序交互入口 ----------------------
if __name__ == "__main__":
    while True:
        print("\n" + "="*40)
        print("📚 网文&短剧全能工具")
        print("="*40)
        print("1. 网文片段自动打流派标签")
        print("2. 生成指定流派网文开篇")
        print("3. 网文一键转10集竖屏短剧脚本")
        print("4. 退出程序")
        choice = input("\n请输入要使用的功能序号：")

        if choice == "1":
            content = input("请粘贴网文片段：")
            if not content.strip():
                print("⚠️ 内容不能为空")
                continue
            tags = get_novel_category(content)
            print(f"\n✅ 匹配的流派标签：{tags}")

        elif choice == "2":
            category = input("请输入要生成的流派（比如：年代囤货文）：")
            word_cnt = input("请输入要生成的字数（默认1000）：") or 1000
            word_cnt = int(word_cnt)
         
            if not category.strip():
                print("⚠️ 流派不能为空")
                continue
            opening = generate_novel_opening(category, word_cnt)
            print(f"\n✅ 生成的开篇内容：\n{opening}")

        elif choice == "3":
            novel_content = input("请输入小说简介/片段（哪怕只有一句话也能生成）：")
         
            unit_num = input("请输入要生成的单元序号（默认第1单元=1-10集）：") or 1
            unit_num = int(unit_num)
            if not novel_content.strip():
                print("⚠️ 小说内容不能为空")
                continue
            skeleton, outline, scripts = generate_full_scripts(novel_content, generate_unit_num=unit_num)
            
            # 输出预览
            print("\n" + "="*50)
            print("📖 自动魔改信息：")
            print(f"书名：{skeleton['base_info']['book_name']}")
            print(f"强制添加金手指：{skeleton['base_info']['gold_finger']}")
            print(f"全剧终极钩子：{skeleton['ultimate_hook']['content']}")
            print("\n📋 第1集脚本预览：")
            print(scripts[0])
  
            # 保存到文件
            save_name = f"{skeleton['base_info']['book_name']}_第{unit_num}单元脚本.md"
            with open(save_name, "w", encoding="utf-8") as f:
                f.write(f"# {skeleton['base_info']['book_name']} 第{unit_num}单元（{unit_num*10-9}-{unit_num*10}集）短剧脚本\n")
                f.write(f"## 核心设定：\n")
           
                f.write(f"- 金手指：{skeleton['base_info']['gold_finger']}\n")
                f.write(f"- 终极钩子：{skeleton['ultimate_hook']['content']}\n")
                f.write(f"- 本单元核心爽点：{outline['unit_base_info']['core_shuangdian']}\n\n")
                for script in scripts:
                    f.write(script + "\n\n")
            print(f"\n📦 所有脚本已保存到「{save_name}」，可直接使用")

        elif choice == "4":
            print("👋 退出成功")
            break

        else:
            print("⚠️ 输入错误，请输入1-4的序号")
