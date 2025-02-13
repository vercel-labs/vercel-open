#!/usr/bin/env node

import openBrowser from 'open'
import pc from 'picocolors'
import mri from 'mri'

import {
  vercelUrl,
  getSlugAndSection,
  getLatestDeployment,
  getProductionDeployment
} from '../src/index.js'

const { white, black } = pc

async function main () {
  const { _: args, visit, ...flags } = mri(process.argv.slice(2))
  const { org, project, section } = await getSlugAndSection({ args })

  switch (section) {
    case 'help': {
      console.log(
        [
          '',
          '  Resume information:',
          `    ${white('vc open info')}`,
          '',
          '  Opening in the browser:',
          `    ${white('vc open')} [${white('current')}|${white('latest')}] [${white('--visit')}]`,
          '',
          '  Jumping to a section:',
          `    ${white('vc open')} [${white('current')}|${white('latest')}] <${white('logs')}|${white('settings')}|${white('etc')}> [${white('--query-parameter')}]`
        ]
          .map(line => black(line))
          .join('\n')
      )
      break
    }

    case 'latest': {
      const { id, url: deploymentUrl } = await getLatestDeployment()
      const url = visit ? deploymentUrl : vercelUrl({ org, project, section: id, flags })
      return openBrowser(url)
    }
    case 'current': {
      const { id, url: deploymentUrl } = await getProductionDeployment()
      const url = visit ? deploymentUrl : vercelUrl({ org, project, section: id, flags })
      return openBrowser(url)
    }
    case 'info': {
      const { id: latestId } = await getLatestDeployment()
      const { id: currentId } = await getProductionDeployment()

      console.log(
        black(
          [
            '',
            `${white('▲ overview')}              https://vercel.com/${org}/${project}/`,
            `${white(
              '▲ current (production)'
            )}  https://vercel.com/${org}/${project}/${currentId}/`,
            `${white(
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
