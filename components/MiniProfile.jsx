import Image from "next/image"
import { useSession , signOut } from "next-auth/react"

const MiniProfile = () => {
    const {data : session} = useSession()

    return (
        <div className="flex items-center justify-between mt-14 ml-10">
            <Image
                className="rounded-full border-2 w-16 h-16 object-cover"
                src={session.user.image}
                width={100}
                height={100}
                alt="profile"
            />
            <div className="flex-1 mx-4">
                <h2 className="font-medium">{session.user.name}</h2>
                <h3 className="text-xs truncate text-gray-400 w-[230px]">
                    Keep Going.... you can!!
                </h3>
            </div>
            <button 
                onClick={signOut}
                className="border text-blue-400 w-max text-sm font-semibold py-2 px-1 rounded-lg ">
                Sign out!
            </button>
        </div>
    )
}

export default MiniProfile