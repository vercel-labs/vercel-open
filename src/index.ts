import { readFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

import { createCache } from './cache.js'

const cache = createCache()

const vercelApi = (pathname: string) =>
  fetch(`${process.env.VERCEL_API}/${pathname}`, {
    headers: {
      'Accept-Encoding': 'identity'
    }
  })

const getProjectName = async (projectId: string, teamId: string) =>
  vercelApi(`v9/projects/${projectId}?teamId=${teamId}`)
    .then(res => res.json())
    .then((payload: any) => payload.name)

const getOrganizationName = async (teamId: string) =>
  vercelApi(`v2/teams/${teamId}`)
    .then(res => res.json())
    .then((payload: any) => payload.slug)

export const getLatestDeployment = async () => {
  const { projectId } = await readProjectFile()
  return vercelApi(`v9/projects/${projectId}`)
    .then(res => res.json())
    .then((payload: any) => payload.latestDeployments[0].id.replace('dpl_', ''))
}

export const getProductionDeployment = async () => {
  const { projectId } = await readProjectFile()
  return vercelApi(`v9/projects/${projectId}`)
    .then(res => res.json())
    .then((payload: any) => payload.targets.production.id.replace('dpl_', ''))
}

async function readProjectFile (): Promise<{
  projectId: string
  teamId: string
}> {
  const filepath = path.resolve(process.cwd(), '.vercel/project.json')

  if (!existsSync(filepath)) {
    const error: NodeJS.ErrnoException = new Error('Link project error')
    error.code = 'ERR_LINK_PROJECT'
    throw error
  }

  const fileContent = await readFile(filepath, 'utf-8')
  const { projectId, orgId: teamId } = JSON.parse(fileContent)
  return { projectId, teamId }
}

async function fromPath (): Promise<{ org: string; project: string }> {
  const cached = await cache.read()
  if (cached.org && cached.project) return cached

  const { projectId, teamId } = await readProjectFile()
  const org = await getOrganizationName(teamId)
  const project = await getProjectName(projectId, teamId)

  await cache.write({ org, project })

  return { org, project }
}

export async function getSlugAndSection (
  {
    args
  }: {
    args: string[]
  } = { args: [] }
): Promise<{
  org: string
  project: string
  section: string
}> {
  if (args.length === 0) {
    return { ...(await fromPath()), section: '' }
  }

  if (args.length === 1) {
    if (args[0] && !args[0].includes('/')) {
      return {
        ...(await fromPath()),
        section: args[0]
      }
    } else {
      const [org = '', project = ''] = (args[0] || '').split('/')
      return {
        org,
        project,
        section: ''
      }
    }
  }

  if (args.length === 2) {
    const [org = '', project = ''] = (args[0] || '').split('/')

    return {
      org,
      project,
      section: args[1] || ''
    }
  }

  throw new Error('Invalid arguments')
}
