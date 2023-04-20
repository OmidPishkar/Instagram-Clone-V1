import Image from "next/image"
import DotHorizontal from "./icons/DotHorizontal"
import Like from "./icons/Like"
import Chat from "./icons/Chat"
import Share from "./icons/Share"
import Bookmark from "./icons/Bookmark"
import Emoji from "./icons/Emoji"


import {
    addDoc,
    query,
    serverTimestamp,
    setDoc,
    doc,
    collection,
    deleteDoc,
    onSnapshot,
    orderBy
} from "firebase/firestore"

import { db } from "@/firebase"
import { useState, useEffect } from "react"
import Moment from "react-moment"
import { useSession } from "next-auth/react"

const Post = props => {
    const { data: session } = useSession()
    const { id, username, userImage, caption, img } = props
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')
    const [likes, setLikes] = useState([])
    const [hasLike, setHasLike] = useState(false)

    // Realtime snapshot for comments
    useEffect(() => {
        const queryRef = collection(db, 'posts', id, 'comments')
        const orderRef = orderBy('timeStamp', 'desc')

        onSnapshot(
            query(queryRef, orderBy),
            snapshot => setComments(snapshot.docs)
        )

    }, [db])

    // Realtime snapshot for likes
    useEffect(() => {
        const queryRef = collection(db, 'posts', id, 'likes')

        onSnapshot(
            query(queryRef),
            snapshot => setLikes(snapshot.docs)
        )

    }, [db, id])

    useEffect(() => {

        setHasLike(
            likes.findIndex((like) => like.id === session?.user?.uid) !== -1
        )

    }, [likes])



    const likePost = async () => {
        const docRef = doc(db, 'posts', id, 'likes', session.user.uid)

        if (hasLike) {
            await deleteDoc(doc(db, "posts", id, "likes", session.user.uid))

        } else {
            await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
                username: session.user.username
            })
        }
    }

    const sendComment = async (e) => {
        e.preventDefault();

        const commentToSend = comment;
        setComment("");
        await addDoc(collection(db, "posts", id, "comments"), {
            comment: commentToSend,
            username: session.user.username,
            userImg: session.user.image,
            timestamp: serverTimestamp(),
        });
    };



    return (
        <div className="bg-white my-7 border rounded-sm overflow-hidden m-2">

            {/* Header */}
            <div className="flex items-center p-5">
                <Image
                    className="rounded-full w-12 h-12 object-cover border-[3px] border-blue-400 p-[2px] mr-3"
                    height={300}
                    width={300}
                    src={userImage}
                    // src={require(`@/public/images/1.jpg`)}
                    alt={'user profile'}
                    priority
                />

                <p className="flex-1 font-bold">
                    {username}
                </p>

                <DotHorizontal />
            </div>

            {/* Image */}
            <Image
                src={img}
                priority
                width={700}
                height={700}
                alt="new post"
                className="object-cover w-full max-h-[600px]"
            />

            {/* Buttons */}
            <div className="flex justify-between p-4">
                <div className="flex items-center space-x-4">
                    <button onClick={likePost}>
                        <Like className={`btn ${hasLike ? 'text-red-700' : 'text-black'}`} />
                    </button>
                    <Chat className={'btn'} />
                    <Share className={'btn'} />
                </div>

                <Bookmark className={'btn'} />
            </div>


            {/* Caption */}
            <div className="p-5 truncate">
                {likes.length > 0 && (
                    <p className="font-bold text-sm mb-1 text-gray-500">
                        {likes.length} Likes
                    </p>
                )}
                <span className="font-bold text-lg mr-1 underline hover:text-blue-700 cursor-pointer">{username}</span>
                <p className="text-gray-700 mt-1 break-words w-full">{caption}</p>
            </div>

            {/* Comments */}


            {comments.length > 0 && (
                <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
                    {comments.map((comment) => (
                        <div className="flex items-center space-x-2 mb-3" key={comment.id}>
                            <img
                                className="h-7 w-7 rounded-full"
                                src={comment.data().userImg}
                                alt=""
                            />
                            <p className="text-sm flex-1">
                                <span className="font-bold mr-3">
                                    {comment.data().username}
                                </span>
                                {comment.data().comment}
                            </p>
                            <Moment className="pr-5 text-sm text-gray-400" fromNow>
                                {comment.data().timestamp?.toDate()}
                            </Moment>
                        </div>
                    ))}
                </div>
            )}


            {/* Input box */}
            {session ? (
                <form className="flex items-center p-4">
                    <Emoji
                        className={'cursor-pointer'}
                    />

                    <input
                        className="w-[50vw] flex-1 sm:w-max mx-2 border-none px-5 
                        focus:ring-0 outline-none placeholder:text-gray-300"
                        type='text'
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        placeholder="Add a comment.."
                    />

                    <button
                        onClick={sendComment}
                        type="submit"
                        className="cursor-pointer font-semibold text-blue-400 hover:scale-110"
                    >
                        Post
                    </button>

                </form>
            ) : (
                <p className="text-xs text-center py-2 text-gray-300">For Create Comment Please Login</p>
            )}

        </div>
    )
}

export default Post