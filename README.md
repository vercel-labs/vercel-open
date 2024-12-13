# vercel-open

The `vercel-open` custom command extension for the Vercel CLI

## Installation

```
npm install -g vercel-open
```

## Usage

**Automatic** - Requires that your working directory is a linked Vercel project:

```
vc open # open the vercel dahboard for the current project
vc open logs # open logs of the project
vc open logs --timeline=maximum # any query parameter is supported
```

**Custom** - Providing a `$team/$project` slug that will be opened:

```
vc open vercel/v0 logs # will open `https://vercel.com/vercel/v0/logs` in the browser
```

Also `vc open info` will print relevant information about your project:

```
> vc open info

▲ overview              https://vercel.com/vercel-labs/vercel-open/
▲ current (production)  https://vercel.com/vercel-labs/vercel-open/AtQTsruE87Lu6Nz3fhCrFyxV9t3T/
▲ latest  (preview)     https://vercel.com/vercel-labs/vercel-open/3AaqTjcDGqfEW6FjbywYKNaQfDW9/
```

## License

**vercel-open** © [Vercel](https://vercel.com), released under the [MIT](https://github.com/vercel-labs/vercel-open/blob/master/LICENSE.md) License.<br>

> [vercel.com](https://vercel.com) · GitHub [vercel](https://github.com/vercel) · X [@vercel](https://x.com/vercel)
