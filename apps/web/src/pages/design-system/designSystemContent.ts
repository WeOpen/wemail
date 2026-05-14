export const DESIGN_SYSTEM_SECTION_IDS = [
  "foundations",
  "color-theme",
  "layout-spacing",
  "elevation-radius",
  "typography-content",
  "buttons-actions",
  "form-inputs",
  "selection-controls",
  "navigation-wayfinding",
  "surfaces-cards",
  "data-display",
  "feedback-status",
  "overlays-utilities"
] as const;

export type DesignSystemSectionId = (typeof DESIGN_SYSTEM_SECTION_IDS)[number];

export interface DesignSystemDocSection {
  title: string;
  body: string[];
}

export interface DesignSystemCodeSample {
  title: string;
  code: string;
}

export interface DesignSystemApiField {
  prop: string;
  type: string;
  defaultValue: string;
  description: string;
}

export interface DesignSystemComponentDoc {
  id: string;
  title: string;
  chineseTitle: string;
  summary: string;
  sectionIds: DesignSystemSectionId[];
  docSections?: DesignSystemDocSection[];
  codeSamples?: DesignSystemCodeSample[];
  api?: DesignSystemApiField[];
}

export interface DesignSystemGroupDoc {
  id: string;
  title: string;
  chineseTitle: string;
  summary: string;
  overviewDescription: string;
  sectionIds: DesignSystemSectionId[];
  docSections?: DesignSystemDocSection[];
  components: DesignSystemComponentDoc[];
}

