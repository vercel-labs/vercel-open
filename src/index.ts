import { readFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

import { ErrorLinkProject } from './error.js'
import { createCache } from './cache.js'

const { VERCEL_API = 'https://api.vercel.com/' } = process.env

const cache = createCache()

const vercelApi = (pathname: string) =>
  fetch(new URL(pathname, VERCEL_API), {
    headers: {
      'Accept-Encoding': 'identity'
    }
  })

const getProject = async (projectId: string, teamId: string) =>
  vercelApi(`v9/projects/${projectId}?teamId=${teamId}`).then(res => res.json())

const getProjectName = async (projectId: string, teamId: string) =>
  getProject(projectId, teamId).then((payload: any) => payload.name)

const getOrganizationName = async (teamId: string) =>
  vercelApi(`v2/teams/${teamId}`)
    .then(res => res.json())
    .then((payload: any) => payload.slug)

export const getLatestDeployment = async () => {
  const { projectId, teamId } = await readProjectFile()
  return getProject(projectId, teamId).then((payload: any) => {
    return {
      id: payload.latestDeployments[0].id.replace('dpl_', ''),
      url: `https://${payload.latestDeployments[0].url}`
    }
  })
}

export const getProductionDeployment = async () => {
  const { projectId, teamId } = await readProjectFile()
  return vercelApi(`v9/projects/${projectId}?teamId=${teamId}`)
    .then(res => res.json())
    .then((payload: any) => {
      return {
        id: payload.targets.production.id.replace('dpl_', ''),
        url: `https://${payload.targets.production.alias[0]}`
      }
    })
}

async function readProjectFile (): Promise<{
  projectId: string
  teamId: string
}> {
  const filepath = path.resolve(process.cwd(), '.vercel/project.json')
  if (!existsSync(filepath)) throw ErrorLinkProject()
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
    if (args[0] && ['current', 'latest'].includes(args[0])) {
      const { id } = await (args[0] === 'current'
        ? getProductionDeployment()
        : getLatestDeployment())
      const { org, project } = await fromPath()

      return {
        ...(await fromPath()),
        org,
        project: `${project}/${id}`,
        section: args[1] || ''
      }
    } else {
      const [org = '', project = ''] = (args[0] || '').split('/')

      return {
        org,
        project,
        section: args[1] || ''
      }
    }
  }

  throw new Error('Invalid arguments')
}

export const vercelUrl = ({
  org,
  project,
  section,
  flags
}: {
  org: string
  project: string
  section: string
  flags: Record<string, any>
}): string => {
  const url = new URL(`${org}/${project}/${section}`, 'https://vercel.com/')
  url.search = new URLSearchParams(flags).toString()
  return url.toString()
}
