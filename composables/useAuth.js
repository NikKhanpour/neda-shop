export const useAuth = () => {
    const authUser = useState('authUser', () => null)
    return { authUser }
}