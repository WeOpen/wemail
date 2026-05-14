import type { DesignSystemApiField, DesignSystemCodeSample, DesignSystemComponentDoc, DesignSystemDocSection } from "./designSystemContent";
import { designSystemDocStyles, designSystemSharedStyles } from "./designSystemStyles";

interface DesignSystemDocContentProps {
  componentDoc: DesignSystemComponentDoc;
  groupTitle: string;
  sectionTitles: string[];
}

const COMPONENT_SECTION_ORDER = ["真实示例", "API 接口", "使用说明", "设计规范"] as const;

type ComponentSectionTitle = (typeof COMPONENT_SECTION_ORDER)[number];

function renderParagraphs(paragraphs: string[]) {
  return (
    <div style={designSystemDocStyles.paragraphGroup}>
      {paragraphs.map((paragraph) => (
        <p className="section-copy" key={paragraph} style={{ margin: 0 }}>
          {paragraph}
        </p>
      ))}
    </div>
  );
}

function getSectionBodyMap(docSections?: DesignSystemDocSection[]): Map<string, string[]> {
  return new Map((docSections ?? []).map((section) => [section.title, section.body]));
}

function renderCodeSamples(codeSamples: DesignSystemCodeSample[]) {
  return (
    <div style={designSystemDocStyles.codeSampleList}>
      {codeSamples.map((sample) => (
        <article key={sample.title} style={designSystemDocStyles.codeSampleCard}>
          <h3 style={designSystemDocStyles.codeSampleHeading}>{sample.title}</h3>
          <pre style={designSystemDocStyles.codeSamplePre}>
            <code>{sample.code}</code>
          </pre>
        </article>
      ))}
    </div>
  );
}

function renderApiTable(apiFields: DesignSystemApiField[]) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th align="left" scope="col">prop</th>
            <th align="left" scope="col">type</th>
            <th align="left" scope="col">default</th>
            <th align="left" scope="col">description</th>
          </tr>
        </thead>
        <tbody>
          {apiFields.map((field) => (
            <tr key={field.prop}>
              <td>{field.prop}</td>
              <td>
                <code>{field.type}</code>
              </td>
              <td>
                <code>{field.defaultValue}</code>
              </td>
              <td>{field.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function getComponentSections(componentDoc: DesignSystemComponentDoc, sectionTitles: string[]): Array<{ title: ComponentSectionTitle; body: string[] }> {
  const sectionBodyMap = getSectionBodyMap(componentDoc.docSections);
  const designNoteBodies = (componentDoc.docSections ?? [])
    .filter((section) => !["适用场景", "不适用场景", "状态与变体", "设计规范"].includes(section.title))
    .flatMap((section) => section.body);

  const usageBody = [
    componentDoc.summary,
    ...(sectionBodyMap.get("适用场景") ?? ["当前文档内容仍在补齐中，现阶段请先结合真实示例确认适用场景。"]),
    ...(sectionBodyMap.get("不适用场景") ?? ["当当前任务只需要文本跳转或静态信息承载时，应优先考虑更轻量的原语。"])
  ];

  const fallbackByTitle: Record<ComponentSectionTitle, string[]> = {
    "真实示例": ["下方会继续保留该组件关联的 live preview，用来验证真实交互与文档说明是否一致。"],
    "API 接口": [
      "API 表结构会在后续任务中补齐；当前阶段先固定阅读顺序与占位区块。",
      componentDoc.codeSamples?.length ? "当前可先参考下方代码示例了解已接入的调用方式。" : "当前组件的调用方式将在后续任务中补充为结构化 API 表。"
    ],
    "使用说明": usageBody,
    "设计规范":
      sectionBodyMap.get("设计规范") ??
      sectionBodyMap.get("状态与变体") ??
      (sectionTitles.length
        ? [`当前页面优先覆盖 ${sectionTitles.join("、")} 相关的状态与变体预览。`]
        : designNoteBodies.length
          ? designNoteBodies
          : ["设计规范会持续沉淀到统一模板中，避免组件说明散落在页面实现里。"])
  };

  return COMPONENT_SECTION_ORDER.map((title) => ({
    title,
    body: fallbackByTitle[title]
  }));
}

export function DesignSystemDocContent({ componentDoc, groupTitle, sectionTitles }: DesignSystemDocContentProps) {
  const sections = getComponentSections(componentDoc, sectionTitles);

  return (
    <section className="panel workspace-card page-panel design-system-panel" style={{ ...designSystemDocStyles.shell, ...designSystemSharedStyles.stack }}>
      <header style={designSystemDocStyles.header}>
        <p className="panel-kicker">{groupTitle} / Component</p>
        <h1 style={{ margin: 0 }}>{componentDoc.title}</h1>
        <strong style={{ color: "var(--text, #111827)" }}>{componentDoc.chineseTitle}</strong>
        <div style={designSystemSharedStyles.chipRow}>
          {sectionTitles.map((sectionTitle) => (
            <span key={sectionTitle} style={designSystemSharedStyles.chip}>
              {sectionTitle}
            </span>
          ))}
        </div>
      </header>
      <div style={designSystemDocStyles.sectionList}>
        {sections.map((section) => {
          const isExampleSection = section.title === "真实示例";
          const isGuidanceSection = section.title === "API 接口" || section.title === "设计规范";

          return (
            <section
              aria-label={`文档章节：${section.title}`}
              key={section.title}
              style={{
                ...designSystemDocStyles.section,
                ...(isExampleSection ? designSystemDocStyles.exampleNote : null),
                ...(isGuidanceSection ? designSystemDocStyles.guidanceNote : null)
              }}
            >
              <h2 style={designSystemDocStyles.sectionHeading}>{section.title}</h2>
              {section.title === "API 接口" && componentDoc.api?.length ? renderApiTable(componentDoc.api) : renderParagraphs(section.body)}
            </section>
          );
        })}
        {componentDoc.codeSamples?.length ? (
          <section
            aria-label={`代码示例：${componentDoc.title}`}
            role="region"
            style={{ ...designSystemDocStyles.section, ...designSystemDocStyles.guidanceNote }}
          >
            <h2 style={designSystemDocStyles.sectionHeading}>代码示例</h2>
            {renderCodeSamples(componentDoc.codeSamples)}
          </section>
        ) : null}
      </div>
    </section>
  );
}
