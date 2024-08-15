import React from 'react'

interface User{
    id: number;
    name: string;
}

const IteneraryPage = async () => {
    const mydata = await fetch('https://jsonplaceholder.typicode.com/users');
    const users: User[] = await mydata.json();
    return (
    <>
        <h1>Users</h1>
        <ul>
            {users.map(user => <li key={user.id}>{user.name}</li>)}
        </ul>
    
    </>
    
  )
}

export default IteneraryPage
