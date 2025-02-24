# Releasing to NPM

This package is automatically released to npm using GitHub Actions.

## Automatic Releases

There are two ways to trigger a release:

### 1. Create a GitHub Release

1. Go to the [Releases page](https://github.com/codingleo/dom-to-pdf/releases) on GitHub
2. Click "Draft a new release"
3. Choose or create a tag (e.g., `v0.4.0`)
4. Fill in the release title and description
5. Click "Publish release"

The GitHub Actions workflow will automatically:
- Run tests
- Build the package
- Publish to npm

### 2. Manually Trigger the Workflow

1. Go to the [Actions tab](https://github.com/codingleo/dom-to-pdf/actions) on GitHub
2. Select the "Publish to NPM" workflow
3. Click "Run workflow"
4. Choose the branch (usually `master` or `main`)
5. Enter the version increment type (`patch`, `minor`, `major`, or a specific version)
6. Click "Run workflow"

## Setting Up NPM Token

For the automatic publishing to work, you need to add your NPM token as a GitHub secret:

1. Generate an npm token with publish rights:
   - On npmjs.com, go to your account settings
   - Select "Access Tokens"
   - Click "Generate New Token" (choose "Publish")
   - Copy the token

2. Add the token to GitHub repository secrets:
   - In your GitHub repository, go to Settings > Secrets and Variables > Actions
   - Click "New repository secret"
   - Name: `NPM_TOKEN`
   - Value: (paste your npm token)
   - Click "Add secret"

## Manual Release (if needed)

If you need to release manually:

```bash
# Update version
npm version patch   # or minor, major

# Build
npm run build

# Publish
npm publish

# Push changes including the version tag
git push --follow-tags
```