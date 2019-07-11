const getEnvironmentName = () => {
    const { TEST_ENV, NODE_ENV, UAT_ENV } = process.env
    let environmentName = '开发环境'
    if (NODE_ENV === 'production') {
        environmentName = '生产环境'

        if (TEST_ENV) {
            environmentName = '测试环境'
        }

        if (UAT_ENV) {
            environmentName = 'uat环境'
        }
    }

    return environmentName
}

module.exports = {
    getEnvironmentName
}