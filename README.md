# Deploy your Sapper site to GitHub Pages

A GitHub Action for exporting and deploying a site built with Svelte and Sapper to GitHub Pages.

## Example usage

```yaml
name: Sapper Publish

on:
  push:
    branches:
      - develop

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: antoncarlsson/deploy-sapper-to-gh-pages-action@v1.1.6
        with:
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
```
