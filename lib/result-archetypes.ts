import type { PersonalityClassGroupType } from "./personality-types";

export interface ResultArchetype {
  type: PersonalityClassGroupType;
  /** 大类标题，如「学院派：…」 */
  category: string;
  /** 中文称号 */
  name: string;
  /** 英文绰号 */
  nameEn: string;
  /** 类型描述 */
  description: string;
  /** 对应的理大灵魂 */
  polyuSoul: string;
}

/** 理大音游人结果图鉴（16 型），四字母顺序 P/E · S/M · A/I · C/B */
export const RESULT_ARCHETYPES: ResultArchetype[] = [
  {
    type: "PSAC",
    category: "学院派：精度与逻辑的极致 (P + A 组合)",
    name: "红砖守望者",
    nameEn: "The Archiver",
    description:
      "极其追求全完美（AP），能够独自在 Z-Core 刷同一个谱面 100 遍。",
    polyuSoul: "土木工程 / 会计系：精准到小数点后四位，稳如红砖墙。",
  },
  {
    type: "PSAB",
    category: "学院派：精度与逻辑的极致 (P + A 组合)",
    name: "数据猎人",
    nameEn: "The Data Hunter",
    description:
      "喜欢挑战极难谱面，会仔细研究每一个谱面的判定区，但在高压下偶尔失误。",
    polyuSoul: "计算机 / 电子计算系：善于 Debug，在 Deadline 前爆发惊人战力。",
  },
  {
    type: "PMAC",
    category: "学院派：精度与逻辑的极致 (P + A 组合)",
    name: "首席架构师",
    nameEn: "The Architect",
    description:
      "技术极强且乐于分享，是 Discord 频道或论坛里的指法教学大神。",
    polyuSoul: "理大音游社骨干：理性、可靠，是团队的技术核心。",
  },
  {
    type: "PMAB",
    category: "学院派：精度与逻辑的极致 (P + A 组合)",
    name: "竞技场领主",
    nameEn: "The Arena Master",
    description:
      "享受在联机房（Multi-Live）用高分碾压全场，喜欢公开的竞技感。",
    polyuSoul: "领袖学生 / 商业精英：在高压社交环境下依然保持理性的精准。",
  },
  {
    type: "ESIC",
    category: "律动派：直觉与情感的流露 (E + I 组合)",
    name: "森林治愈者",
    nameEn: "The Healer",
    description:
      "不在乎分数，只在意歌曲是否好听，喜欢在雨天的赛马会创新楼下静静打歌。",
    polyuSoul: "护理学 / 康复科学系：温和、稳定，追求心灵的共鸣。",
  },
  {
    type: "ESIB",
    category: "律动派：直觉与情感的流露 (E + I 组合)",
    name: "抽象派怪才",
    nameEn: "The Abstractist",
    description:
      "打歌风格极其狂野，指法不走寻常路，经常靠直觉瞬时通过高难段落。",
    polyuSoul: "设计学院 (SD) 奇才：灵感爆发，打破常规，不拘泥于固定形式。",
  },
  {
    type: "EMIC",
    category: "律动派：直觉与情感的流露 (E + I 组合)",
    name: "理大向日葵",
    nameEn: "The Sunny Glue",
    description:
      "（今井莉莎型）典型的「社交中心」，打歌是为了和大家开心，擅长调解气氛。",
    polyuSoul: "酒店旅游管理 / 公关：高情商，像阳光一样温暖，是组队的首选。",
  },
  {
    type: "EMIB",
    category: "律动派：直觉与情感的流露 (E + I 组合)",
    name: "派对燃点者",
    nameEn: "The Party Starter",
    description:
      "喜欢各种联名活动，哪里热闹去哪里，打歌时动作幅度大，极具感染力。",
    polyuSoul: "学生会活跃分子：充满激情的瞬间爆发力，社交场上的焦点。",
  },
  {
    type: "PSIC",
    category: "均衡派：在秩序与混沌中游走 (P + I 组合)",
    name: "禅意修行者",
    nameEn: "The Zen Monk",
    description:
      "靠直觉精准捕捉每一个 Note，状态极其稳定，像是个打歌机器人。",
    polyuSoul: "应用数学 / 物理系：在混乱的数据中直觉般地找到完美的秩序。",
  },
  {
    type: "PSIB",
    category: "均衡派：在秩序与混沌中游走 (P + I 组合)",
    name: "瞬间闪光",
    nameEn: "The Flash",
    description:
      "典型的爆发型选手，能在不分析谱面的情况下凭直觉强行「生啃」高难曲。",
    polyuSoul: "体育系 / 医疗超声：卓越的瞬时反应力与手眼协调性。",
  },
  {
    type: "PMIC",
    category: "均衡派：在秩序与混沌中游走 (P + I 组合)",
    name: "城市漫步者",
    nameEn: "The Flâneur",
    description:
      "喜欢在机厅围观，偶尔上场秀一段华丽但不一定高分的曲子。",
    polyuSoul: "文学院 / 通识教育：优雅地穿梭在理大天桥，享受社交与艺术。",
  },
  {
    type: "PMIB",
    category: "均衡派：在秩序与混沌中游走 (P + I 组合)",
    name: "热血应援长",
    nameEn: "The Hype Leader",
    description:
      "对特定的角色（如 Roselia）有极强的爱，在联机房里总是最激动的那个。",
    polyuSoul: "社群领袖 / 动漫社：用直觉和热情驱动一切，爆发力极强。",
  },
  {
    type: "ESAC",
    category: "深度流：针对特定风格的极致追求 (E + A 组合)",
    name: "古典主义者",
    nameEn: "The Classicist",
    description:
      "追求华丽的表现力，但会用严谨的分析来提升自己的表现效果。",
    polyuSoul: "纺织及服装设计：艺术审美与严密的剪裁逻辑并存。",
  },
  {
    type: "ESAB",
    category: "深度流：针对特定风格的极致追求 (E + A 组合)",
    name: "表演艺术家",
    nameEn: "The Performer",
    description:
      "喜欢录制打歌视频，通过剪辑和特效让原本的表演看起来极其震撼。",
    polyuSoul: "创意多媒体 (DMP)：深谙如何将逻辑转化为视觉冲击力。",
  },
  {
    type: "EMAC",
    category: "深度流：针对特定风格的极致追求 (E + A 组合)",
    name: "战术协调员",
    nameEn: "The Tactical Lead",
    description:
      "在多人合作赛中，负责分析大家的特质并分配任务，确保全队高分。",
    polyuSoul: "项目经理 / 工程管理：不仅懂技术，更懂如何分配人力资源。",
  },
  {
    type: "EMAB",
    category: "深度流：针对特定风格的极致追求 (E + A 组合)",
    name: "全能指挥官",
    nameEn: "The Maestro",
    description:
      "极其罕见的类型，既能保证精度，又充满表现力，是理大音游圈的传说。",
    polyuSoul: "全奖学金获得者 / 校园大使：在所有维度都追求极致平衡。",
  },
];

const archetypeByType = new Map(
  RESULT_ARCHETYPES.map((a) => [a.type, a])
);

export function getResultArchetype(
  type: PersonalityClassGroupType
): ResultArchetype {
  const found = archetypeByType.get(type);
  if (!found) {
    throw new Error(`Unknown archetype type: ${type}`);
  }
  return found;
}
