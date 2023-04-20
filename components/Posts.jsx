import { useEffect, useState } from "react"
import Post from "./Post"

import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from "@/firebase"
import Spinner from "./Spinner"

// const posts = [
//     {
//         id: '123',
//         username: 'omid.pishkar.17',
//         userImg: '/profiles/main-profile.png',
//         img: '/posts/1.jpg',
//         caption: 'This is a caption for the my post...'
//     },

//     {
//         id: '124',
//         username: 'reyhaneh.azimi',
//         userImg: '/profiles/2.jpg',
//         img: '/posts/2.jpg',
//         caption: 'This is a caption for the my post...'
//     },

//     {
//         id: '125',
//         username: 'Andrew.Jackson',
//         userImg: '/profiles/3.jpg',
//         img: '/posts/3.jpg',
//         caption: 'This is a caption for the my post...'
//     },

//     {
//         id: '126',
//         username: 'lorem.ipsum',
//         userImg: '/profiles/4.jpg',
//         img: '/posts/4.jpg',
//         caption: 'This is a caption for the my post...'
//     },

//     {
//         id: '127',
//         username: 'test.user',
//         userImg: '/profiles/5.jpg',
//         img: '/posts/5.jpg',
//         caption: 'This is a caption for the my post...'
//     },

//     {
//         id: '128',
//         username: 'great.man',
//         userImg: '/profiles/6.jpg',
//         img: '/posts/6.jpg',
//         caption: 'This is a caption for the my post...'
//     },

//     {
//         id: '129',
//         username: 'user.test.2',
//         userImg: '/profiles/7.jpg',
//         img: '/posts/7.jpg',
//         caption: 'This is a caption for the my post...'
//     },

//     {
//         id: '132',
//         username: 'user.test.4',
//         userImg: '/profiles/8.jpg',
//         img: '/posts/8.jpg',
//         caption: 'This is a caption for the my post...'
//     },

//     {
//         id: '134',
//         username: 'user.test.17',
//         userImg: '/profiles/9.jpg',
//         img: '/posts/9.jpg',
//         caption: 'This is a caption for the my post...'
//     },

//     {
//         id: '135',
//         username: 'user.test.5',
//         userImg: '/profiles/10.jpg',
//         img: '/posts/10.jpg',
//         caption: 'This is a caption for the my post...'
//     },

// ]


const Posts = () => {
    const [posts , setPosts] = useState([])

    useEffect( () => {
        const colRef = collection(db, "posts")
        const orderRef = orderBy('timeStamp' , 'desc')

        onSnapshot(
            query(colRef , orderRef) ,
            (snapshot) => setPosts(snapshot.docs) 
        )

    } , [])

    return (
        <div>
            {posts[0] ? posts.map(p => {
                console.log(posts);
                return (
                    <Post
                        key={p.id}
                        id={p.id}
                        username={p.data().username}
                        userImage={p.data().profileImg}
                        caption={p.data().caption}
                        img={p.data().image}
                    />
                )
            }) 
            : 
            <div className="w-full py-10 flex items-center justify-center">
                <Spinner/>
            </div>}
        </div>
    )
}

export default Posts