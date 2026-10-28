const SLASH_COMMAND_NAME = "inkwell";

interface SlashCommandSurface {
  readonly SlashCommandParser?: { addCommandObject?: (command: unknown) => void };
  readonly SlashCommand?: { fromProps?: (props: Record<string, unknown>) => unknown };
}

let slash_command_registered = false;

/** SillyTavern cannot unregister slash commands, so the command is added once per page. */
export function register_slash_command(help: string, on_open: () => void): void {
  if (slash_command_registered) {
    return;
  }
  const context = (
    globalThis as { SillyTavern?: { getContext?: () => SlashCommandSurface } }
  ).SillyTavern?.getContext?.();
  const command = context?.SlashCommand?.fromProps?.({
    name: SLASH_COMMAND_NAME,
    helpString: help,
    returns: "nothing",
    callback: () => {
      on_open();
      return "";
    },
  });
  if (command !== undefined && context?.SlashCommandParser?.addCommandObject !== undefined) {
    context.SlashCommandParser.addCommandObject(command);
    slash_command_registered = true;
  }
}
