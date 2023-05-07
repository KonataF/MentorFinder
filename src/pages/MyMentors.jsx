import UserCard from '../Components/UserCard'
import React, { useState, useEffect } from "react"
import '../index.css'


function MyMentors() {
    const [data, setData] = useState(null)
    const userId = localStorage.getitem("userId")
    const typeOfUser = localStorage.getItem("userType")
    console.log(userId, typeOfUser)
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/mymentors/${typeOfUser}/${userId}`)
            const result = await response.json()
            setData(result.data)
            console.log(data)
    };
    fetchData()
}, [typeOfUser, userId])

    return (
        <div>
            {data ? (
                data.map((usercard) => (
                    <div>
                        <UserCard/>
                    </div>
            ))
            ) : ( <p>Usercard</p>
            )}
        </div>
    )
}

export default MyMentors
