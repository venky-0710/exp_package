# exp_package_test_v1

A simple package ready for npm.

## Patch vs Minor vs Major (with examples)

Versions follow **semver**: `MAJOR.MINOR.PATCH` (e.g. `1.2.3`).

| Type   | When to use                          | Example change |
|--------|--------------------------------------|----------------|
| **Patch** | Bug fixes, small tweaks, no API change | `1.0.3` → `1.0.4` |
| **Minor** | New features, backward compatible     | `1.0.3` → `1.1.0` |
| **Major** | Breaking changes, incompatible API    | `1.0.3` → `2.0.0` |

### Example: patch (bug fix)

You fix a typo or a bug; the public API stays the same.

```js
// Before (bug)
function greet(name) {
  return `Helo, ${name}!`;  // typo
}

// After (patch)
function greet(name) {
  return `Hello, ${name}!`;
}
```

- **Version:** `1.0.3` → `1.0.4`
- **Command:** `npm run release:patch` or `npm version patch`
- **Consumers:** Safe to upgrade without code changes.

---

### Example: minor (new feature)

You add a new function or option; existing code still works.

```js
// Before
module.exports = { greet };

// After (add optional second argument)
function greet(name, punctuation = "!") {
  return `Hello, ${name}${punctuation}`;
}
module.exports = { greet };
```

- **Version:** `1.0.3` → `1.1.0`
- **Command:** `npm run release:minor` or `npm version minor`
- **Consumers:** Can adopt new behavior when ready; old usage still works.

---

### Example: major (breaking change)

You change or remove behavior so existing code might break.

```js
// Before: greet("World")  → "Hello, World!"
function greet(name) {
  return `Hello, ${name}!`;
}

// After: now requires an object, no longer accepts a string
function greet({ name }) {
  return `Hello, ${name}!`;
}
// greet("World")  → BREAKS
// greet({ name: "World" })  → works
```

- **Version:** `1.0.3` → `2.0.0`
- **Command:** `npm run release:major` or `npm version major`
- **Consumers:** Must update their code to match the new API.

---

## Prerelease versions (e.g. 1.0.3-alpha.0)

For alpha, beta, or release-candidate builds you use a **prerelease** tag. The version looks like `1.0.3-alpha.0`, `1.0.4-beta.1`, or `2.0.0-rc.0`.

### What users get when they install

| Install command | What they get |
|-----------------|----------------|
| `npm install exp_package_test_v1` | **Latest stable** (the version on the `latest` dist-tag). Prereleases are *not* included. |
| `npm install exp_package_test_v1@alpha` | Latest alpha (e.g. `1.0.4-alpha.2`) |
| `npm install exp_package_test_v1@1.0.4-alpha.0` | That specific prerelease |

Prereleases are published with `--tag alpha` (or `beta`/`rc`), so they never become `latest`. Only `npm publish` without `--tag` (your normal patch/minor/major releases) updates `latest`. So users who don’t specify a tag always get the latest **stable** version.

| Script | What it does | Example |
|--------|----------------|--------|
| `release:alpha:new` | First alpha of the *next* patch version | `1.0.3` → `1.0.4-alpha.0` |
| `release:alpha` | Next alpha of the *current* base version | `1.0.4-alpha.0` → `1.0.4-alpha.1` |
| `release:beta` | Next beta | `1.0.4-beta.0` → `1.0.4-beta.1` |
| `release:rc` | Next release candidate | `1.0.4-rc.0` → `1.0.4-rc.1` |

**Commands:**
```bash
# Start a new alpha line (1.0.3 → 1.0.4-alpha.0)
npm run release:alpha:new

# Bump alpha number (1.0.4-alpha.0 → 1.0.4-alpha.1)
npm run release:alpha

# Same idea for beta / rc
npm run release:beta
npm run release:rc
```

**Manual:**
```bash
# Set an exact prerelease version
npm version 1.0.3-alpha.0

# First alpha of next patch
npm version pre patch --preid=alpha

# Bump prerelease number (e.g. alpha.0 → alpha.1)
npm version prerelease --preid=alpha

# Publish without making it "latest" (users get it via npm install pkg@alpha)
npm publish --tag alpha
```

**Installing prereleases:**
```bash
npm install exp_package_test_v1@alpha   # get latest alpha
npm install exp_package_test_v1@1.0.4-alpha.0   # get specific prerelease
```

---

## Publishing to npm (with Git tags)

### One-time setup

1. **Log in to npm** (if you haven’t):
   ```bash
   npm login
   ```

2. **Set your Git remote** (replace with your repo URL):
   ```bash
   git remote set-url origin https://github.com/YOUR_USERNAME/exp_package.git
   ```

### Option A: Use npm version + publish (recommended)

`npm version` updates `package.json`, creates a Git commit, and creates a Git tag (e.g. `v1.0.4`).

**Patch release (1.0.3 → 1.0.4):**
```bash
npm version patch
npm publish
git push && git push --tags
```

**Minor release (1.0.3 → 1.1.0):**
```bash
npm version minor
npm publish
git push && git push --tags
```

**Major release (1.0.3 → 2.0.0):**
```bash
npm version major
npm publish
git push && git push --tags
```

### Option B: Use the release scripts

From the project root:

```bash
npm run release:patch   # patch version, publish, push + tags
npm run release:minor   # minor version, publish, push + tags
npm run release:major   # major version, publish, push + tags
```

### Manual tag (without changing version)

To create a tag for the current commit only:

```bash
git tag v1.0.3
git push origin v1.0.3
```

### List your tags

```bash
git tag -l
```

### Delete a tag (use with care)

```bash
git tag -d v1.0.3
git push origin :refs/tags/v1.0.3
```

---

After publishing, your package will be on the npm registry and the version will match the Git tag (e.g. tag `v1.0.4` ↔ npm version `1.0.4`).
