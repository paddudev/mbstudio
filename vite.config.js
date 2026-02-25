import {defineconfig} from 'vite'
import react from '@vitejs/plugin-react'

export default defineconfig({
    Plugin: [react()],
    base: process.env.VITE_BASE_PATH || "/mdstudio"
})