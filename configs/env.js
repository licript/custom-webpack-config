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
    const { TEST_ENV, UAT_ENV, NODE_ENV } = process.env
    console.log('------------->', NODE_ENV)
    let envPublicUrl = '/'
    if (NODE_ENV === 'production') {
        envPublicUrl = `//xmcdn.com/sr012018/${packageJson.name}/last/dist/`

        if (TEST_ENV) {
            envPublicUrl = `//test.ximalaya.com/sr012018/${packageJson.name}/last/dist/`
        }

        if (UAT_ENV) {
            envPublicUrl = `//xmcdn.com/sr012018/${packageJson.name}/last/dist/`
        }
    }

    return envPublicUrl
}
module.exports = { getEnvironment, getPublicPath}