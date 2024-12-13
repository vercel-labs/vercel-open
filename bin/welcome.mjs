import pc from 'picocolors'

console.log(
  [
    pc.black(`✨ ${pc.white('vercel-open')} installed ✨`),
    pc.black(`For using it, just type '${pc.white('vc open')}' or '${pc.white('vercel open')}' in your terminal`),
    '',
    pc.black(`Type '${pc.white('vc open help')}' to learn about the command`)
  ].join('\n')
)
