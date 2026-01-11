import React, { useState } from 'react'
import { useAuth } from '../contexts/UserContext'

function LoginForm() {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const { login } = useAuth()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email || !username) return
        login({ username, email })
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#172842]">
            <form 
                onSubmit={handleSubmit} 
                className="w-full max-w-md bg-[#2a3b52] p-8 rounded-xl shadow-2xl border border-white/10"
            >
                <h2 className="text-3xl font-bold text-white text-center mb-8">Welcome</h2>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-400 text-sm mb-1 ml-1">Username</label>
                        <input 
                            type="text" 
                            placeholder="Enter your name"
                            className="w-full bg-[#172842] text-white border border-gray-600 p-3 rounded-lg focus:outline-none focus:border-blue-500 transition"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm mb-1 ml-1">Email</label>
                        <input 
                            type="email" 
                            placeholder="Enter your email"
                            className="w-full bg-[#172842] text-white border border-gray-600 p-3 rounded-lg focus:outline-none focus:border-blue-500 transition"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg mt-4 transition duration-200 transform active:scale-95"
                    >
                        Start Managing Todos
                    </button>
                </div>
                
                <p className="text-gray-500 text-xs text-center mt-6">
                    Your todos are saved locally to this email address.
                </p>
            </form>
        </div>
    )
}

export default LoginForm