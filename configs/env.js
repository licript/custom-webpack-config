const packageJson = require('../package')

const getEnvironment = () => {
    const processEnv = {
        TEST_ENV :process.env.TEST_ENV,
        UAT_ENV : process.env.UAT_ENV
    }

    const stringProcessEnv = {
        'process.env': Object.keys(processEnv).reduce(
            (env, key) => {
                env[key] = JSON.stringify(processEnv[key])
                return env
            },
            {}
        ),
    }
    return stringProcessEnv
}

const getPublicPath = () => {
    const {TEST_ENV, UAT_ENV,NODE_ENV} = process.env
    let envPublicUrl = '/'
    if (NODE_ENV === 'production') {
        envPublicUrl = `//s1.xmcdn.com/sr012018/${packageJson.name}/last/dist/`

        if (TEST_ENV) {
            envPublicUrl = `//static2.test.ximalaya.com/sr012018/${packageJson.name}/last/dist/`
        }

        if (UAT_ENV) {
            envPublicUrl = `//s1.uat.xmcdn.com/sr012018/${packageJson.name}/last/dist/`
        }
    }

    return envPublicUrl
}
module.exports = { getEnvironment, getPublicPath}