// Fixes "Top-kkk" in the TOC for headings like `### Top-$k$ selection`.
// rehype-katex expands `$k$` into a tree with three text occurrences of `k`
// (MathML <mi>, <annotation>, and the HTML fallback). Astro's heading-text
// extractor concatenates all text descendants, producing "kkk" in the
// MarkdownHeading.text that PostTableOfContents consumes.
//
// This plugin runs after rehype-katex and, inside h1–h6 only, collapses each
// .katex subtree to a single text node holding the raw TeX source from the
// <annotation encoding="application/x-tex"> child. Trade-off: on-page headings
// also lose KaTeX styling (one tree feeds both the HTML and the headings list);
// keeping pretty math in headings would require duplicating the render pipeline.

interface Text {
  type: "text";
  value: string;
}
interface Element {
  type: "element";
  tagName: string;
  properties?: Record<string, unknown>;
  children: Node[];
}
interface Root {
  type: "root";
  children: Node[];
}
type Node = Text | Element | Root | { type: string; children?: Node[] };
interface Parent {
  children: Node[];
}

const HEADING_TAGS = new Set(["h1", "h2", "h3", "h4", "h5", "h6"]);

function isElement(node: Node): node is Element {
  return node.type === "element";
}

function findAnnotationText(node: Node): string | null {
  if (!isElement(node)) return null;
  if (
    node.tagName === "annotation" &&
    node.properties?.encoding === "application/x-tex"
  ) {
    return collectText(node);
  }
  for (const child of node.children ?? []) {
    const found = findAnnotationText(child);
    if (found !== null) return found;
  }
  return null;
}

function collectText(node: Node): string {
  if (node.type === "text") return (node as Text).value;
  if (!isElement(node)) return "";
  return (node.children ?? []).map(collectText).join("");
}

function rewriteKatexInHeading(parent: Parent): void {
  const children = parent.children;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (!isElement(child)) continue;

    const classes = (child.properties?.className ?? []) as string[];
    if (Array.isArray(classes) && classes.includes("katex")) {
      const tex = findAnnotationText(child) ?? collectText(child);
      children[i] = { type: "text", value: tex } satisfies Text;
      continue;
    }

    rewriteKatexInHeading(child);
  }
}

export default function rehypeKatexHeadingText() {
  return (tree: Root) => {
    const visit = (node: Node) => {
      if (isElement(node) && HEADING_TAGS.has(node.tagName)) {
        rewriteKatexInHeading(node);
        return;
      }
      if ("children" in node && Array.isArray((node as Parent).children)) {
        for (const child of (node as Parent).children) visit(child);
      }
    };
    visit(tree);
  };
}
