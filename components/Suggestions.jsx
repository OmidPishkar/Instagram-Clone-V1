import {faker} from '@faker-js/faker'
import { useEffect , useState } from "react"

const Suggestions = () => {
    const [suggections , setSuggections] = useState([])

    useEffect( () => {
        const suggestions = [...Array(8)].map( (_ , i) => {
            return{
                    avatar: faker.image.avatar() ,
                    name: faker.name.firstName,
                    username: faker.internet.userName(),
                    phone: faker.phone.number(),
                    company: faker.company.bsNoun(),
                    email: faker.internet.email(),
                    id: faker.address.street(),
            }
        })

        setSuggections(suggestions)
    } , [])
    

    return (
    
        <div className='mt-4 ml-10'>

            <div className='flex items-center justify-between text-sm mb-5'>
                <h3
                    className='text-sm font-medium text-gray-400'
                >
                    Suggestions for you
                </h3>
                <button
                    className='text-gray-600 font-semibold'
                >
                    See All
                </button>
            </div>

            <ul>

                {suggections.map(s => {
                    return (
                        <li 
                            className='flex items-center justify-between mt-3' 
                            key={s.id}
                        >
                            <img  
                                width={40} 
                                height={40} 
                                src={s.avatar} 
                                alt='profile' 
                                className='w-10 h-10 rounded-full'
                            />

                            <div className='text-left flex-1 ml-5'>
                                <h2 className='font-medium text-sm'>{s.username}</h2>
                                <h3 className='text-gray-400 text-xs'>Works at {s.company}</h3>
                            </div>

                            <button 
                                className='text-blue-400 hover:text-blue-800 px-1 py-2 rounded-lg text-sm'>
                                Follow
                            </button>

                        </li>
                    )
                })}

            </ul>
        </div>
    
    )

}

export default Suggestions