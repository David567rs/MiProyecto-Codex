import React, { useState } from 'react'
import { API_URL } from '../utils/constants'

const useParent = () => {

        const [parents, setParents] = useState([])
        const [loading, setLoading] = useState(false)
        const [error, setError] = useState({})

        const getParents = async () => {
                try {
                        setLoading(true)
                        const response = await fetch(`${API_URL}/users/parents`, {
                                method: 'GET',
                        })
                        const data = await response.json()
                        setParents(data)
                } catch (error) {
                        setError(error)
                } finally {
                        setLoading(false)
                }
        }

        return {
                getParents,
                parents,
                loading,
        }
}

export default useParent