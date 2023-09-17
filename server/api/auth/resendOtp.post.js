export default defineEventHandler(async (event) => {
    const { public: { apiBase } } = useRuntimeConfig()
    const login_token = getCookie(event, 'login_token')
    try {
        const data = await $fetch(`${apiBase}/auth/resend-otp`, {
            method: 'POST',
            body: { login_token },
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