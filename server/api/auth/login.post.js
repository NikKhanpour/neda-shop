export default defineEventHandler(async (event) => {
    const { public: { apiBase } } = useRuntimeConfig()
    const body = await readBody(event)
    try {
        const data = await $fetch(`${apiBase}/auth/login`, {
            method: 'POST',
            body,
            headers: {
                'Accept': 'application/json'
            }
        })
        setCookie(event, 'login_token', data.data.login_token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1,
            path: '/'
        })
        return 'success'
    } catch (error) {
        return error
    }
})