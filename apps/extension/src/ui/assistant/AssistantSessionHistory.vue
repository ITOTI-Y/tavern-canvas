<script setup lang="ts">
import { Check, Download, Pencil, Plus, Trash2, X } from "lucide-vue-next";
import { computed, nextTick, ref } from "vue";
import { useI18n } from "vue-i18n";

import type { AssistantSession } from "../../modules/assistant/assistant_session.js";
import AppButton from "../components/AppButton.vue";
import AppSwitch from "../components/AppSwitch.vue";
import ConfirmDialog from "../components/ConfirmDialog.vue";
import IconButton from "../components/IconButton.vue";
import StateSurface from "../components/StateSurface.vue";
import styles from "./assistant.module.css";

const props = defineProps<{
  readonly sessions: readonly AssistantSession[];
  readonly activeSessionId: string | null;
}>();

const emit = defineEmits<{
  "new-session": [];
  "switch-session": [id: string];
  "rename-session": [id: string, title: string];
  "delete-sessions": [ids: readonly string[]];
  "export-sessions": [ids: readonly string[]];
}>();

const { t } = useI18n();

const selected_ids = ref<readonly string[]>([]);
const renaming_id = ref<string | null>(null);
const rename_draft = ref("");
const rename_input = ref<HTMLInputElement | null>(null);
const delete_open = ref(false);

const selected_set = computed(() => new Set(selected_ids.value));
const all_selected = computed(
  () => props.sessions.length > 0 && selected_ids.value.length === props.sessions.length,
);

function toggle_selection(id: string, selected: boolean): void {
  const next = new Set(selected_ids.value);
  if (selected) {
    next.add(id);
  } else {
    next.delete(id);
  }
  selected_ids.value = [...next];
}

function toggle_select_all(selected: boolean): void {
  selected_ids.value = selected ? props.sessions.map((session) => session.id) : [];
}

function register_rename_input(element: unknown): void {
  rename_input.value = element instanceof HTMLInputElement ? element : null;
}

async function start_rename(session: AssistantSession): Promise<void> {
  renaming_id.value = session.id;
  rename_draft.value = session.title;
  await nextTick();
  rename_input.value?.focus();
}

function commit_rename(): void {
  const id = renaming_id.value;
  const title = rename_draft.value.trim();
  if (id !== null && title.length > 0) {
    emit("rename-session", id, title);
  }
  renaming_id.value = null;
}

function confirm_delete(): void {
  emit("delete-sessions", selected_ids.value);
  selected_ids.value = [];
  delete_open.value = false;
}
</script>

<template>
  <aside :class="styles.sessionRail" data-testid="assistant-session-history">
    <div :class="styles.sessionRailHeader">
      <span>{{ t("assistant.panel_title") }}</span>
      <IconButton
        :icon="Plus"
        size="sm"
        :label="t('assistant.new_chat_action')"
        @click="emit('new-session')"
      />
    </div>

    <div v-if="sessions.length > 0" :class="styles.sessionSelectionBar">
      <AppSwitch
        :model-value="all_selected"
        :label="t('assistant.sessions.select_all_label')"
        @update:model-value="toggle_select_all"
      />
      <template v-if="selected_ids.length > 0">
        <AppButton
          :label="t('assistant.sessions.export_selected_action', { count: selected_ids.length })"
          variant="secondary"
          data-testid="assistant-export-selected"
          @click="emit('export-sessions', selected_ids)"
        />
        <AppButton
          :label="t('assistant.sessions.delete_selected_action', { count: selected_ids.length })"
          variant="destructive"
          data-testid="assistant-delete-selected"
          @click="delete_open = true"
        />
      </template>
    </div>

    <StateSurface
      :status="sessions.length === 0 ? 'empty' : 'ready'"
      :empty-message="t('assistant.sessions_empty.description')"
    >
      <template #action>
        <AppButton
          :label="t('assistant.sessions_empty.action')"
          variant="primary"
          @click="emit('new-session')"
        />
      </template>
      <ul :class="styles.sessionList">
        <li v-for="session in sessions" :key="session.id" data-testid="assistant-session-row">
          <div
            :class="[
              styles.sessionItem,
              session.id === activeSessionId && styles.sessionItemActive,
            ]"
          >
            <AppSwitch
              :model-value="selected_set.has(session.id)"
              :label="t('assistant.sessions.select_label', { title: session.title })"
              @update:model-value="(value) => toggle_selection(session.id, value)"
            />
            <template v-if="renaming_id === session.id">
              <input
                :ref="register_rename_input"
                v-model="rename_draft"
                type="text"
                :class="styles.sessionRenameInput"
                :aria-label="t('assistant.rename_session_action')"
                data-testid="assistant-rename-input"
                @keydown.enter="commit_rename"
                @keydown.esc="renaming_id = null"
              />
              <IconButton
                :icon="Check"
                size="sm"
                :label="t('common.actions.save')"
                @click="commit_rename"
              />
              <IconButton
                :icon="X"
                size="sm"
                :label="t('common.actions.cancel')"
                @click="renaming_id = null"
              />
            </template>
            <template v-else>
              <button
                type="button"
                :class="styles.sessionItemTitle"
                @click="emit('switch-session', session.id)"
              >
                {{ session.title }}
              </button>
              <IconButton
                :icon="Pencil"
                size="sm"
                :label="t('assistant.rename_session_action')"
                @click="start_rename(session)"
              />
              <IconButton
                :icon="Download"
                size="sm"
                :label="t('assistant.export_session_action')"
                @click="emit('export-sessions', [session.id])"
              />
              <IconButton
                :icon="Trash2"
                size="sm"
                destructive
                :label="t('assistant.delete_session_action')"
                @click="emit('delete-sessions', [session.id])"
              />
            </template>
          </div>
        </li>
      </ul>
    </StateSurface>

    <ConfirmDialog
      :open="delete_open"
      :title="t('assistant.sessions.delete_confirm_title', { count: selected_ids.length })"
      :description="t('assistant.sessions.delete_confirm_description')"
      :confirm-label="t('confirmations.destructive.default_confirm_action')"
      :cancel-label="t('confirmations.destructive.default_cancel_action')"
      @update:open="(open) => (delete_open = open)"
      @confirm="confirm_delete"
    />
  </aside>
</template>
