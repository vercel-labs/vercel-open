#!/usr/bin/env node

import openBrowser from 'open'
import mri from 'mri'
import pc from 'picocolors'

import {
  vercelUrl,
  getSlugAndSection,
  getLatestDeployment,
  getProductionDeployment
} from '../src/index.js'

async function main () {
  const { _: args, visit, ...flags } = mri(process.argv.slice(2))
  const { org, project, section } = await getSlugAndSection({ args })

  switch (section) {
    case 'latest': {
      const { id, url: deploymentUrl } = await getLatestDeployment()
      const url = visit ? deploymentUrl : vercelUrl({ org, project, section: id, flags })
      return openBrowser(url)
    }
    case 'info': {
      const { id: latestId } = await getLatestDeployment()
      const { id: currentId} = await getProductionDeployment()

      console.log(
        pc.black(
          [
            '',
            `${pc.white('▲ overview')}              https://vercel.com/${org}/${project}/`,
            `${pc.white(
              '▲ current (production)'
            )}  https://vercel.com/${org}/${project}/${currentId}/`,
            `${pc.white(
              '▲ latest  (preview)'
            )}     https://vercel.com/${org}/${project}/${latestId}/`
          ].join('\n')
        )
      )
      break
    }
    default: {
      if (!visit) return openBrowser(vercelUrl({ org, project, section, flags }))
      const { url } = await getProductionDeployment()
      return openBrowser(url)
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch(err => console.error(err))
