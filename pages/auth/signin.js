import Header from "@/components/Header"
import Image from "next/image"
import { getProviders , signIn as SignInProvider } from 'next-auth/react'

const signIn = ({providers}) => {
    return (
        <div className="min-h-screen">
            <Header/>
            
            <div className="flex flex-col items-center pt-12">
                <Image
                    alt="Logo"
                    width={300}
                    height={80} 
                    src={require('@/public/images/instargam-icon-large.png')}
                />

                <p 
                    className="text-lg font-medium mt-8 text-center text-gray-600"
                >
                    Instagram Clone From<br/> @omidjr17@gmail.com
                </p>

                <hr/>

                <div className="mt-6">
                    {Object.values(providers)?.map(provide => {
                        return(
                            <div
                                className="bg-blue-500 rounded-lg p-3 text-white hover:bg-blue-400 cursor-pointer" 
                                key={provide.name}
                            >
                                <button 
                                    onClick={ () => SignInProvider(provide.id , {callbackUrl : '/'}) }>
                                    Sign In with {provide.name}
                                </button>
                            </div>
                        )
                    }) }
                </div>

            </div>
        </div>
    )
}

export default signIn

export const getServerSideProps = async () => {
    const providers = await getProviders()

    return {
        props: {
            providers
        }
    }
} 