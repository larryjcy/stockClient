import _ from "lodash"
// material-ui
import { useUserContext } from "../../context/UserContext"

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  let logo = ''
  const { getSetting } = useUserContext()
  const settings = getSetting()
  let siteLogo = null
  let siteName = null
  _.forEach(settings,  setting => {
      if (setting.module === 'site') {
          if (setting.key === 'name') {
              siteName = setting.value
          }
          if (setting.key === 'logo') {
              siteLogo = setting.value
          }
      }
  })
  if (siteLogo) {
    logo = '/image/' + siteLogo
  }
  return (
      <>
        {(logo) &&
          <img src={logo} alt={siteName} width="100"/>
        }
      </>
  )
}

export default Logo
