import { Env, CISource } from "../ci_source"
import { ensureEnvKeysExist, ensureEnvKeysAreInt } from "../ci_source_helpers"

/**
 * Nevercode.io CI Integration
 *
 * Environment Variables Documented: https://developer.nevercode.io/v1.0/docs/environment-variables-files
 *
 * Note: The company that runs Nevercode is migrating all customers
 *        to their new service Codemagic.io in Spring of 2021
 *        - billing is migrated through Customer Support
 *        - the CI Configuration is managed in your repo instead of in a web-dashboard.
 *
 * TODO @fbartho delete this integration when it's fully offline.
 */
export class Nevercode implements CISource {
  constructor(private readonly env: Env) {}

  get name(): string {
    return "Nevercode"
  }

  get isCI(): boolean {
    return ensureEnvKeysExist(this.env, ["NEVERCODE"])
  }

  get isPR(): boolean {
    const mustHave = ["NEVERCODE_PULL_REQUEST", "NEVERCODE_REPO_SLUG"]
    const mustBeInts = ["NEVERCODE_GIT_PROVIDER_PULL_REQUEST", "NEVERCODE_PULL_REQUEST_NUMBER"]
    return (
      ensureEnvKeysExist(this.env, mustHave) &&
      ensureEnvKeysAreInt(this.env, mustBeInts) &&
      this.env.NEVERCODE_PULL_REQUEST == "true"
    )
  }

  get pullRequestID(): string {
    return this.env.NEVERCODE_PULL_REQUEST_NUMBER
  }

  get repoSlug(): string {
    return this.env.NEVERCODE_REPO_SLUG
  }

  get ciRunURL() {
    return process.env.NEVERCODE_BUILD_URL
  }
}
