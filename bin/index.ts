#!/usr/bin/env node

import openBrowser from 'open'
import mri from 'mri'
import pc from 'picocolors'

import {
  getSlugAndSection,
  getLatestDeployment,
  getProductionDeployment
} from '../src/index.js'

async function main () {
  const { _: args, ...flags } = mri(process.argv.slice(2))

  const { org, project, section } = await getSlugAndSection({ args })

  if (section === 'info') {
    const latestDeployment = await getLatestDeployment()
    const productionDeployment = await getProductionDeployment()

    console.log(
      pc.black(
        [
          '',
          `${pc.white('▲ overview')}            https://vercel.com/${org}/${project}/`,
          `${pc.white('▲ latest (production)')} https://vercel.com/${org}/${project}/${latestDeployment}/`,
          `${pc.white('▲ latest (preview)')}    https://vercel.com/${org}/${project}/${productionDeployment}/`
        ].join('\n')
      )
    )
  } else {
    const url = new URL(`${org}/${project}/${section}`, 'https://vercel.com/')
    url.search = new URLSearchParams(flags).toString()

    await openBrowser(url.toString())
  }
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch(err => {
    console.error(err)
  })
