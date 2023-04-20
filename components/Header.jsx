// next
import Image from "next/image"
import { useSession , signIn } from 'next-auth/react'
import Link from "next/link"

// Recoil
import { useRecoilState } from 'recoil'
import { modalState } from "@/atom/modal_atom"

// Files
import PaperAirPlane from "./icons/PaperAirPlane"
import PlusCircle from "./icons/PlusCircle"
import UserGroup from "./icons/UserGroup"
import Heart from "./icons/Heart"
import HomeIcon from "./icons/Home"
import Menu from "./icons/Menu"




const Header = () => {
    const { data: session } = useSession()
    const [open , setOpen] = useRecoilState(modalState)
    console.log(open);

    const sign_in_button = (
        <button
            onClick={signIn} 
            className="border-2 border-blue-500 py-1 px-2 rounded-lg"
        >
            Sign In
        </button>
    )
    
    const after_user_logged = (
        <div
            className="flex items-center justify-end space-x-4"
        >
            <HomeIcon className={'navBtn'} />
    
            <Menu className={'navBtn inline-block md:hidden'} />
    
            <div className='relative navBtn'>
                <PaperAirPlane className={'-rotate-45'} />
                <div
                    className="absolute -top-2 -right-2 bg-red-500 text-xs w-5 h-5 
                                rounded-full flex items-center justify-center text-white font-medium
                                animate-pulse"
                >3</div>
            </div>
    
            <button
                onClick={ () => setOpen(true) } 
                className="p- flex items-center justify-center"
            >
                <PlusCircle className={'navBtn'} />
            </button>


            <UserGroup className={'navBtn'} />
            <Heart className={'navBtn'} />
    
            <Image
                src={session?.user.image}
                className="w-10 h-10 rounded-full object-contain cursor-pointer hover:scale-150 transition-all duration-150"
                width={100}
                height={100}
                alt="profile"
            />
    
        </div>
    )

    return (
        <div className="py-4 border-b shadow-sm bg-white sticky top-0 z-50">
            <div className="flex items-center justify-between mx-5 xl:mx-auto max-w-6xl">

                {/* Left - logo */}
                <div
                    className="hidden lg:inline-grid w-24 h-4 cursor-pointer"
                >
                    <Link href={'/'}>
                        <Image
                            alt='Instagram'
                            width={300}
                            height={100}
                            src={require('@/public/images/instargam-icon-large.png')}
                        />
                    </Link>
                </div>

                <div
                    className="inline-grid lg:hidden w-10 h-10 flex-shrink-0 cursor-pointer"
                >
                    <Image
                        alt='Instagram'
                        width={300}
                        height={100}
                        src={require('@/public/images/instargam-icon-small.png')}
                    />
                </div>


                {/* middle - search */}

                <div
                    className="max-w-xs px-1 sm:px-3 py-1 mx-2 rounded-md border flex 
                    items-center bg-gray-50"
                >
                    <Image
                        alt="search"
                        className="pl-3 h-5 w-8"
                        src={require('@/public/images/icons/search-icon.png')}
                    />
                    <input
                        className=" block w-full pl-10 sm:text-sm border-0 focus:ring-gray-200 rounded-lg ml-1"
                        type="text"
                        placeholder="Search..."
                    />
                </div>

                {/* right - icons */}

                {session ? after_user_logged : sign_in_button}



            </div>
        </div>
    )
}

export default Header