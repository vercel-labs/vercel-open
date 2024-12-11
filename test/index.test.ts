import { describe, it } from 'vitest'

import { getSlugAndSection } from '../src'
import { expect } from 'vitest'

describe('.getSlugAndSection', () => {
  it('from arguments', async () => {
    const { org, project, section } = await getSlugAndSection({
      args: ['kikobeats/counting']
    })

    expect(org).toBe('kikobeats')
    expect(project).toBe('counting')
    expect(section).toBe('')
  })

  it('from arguments with section', async () => {
    const { org, project, section } = await getSlugAndSection({
      args: ['kikobeats/counting', 'logs']
    })

    expect(org).toBe('kikobeats')
    expect(project).toBe('counting')
    expect(section).toBe('logs')
  })
})
