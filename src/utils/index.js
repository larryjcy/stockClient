function convertPathToHtml(path) {
  let count = 0
  let htmlPath = ''
  while (path.startsWith('../')) {
    count++
    path = path.slice(3)
  }

  if (count === 2) {
    htmlPath = '.'
  }

  if (count === 3) {
    htmlPath = '..'
  }

  if (count === 4) {
    htmlPath = '../..'
  }

  if (count === 5) {
    htmlPath = '../../..'
  }

  return htmlPath
}

const getDeploymentPath = (pathname) => {
// Only count directories, not the filename itself
  const pathSegments = pathname.split('/').filter(segment => segment !== '');
  const depth = pathSegments.length > 0 ? pathSegments.length - 1 : 0;
  const deploymentPath = depth === 0 ? './' : '../'.repeat(depth);
  return deploymentPath
}

export {
  convertPathToHtml,
  getDeploymentPath
}
