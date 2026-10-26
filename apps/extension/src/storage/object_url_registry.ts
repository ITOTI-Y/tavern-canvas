export interface ObjectUrlFactory {
  readonly create_object_url: (blob: Blob) => string;
  readonly revoke_object_url: (url: string) => void;
}

export interface ObjectUrlRegistry {
  create(owner_id: string, blob: Blob): string;
  release(owner_id: string): void;
  dispose(): void;
}

const default_factory: ObjectUrlFactory = {
  create_object_url: (blob) => URL.createObjectURL(blob),
  revoke_object_url: (url) => {
    URL.revokeObjectURL(url);
  },
};

export function create_object_url_registry(
  factory: ObjectUrlFactory = default_factory,
): ObjectUrlRegistry {
  const urls_by_owner = new Map<string, Set<string>>();

  function release(owner_id: string): void {
    const urls = urls_by_owner.get(owner_id);
    if (urls === undefined) {
      return;
    }
    urls_by_owner.delete(owner_id);
    for (const url of urls) {
      factory.revoke_object_url(url);
    }
  }

  return {
    create(owner_id, blob) {
      const url = factory.create_object_url(blob);
      const urls = urls_by_owner.get(owner_id);
      if (urls === undefined) {
        urls_by_owner.set(owner_id, new Set([url]));
      } else {
        urls.add(url);
      }
      return url;
    },
    release,
    dispose() {
      for (const owner_id of [...urls_by_owner.keys()]) {
        release(owner_id);
      }
    },
  };
}
