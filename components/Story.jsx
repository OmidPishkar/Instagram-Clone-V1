import Image from "next/image"

const Story = ({img , username }) => {
    
    return (
        <div className="cursor-pointer">
            <img 
                src={`${img}`} 
                alt='' 
                className="h-14 w-14 rounded-full p-1 border-red-500 border-2 
                object-contain hover:scale-110 transition-all duration-100"
            />
            
            <p
                className="text-sm w-14 truncate text-center"
            >
                {username}
            </p>
        
        </div>
    )
}

export default Story