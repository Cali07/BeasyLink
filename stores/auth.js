import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        activeCenter: null,
        mockuser: [
            { username: 'admin', password: 'admin' },
        ]
    }),
    actions: {
        async login(username, password) {
            const match = this.mockuser.find(
                (user) => user.username === username && user.password === password
            )
            if (!match) {
                throw new Error('Invalid credentials')
            }
            this.user = { username: match.username }
        },
    }
})
