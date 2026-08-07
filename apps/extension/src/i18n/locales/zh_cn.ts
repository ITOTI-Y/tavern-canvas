import type { LocaleMessageSchema } from "./en.js";

const app = {
  name: "智绘姬",
  tagline: "面向 SillyTavern 的双语图像生成工作台",
  version_label: "版本 {version}",
  startup: {
    loading_title: "正在启动智绘姬",
    loading_description: "正在连接 JS Slash Runner 并加载工作区。",
  },
  unsupported_host: {
    title: "需要更新 JS Slash Runner",
    description:
      "智绘姬需要 JS Slash Runner {required_version} 或更高版本，当前安装的版本是 {current_version}。",
    update_action: "查看更新说明",
  },
  fatal_error: {
    title: "智绘姬未能启动",
    description: "运行时初始化失败，请重新加载 SillyTavern，然后在诊断页查看详情。",
    reload_action: "重新加载 SillyTavern",
  },
};

const nav = {
  workbench: "工作台",
  prompt: "提示词",
  assets: "资产",
  gallery: "图库",
  diagnostics: "诊断",
  settings: "设置",
  more: "更多",
  inspector_expand: "展开检查器",
  inspector_collapse: "收起检查器",
  task_strip_expand: "展开任务栏",
  task_strip_collapse: "收起任务栏",
};

const common = {
  actions: {
    save: "保存",
    cancel: "取消",
    close: "关闭",
    confirm: "确认",
    delete: "删除",
    retry: "重试",
    copy: "复制",
    copied: "已复制",
    download: "下载",
    search: "搜索",
    filter: "筛选",
    clear: "清空",
    select_all: "全选",
    deselect_all: "取消全选",
    continue: "继续",
    back: "返回",
    next: "下一步",
    import: "导入",
    export: "导出",
    edit: "编辑",
    duplicate: "创建副本",
    regenerate: "重新生成",
  },
  labels: {
    name: "名称",
    description: "描述",
    status: "状态",
    type: "类型",
    size: "大小",
    created_at: "创建时间",
    updated_at: "更新时间",
  },
};

const status = {
  loading: "加载中",
  empty: "空",
  partial: "部分",
  error: "错误",
  disabled: "已禁用",
  success: "成功",
  pending: "等待中",
  running: "运行中",
  cancelled: "已取消",
  completed: "已完成",
  failed: "失败",
  retrying: "重试中",
  online: "在线",
  offline: "离线",
  connected: "已连接",
  blocked: "已阻止",
  unknown: "未知",
};

const workbench = {
  prompt_composer: {
    positive_label: "正向提示词",
    positive_placeholder: "描述画面中应该出现的内容",
    negative_label: "负向提示词",
    negative_placeholder: "描述需要避免出现的内容",
    image_count_label: "生成张数",
  },
  reference_strip: {
    title: "参考图",
    empty_title: "还没有参考图",
    empty_description: "从资产库或本机添加最多 4 张参考图，用于引导生成结果。",
    add_action: "添加参考图",
    remove_action: "移除参考图",
  },
  provider_summary: {
    title: "Provider",
    no_profile_title: "尚未选择 provider 配置",
    no_profile_description: "前往设置选择一个 provider 配置以启用生成。",
    open_settings_action: "打开 provider 设置",
  },
  active_jobs: {
    title: "进行中的任务",
    active_count: "{n} 个任务正在运行 | {n} 个任务正在运行",
    empty_title: "当前没有运行中的任务",
    empty_description: "在此提交一次生成请求，即可在这里查看进度。",
    cancel_action: "取消任务",
    cancel_confirm_title: "取消这个任务？",
    cancel_confirm_description: "对 {provider} 的请求将立即停止，且无法恢复。",
  },
  generation_inspector: {
    title: "生成参数",
    seed_label: "Seed",
    steps_label: "Steps",
    sampler_label: "Sampler",
    model_label: "模型",
  },
  submit: {
    action: "生成",
    validation: {
      profile_required: "生成前请先选择 provider 配置。",
      prompt_required: "生成前请先填写正向提示词。",
      image_count_range: "生成张数请选择 1 到 4 之间的数值。",
    },
  },
  retry_action: "重新生成",
};

