export default defineEventHandler(async (event) => {
    const { public: { apiBase } } = useRuntimeConfig()
    const token = getCookie(event, 'token')
    const body = await readBody(event)
    try {
        const data = await $fetch(`${apiBase}/profile/addresses/create`, {
            method: 'POST',
            body,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        return data.data
    } catch (error) {
        return error
    }
})