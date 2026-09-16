# vercel-open

<p>
  <a href="https://vercel.com/labs#past-experiments"><img alt="Vercel Labs Experiment" src="https://img.shields.io/badge/LABS-EXPERIMENT-0a0a0a.svg?style=for-the-badge&amp;logo=Vercel&amp;labelColor=000000" height="28"></a>
  <a href="https://www.npmjs.com/package/vercel-open"><img alt="npm version: vercel-open" src="https://img.shields.io/npm/v/vercel-open.svg?style=for-the-badge&amp;labelColor=000000" height="28"></a>
  <a href="https://github.com/vercel-labs/vercel-open/blob/main/LICENSE.md"><img alt="License: MIT" src="https://img.shields.io/github/license/vercel-labs/vercel-open.svg?style=for-the-badge&amp;labelColor=000000" height="28"></a>
  <a href="https://www.npmjs.com/package/vercel-open"><img alt="npm downloads per month: vercel-open" src="https://img.shields.io/npm/dm/vercel-open.svg?style=for-the-badge&amp;labelColor=000000&amp;label=npm%20downloads" height="28"></a>
</p>

https://github.com/user-attachments/assets/c27b4e68-87d6-44b4-b113-0bbaf186879c

The `vc open` custom command extension for the Vercel CLI.

It makes easy to jump to vercel deployment URL from your terminal.

## Installation

```
npm install -g vercel-open
```

## Usage

Assuming your terminal is in a Vercel project folder:

**Resume information** 

It show resume information about your project

```
vc open info

▲ overview              https://vercel.com/vercel-labs/vercel-open/
▲ current (production)  https://vercel.com/vercel-labs/vercel-open/9PEUQN2Z5BpAFxEsRtXoSkj8nhK9/
▲ latest  (preview)     https://vercel.com/vercel-labs/vercel-open/GSM3jnwUA8qEAUY42ZaXBVRV2QrJ/
```

**Opening in the browser**

It opens the URL in your browser

```
vc open [current|latest] [--visit]
```

**Jumping to a section**

It navigates to a project tab section.

```
vc open [current|latest] <logs|settings|etc> [--query-parameter]
```

## License

**vercel-open** © [Vercel](https://vercel.com), released under the [MIT](https://github.com/vercel-labs/vercel-open/blob/master/LICENSE.md) License.<br>

> [vercel.com](https://vercel.com) · GitHub [vercel](https://github.com/vercel) · X [@vercel](https://x.com/vercel)
