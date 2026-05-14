import { Bell, CircleAlert, Mail, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";

import { Alert } from "../../shared/alert";
import { Avatar } from "../../shared/avatar";
import { Badge } from "../../shared/badge";
import { Breadcrumb, BreadcrumbCurrent, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../../shared/breadcrumb";
import { Button } from "../../shared/button";
import { Card, CardBody, CardFooter, CardHeader } from "../../shared/card";
import { CopyButton } from "../../shared/copy-button";
import { Divider } from "../../shared/divider";
import { EmptyState } from "../../shared/empty-state";
import { Checkbox, FormField, MultiSelect, Radio, SearchInput, SelectInput, TextareaInput } from "../../shared/form";
import { Icon } from "../../shared/icon";
import { KVList } from "../../shared/kv-list";
import { MetricCard } from "../../shared/metric-card";
import { Page, PageBody, PageHeader, PageMain, PageSidebar, PageToolbar } from "../../shared/page-layout";
import { Pagination } from "../../shared/pagination";
import { Popover, PopoverContent, PopoverTrigger } from "../../shared/popover";
import { Progress } from "../../shared/progress";
import { ScrollArea, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from "../../shared/scroll-area";
import { Skeleton } from "../../shared/skeleton";
import { Spinner } from "../../shared/spinner";
import { StepItem, Steps, StepsList } from "../../shared/steps";
import { Switch } from "../../shared/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeaderCell,
  TableRow
} from "../../shared/table";
import { Tabs, TabsList, TabsPanel, TabsTrigger } from "../../shared/tabs";
import { Tag } from "../../shared/tag";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../shared/tooltip";
import { Code, Heading, Kbd, Label, Muted, Text } from "../../shared/typography";
import { FilterBar, FilterBarActions, FilterBarSummary } from "../../shared/filter-bar";
import { DesignSystemQuickActions, Swatch, ThemeShowcaseCard, TokenRow } from "./designSystemPreviewParts";
import { designSystemExampleStyles, designSystemPageStyles, designSystemSharedStyles } from "./designSystemStyles";
import type { DesignSystemSectionId } from "./designSystemContent";

export interface DesignSystemSection {
  id: DesignSystemSectionId;
  title: string;
  chineseTitle: string;
  sprint: string;
  summary: string;
  primitives: string[];
  coverage: string[];
  checklist: string[];
  preview: ReactNode;
}

const demoMultiSelectOptions = [
  { label: "异常账号", value: "exceptions" },
  { label: "近 7 天活跃", value: "7d" },
  { label: "管理员创建", value: "admin" }
];

const demoKVListItems = [
  { key: "环境", value: "Prod" },
  { key: "区域", value: "APAC", hint: "默认" },
  { key: "健康度", value: "98.6%" }
];

export const designSystemSections: DesignSystemSection[] = [
  {
    id: "foundations",
    title: "Foundations",
    chineseTitle: "基础层",
    sprint: "基础",
    summary: "锁定设计原则、发布节奏、预览锚点与文档入口，保证后续原语只做填充，不再重构页面结构。",
    primitives: ["Design tokens", "Preview map", "Docs index", "Visual regression entry"],
    coverage: ["设计原则", "Sprint 节奏", "预览分区锚点", "文档与回归约束"],
    checklist: ["13 个 section id 固定", "README/CHANGELOG 对应同一分区地图", "light/dark 回归入口一致"],
    preview: (
      <div style={designSystemExampleStyles.previewGrid}>
        <div style={designSystemExampleStyles.twoColumnGrid}>
          {[
            ["路由", "/design-system"],
            ["当前目标", "Public showcase"],
            ["系统范围", " 原语集成"],
            ["视觉回归", "Playwright light/dark"]
          ].map(([label, value]) => (
            <div key={label} style={designSystemSharedStyles.previewCard}>
              <small>{label}</small>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
        <div style={designSystemExampleStyles.twoColumnGrid}>
          <div style={designSystemSharedStyles.previewCard}>
            <small>Usage rules</small>
            <ul style={designSystemPageStyles.denseList}>
              <li>原语统一走 token，不在业务层重新定义视觉变量。</li>
              <li>新增页面先从 `/design-system` 找已有模式，再决定是否扩原语。</li>
              <li>每个 section 都对应文档和回归锚点。</li>
            </ul>
          </div>
          <DesignSystemQuickActions />
        </div>
      </div>
    )
  },
  {
    id: "color-theme",
    title: "Color & Theme",
    chineseTitle: "色彩与主题",
    sprint: "已接入",
    summary: "展示品牌色、语义色和 light/dark 主题入口，后续把真实组件的主题差异都收敛到这里校验。",
    primitives: ["Brand tokens", "Semantic tokens", "Theme toggles"],
    coverage: ["品牌色", "语义色", "主题切换", "对比度观察点"],
    checklist: ["light/dark 均可截图", "token 名称与 docs 一致", "不依赖业务页颜色说明"],
    preview: (
      <div style={designSystemExampleStyles.previewGrid}>
        <div style={designSystemExampleStyles.twoColumnGrid}>
          <Swatch name="Brand / 500" hex="#ff7a00" varName="--brand-500" />
          <Swatch name="Brand Soft" hex="#ffb366" varName="--brand-soft-500" />
          <Swatch name="Success" hex="#22c55e" varName="--success-500" />
          <Swatch name="Danger" hex="#ef4444" varName="--danger-500" />
        </div>
        <div style={designSystemExampleStyles.twoColumnGrid}>
          <ThemeShowcaseCard description="浅色模式强调空间层级、边框和柔和背景。" theme="light" title="Light preview" />
          <ThemeShowcaseCard description="深色模式保持同一套 brand/semantic 语言，只替换表面和文本密度。" theme="dark" title="Dark preview" />
        </div>
      </div>
    )
  },
  {
    id: "layout-spacing",
    title: "Layout & Spacing",
    chineseTitle: "布局与间距",
    sprint: "基础",
    summary: "先把页面骨架、栅格与空间尺度摆清楚，为 PageLayout、Card 和表单节奏预留稳定容器。",
    primitives: ["PageLayout", "Section spacing", "Container rhythm", "FilterBar"],
    coverage: ["4px 网格", "双栏 section 容器", "信息密度层级"],
    checklist: ["移动端自动折行", "分区元信息与预览区可独立扩展", "后续示例注入不改外层布局"],
    preview: (
      <div style={designSystemExampleStyles.previewGrid}>
        <div style={designSystemExampleStyles.twoColumnGrid}>
          {[4, 8, 12, 16, 24, 32].map((value) => (
            <div key={value} style={designSystemSharedStyles.previewCard}>
              <small>{`--space-${value / 4}`}</small>
              <span
                aria-hidden="true"
                style={{
                  display: "block",
                  height: "12px",
                  width: `${value * 3}px`,
                  maxWidth: "100%",
                  borderRadius: "999px",
                  background: "var(--brand-500, #ff7a00)"
                }}
              />
              <strong>{`${value}px`}</strong>
            </div>
          ))}
        </div>
        <div style={designSystemSharedStyles.previewCard}>
          <small>PageLayout preview</small>
          <div style={designSystemExampleStyles.fullWidthCard}>
            <Page as="div">
              <PageHeader
                actions={<Button size="sm" variant="secondary">导出</Button>}
                description="统一页面头部、操作区与内容区节奏。"
                kicker="账号中心"
                title="账号列表"
              />
              <PageToolbar>
                <FilterBar columns={3}>
                  <FormField label={<span className="sr-only">搜索布局</span>}>
                    <SearchInput aria-label="搜索布局" placeholder="搜索账号" />
                  </FormField>
                  <FormField label={<span className="sr-only">状态布局</span>}>
                    <SelectInput aria-label="状态布局" defaultValue="all">
                      <option value="all">全部状态</option>
                    </SelectInput>
                  </FormField>
                  <FormField label={<span className="sr-only">角色布局</span>}>
                    <SelectInput aria-label="角色布局" defaultValue="all">
                      <option value="all">全部角色</option>
                    </SelectInput>
                  </FormField>
                </FilterBar>
                <FilterBarActions>
                  <Button size="sm" variant="ghost">仅看异常</Button>
                </FilterBarActions>
              </PageToolbar>
              <PageBody hasSidebar>
                <PageMain>
                  <Card padding="sm">
                    <Text>主内容区</Text>
                  </Card>
                </PageMain>
                <PageSidebar>
                  <Card padding="sm">
                    <Text>侧栏摘要</Text>
                  </Card>
                </PageSidebar>
              </PageBody>
            </Page>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "elevation-radius",
    title: "Elevation & Radius",
    chineseTitle: "阴影与圆角",
    sprint: "基础",
    summary: "卡片、表单、弹层的外观层级先在这里归档，避免每个组件各自解释阴影和圆角档位。",
    primitives: ["Radius scale", "Elevation scale", "Surface transitions"],
    coverage: ["6 档圆角", "5 档阴影", "卡片层级示意"],
    checklist: ["token 名称与 preview 一致", "适用于 light/dark", "后续组件只引用 token"],
    preview: (
      <div style={designSystemExampleStyles.previewGrid}>
        <div style={designSystemExampleStyles.twoColumnGrid}>
          <TokenRow
            label="Radius / sm"
            hint="--radius-sm · 紧凑按钮与标签"
            value={<span aria-hidden="true" style={{ display: "block", width: "56px", height: "56px", borderRadius: "8px", background: "var(--brand-100, #ffe0c2)" }} />}
          />
          <TokenRow
            label="Radius / xl"
            hint="--radius-xl · 主要卡片"
            value={<span aria-hidden="true" style={{ display: "block", width: "56px", height: "56px", borderRadius: "24px", background: "var(--neutral-100, #f3f4f6)" }} />}
          />
          <div style={{ ...designSystemSharedStyles.previewCard, boxShadow: "var(--elevation-sm, 0 2px 6px rgba(17,17,17,.06))" }}>
            <small>Elevation / sm</small>
            <strong>低层级卡片</strong>
          </div>
          <div style={{ ...designSystemSharedStyles.previewCard, boxShadow: "var(--elevation-lg, 0 14px 32px rgba(17,17,17,.10))" }}>
            <small>Elevation / lg</small>
            <strong>高层级弹层</strong>
          </div>
        </div>
        <div style={designSystemExampleStyles.twoColumnGrid}>
          <div style={designSystemSharedStyles.previewCard}>
            <small>Default</small>
            <Button variant="secondary">普通态按钮</Button>
          </div>
          <div style={{ ...designSystemSharedStyles.previewCard, boxShadow: "var(--focus-ring)" }}>
            <small>Focus ring</small>
            <Button variant="primary">键盘焦点</Button>
          </div>
          <div style={{ ...designSystemSharedStyles.previewCard, transform: "translateY(-2px)", boxShadow: "var(--elevation-md)" }}>
            <small>Hover intent</small>
            <Button variant="subtle">浮起卡片</Button>
          </div>
          <div style={{ ...designSystemSharedStyles.previewCard, opacity: 0.65 }}>
            <small>Disabled</small>
            <Button disabled variant="secondary">
              不可用
            </Button>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "typography-content",
    title: "Typography & Content",
    chineseTitle: "排版与内容原子",
    sprint: "计划中",
    summary: "承接 Typography、Divider、Icon、Spinner、Skeleton 等原子，统一文案密度和内容骨架。",
    primitives: ["Typography", "Divider", "Icon", "Spinner", "Skeleton"],
    coverage: ["字号层级", "语义文字", "装饰原子", "加载占位"],
    checklist: ["中英文混排稳定", "caption/code/kbd 有固定槽位", "Skeleton/Spinner 保留回归入口"],
    preview: (
      <div style={designSystemExampleStyles.previewGrid}>
        <div style={designSystemSharedStyles.previewCard}>
          <small>Scale preview</small>
          <div style={{ display: "grid", gap: "8px" }}>
            <Heading as="h1" size="display-md">
              Design token preview
            </Heading>
            <Heading as="h2" size="title-lg">
              原语文案与信息层级
            </Heading>
            <Text size="lg">在这里统一验证 heading、body、muted、code 和快捷键标签的视觉节奏。</Text>
            <Muted size="caption">后续页面不再自己写标题字号和辅助说明 class。</Muted>
            <div style={designSystemSharedStyles.chipRow}>
              <Code>--brand-500</Code>
              <Kbd keys={["Shift", "K"]} />
            </div>
          </div>
        </div>
        <div style={designSystemSharedStyles.previewCard}>
          <small>Atoms in use</small>
          <div style={{ display: "grid", gap: "12px" }}>
            <div style={designSystemSharedStyles.chipRow}>
              <Icon icon={Mail} label="邮件" tone="accent" />
              <Icon decorative icon={Bell} tone="muted" />
              <Spinner showLabel size="sm" />
            </div>
            <Divider />
            <Label htmlFor="design-typography-search">搜索标签</Label>
            <SearchInput aria-label="排版预览搜索" id="design-typography-search" placeholder="搜索原语或 token" />
            <Skeleton announce rounded shape="text" width="72%" />
            <Skeleton animated height={44} rounded width="100%" />
          </div>
        </div>
      </div>
    )
  },
  {
    id: "buttons-actions",
    title: "Buttons & Actions",
    chineseTitle: "按钮与动作",
    sprint: "迭代中",
    summary: "按钮体系已经存在一部分，这里先固定动作位布局，后续再把 subtle、xs、copy 等增强态逐步接入。",
    primitives: ["Button", "ButtonLink", "ButtonAnchor", "CopyButton"],
    coverage: ["主要/次要动作", "链接态", "icon-only", "复制反馈"],
    checklist: ["动作组顺序稳定", "禁用/加载态预留", "视觉回归不依赖业务数据"],
    preview: (
      <div style={designSystemExampleStyles.previewGrid}>
        <div style={designSystemExampleStyles.twoColumnGrid}>
          <div style={designSystemSharedStyles.previewCard}>
            <small>Primary action</small>
            <div style={designSystemSharedStyles.chipRow}>
              <Button variant="primary">保存变更</Button>
              <Button variant="secondary">查看历史</Button>
            </div>
          </div>
          <div style={designSystemSharedStyles.previewCard}>
            <small>Lightweight action</small>
            <div style={designSystemSharedStyles.chipRow}>
              <Button variant="subtle">稍后处理</Button>
              <Button variant="ghost">仅看异常</Button>
            </div>
          </div>
          <div style={designSystemSharedStyles.previewCard}>
            <small>Utility action</small>
            <div style={designSystemSharedStyles.chipRow}>
              <Button aria-label="更多操作" iconOnly size="xs" variant="icon">
                <Icon decorative icon={CircleAlert} size={14} />
              </Button>
              <CopyButton value="pnpm test:web">复制命令</CopyButton>
            </div>
          </div>
          <div style={designSystemSharedStyles.previewCard}>
            <small>Danger</small>
            <div style={designSystemSharedStyles.chipRow}>
              <Button variant="danger">停用账号</Button>
              <Button isLoading loadingLabel="保存中" variant="primary">
                保存
              </Button>
            </div>
          </div>
        </div>
        <div style={designSystemSharedStyles.previewCard}>
          <small>Size matrix</small>
          <div style={designSystemExampleStyles.denseGrid}>
            <Button size="xs" variant="secondary">XS 动作</Button>
            <Button size="sm" variant="secondary">SM 动作</Button>
            <Button size="md" variant="primary">MD 动作</Button>
            <Button disabled size="md" variant="secondary">不可用</Button>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "form-inputs",
    title: "Form Inputs",
    chineseTitle: "输入控件",
    sprint: "计划中",
    summary: "TextInput、Select、Textarea 已有基础能力，但预览页先为 SearchInput、MultiSelect 和组合表单节奏预留固定区域。",
    primitives: ["TextInput", "SelectInput", "TextareaInput", "FormField", "SearchInput", "MultiSelect", "FilterBar"],
    coverage: ["字段容器", "标签/帮助文案", "前后缀输入", "搜索与多选"],
    checklist: ["单字段与组合字段分开展示", "错误/帮助/禁用态预留", "后续真实示例不改 section id"],
    preview: (
      <div style={designSystemExampleStyles.previewGrid}>
        <div style={designSystemExampleStyles.twoColumnGrid}>
          <div style={designSystemSharedStyles.previewCard}>
            <FormField description="前缀搜索与清除动作都在原语里统一。" label="搜索账号">
              <SearchInput aria-label="搜索账号示例" placeholder="搜索 ID / 地址 / 创建人" />
            </FormField>
          </div>
          <div style={designSystemSharedStyles.previewCard}>
            <FormField description="组合筛选、标签筛选等统一走 headless MultiSelect。" label="标签筛选">
              <MultiSelect aria-label="标签筛选示例" defaultValue={["exceptions"]} options={demoMultiSelectOptions} />
            </FormField>
          </div>
          <div style={designSystemSharedStyles.previewCard}>
            <FormField label="状态">
              <SelectInput aria-label="状态示例" defaultValue="enabled">
                <option value="enabled">启用</option>
                <option value="disabled">停用</option>
                <option value="archived">已归档</option>
              </SelectInput>
            </FormField>
          </div>
          <div style={designSystemSharedStyles.previewCard}>
            <FormField description="多行文案、错误说明和保存提示都从同一字段结构出去。" label="内部备注">
              <TextareaInput aria-label="内部备注示例" defaultValue="这个账号主要给 QA 和集成环境使用。" />
            </FormField>
          </div>
        </div>
        <div style={designSystemExampleStyles.twoColumnGrid}>
          <div style={designSystemSharedStyles.previewCard}>
            <FormField description="禁用态保持同样高度，不改变布局节奏。" label="禁用搜索">
              <SearchInput aria-label="禁用搜索示例" disabled placeholder="搜索暂不可用" />
            </FormField>
          </div>
          <div style={designSystemSharedStyles.previewCard}>
            <FormField description="只读字段用于展示已锁定配置。" label="只读备注">
              <TextareaInput aria-label="只读备注示例" readOnly value="由系统策略自动生成，当前不可编辑。" />
            </FormField>
          </div>
        </div>
        <div style={designSystemSharedStyles.previewCard}>
          <small>FilterBar composition</small>
          <div style={designSystemExampleStyles.fullWidthCard}>
            <PageToolbar>
              <FilterBar columns={3}>
                <FormField label={<span className="sr-only">搜索筛选条</span>}>
                  <SearchInput aria-label="搜索筛选条" placeholder="搜索邮箱或显示名" />
                </FormField>
                <FormField label={<span className="sr-only">角色筛选条</span>}>
                  <SelectInput aria-label="角色筛选条" defaultValue="all">
                    <option value="all">全部角色</option>
                    <option value="admin">管理员</option>
                  </SelectInput>
                </FormField>
                <FormField label={<span className="sr-only">状态筛选条</span>}>
                  <SelectInput aria-label="状态筛选条" defaultValue="all">
                    <option value="all">全部状态</option>
                    <option value="active">正常</option>
                  </SelectInput>
                </FormField>
              </FilterBar>
              <FilterBarActions>
                <Button size="sm" variant="ghost">仅看异常</Button>
              </FilterBarActions>
              <FilterBarSummary>共 12 条结果</FilterBarSummary>
            </PageToolbar>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "selection-controls",
    title: "Selection Controls",
    chineseTitle: "选择控件",
    sprint: "计划中",
    summary: "Switch 已有，Checkbox/Radio 还要补独立原子。这里先把单选、多选、开关拆成独立回归单元。",
    primitives: ["Switch", "Checkbox", "Radio", "CheckboxField", "RadioGroupField"],
    coverage: ["二元开关", "单项选择", "组选项", "状态排列"],
    checklist: ["checked/unchecked/disabled 明确", "键盘交互后续可测", "语义标签位固定"],
    preview: (
      <div style={designSystemExampleStyles.previewGrid}>
        <div style={designSystemExampleStyles.twoColumnGrid}>
          <div style={designSystemSharedStyles.previewCard}>
            <small>Switch</small>
            <Switch aria-label="通知开关" checked label="通知开关" />
          </div>
          <div style={designSystemSharedStyles.previewCard}>
            <small>Checkbox</small>
            <Checkbox aria-label="仅看异常" defaultChecked label="仅看异常" />
          </div>
          <div style={designSystemSharedStyles.previewCard}>
            <small>Radio</small>
            <Radio aria-label="按域名汇总" defaultChecked label="按域名汇总" name="selection-preview" />
          </div>
          <div style={designSystemSharedStyles.previewCard}>
            <small>Grouped controls</small>
            <div style={{ display: "grid", gap: "10px" }}>
              <Checkbox aria-label="保留归档账号" label="保留归档账号" variant="card" />
              <Radio aria-label="仅显示生产账号" label="仅显示生产账号" name="selection-preview-card" variant="card" />
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "navigation-wayfinding",
    title: "Navigation & Wayfinding",
    chineseTitle: "导航与路径",
    sprint: "计划中",
    summary: "Breadcrumb、Pagination、Tabs、Steps 会影响多个页面骨架，这里先给这四类导航各留稳定位置。",
    primitives: ["Breadcrumb", "Pagination", "Tabs", "Steps"],
    coverage: ["分段导航", "路径层级", "分页", "流程步骤"],
    checklist: ["可在单独 section 做视觉回归", "active/disabled/current 预留", "后续迁移旧导航时不改锚点"],
    preview: (
      <div style={designSystemExampleStyles.previewGrid}>
        <div style={designSystemExampleStyles.twoColumnGrid}>
          <div style={designSystemSharedStyles.previewCard}>
            <small>Breadcrumb trail</small>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#foundations">工作台</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#surfaces-cards">设计系统</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbCurrent>导航原语</BreadcrumbCurrent>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div style={designSystemSharedStyles.previewCard}>
            <small>Segmented tabs</small>
            <Tabs defaultValue="overview" variant="segmented">
              <TabsList aria-label="预览标签">
                <TabsTrigger value="overview">概览</TabsTrigger>
                <TabsTrigger value="tokens">Token</TabsTrigger>
                <TabsTrigger value="states">状态</TabsTrigger>
              </TabsList>
              <TabsPanel value="overview">同一套原语可直接承接顶栏和 landing 页的 tab 切换。</TabsPanel>
              <TabsPanel value="tokens">Token 预览</TabsPanel>
              <TabsPanel value="states">状态矩阵</TabsPanel>
            </Tabs>
          </div>
          <div style={designSystemSharedStyles.previewCard}>
            <small>Pagination bar</small>
            <div style={designSystemExampleStyles.fullWidthCard}>
              <Pagination onChange={() => undefined} page={2} pageSize={20} total={120} />
            </div>
          </div>
          <div style={designSystemSharedStyles.previewCard}>
            <small>Steps tracker</small>
            <Steps currentStep={2}>
              <StepsList>
                <StepItem description="锁定 token 与兼容别名" step={1} title="Foundation" />
                <StepItem description="接入共享原语与页面 shim" step={2} title="Components" />
                <StepItem description="跑回归与截图" step={3} title="Verification" />
              </StepsList>
            </Steps>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "surfaces-cards",
    title: "Surfaces & Cards",
    chineseTitle: "卡片与容器",
    sprint: "计划中",
    summary: "用于承接 Card、EmptyState 以及页面级容器组合，明确 header/body/footer 和强调态容器的边界。",
    primitives: ["Card", "CardHeader", "CardBody", "CardFooter", "EmptyState"],
    coverage: ["基础卡片", "数据卡片", "状态卡片", "空状态容器"],
    checklist: ["Card 变体与 padding 位置固定", "EmptyState 不抢其他 section 位置", "容器层级与 tokens 对齐"],
    preview: (
      <div style={designSystemExampleStyles.previewGrid}>
        <div style={designSystemExampleStyles.twoColumnGrid}>
          <Card>
            <CardHeader>
              <Heading as="h3" size="title-md">
                Base card
              </Heading>
              <Muted size="caption">默认容器</Muted>
            </CardHeader>
            <CardBody>
              <Text>用于设置页、摘要区、过滤器和普通信息分组。</Text>
            </CardBody>
            <CardFooter>
              <Button size="sm" variant="secondary">
                查看详情
              </Button>
            </CardFooter>
          </Card>
          <Card tone="brand" variant="data">
            <CardHeader>
              <Muted size="caption">Data card</Muted>
              <Heading as="h3" size="title-md">
                2,184
              </Heading>
            </CardHeader>
            <CardBody>
              <Text size="lg">最近 7 天收到的邮件</Text>
            </CardBody>
          </Card>
          <Card elevation="md" isInteractive tone="warning" variant="status">
            <CardHeader>
              <Heading as="h3" size="title-md">
                需要复核
              </Heading>
            </CardHeader>
            <CardBody>
              <Text>3 个账号连续 30 天无活动，建议清理或归档。</Text>
            </CardBody>
          </Card>
          <EmptyState
            actions={
              <Button size="sm" variant="primary">
                新建筛选
              </Button>
            }
            description="当前筛选条件下还没有结果，调整状态或创建人后会在这里刷新。"
            icon={<Icon decorative icon={Mail} tone="muted" />}
            title="暂无账号结果"
          />
        </div>
      </div>
    )
  },
  {
    id: "data-display",
    title: "Data Display & Charts",
    chineseTitle: "数据展示",
    sprint: "现有 + S5 补充",
    summary: "Table、Chart 已经有基础原语，但预览页要额外承接 KVList、Avatar 和数据密度组合的回归面。",
    primitives: ["Table", "Chart", "KVList", "Avatar", "MetricCard"],
    coverage: ["表格容器", "图表主题", "键值列表", "头像与身份块"],
    checklist: ["可离线渲染", "light/dark 数据配色稳定", "后续不会依赖真实接口数据"],
    preview: (
      <div style={designSystemExampleStyles.previewGrid}>
        <div style={designSystemExampleStyles.twoColumnGrid}>
          <div style={designSystemSharedStyles.previewCard}>
            <small>Avatar stack</small>
            <div style={designSystemSharedStyles.chipRow}>
              <Avatar name="Will Xue" />
              <Avatar name="Ops Team" shape="square" />
              <Avatar fallback="QA" size="lg" />
            </div>
          </div>
          <div style={designSystemSharedStyles.previewCard}>
            <small>KV list</small>
            <KVList density="compact" items={demoKVListItems} />
          </div>
        </div>
        <div style={designSystemExampleStyles.twoColumnGrid}>
          <MetricCard
            className="panel workspace-card"
            caption="+8.4%"
            detail="较上周提升"
            kicker="KPI"
            title="活跃账号"
            tone="hero"
            value="128"
          />
          <MetricCard
            className="panel workspace-card"
            detail="可用"
            kicker="活跃密钥"
            title="当前可用"
            value="6"
            valueSize="lg"
          />
        </div>
        <div style={designSystemSharedStyles.previewCard}>
          <small>Table shell</small>
          <div style={designSystemExampleStyles.fullWidthCard}>
            <TableContainer density="compact" variant="liquid">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>ID</TableHeaderCell>
                    <TableHeaderCell>地址</TableHeaderCell>
                    <TableHeaderCell nowrap>状态</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>acct_001</TableCell>
                    <TableCell>ops@wemail.ai</TableCell>
                    <TableCell>
                      <Badge variant="success">启用</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>acct_002</TableCell>
                    <TableCell>growth@wemail.ai</TableCell>
                    <TableCell>
                      <Badge variant="warning">停用</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "feedback-status",
    title: "Feedback & Status",
    chineseTitle: "反馈与状态",
    sprint: "规划中",
    summary: "Tag、Badge、Progress、Alert、Spinner、Skeleton 等都会在这里汇总，避免状态型原语分散到多个页面。",
    primitives: ["Tag", "Badge", "Progress", "Alert", "Spinner", "Skeleton"],
    coverage: ["静态状态", "进度反馈", "页内提示", "加载骨架"],
    checklist: ["语义色与 token 对齐", "成功/警告/错误态都有入口", "快照稳定后再提交基线"],
    preview: (
      <div style={designSystemExampleStyles.previewGrid}>
        <div style={designSystemExampleStyles.twoColumnGrid}>
          <div style={designSystemSharedStyles.previewCard}>
            <small>Tag / Badge</small>
            <div style={{ ...designSystemSharedStyles.chipRow, alignItems: "center" }}>
              <Tag dot size="md" variant="brand">
                新版
              </Tag>
              <Tag icon={<Icon decorative icon={ShieldCheck} size={14} />} size="md" variant="info">
                合规
              </Tag>
              <Badge size="md" variant="success">
                启用
              </Badge>
              <Badge size="md" variant="danger">
                阻塞
              </Badge>
            </div>
          </div>
          <div style={designSystemSharedStyles.previewCard}>
            <small>Alert</small>
            <Alert title="请先核对旧页面视觉回归" variant="warning">
              design token 已切到共享入口后，建议优先走一轮 light / dark 截图核对。
            </Alert>
          </div>
          <div style={designSystemSharedStyles.previewCard}>
            <small>Progress</small>
            <Progress showValueLabel value={68} />
          </div>
          <div style={designSystemSharedStyles.previewCard}>
            <small>Loading states</small>
            <div style={{ display: "grid", gap: "12px" }}>
              <Spinner showLabel size="sm" />
              <Skeleton animated rounded width="100%" />
              <Skeleton height={12} rounded shape="text" width="62%" />
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "overlays-utilities",
    title: "Overlays & Utilities",
    chineseTitle: "弹层与工具型原语",
    sprint: "规划中",
    summary: "Overlay 现有，Tooltip/Popover/ScrollArea 还未归档。这里作为所有弹层和工具型原语的统一回归面。",
    primitives: ["Overlay", "Modal", "Drawer", "Tooltip", "Popover", "ScrollArea", "CopyButton"],
    coverage: ["模态层", "抽屉", "悬浮提示", "滚动容器", "辅助动作"],
    checklist: ["焦点管理后续单测/e2e 可挂载", "视觉回归截图只截稳定壳层", "工具型原语不侵入其他分区"],
    preview: (
      <div style={designSystemExampleStyles.previewGrid}>
        <div style={designSystemExampleStyles.twoColumnGrid}>
          <div style={designSystemSharedStyles.previewCard}>
            <small>Tooltip / Popover</small>
            <div style={designSystemSharedStyles.chipRow}>
              <Tooltip>
                <TooltipTrigger aria-label="显示提示">聚焦提示</TooltipTrigger>
                <TooltipContent>统一的 hover / focus 提示层。</TooltipContent>
              </Tooltip>
              <Popover>
                <PopoverTrigger>打开快捷面板</PopoverTrigger>
                <PopoverContent>
                  <Text size="md">这里适合轻量筛选和补充配置，不适合长表单。</Text>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div style={designSystemSharedStyles.previewCard}>
            <small>Scroll / Utility</small>
            <ScrollArea aria-label="Design system scroll preview">
              <ScrollAreaViewport style={{ maxHeight: 120, overflow: "auto", paddingRight: 8 }}>
                <div style={{ display: "grid", gap: "8px" }}>
                  {Array.from({ length: 6 }, (_, index) => (
                    <Card key={index} padding="sm">
                      <Text>滚动项 {index + 1}</Text>
                    </Card>
                  ))}
                </div>
              </ScrollAreaViewport>
              <ScrollAreaScrollbar>
                <ScrollAreaThumb />
              </ScrollAreaScrollbar>
            </ScrollArea>
            <CopyButton value="pnpm exec playwright test -c apps/web/playwright.config.ts apps/web/e2e/design-system.spec.ts">
              复制回归命令
            </CopyButton>
          </div>
        </div>
        <div style={designSystemExampleStyles.twoColumnGrid}>
          <Card padding="sm" variant="status">
            <CardHeader>
              <Heading as="h3" size="title-md">
                Dialog shell
              </Heading>
            </CardHeader>
            <CardBody>
              <Text size="md">预览页不直接挂打开态 modal，避免挡住整页；统一壳层由 Overlay 原语与 e2e 共同验证。</Text>
            </CardBody>
          </Card>
          <Card padding="sm" tone="info" variant="status">
            <CardHeader>
              <Heading as="h3" size="title-md">
                Drawer shell
              </Heading>
            </CardHeader>
            <CardBody>
              <Text size="md">抽屉、tooltip、popover 共用同一套层级 token 与交互语义，真实打开态放到单测和后续示例页。</Text>
            </CardBody>
          </Card>
        </div>
      </div>
    )
  }
];

export function findDesignSystemSection(sectionId: DesignSystemSectionId): DesignSystemSection {
  const section = designSystemSections.find((item) => item.id === sectionId);

  if (!section) {
    throw new Error(`Unknown design system section: ${sectionId}`);
  }

  return section;
}
