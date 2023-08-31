export default defineEventHandler(async (event) => {
    const { public: { apiBase } } = useRuntimeConfig()
    const body = await readBody(event);
    const token = getCookie(event, 'token')
    try {
        const data = await $fetch(`${apiBase}/payment/send`, {
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