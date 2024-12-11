# vercel-open

The `vercel-open` command is an extension for Vercel CLI

## Installation

```
npm install -g vercel-open
```

## Usage

Assuming your terminal is pointing in a local vercel project:

```
vc open # open the vercel dahboard for the current project
vc open logs # open logs of the project
vc open logs --timeline=maximum # any query parameter is supported
```

Additionally, you can specify the project open:

```
vc open vercel/v0 logs # will open `https://vercel.com/vercel/v0/logs` in the browser
```

Also `vc open info` will print revelant information about your project:

```
> vc open info

▲ overview            https://vercel.com/vercel/v0/
▲ latest (production) https://vercel.com/vercel/v0/2fVgMqXL3km1nAwqg7aAR58gtt1A/
▲ latest (preview)    https://vercel.com/vercel/v0/UhnKLjQb7SDaLFT2GBM2eVwLUsdE/
```

## License

**vercel-open** © [Vercel](https://vercel.com), released under the [MIT](https://github.com/vercel-labs/vercel-open/blob/master/LICENSE.md) License.<br>

> [vercel.com](https://vercel.com) · GitHub [vercel](https://github.com/vercel) · X [@vercel](https://x.com/vercel)
