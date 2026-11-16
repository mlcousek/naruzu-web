// Which documentation sets this build contains. The Developer docs are private:
// they live only in the private repository and are left out of the public
// export (scripts/export-public.mjs). A build includes them exactly when the
// folder src/content/docs/docs/dev exists, so the public repository (which has
// no such folder) builds the public set without any flag.
import { existsSync } from "node:fs";
import { resolve } from "node:path";

export const hasDeveloperDocs = existsSync(
  resolve(process.cwd(), "src/content/docs/docs/dev"),
);
