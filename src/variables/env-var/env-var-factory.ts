import { EnvVariable } from './env-var.interface'

export let EnvVarFactory = () => {
  let recaptchaKey = '6LcxyjEUAAAAAGdoq_hkFVFpBHWzi23YD5UFhrR8'
  let apiEndpoint = ''
  let platform = ''

  if (process.env.IONIC_ENV === 'prod') {
    apiEndpoint = 'https://www.baudelaplace.xyz'
  } else if (process.env.LOC_ENV === 'mobile') {
    apiEndpoint = 'http://192.168.0.14:8080'
  } else {
    apiEndpoint = 'http://127.0.0.1:8080'
  }

  platform = process.env.LOC_ENV === 'mobile' ? 'mobile' : 'web'

  return <EnvVariable>{
    recaptchaKey,
    apiEndpoint,
    platform
  }

}
