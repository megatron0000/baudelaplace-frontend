export interface EnvVariable {
    readonly apiEndpoint: string
    readonly recaptchaKey: string
    readonly platform: 'mobile' | 'web'
}
