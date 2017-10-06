import { RecaptchaLoaderService } from 'ng2-recaptcha'

export function PtRecaptchaFactory() {
  return new RecaptchaLoaderService('pt-BR')
}