const provider = {
  connection_test: {
    action: "测试连接",
    testing: "正在测试连接",
    success: "连接成功",
    failed: "连接失败",
  },
  credentials: {
    not_stored_locally: "Token 保存在宿主的密钥存储中，不会出现在智绘姬界面或导出文件里。",
  },
  concurrency_label: "并发请求数",
  fallback_enabled_label: "失败时自动切换到下一个 provider 配置",
  errors: {
    auth_failed: "{provider} 拒绝了当前凭证，请检查 provider 设置中的 token。",
    rate_limited: "{provider} 正在限流，请稍后重试。",
    content_blocked: "{provider} 因内容策略拦截了这次请求。",
    invalid_request: "{provider} 拒绝了请求参数：{message}",
    provider_unavailable: "{provider} 当前无法访问。",
    timed_out: "{provider} 未能在规定时间内响应。",
    cancelled: "对 {provider} 的请求已取消。",
    malformed_response: "{provider} 返回的响应无法解析。",
  },
};

const prompt = {
  preset_browser: {
    title: "预设",
    search_placeholder: "搜索预设",
    empty_title: "还没有预设",
    empty_description: "在提示词构建器中创建一个预设，即可在后续生成中复用。",
    bulk_delete_action: "删除所选",
    bulk_delete_confirm_title: "删除 {n} 个预设？ | 删除 {n} 个预设？",
    bulk_delete_confirm_description: "此操作会永久删除所选预设，且无法撤销。",
  },
  fixed_prompts: {
    positive_label: "固定正向提示词",
    negative_label: "固定负向提示词",
  },
  quality_controls: {
    ucp_label: "通用构图提示词（UCP）",
    aqt_label: "自动质量标签（AQT）",
  },
  replacement_rules: {
    title: "替换规则",
    add_action: "添加规则",
    trigger_label: "触发词",
    replacement_label: "替换为",
    empty_title: "还没有替换规则",
    empty_description: "添加一条规则，在提示词发送给 provider 之前替换匹配到的文本。",
  },
  regex_rules: {
    title: "正则规则",
    pattern_label: "匹配模式",
    test_input_label: "测试文本",
    test_action: "测试匹配",
    invalid_pattern: "这不是一个有效的正则表达式：{message}",
  },
  builder: {
    title: "提示词构建器",
    context_preview_title: "上下文预览",
    world_info_label: "World Info",
    user_persona_label: "用户人设",
    character_context_label: "角色上下文",
  },
  test_panel: {
    title: "私有提示词测试",
    run_action: "运行测试",
    tools_disabled_note: "本次测试运行已禁用工具调用。",
    running: "正在通过私有 LLM 通道运行提示词",
    result_title: "结果",
  },
};

const assets = {
  tabs: {
    vocabulary: "词库",
    characters: "角色",
    outfits: "服装",
    lora: "LoRA",
    vibe: "Vibe",
    reference: "参考图",
    workflow: "工作流",
  },
  vocabulary: {
    search_placeholder: "搜索标签",
    empty_title: "还没有加载词库",
    empty_description: "从更新渠道安装一个词库包，即可搜索并插入标签。",
    tag_count: "{n} 个标签 | {n} 个标签",
    update_action: "检查更新",
    import_action: "导入词库包",
  },
  characters: {
    empty_title: "还没有保存角色",
    empty_description: "创建一个角色档案，即可在多次生成中复用姓名、外观与上下文。",
    add_action: "添加角色",
  },
  outfits: {
    empty_title: "还没有保存服装",
    empty_description: "为某个角色添加服装，即可在生成中复用。",
    add_action: "添加服装",
  },
  lora: {
    empty_title: "还没有 LoRA 元数据",
    empty_description: "添加一条 LoRA 记录，用于跟踪触发词与推荐权重。",
    add_action: "添加 LoRA",
    weight_label: "权重",
    trigger_words_label: "触发词",
  },
  vibe: {
    empty_title: "还没有 Vibe 或参考图分组",
    empty_description:
      "添加一个 NovelAI Vibe Transfer 分组或 Google 参考图分组，即可在多次请求中复用。",
    add_action: "添加分组",
  },
  reference: {
    empty_title: "还没有保存参考图",
    empty_description: "在这里保存一张参考图，即可在多次生成中复用。",
    add_action: "添加参考图",
  },
  workflow: {
    empty_title: "还没有导入 ComfyUI 工作流",
    empty_description: "导入一个工作流 JSON 文件，将其中的占位符映射到智绘姬的输入。",
    import_action: "导入工作流",
    placeholder_scan_action: "扫描占位符",
    edit_action: "编辑工作流",
  },
  random_selection_action: "随机选择",
  reorder_hint: "拖拽以调整顺序",
  delete_confirm_title: "删除 {name}？",
  delete_confirm_description: "此操作会将其从资产库中永久删除，且无法撤销。",
};