export const designSystemGroups: DesignSystemGroupDoc[] = [
  {
    id: "foundations",
    title: "Foundations",
    chineseTitle: "基础层",
    summary: "统一设计 token、主题、布局节奏和表面层级，作为所有共享原语的视觉地基。",
    overviewDescription: "Design tokens、预览地图、文档入口与视觉回归基线都会先在这里校准，后续组件都只复用这套基础语言。",
    sectionIds: ["foundations", "color-theme", "layout-spacing", "elevation-radius"],
    docSections: [
      {
        title: "适用范围",
        body: [
          "Foundations 用来集中说明设计 token、主题切换、布局节奏和表面层级，作为所有共享原语的统一视觉起点。",
          "当页面需要定义新的颜色、间距或容器层级时，应先回到这一组基础说明确认是否已经存在可复用规范。"
        ]
      },
      {
        title: "适用场景",
        body: [
          "用于统一解释颜色、间距、圆角、阴影和页面骨架的来源，帮助设计稿、实现代码和文档站保持同一套视觉语言。",
          "当团队准备新增共享组件、重排页面层级或扩展主题时，应先确认这一组基础规范是否已经覆盖需求。"
        ]
      },
      {
        title: "不适用场景",
        body: [
          "不要把业务规则、页面专属文案或一次性视觉修饰写进 Foundations；这些内容应留在具体组件或业务页面文档中。",
          "不要绕过 token 直接在页面里临时定义颜色、间距或阴影，否则会让设计系统失去统一约束。"
        ]
      },
      {
        title: "状态与变体",
        body: [
          "当前首批基础层主要覆盖 color theme、layout spacing、elevation radius 三类文档块，分别负责主题、节奏和表面层级。",
          "light / dark 主题、页面容器密度和 surface 层级都应视为基础变体，由共享 token 控制而不是由业务组件各自分叉。"
        ]
      },
      {
        title: "交互示例",
        body: [
          "右侧预览会同时展示 token 清单、主题卡片和基础布局样例，作为设计评审与视觉回归的共同参考。",
          "如果某个组件在不同主题下表现不一致，应先回到 Foundations 预览确认问题来自 token 还是具体组件实现。"
        ]
      },
      {
        title: "代码片段",
        body: [
          "示例片段：import \"./tokens.css\"; import \"./primitives.css\"; 页面与组件都只消费已经定义好的 CSS variables。",
          "示例片段：const surfaceStyle = { borderRadius: \"var(--radius-lg)\", boxShadow: \"var(--shadow-sm)\" }; 用统一 token 映射视觉层级。"
        ]
      },
      {
        title: "设计规范",
        body: [
          "基础层文档需要和 tokens、README、CHANGELOG 保持同一套命名，避免组件页和样式变量出现双重口径。",
          "新增组件只能复用这里已经定义的主题、间距与 elevation 语言，不在业务页单独引入新的视觉档位。"
        ]
      },
      {
        title: "维护约束",
        body: [
          "基础层变更需要同步检查设计系统首页、共享样式文件和对应文档，避免只更新其中一个入口。",
          "任何新增 token 都应回答它解决了哪一类复用问题，而不是只为当前页面补一个临时值。"
        ]
      }
    ],
    components: [
      {
        id: "design-tokens",
        title: "Design tokens",
        chineseTitle: "设计令牌",
        summary: "品牌色、语义色、间距、圆角和阴影的统一定义。",
        sectionIds: ["foundations", "color-theme", "layout-spacing", "elevation-radius"],
        api: [
          {
            prop: "scope",
            type: '"brand" | "semantic" | "spacing" | "radius" | "elevation"',
            defaultValue: '"brand"',
            description: "标记当前 token 所属的设计域，帮助页面按主题、间距和表面层级组织说明。"
          },
          {
            prop: "varName",
            type: "string",
            defaultValue: '"--brand-500"',
            description: "对应共享样式里实际消费的 CSS custom property 名称。"
          },
          {
            prop: "usage",
            type: "string",
            defaultValue: '"component surfaces"',
            description: "说明这个 token 在按钮、卡片、表格或页面容器中的典型落点。"
          }
        ],
        docSections: [
          {
            title: "适用场景",
            body: [
              "用于统一记录品牌色、语义色、间距、圆角和阴影等基础 token，保证页面与共享原语使用同一套视觉变量。",
              "当团队准备新增颜色档位、页面节奏或表面层级时，应先确认是否可以直接复用现有 token。"
            ]
          },
          {
            title: "不适用场景",
            body: [
              "不要把业务字段、页面专属文案或一次性视觉修饰包装成 design token；这些内容应留在具体组件或页面实现中。",
              "不要绕过共享变量在业务页面直接手写颜色、阴影或间距，否则文档与实现会很快失去同步。"
            ]
          },
          {
            title: "状态与变体",
            body: [
              "当前预览重点覆盖 brand、semantic、spacing、radius 和 elevation 五类 token，分别对应主题、节奏与表面层级。",
              "light / dark 主题切换只应替换 token 值，不应要求组件层额外维护一套独立样式。"
            ]
          },
          {
            title: "交互示例",
            body: [
              "右侧真实示例会同时展示色板、主题卡片与 token 行项目，帮助设计评审快速确认命名与视觉映射是否一致。",
              "如果某个组件在不同主题下观感异常，应先回到 design tokens 检查语义色和表面层级映射。"
            ]
          },
          {
            title: "设计规范",
            body: [
              "新增 token 需要能解释跨页面复用价值，而不是只为当前一个业务块补临时变量。",
              "token 名称应与 shared styles、README 和文档站入口保持一致，避免出现多套别名。"
            ]
          }
        ]
      },
      {
        id: "page-layout",
        title: "PageLayout",
        chineseTitle: "页面布局",
        summary: "页面头部、工具栏、主内容区和侧栏的组合骨架。",
        sectionIds: ["layout-spacing"],
        api: [
          {
            prop: "Page",
            type: "layout root",
            defaultValue: "required",
            description: "提供页面整体容器与垂直节奏，承接 header、body 和局部分区。"
          },
          {
            prop: "PageBody",
            type: '"with-sidebar" body region',
            defaultValue: '"main only"',
            description: "定义主内容区与侧栏的排布关系，用于列表页、详情页和带过滤器的工作台页面。"
          },
          {
            prop: "PageToolbar",
            type: "toolbar region",
            defaultValue: "optional",
            description: "承接筛选条、批量操作和摘要信息，避免业务页面重复拼装工具栏骨架。"
          }
        ],
        docSections: [
          {
            title: "适用场景",
            body: [
              "用于管理后台页面、设置页和列表详情页的页面骨架，统一 header、toolbar、main 与 sidebar 的关系。",
              "当页面需要稳定的主次区域，而不是一次性自由摆放卡片时，应优先使用 PageLayout 原语。"
            ]
          },
          {
            title: "不适用场景",
            body: [
              "不要把单个内容卡片或弹层局部结构包装成 PageLayout；它只处理页面级骨架，不负责局部信息块样式。",
              "如果页面只有一个简短正文区域，也不需要为了形式完整强行引入 sidebar 或 toolbar 容器。"
            ]
          },
          {
            title: "状态与变体",
            body: [
              "当前预览覆盖 header + toolbar + main + sidebar 的标准工作台布局，以及无侧栏时的紧凑编排节奏。",
              "布局密度应通过 spacing token 与容器组合控制，而不是为每个页面重新手写 margin 和 max-width。"
            ]
          },
          {
            title: "交互示例",
            body: [
              "真实示例展示了页头操作、筛选条和双栏正文的组合，便于验证 PageLayout 与 Card、FilterBar 的拼接边界。",
              "切换不同页面时应保持相同的 toolbar 与 sidebar 节奏，这样用户能更快建立导航预期。"
            ]
          },
          {
            title: "设计规范",
            body: [
              "页面级布局优先依赖 Page、PageHeader、PageBody、PageMain、PageSidebar 等原语，不在业务页面重复定义骨架。",
              "新增区域前先确认它属于 header、toolbar、main 还是 sidebar，避免内容层与布局层混在一起。"
            ]
          }
        ]
      }
    ]
  },
  {
    id: "content-actions",
    title: "Content & Actions",
    chineseTitle: "内容与动作",
    summary: "承接排版、按钮、卡片和数据展示组件，负责页面中的主要内容编排。",
    overviewDescription: "这组组件负责把设计系统真正落到业务页面，包括标题层级、主次动作、卡片容器和数据摘要。",
    sectionIds: ["typography-content", "buttons-actions", "surfaces-cards", "data-display"],
    components: [
      {
        id: "typography",
        title: "Typography",
        chineseTitle: "排版",
        summary: "统一标题、正文、说明、代码和快捷键标签的语义层级。",
        sectionIds: ["typography-content"],
        api: [
          {
            prop: "as",
            type: '"h1" | "h2" | "h3" | "p" | "span"',
            defaultValue: '"p"',
            description: "控制排版原语输出的语义标签，保证层级结构与无障碍阅读顺序一致。"
          },
          {
            prop: "size",
            type: '"hero" | "title-lg" | "title-md" | "body" | "caption"',
            defaultValue: '"body"',
            description: "映射共享排版 token，控制标题、正文和辅助文案的视觉层级。"
          },
          {
            prop: "tone",
            type: '"default" | "muted" | "brand"',
            defaultValue: '"default"',
            description: "为正文、说明文字或强调内容附加统一的文本色语义。"
          }
        ],
        docSections: [
          {
            title: "适用场景",
            body: [
              "用于统一标题、正文、说明、代码与快捷键标签的层级，让页面在高密度内容下仍然保持清晰阅读节奏。",
              "当页面需要表达主标题、区块说明或辅助提示时，应优先使用共享排版原语，而不是直接手写字号和行高。"
            ]
          },
          {
            title: "不适用场景",
            body: [
              "不要把 Typography 当作布局容器使用；它负责文本语义和层级，不负责卡片、栅格或页面骨架。",
              "不要为了特殊视觉效果跳过现有排版档位单独写字体大小，否则标题与正文很难跨页面保持一致。"
            ]
          },
          {
            title: "状态与变体",
            body: [
              "当前示例覆盖 hero、section title、正文、caption、code、kbd 与 muted copy 等高频文本形态。",
              "不同文本强调程度应通过 size 与 tone 组合表达，而不是额外定义不透明度或临时色值。"
            ]
          },
          {
            title: "交互示例",
            body: [
              "真实示例会同时展示标题层级、说明文字、代码片段和快捷键标签，帮助团队快速检查同页阅读节奏。",
              "在表单、卡片和提示组件里复用同一套排版原语，可以减少页面之间的字体风格漂移。"
            ]
          },
          {
            title: "设计规范",
            body: [
              "先确定语义标签，再选择视觉档位；不要为了视觉效果牺牲正确的 heading 或 paragraph 结构。",
              "正文、说明、代码与快捷键标签都应复用共享排版 token，避免页面各自定义字体系统。"
            ]
          }
        ]
      },
      {
        id: "button",
        title: "Button",
        chineseTitle: "按钮",
        summary: "覆盖主要、次要、轻量、危险和 icon-only 等动作样式。",
        sectionIds: ["buttons-actions"],
        codeSamples: [
          {
            title: "主次操作组合",
            code: `<Button variant="primary">保存变更</Button>\n<Button variant="secondary">查看历史</Button>`
          },
          {
            title: "危险与加载状态",
            code: `<Button variant="danger">停用账号</Button>\n<Button isLoading loadingLabel="保存中" variant="primary">\n  保存\n</Button>`
          }
        ],
        api: [
          {
            prop: "variant",
            type: '"primary" | "secondary" | "subtle" | "ghost" | "danger" | "icon"',
            defaultValue: '"primary"',
            description: "定义按钮的视觉层级与语义强度。"
          },
          {
            prop: "size",
            type: '"xs" | "sm" | "md" | "lg"',
            defaultValue: '"md"',
            description: "控制按钮的高度、内边距和文本密度。"
          },
          {
            prop: "isLoading",
            type: "boolean",
            defaultValue: "false",
            description: "在异步提交中显示加载态并阻止重复触发。"
          }
        ],
        docSections: [
          {
            title: "适用场景",
            body: [
              "用于页面主次操作、确认提交、轻量辅助动作以及需要明确点击反馈的交互入口。",
              "当界面需要把一个动作表达成清晰的按钮层级，而不是纯文本链接时，优先使用 Button。"
            ]
          },
          {
            title: "不适用场景",
            body: [
              "不要用 Button 承担纯导航文本、正文内联引用或不需要强调的次级跳转；这类场景更适合链接样式。",
              "不要在同一个操作区并列多个 primary 按钮，也不要把危险操作伪装成普通次按钮。"
            ]
          },
          {
            title: "状态与变体",
            body: [
              "当前文档站优先覆盖 primary、secondary、subtle、ghost、danger、icon-only 与 loading 几类高频动作变体。",
              "同一个动作组里应保留明确主次关系，避免在同一区块并列多个视觉上同权重的主按钮。"
            ]
          },
          {
            title: "交互示例",
            body: [
              "推荐同时展示一个主操作按钮、一个次操作按钮和一个危险操作按钮，帮助评审动作层级是否清晰。",
              "需要展示加载态时，应让按钮保留原位置并明确 loading label，避免用户误以为点击没有生效。"
            ]
          },
          {
            title: "代码片段",
            body: [
              "静态示例：<Button variant=\"primary\">保存变更</Button> 与 <Button variant=\"secondary\">取消</Button> 组合展示主次操作。",
              "静态示例：<Button isLoading loadingLabel=\"保存中\" variant=\"primary\">保存变更</Button> 用于异步提交中的禁用反馈。"
            ]
          },
          {
            title: "设计规范",
            body: [
              "按钮文案应直接表达结果或下一步动作，避免使用模糊词汇如“确认一下”“继续处理”。",
              "icon-only 按钮必须补充 aria-label，危险操作优先使用 danger 变体并与普通动作拉开视觉距离。"
            ]
          }
        ]
      },
      {
        id: "card",
        title: "Card",
        chineseTitle: "卡片",
        summary: "统一信息分组、数据容器和空状态承载方式。",
        sectionIds: ["surfaces-cards"],
        api: [
          {
            prop: "variant",
            type: '"default" | "data" | "status"',
            defaultValue: '"default"',
            description: "定义卡片承载普通信息、数据摘要还是状态提示的视觉结构。"
          },
          {
            prop: "tone",
            type: '"default" | "brand" | "warning" | "info"',
            defaultValue: '"default"',
            description: "控制卡片在品牌、提醒或信息语义下的强调方式。"
          },
          {
            prop: "padding",
            type: '"sm" | "md" | "lg"',
            defaultValue: '"md"',
            description: "统一 header、body、footer 的内边距密度，避免页面局部手写 spacing。"
          }
        ],
        docSections: [
          {
            title: "适用场景",
            body: [
              "用于承接一组相关信息、摘要数据或局部操作，让页面在高密度信息里仍然保留清晰分区。",
              "当内容需要共享同一标题、正文和底部动作容器时，优先使用 Card，而不是在页面里手写边框盒子。"
            ]
          },
          {
            title: "不适用场景",
            body: [
              "不要把整页布局直接塞进单个 Card；页面级栅格、分栏和主次区域仍应由 PageLayout 或 section 容器承担。",
              "不要为了制造层级而无节制堆叠阴影卡片，连续信息块更适合通过间距和标题分组来解决。"
            ]
          },
          {
            title: "状态与变体",
            body: [
              "常见卡片变体包括基础信息卡、带操作 footer 的任务卡、带空状态说明的容器卡以及数据摘要卡。",
              "是否需要 header、body、footer 应由内容结构决定，而不是为了视觉完整强行补齐三段式。"
            ]
          },
          {
            title: "交互示例",
            body: [
              "适合展示一个含标题与正文的基础卡片，再补一个带底部操作区的任务卡，帮助团队校验结构边界。",
              "如果卡片内含按钮、标签或复制工具，应验证这些动作不会把卡片误导成整块可点击容器。"
            ]
          },
          {
            title: "代码片段",
            body: [
              "静态示例：<Card><CardHeader>域名配额</CardHeader><CardBody>展示剩余可用量与说明</CardBody></Card>。",
              "静态示例：<Card><CardBody>摘要信息</CardBody><CardFooter><Button variant=\"secondary\">查看详情</Button></CardFooter></Card>。"
            ]
          },
          {
            title: "设计规范",
            body: [
              "卡片只负责建立信息边界，不应该再承担页面级布局职责；页面编排仍由 PageLayout 和 section 容器控制。",
              "同一视图中的卡片层级应依赖统一的 radius 与 elevation token，不为单个业务块临时定义新的阴影或圆角。"
            ]
          }
        ]
      },
      {
        id: "data-display",
        title: "Data display",
        chineseTitle: "数据展示",
        summary: "表格、键值列表、头像和统计卡等摘要展示原语。",
        sectionIds: ["data-display"],
        api: [
          {
            prop: "TableContainer.variant",
            type: '"default" | "liquid"',
            defaultValue: '"default"',
            description: "控制表格容器的表面风格，适配常规列表与更轻盈的数据面板。"
          },
          {
            prop: "KVList.items",
            type: "Array<{ key: string; value: ReactNode; hint?: string; action?: ReactNode }>",
            defaultValue: "[]",
            description: "定义键值列表的字段、提示与附加操作，用于环境信息和配置摘要。"
          },
          {
            prop: "MetricCard.tone",
            type: '"default" | "hero"',
            defaultValue: '"default"',
            description: "区分普通 KPI 卡与强调型指标卡，让关键数据有更明确的视觉层级。"
          }
        ],
        docSections: [
          {
            title: "适用场景",
            body: [
              "用于承接表格、键值列表、头像身份块和指标摘要卡，帮助页面稳定展示结构化信息。",
              "当页面需要在不依赖真实接口的情况下校验数据密度与层级时，应优先复用这组展示原语。"
            ]
          },
          {
            title: "不适用场景",
            body: [
              "不要把 Data display 组件当作输入控件或导航容器使用；它们负责展示结果，不负责采集或切换。",
              "如果内容只是简短正文说明，没有结构化字段或指标层级，也不需要强行包装成数据展示原语。"
            ]
          },
          {
            title: "状态与变体",
            body: [
              "当前预览覆盖 Avatar、KVList、MetricCard 和 Table shell，分别对应身份摘要、键值信息、核心指标和列表结果。",
              "数据展示组件的层级应依赖统一的 badge、caption 与 container tone，而不是在业务页额外发明新的强调样式。"
            ]
          },
          {
            title: "交互示例",
            body: [
              "真实示例同时摆放头像组、键值列表、指标卡和紧凑表格，方便对比不同数据密度下的节奏是否协调。",
              "列表里的状态展示可以直接复用 Badge、Tag 等反馈原语，避免数据组件内部再重复定义语义色。"
            ]
          },
          {
            title: "设计规范",
            body: [
              "优先保证字段标签、指标标题和状态色在不同数据组件之间语义一致，再考虑局部强调样式。",
              "如果一个数据块需要解释、动作和状态提示，应通过 Card、Badge、Alert 等原语组合，而不是让单一展示组件承担所有职责。"
            ]
          }
        ]
      }
    ]
  },
  {
    id: "forms-navigation-feedback",
    title: "Forms, Navigation & Feedback",
    chineseTitle: "表单、导航与反馈",
    summary: "覆盖输入、选择、路径导航、状态反馈和系统提示等高频交互组件。",
    overviewDescription: "输入控件、路径组件和反馈组件会一起定义页面交互密度，让用户既能完成操作，也能获得明确状态回馈。",
    sectionIds: ["form-inputs", "selection-controls", "navigation-wayfinding", "feedback-status"],
    components: [
      {
        id: "search-input",
        title: "SearchInput",
        chineseTitle: "搜索输入框",
        summary: "统一搜索、筛选和快速清除交互。",
        sectionIds: ["form-inputs"],
        api: [
          {
            prop: "placeholder",
            type: "string",
            defaultValue: '"搜索…"',
            description: "说明搜索对象和预期输入内容，帮助用户快速理解筛选范围。"
          },
          {
            prop: "aria-label",
            type: "string",
            defaultValue: '"搜索"',
            description: "为仅含图标或弱化 label 的搜索场景补充明确的无障碍名称。"
          },
          {
            prop: "value / defaultValue",
            type: "string",
            defaultValue: '""',
            description: "支持受控与非受控输入，适配即时搜索与初始化筛选值两类场景。"
          }
        ],
        docSections: [
          {
            title: "适用场景",
            body: [
              "用于列表页、筛选条和弹层内的快速搜索入口，统一前缀图标、占位文案与清除交互。",
              "当用户需要频繁按关键字缩小结果范围时，应优先使用 SearchInput，而不是普通 TextInput。"
            ]
          },
          {
            title: "不适用场景",
            body: [
              "不要把 SearchInput 用作需要复杂格式校验的表单字段，例如邮箱、密码或 API Key 输入；这类场景应使用普通输入控件。",
              "如果页面没有即时筛选或查询反馈，单独放一个搜索框会制造误导，应该先明确搜索对象和结果承载区。"
            ]
          },
          {
            title: "状态与变体",
            body: [
              "首批文档优先覆盖默认搜索态、已输入可清除态以及与筛选条并列时的紧凑布局态。",
              "是否显示清除按钮、是否带前缀图标、是否放进 FilterBar，都是 SearchInput 的常见组合变体。"
            ]
          },
          {
            title: "交互示例",
            body: [
              "典型示例是账号列表页顶部搜索框：输入关键字后立即过滤列表，并支持一键清除恢复默认结果。",
              "当搜索与标签、状态等筛选器联动时，应保证控件同行对齐，并让占位文案说明搜索对象。"
            ]
          },
          {
            title: "代码片段",
            body: [
              "静态示例：<SearchInput aria-label=\"搜索账号\" placeholder=\"搜索账号、域名或创建人\" />。",
              "静态示例：<FilterBar><SearchInput aria-label=\"搜索 API Key\" placeholder=\"搜索名称或前缀\" /></FilterBar>。"
            ]
          },
          {
            title: "设计规范",
            body: [
              "搜索框应直接表达可搜索对象，例如账号、地址或创建人，避免只写泛化的“请输入关键字”。",
              "如果搜索会和其他筛选联动，建议放进 FilterBar 组合里保持同一行节奏。"
            ]
          }
        ]
      },
      {
        id: "multi-select",
        title: "MultiSelect",
        chineseTitle: "多选器",
        summary: "统一标签筛选、权限筛选和组合条件选择。",
        sectionIds: ["form-inputs"],
        api: [
          {
            prop: "options",
            type: "Array<{ label: string; value: string }>",
            defaultValue: "[]",
            description: "定义可选标签、权限或筛选条件，是多选器渲染候选项的基础数据。"
          },
          {
            prop: "defaultValue",
            type: "string[]",
            defaultValue: "[]",
            description: "用于带初始筛选值的列表页，让多选器在首屏就呈现当前过滤结果。"
          },
          {
            prop: "aria-label",
            type: "string",
            defaultValue: '"多选器"',
            description: "为紧凑筛选条或无可视标签场景补充清晰的控件名称。"
          }
        ],
        docSections: [
          {
            title: "适用场景",
            body: [
              "用于标签筛选、权限筛选和组合条件选择，让用户可以在同一控件内快速选择多个维度。",
              "当页面需要展示已选状态并允许继续增删条件时，应优先使用 MultiSelect，而不是多个离散 checkbox。"
            ]
          },
          {
            title: "不适用场景",
            body: [
              "不要把只有两三个永久可见选项的场景强行做成 MultiSelect；这类场景更适合直接使用 checkbox 组。",
              "如果筛选条件之间互斥，只能单选，也不应使用多选器，应改用 Select 或 Radio。"
            ]
          },
          {
            title: "状态与变体",
            body: [
              "当前预览覆盖默认空态与带默认值的已选态，重点验证标签筛选与组合条件在同一筛选条中的节奏。",
              "多选器的展示重点是已选项反馈、候选列表滚动与紧凑布局对齐，不额外承担复杂表单校验。"
            ]
          },
          {
            title: "交互示例",
            body: [
              "真实示例展示了标签筛选场景：默认勾选异常账号，再结合搜索框和状态下拉形成组合过滤。",
              "如果多选器放进 FilterBar，应确保选中项不会撑破工具栏节奏，并保留清晰的 aria-label。"
            ]
          },
          {
            title: "设计规范",
            body: [
              "多选器应清楚区分候选项与已选结果，避免用户在筛选面板里反复确认当前状态。",
              "当条件较多时，优先使用统一滚动区域与标签密度，不在业务页面私自扩展弹层样式。"
            ]
          }
        ]
      },
      {
        id: "selection-controls",
        title: "Selection controls",
        chineseTitle: "选择控件",
        summary: "Checkbox、Radio、Switch 等二元与组选项控件。",
        sectionIds: ["selection-controls"],
        api: [
          {
            prop: "checked / defaultChecked",
            type: "boolean",
            defaultValue: "false",
            description: "控制二元开关和单项选择的默认状态，适配受控与非受控场景。"
          },
          {
            prop: "label",
            type: "string",
            defaultValue: '""',
            description: "为 Checkbox、Radio、Switch 提供统一可读标签，减少页面自行拼接文案。"
          },
          {
            prop: "variant",
            type: '"default" | "card"',
            defaultValue: '"default"',
            description: "让单项选择既能作为普通表单控件，也能作为卡片式筛选块出现。"
          }
        ],
        docSections: [
          {
            title: "适用场景",
            body: [
              "用于承接 Checkbox、Radio、Switch 等二元与组选项控件，统一选择状态、标签和排列密度。",
              "当页面需要让用户启用功能、勾选筛选条件或在互斥选项中做决定时，应优先复用这组控件。"
            ]
          },
          {
            title: "不适用场景",
            body: [
              "不要把大量标签筛选塞进 selection controls；当选项数量较多且需要折叠、搜索或多选反馈时应切到 MultiSelect。",
              "不要让单个 Switch 承担复杂确认逻辑，涉及危险操作时仍应配合按钮、弹层或说明文案。"
            ]
          },
          {
            title: "状态与变体",
            body: [
              "当前示例覆盖 checked、unchecked、card-style 与 grouped controls 等高频状态，便于回归开关、单选与多选的视觉一致性。",
              "同一组选择控件应共享标签密度、禁用态和焦点反馈，不在业务层额外定义不同交互语言。"
            ]
          },
          {
            title: "交互示例",
            body: [
              "真实示例展示了通知开关、异常筛选 checkbox、汇总方式 radio 和卡片式选择块四种组合方式。",
              "如果选择控件出现在设置页和筛选条两个场景，应优先复用同一套 label 与状态说明，避免术语漂移。"
            ]
          },
          {
            title: "设计规范",
            body: [
              "选择控件首先表达状态切换与范围边界，不要通过颜色或阴影单独创造新的语义。",
              "当同一视图存在多组选项时，优先按用途分组并给出清晰标签，而不是靠视觉距离让用户自行猜测。"
            ]
          }
        ]
      },
      {
        id: "navigation",
        title: "Navigation",
        chineseTitle: "导航组件",
        summary: "Breadcrumb、Tabs、Pagination、Steps 等路径与流程组件。",
        sectionIds: ["navigation-wayfinding"],
        api: [
          {
            prop: "Breadcrumb items",
            type: "ReactNode[]",
            defaultValue: "[]",
            description: "按路径层级描述当前位置与返回入口，适合详情页和多层管理后台。"
          },
          {
            prop: "Tabs.defaultValue",
            type: "string",
            defaultValue: '"overview"',
            description: "定义首屏展示的标签页，让局部视图切换有稳定默认态。"
          },
          {
            prop: "Pagination.page / total / pageSize",
            type: "number",
            defaultValue: "1 / 0 / 20",
            description: "统一分页栏的页码、总量和每页数量结构，避免列表页各自定义分页规则。"
          }
        ],
        docSections: [
          {
            title: "适用场景",
            body: [
              "用于表达页面路径、内容分段、结果分页和任务流程，帮助用户理解自己当前所在的位置与下一步去向。",
              "当页面需要在多个平级视图之间切换，或需要展示多步操作进度时，应优先复用这一组导航原语。"
            ]
          },
          {
            title: "不适用场景",
            body: [
              "不要把 Navigation 当成主要操作区来承载保存、删除等动作；导航负责定位与切换，不负责提交业务结果。",
              "同一层级内容不要同时叠加 Tabs、Steps 和二级 Breadcrumb，重复路径信号会增加理解成本。"
            ]
          },
          {
            title: "状态与变体",
            body: [
              "当前常见变体包括 Breadcrumb 路径导航、Tabs 内容切换、Pagination 结果分页与 Steps 流程进度。",
              "是否需要图标、数字、禁用态或完成态，应跟随组件职责，而不是为视觉丰富度额外增加状态。"
            ]
          },
          {
            title: "交互示例",
            body: [
              "管理后台详情页适合组合 Breadcrumb 与 Tabs：上层路径帮助返回列表，局部视图切换交由 Tabs 处理。",
              "涉及多步配置流程时，可以用 Steps 展示进度，但每一步的主操作仍应留在正文或底部操作区。"
            ]
          },
          {
            title: "代码片段",
            body: [
              "静态示例：<Breadcrumb><BreadcrumbItem><BreadcrumbLink href=\"/accounts\">账号</BreadcrumbLink></BreadcrumbItem><BreadcrumbCurrent>详情</BreadcrumbCurrent></Breadcrumb>。",
              "静态示例：<Tabs><TabsList><TabsTrigger value=\"overview\">概览</TabsTrigger><TabsTrigger value=\"activity\">活动</TabsTrigger></TabsList></Tabs>。"
            ]
          },
          {
            title: "设计规范",
            body: [
              "导航组件首先服务于定位和切换，不应混入主操作按钮语义；主动作仍应留在工具栏或正文操作区。",
              "同一页面里不要同时堆叠多个相同层级的导航模式，避免用户同时处理 breadcrumb、tabs 和 steps 的重复路径信号。"
            ]
          }
        ]
      },
      {
        id: "feedback",
        title: "Feedback",
        chineseTitle: "反馈组件",
        summary: "Tag、Badge、Alert、Progress、Skeleton 和 Spinner 等反馈状态。",
        sectionIds: ["feedback-status"],
        api: [
          {
            prop: "variant",
            type: '"success" | "warning" | "danger" | "info" | "brand"',
            defaultValue: '"info"',
            description: "统一 Badge、Tag、Alert 等反馈组件的语义色映射。"
          },
          {
            prop: "title",
            type: "string",
            defaultValue: '""',
            description: "用于 Alert 等强提示组件的标题文案，帮助用户快速理解事件性质。"
          },
          {
            prop: "value",
            type: "number",
            defaultValue: "0",
            description: "用于 Progress 等进度型反馈，表达任务完成比例与当前阶段。"
          }
        ],
        docSections: [
          {
            title: "适用场景",
            body: [
              "用于提示当前状态、异步进度、风险警告和加载占位，让用户及时理解系统是否成功响应了操作。",
              "当页面需要补充状态密度但不想打断主流程时，优先使用 Badge、Tag 或 Progress；需要明确提醒时再升级到 Alert。"
            ]
          },
          {
            title: "不适用场景",
            body: [
              "不要用高优先级 Alert 展示每一条普通提示，否则真正的风险提醒会被淹没。",
              "不要让 Skeleton 或 Spinner 长时间替代真实内容；如果加载超过合理时长，应补充明确说明或失败反馈。"
            ]
          },
          {
            title: "状态与变体",
            body: [
              "首批反馈文档覆盖 success、warning、danger、info 几类语义状态，以及 loading、empty、in-progress 等交互阶段。",
              "Badge、Tag、Progress、Alert、Skeleton 和 Spinner 分别对应不同强度的反馈层级，选择时应先判断是否会打断用户主流程。"
            ]
          },
          {
            title: "交互示例",
            body: [
              "例如在 API Key 列表中，用 Badge 标识状态、用 Alert 呈现失败原因、用 Spinner 或 Skeleton 承接短暂加载。",
              "涉及批量任务时，可以用 Progress 展示完成度，同时在任务结束后切换为明确的成功或失败文案。"
            ]
          },
          {
            title: "代码片段",
            body: [
              "静态示例：<Alert tone=\"warning\" title=\"域名即将过期\">请在 3 天内完成续费。</Alert>。",
              "静态示例：<Badge variant=\"success\">运行中</Badge> 与 <Progress value={64} aria-label=\"同步进度\" /> 组合展示状态。"
            ]
          },
          {
            title: "设计规范",
            body: [
              "反馈组件的颜色必须复用语义色 token，让 success、warning、danger 等状态在全站保持同一套认知映射。",
              "Skeleton 和 Spinner 只用于短暂加载反馈，不应替代真正的空状态说明。"
            ]
          }
        ]
      }
    ]
  },
  {
    id: "overlays-utilities",
    title: "Overlays & Utilities",
    chineseTitle: "弹层与工具型原语",
    summary: "提供弹层、提示层、滚动区域和复制等辅助能力。",
    overviewDescription: "这组能力主要解决复杂交互和信息补充，不改变主页面结构，但决定整个系统的细节完成度。",
    sectionIds: ["overlays-utilities"],
    components: [
      {
        id: "overlay",
        title: "Overlay",
        chineseTitle: "弹层",
        summary: "统一对话框、抽屉、聚焦管理和背景锁定。",
        sectionIds: ["overlays-utilities"],
        api: [
          {
            prop: "title",
            type: "string",
            defaultValue: '""',
            description: "为对话框或抽屉提供清晰标题，帮助用户理解当前弹层任务。"
          },
          {
            prop: "closeOnBackdrop",
            type: "boolean",
            defaultValue: "false",
            description: "控制点击遮罩时是否允许关闭，适配轻量预览与需要强确认的两类场景。"
          },
          {
            prop: "onClose",
            type: "() => void",
            defaultValue: "required",
            description: "统一弹层关闭出口，承接 Esc、关闭按钮和遮罩点击等收尾动作。"
          }
        ],
        docSections: [
          {
            title: "适用场景",
            body: [
              "用于承接对话框、抽屉等需要临时打断主流程的交互，同时统一 focus trap、背景锁定与 portal 挂载。",
              "当页面需要补充配置、确认危险操作或展示分步信息时，应优先使用 Overlay 原语，而不是页面里手写 fixed panel。"
            ]
          },
          {
            title: "不适用场景",
            body: [
              "不要把轻量提示或只读补充说明做成 Overlay；这类场景更适合 Tooltip、Popover 或页内提示块。",
              "不要在同一时刻堆叠多个业务弹层，除非流程明确要求，否则会让焦点与关闭语义失控。"
            ]
          },
          {
            title: "状态与变体",
            body: [
              "当前真实示例覆盖 dialog 与 drawer 两种壳层，重点验证 focus trap、closeOnBackdrop 与统一 footer 行为。",
              "弹层的宽度、关闭方式和 footer 组合应作为变体处理，但背景锁定和焦点管理必须保持同一套规则。"
            ]
          },
          {
            title: "交互示例",
            body: [
              "设计系统首页顶部已挂出打开对话框与打开抽屉两个真实入口，用于验证共享壳层而不是业务专属样式。",
              "在弹层内部嵌入搜索、告警和键值摘要时，应确保 Tab 顺序与关闭行为仍然稳定。"
            ]
          },
          {
            title: "设计规范",
            body: [
              "弹层首先解决交互收束与焦点管理，不应承担页面级布局职责。",
              "所有对话框和抽屉都应通过统一 overlay layer 渲染，避免每个业务模块各自实现 portal 与 scroll lock。"
            ]
          }
        ]
      },
      {
        id: "tooltip-popover",
        title: "Tooltip & Popover",
        chineseTitle: "提示层与浮层",
        summary: "承接轻量提示和补充操作面板。",
        sectionIds: ["overlays-utilities"],
        api: [
          {
            prop: "TooltipContent",
            type: "ReactNode",
            defaultValue: "required",
            description: "承载 hover 或 focus 后出现的简短说明文案。"
          },
          {
            prop: "PopoverContent",
            type: "ReactNode",
            defaultValue: "required",
            description: "用于展示补充操作或上下文信息面板，内容可以比 tooltip 更丰富。"
          },
          {
            prop: "Trigger",
            type: "interactive element",
            defaultValue: "required",
            description: "定义触发提示层或浮层的入口，保证 hover、focus 与 click 行为一致。"
          }
        ],
        docSections: [
          {
            title: "适用场景",
            body: [
              "Tooltip 用于承载简短解释、术语说明或图标按钮提示；Popover 用于展示补充操作面板和上下文设置。",
              "当页面需要在不离开当前上下文的情况下补充说明或附加动作时，应优先考虑这一组轻量浮层。"
            ]
          },
          {
            title: "不适用场景",
            body: [
              "不要把长篇文档、表单流程或危险确认放进 Tooltip 或 Popover；这类场景应升级为 Overlay 或独立页面。",
              "Tooltip 不应用来承载必须阅读的信息，因为用户在移动端或键盘场景下不一定稳定触发悬停。"
            ]
          },
          {
            title: "状态与变体",
            body: [
              "当前预览重点覆盖 hover / focus 提示与 click 打开的快捷面板两类模式，帮助区分 Tooltip 和 Popover 的职责边界。",
              "这组组件的关键变体不是颜色，而是内容密度、触发方式与是否允许继续操作。"
            ]
          },
          {
            title: "交互示例",
            body: [
              "真实示例同时展示聚焦提示和快捷面板，便于验证 tooltip 文案、popover 操作区与触发器之间的距离感。",
              "如果同一个图标既需要解释又需要动作，优先判断用户真正需要的是提示还是操作面板，避免两者叠加。"
            ]
          },
          {
            title: "设计规范",
            body: [
              "Tooltip 文案应短促直接，Popover 内容应围绕当前上下文，不要让用户在浮层里重新理解一套页面结构。",
              "两类浮层都应复用统一的定位、层级和间距语言，避免每个业务入口呈现不同的悬浮体验。"
            ]
          }
        ]
      },
      {
        id: "copy-utility",
        title: "Copy utility",
        chineseTitle: "复制工具",
        summary: "统一命令、链接和片段复制反馈。",
        sectionIds: ["overlays-utilities"],
        api: [
          {
            prop: "value",
            type: "string",
            defaultValue: '""',
            description: "定义要复制到剪贴板的命令、链接或代码片段内容。"
          },
          {
            prop: "children",
            type: "ReactNode",
            defaultValue: '"复制"',
            description: "控制按钮展示文案，让复制动作可以适配命令、链接和字段值等不同语境。"
          },
          {
            prop: "copiedLabel",
            type: "string",
            defaultValue: '"已复制"',
            description: "复制成功后的即时反馈文案，帮助用户确认动作已经完成。"
          }
        ],
        docSections: [
          {
            title: "适用场景",
            body: [
              "用于命令行指令、API key 前缀、访问链接和代码片段复制，让用户在高频操作中得到统一反馈。",
              "当页面包含需要重复复制的短文本时，应优先使用 Copy utility，而不是自己实现按钮与成功提示。"
            ]
          },
          {
            title: "不适用场景",
            body: [
              "不要把长篇正文或整块富文本直接交给 Copy utility；这类场景更适合下载、导出或专门的代码块复制方案。",
              "如果内容本身不可见或用户无法判断复制对象，也不应只放一个复制按钮而不补充上下文说明。"
            ]
          },
          {
            title: "状态与变体",
            body: [
              "当前预览覆盖测试命令复制、Playwright 命令复制和片段复制反馈，重点验证默认态与已复制态的切换。",
              "复制工具的主要变体来自文案语境与所在容器，而不是重新设计一套独立按钮样式。"
            ]
          },
          {
            title: "交互示例",
            body: [
              "设计系统首页基础层与 Overlays & Utilities 区块都保留了复制命令按钮，方便验证不同容器中的反馈一致性。",
              "如果复制动作出现在卡片、代码示例和工具栏中，应保持相同的成功提示和可聚焦行为。"
            ]
          },
          {
            title: "设计规范",
            body: [
              "复制按钮必须让用户知道将要复制什么内容，避免只显示抽象动词导致误操作。",
              "复制反馈应短促、明确且不会打断主流程，优先使用同一套 success 文案和按钮状态切换。"
            ]
          }
        ]
      }
    ]
  }
];
