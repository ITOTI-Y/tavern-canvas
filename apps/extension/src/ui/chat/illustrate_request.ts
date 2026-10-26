export interface IllustrateRequest {
  readonly message_id: number;
  /** Limits the dialog to one slot when opened from that slot's card. */
  readonly slot_id: string | null;
}
