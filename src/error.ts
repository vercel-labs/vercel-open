export const ErrorLinkProject = () => {
  const error: NodeJS.ErrnoException = new Error('Link project error')
  error.code = 'ERR_LINK_PROJECT'
  throw error
}
