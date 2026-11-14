const HUB_HOSTS = ["huggingface.co", "hf.co"];
const REPO_ID = /^[\w.-]+\/[\w.-]+$/u;
const DATASET_PAGE = /^\/datasets\/([\w.-]+\/[\w.-]+)(?:\/tree\/[\w.-]+)?\/?$/u;

export function is_hub_host(hostname: string): boolean {
  return HUB_HOSTS.some((host) => hostname === host || hostname.endsWith(`.${host}`));
}

function hub_catalog_url(repo_id: string): string {
  return `https://huggingface.co/datasets/${repo_id}/resolve/main/catalog.json`;
}

/**
 * Accepts a catalog.json URL, a Hugging Face dataset page URL or an `owner/name` dataset id, and
 * returns the catalog URL to request; `""` clears it and `null` marks input that names no catalog.
 */
export function catalog_url_from_input(input: string): string | null {
  const value = input.trim();
  if (value === "") {
    return "";
  }
  if (REPO_ID.test(value)) {
    return hub_catalog_url(value);
  }
  if (!URL.canParse(value)) {
    return null;
  }
  const url = new URL(value);
  if (url.protocol !== "https:") {
    return null;
  }
  const page = is_hub_host(url.hostname) ? DATASET_PAGE.exec(url.pathname) : null;
  return page?.[1] === undefined ? url.href : hub_catalog_url(page[1]);
}
