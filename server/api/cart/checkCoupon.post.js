export default defineEventHandler(async (event) => {
    const { public: { apiBase } } = useRuntimeConfig();
    const token = getCookie(event, 'token')
    const body = await readBody(event);
    try {
        const data = await $fetch(`${apiBase}/check-coupon`, {
            method: 'POST',
            body,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        return data.data.percentage
    } catch (error) {
        return error;
    }
})