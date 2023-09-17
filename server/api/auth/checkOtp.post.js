export default defineEventHandler(async (event) => {
    const { public: { apiBase } } = useRuntimeConfig()
    const otp = await readBody(event)
    const login_token = getCookie(event, 'login_token')
    try {
        const data = await $fetch(`${apiBase}/auth/check-otp`, {
            method: 'POST',
            body: { ...otp, login_token },
            headers: {
                'Accept': 'application/json'
            }
        })
        setCookie(event, 'login_token', '', {
            httpOnly: true,
            maxAge: new Date(0),
            path: '/'
        })
        setCookie(event, 'token', data.data.token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            path: '/'
        })
        return data.data.user
    } catch (error) {
        return error
    }
})