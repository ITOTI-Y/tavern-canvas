<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import type { AssistantSummaryRecord } from "../../modules/assistant/assistant_session.js";
import styles from "./assistant.module.css";

const props = defineProps<{
  readonly summaries: readonly AssistantSummaryRecord[];
  readonly selectedId: string | null;
}>();

const emit = defineEmits<{
  select: [id: string];
}>();

const { t } = useI18n();

const NODE_WIDTH = 132;
const NODE_HEIGHT = 30;
const COLUMN_GAP = 40;
const ROW_GAP = 12;

interface GraphNode {
  readonly id: string;
  readonly label: string;
  readonly enabled: boolean;
  readonly x: number;
  readonly y: number;
}

interface GraphEdge {
  readonly id: string;
  readonly x1: number;
  readonly y1: number;
  readonly x2: number;
  readonly y2: number;
}

function depth_of(id: string, by_id: Map<string, AssistantSummaryRecord>): number {
  let depth = 0;
  let current = by_id.get(id)?.parent_id ?? null;
  // A malformed cycle would otherwise hang the render, so the walk is bounded by the node count.
  while (current !== null && depth <= by_id.size) {
    depth += 1;
    current = by_id.get(current)?.parent_id ?? null;
  }
  return depth;
}

const layout = computed(() => {
  const by_id = new Map(props.summaries.map((summary) => [summary.id, summary]));
  const rows_per_depth = new Map<number, number>();
  const positions = new Map<string, { x: number; y: number }>();
  const nodes: GraphNode[] = [];

  for (const summary of props.summaries) {
    const depth = depth_of(summary.id, by_id);
    const row = rows_per_depth.get(depth) ?? 0;
    rows_per_depth.set(depth, row + 1);
    const x = depth * (NODE_WIDTH + COLUMN_GAP);
    const y = row * (NODE_HEIGHT + ROW_GAP);
    positions.set(summary.id, { x, y });
    nodes.push({
      id: summary.id,
      label: summary.text.slice(0, 24) || t("assistant.summaries.untitled"),
      enabled: summary.enabled,
      x,
      y,
    });
  }

  const edges: GraphEdge[] = [];
  for (const summary of props.summaries) {
    const child = positions.get(summary.id);
    const parent = summary.parent_id === null ? undefined : positions.get(summary.parent_id);
    if (child && parent) {
      edges.push({
        id: `${summary.parent_id ?? ""}-${summary.id}`,
        x1: parent.x + NODE_WIDTH,
        y1: parent.y + NODE_HEIGHT / 2,
        x2: child.x,
        y2: child.y + NODE_HEIGHT / 2,
      });
    }
  }

  const width = Math.max(NODE_WIDTH, ...nodes.map((node) => node.x + NODE_WIDTH));
  const height = Math.max(NODE_HEIGHT, ...nodes.map((node) => node.y + NODE_HEIGHT));
  return { nodes, edges, width, height };
});
</script>

<template>
  <svg
    v-if="summaries.length > 0"
    :class="styles.summaryGraph"
    :viewBox="`0 0 ${layout.width} ${layout.height}`"
    :width="layout.width"
    :height="layout.height"
    role="img"
    :aria-label="t('assistant.summaries.graph_label')"
    data-testid="assistant-summary-graph"
  >
    <line
      v-for="edge in layout.edges"
      :key="edge.id"
      :x1="edge.x1"
      :y1="edge.y1"
      :x2="edge.x2"
      :y2="edge.y2"
      :class="styles.summaryGraphEdge"
    />
    <g
      v-for="node in layout.nodes"
      :key="node.id"
      :class="styles.summaryGraphNode"
      :data-enabled="node.enabled ? 'true' : 'false'"
      :data-selected="node.id === selectedId ? 'true' : 'false'"
      role="button"
      tabindex="0"
      :aria-label="node.label"
      data-testid="assistant-summary-graph-node"
      @click="emit('select', node.id)"
      @keydown.enter="emit('select', node.id)"
    >
      <rect :x="node.x" :y="node.y" :width="NODE_WIDTH" :height="NODE_HEIGHT" rx="4" />
      <text :x="node.x + 8" :y="node.y + NODE_HEIGHT / 2 + 4">{{ node.label }}</text>
    </g>
  </svg>
</template>