const gallery = {
  empty_title: "还没有生成的图片",
  empty_description: "在工作台生成一张图片，即可在这里查看。",
  filters: {
    title: "筛选",
    provider_label: "Provider",
    date_range_label: "时间范围",
    pinned_only_label: "仅显示置顶",
    orphaned_only_label: "仅显示孤立图片",
  },
  orphan_label: "未关联到任何消息",
  cache_occupancy: {
    label: "本地缓存占用",
    description: "已使用 {used}，共 {limit}",
  },
  thumbnail_failed: "缩略图不可用",
  metadata_inspector: {
    title: "生成参数",
    seed_label: "Seed",
    provider_label: "Provider",
    model_label: "模型",
    prompt_label: "提示词",
    copy_action: "复制参数",
    copied_toast: "参数已复制",
    modify_prompt_action: "修改提示词",
    regenerate_action: "重新生成",
    edit_action: "编辑图片",
    inpaint_action: "局部重绘",
    source_message_action: "跳转到来源消息",
  },
  selection: {
    selected_count: "已选中 {n} 张图片 | 已选中 {n} 张图片",
    download_action: "下载所选",
    delete_action: "删除所选",
    delete_confirm_title: "删除 {n} 张图片？ | 删除 {n} 张图片？",
    delete_confirm_description: "此操作会永久删除所选图片及其文件，且无法撤销。",
    detach_action: "从消息中移除关联",
    detach_confirm_title: "从此消息中移除 {n} 张图片的关联？ | 从此消息中移除 {n} 张图片的关联？",
    detach_confirm_description: "图片仍会保留在图库中，只是不再关联到这条消息。",
  },
  pin_action: "置顶",
  unpin_action: "取消置顶",
  download_action: "下载",
};

const diagnostics = {
  capability_matrix: {
    title: "能力矩阵",
    available: "可用",
    unavailable: "不可用",
    capabilities: {
      native_tool_manager: "原生工具管理器",
      main_generation_events: "主生成事件",
      private_prompt_generation: "私有提示词生成",
      message_swipe_metadata: "消息滑动元数据",
      host_image_upload: "宿主图片上传",
      tavern_helper: "JS Slash Runner",
      tauri_chat_surface: "Tauri 聊天接口",
      tauri_world_info_activation: "Tauri World Info 激活",
      gateway_protocol: "Gateway 协议",
    },
  },
  versions: {
    title: "版本信息",
    helper_label: "JS Slash Runner",
    host_label: "SillyTavern",
    protocol_label: "Gateway 协议",
  },
  connection_tests: {
    title: "连接测试",
    run_action: "运行测试",
    running: "正在运行连接测试",
  },
  task_timeline: {
    title: "任务时间线",
    empty_title: "还没有记录任何任务",
    empty_description: "生成、迁移与同步活动会在运行时显示在这里。",
    error_code_label: "错误代码",
  },
  migration_status: {
    title: "迁移状态",
  },
  storage_usage: {
    title: "存储",
    estimate_label: "估计占用",
    quota_label: "配额",
    quota_unavailable: "当前宿主无法提供存储估算。",
    quota_high_pressure: "存储占用已接近浏览器配额，请在图库或资产库中释放空间。",
    cache_references_label: "缓存引用数",
  },
  support_bundle: {
    title: "支持包",
    description:
      "包含版本号、能力矩阵、脱敏后的设置、错误代码与任务时间线，不包含提示词、消息内容、密钥或图片文件名。",
    export_action: "导出支持包",
  },
};

