import { visit } from "unist-util-visit";

/**
 * Map remark-directive nodes named "aside" to right-margin notes.
 *
 *   :::aside              block-level note, rendered as <aside class="marginnote">
 *   contents              (supports any markdown: paragraphs, lists, code, etc.)
 *   :::
 *
 *   :aside[short note]    inline note, rendered as <span class="marginnote">
 *                         so the surrounding paragraph stays intact
 *
 * Any directive whose name is NOT "aside" is restored to its literal source
 * text. This protects against false positives — e.g. micromark-extension-directive
 * eagerly matches `:2502` inside `[arXiv:2502.11089]` as a textDirective and
 * would otherwise garble the link.
 */

type Directive = {
  type: "containerDirective" | "leafDirective" | "textDirective";
  name: string;
  children?: unknown[];
  data?: { hName?: string; hProperties?: Record<string, unknown> };
};

type ParentLike = { children: unknown[] };

export default function remarkAsideDirective() {
  return (tree: unknown) => {
    visit(
      tree as Parameters<typeof visit>[0],
      (node, index, parent) => {
        if (
          node.type !== "containerDirective" &&
          node.type !== "textDirective" &&
          node.type !== "leafDirective"
        ) {
          return;
        }
        const directive = node as unknown as Directive;

        if (directive.name === "aside") {
          const data = (directive.data ??= {});
          data.hName = directive.type === "textDirective" ? "span" : "aside";
          data.hProperties = { class: "marginnote" };
          return;
        }

        // Not ours — restore the literal text so we don't break the surrounding
        // markdown (e.g. links, code, prose containing `:something`).
        if (!parent || typeof index !== "number") return;
        const literal = ":" + directive.name;
        const replacement: unknown[] = [{ type: "text", value: literal }];
        if (directive.children && directive.children.length > 0) {
          replacement.push(...directive.children);
        }
        (parent as ParentLike).children.splice(index, 1, ...replacement);
        return index + replacement.length;
      }
    );
  };
}
