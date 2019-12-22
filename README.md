# Deploy your Sapper site to GitHub Pages

A GitHub Action for exporting and deploying a site built with Svelte and Sapper to GitHub Pages.

## How to use

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
      - uses: actions/checkout@v1
      - uses: antoncarlsson/deploy-sapper-to-gh-pages-action@v1
        with:
          access-token: ${{ secrets.ACCESS_TOKEN }}
```
