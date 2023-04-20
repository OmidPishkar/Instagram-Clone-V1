import {faker} from '@faker-js/faker'
import {useState , useEffect} from 'react'
import {useSession} from 'next-auth/react'
import Story from './Story'

const Stories = () => {
    const { data: session } = useSession()
    const [ suggestions , setSuggestions ] = useState([])

    useEffect( () => {
        const suggections = [...Array(25)].map( ( _ , i ) => {
            return {
                avatar: faker.image.avatar(),
                name: faker.name.firstName(),
                username: faker.internet.userName(),
                phone: faker.phone.number(),
                company: faker.company.bsNoun(),
                email: faker.internet.email(),
                id: i
            }
        } )

        setSuggestions(suggections)
    } , [])

    return (
        <div 
            className='flex space-x-4 p-6 bg-white mt-8 border-b border-gray-200
            overflow-x-scroll scrollbar-thin scrollbar-thumb-black'
        >
            {session && 
                (
                    <Story 
                        img={session.user.image} 
                        username={session.user.name}
                    />
                )
            }
            {suggestions.map(sugges => {
                return (
                    <Story 
                        key={sugges.id} 
                        img={sugges.avatar} 
                        username={sugges.username}
                    />
                )
            })}
        </div>
    )
}

export default Stories