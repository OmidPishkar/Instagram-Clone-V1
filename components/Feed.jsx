import MiniProfile from "./MiniProfile"
import Posts from "./Posts"
import Stories from "./Stories"
import Suggestions from "./Suggestions"
import { useSession } from "next-auth/react"

const Feed = () => {
    const { data : session } = useSession()

    return (
        <main 
            className="grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3
            xl:max-w-6xl mx-auto"
        >
            <section className="col-span-2">
                
                {/* Stories - Section */}
                <Stories/>
                
                {/* Posts - Section */}
                <Posts/>

            </section>



            <section className="hidden xl:inline-grid md:col-span-1">
                
                {session && (
                    <div className="fixed top-20 h-max">
                        {/* mini profile and suggection */}
                        <MiniProfile/>

                        {/* Suggestions */}
                        <Suggestions/>
                    
                    </div>
                )}

                {!session && (
                    <h1 className="text-center pt-10 font-semibold text-lg">PLease Login!</h1>
                )}



            </section>

        </main>
    )

}

export default Feed