const settings = {
  sections: {
    provider_profiles: "Provider 配置",
    gateway: "Gateway",
    automation: "自动化",
    appearance: "外观",
    data: "数据",
  },
  provider_profiles: {
    empty_title: "还没有 provider 配置",
    empty_description: "添加一个 provider 配置以连接图像生成后端。",
    add_action: "添加 provider 配置",
    connection_test_action: "测试连接",
  },
  gateway: {
    endpoint_label: "Gateway 地址",
    protocol_label: "协议",
    detect_action: "检测协议",
    token_secret_label: "Token 密钥引用",
    auto_generate_action: "生成 token",
  },
  http_risk: {
    warning_title: "此连接未加密",
    warning_description_local:
      "{origin} 在回环地址或私有网络中使用明文 HTTP，流量不会离开本地网络，但未加密。",
    error_description_public:
      "{origin} 在公网或未识别的主机上使用明文 HTTP，token、提示词与图片将以明文传输，存在被截获的风险。",
    disclosure: "在这个连接上，token、提示词与图片都会以明文传输。",
    continue_action: "仍要继续",
    acknowledged_label: "已针对此来源确认",
  },
  automation: {
    auto_generation_label: "每条消息后自动生成",
    fallback_generation_label: "失败时自动切换到下一个 provider 配置",
    global_concurrency_label: "全局并发请求数",
    provider_concurrency_label: "单个 provider 并发请求数",
  },
  appearance: {
    theme_label: "主题",
    theme_system: "跟随系统",
    theme_light: "浅色",
    theme_dark: "深色",
    language_label: "语言",
    language_auto: "跟随 SillyTavern",
    language_zh_cn: "简体中文",
    language_en: "English",
    inspector_width_label: "检查器宽度",
    optional_entry_label: "在扩展菜单中显示可选入口",
  },
  data: {
    vocabulary_channel_label: "词库更新渠道",
    vocabulary_channel_bundled: "内置基线包",
    vocabulary_channel_https: "远程更新渠道",
    archive_export_action: "导出归档",
    archive_import_action: "导入归档",
    archive_import_description: "导入会将归档中的记录合并到当前命名空间，不会删除已有数据。",
    migration_retry_action: "重试迁移",
    migration_report_action: "查看迁移报告",
    manual_cleanup: {
      title: "清理旧版 v2 数据",
      description: "仅在迁移或归档验证通过后可用，此操作永远不会自动执行。",
      record_summary: "{count} 条记录，共 {bytes} | {count} 条记录，共 {bytes}",
      confirm_action: "删除旧版数据",
    },
  },
};

const migration = {
  journal: {
    inventory: "正在扫描旧版数据",
    copying: "正在复制记录",
    verifying: "正在校验已复制的数据",
    ready_to_switch: "已准备好切换到新命名空间",
    completed: "迁移已完成",
    failed: "迁移失败",
    not_required: "无需迁移",
  },
  failure_reasons: {
    invalid_source: "旧版源数据无效或已损坏。",
    unknown_setting_path: "无法识别某个旧版设置路径。",
    converter_error: "有一条记录转换失败：{message}",
    missing_blob: "旧版数据引用的某个图片文件缺失。",
    hash_mismatch: "某个已复制文件与预期校验值不一致。",
    count_mismatch: "已复制的记录数与源数据不一致。",
    secret_transfer_blocked: "provider token 未能安全迁移。",
    switch_failed: "复制完成后切换到新命名空间失败。",
  },
  retry_action: "重试迁移",
  report_action: "查看报告",
  record_count: "{n} 条记录 | {n} 条记录",
  never_auto_deletes: "智绘姬不会自动删除你的旧版数据。",
};

const errors = {
  network: "智绘姬无法连接到网络。",
  capability_blocked: "此操作需要 {capability}，但当前宿主不支持。",
  validation_required: "此项为必填。",
  storage_quota_exceeded: "浏览器存储配额已满，请在图库或资产库中释放空间。",
  locale_load_failed: "简体中文语言包加载失败，已切换回英文界面。",
  gateway_incompatible: "位于 {origin} 的 Gateway 协议版本不兼容。",
  gateway_offline: "无法连接到位于 {origin} 的 Gateway。",
  image_upload_failed: "上传 {file_name} 到宿主失败。",
  generation_failed: "生成失败：{message}",
  unexpected: "出现了一个问题，请到诊断页查看详情。",
};

const confirmations = {
  destructive: {
    default_confirm_action: "删除",
    default_cancel_action: "取消",
    irreversible_note: "此操作无法撤销。",
  },
  typed_confirmation: {
    label: "输入 {phrase} 以确认",
    placeholder: "输入确认短语",
    mismatch: "输入的内容与 {phrase} 不一致。",
  },
  discard_unsaved: {
    title: "放弃未保存的修改？",
    description: "你的修改还没有保存，现在离开会丢失这些内容。",
    stay_action: "继续编辑",
    discard_action: "放弃修改",
  },
};

export const zh_cn_messages = {
  app,
  nav,
  common,
  status,
  workbench,
  provider,
  prompt,
  assets,
  gallery,
  diagnostics,
  settings,
  migration,
  errors,
  confirmations,
} satisfies LocaleMessageSchema;
