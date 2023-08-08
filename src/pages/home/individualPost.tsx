import { addDoc, getDocs, collection, query, where, doc, deleteDoc } from "firebase/firestore";
import { Post as HomePost} from "./home"
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props{
    post: HomePost
}
interface Like{
    likeId: string;
    userId: string
}

export const Post = (props: Props) =>{
    const {post} = props;
    const [user] = useAuthState(auth);
    const [likes, setLikes] = useState<Like[] | null>(null)
    const likesRef = collection(db, "likes");
    const likesDoc = query(likesRef, where("postId", "==", post.id));
    const getLikes = async () =>{
       const data = await getDocs(likesDoc);
       setLikes(data.docs.map((doc)=>({userId: doc.data().userId, likeId: doc.id})));
    }
    const addLikes = async ()=>{
       try{
        const newDoc= await addDoc(likesRef,{
            userId: user?.uid,
            postId: post.id
        });
        if(user){
            setLikes((prev)=> prev ? [...prev, {userId: user.uid, likeId: newDoc.id}]:
            [{userId: user.uid, likeId: newDoc.id}]
        )
        }}
        catch(e){
            console.log(e)
        }
    };
    const removeLikes = async ()=>{
        try{ 
        const deleteLikeQuery = query(likesRef, 
        where("postId", "==", post.id),
        where("userId", "==", user?.uid));

        const deleteLikeData = await getDocs(deleteLikeQuery);
        const likeId = deleteLikeData.docs[0].id;
        const deleteLike = doc(db, "likes", likeId);
        await deleteDoc(deleteLike)
         if(user){
             setLikes((prev)=>prev && prev.filter((like)=>like.likeId !== likeId))
         }
    }
         catch(e){
             console.log(e)
         }
     };
    useEffect(()=>{
        getLikes()
    }, []);
    const postRef = collection(db, "post");
    const dman = async ()=>{
        const dQuery = query(postRef,
            where("userId", "==", user?.uid),
            where("username", "==", user?.displayName)
            );
        const dData = await getDocs(dQuery);
        const dId = dData.docs[0].id
        const deleteP = doc(db, "post", dId);
        await deleteDoc(deleteP);
        window.location.reload();
    }
    const userLiked = likes?.find((like)=>like.userId==user?.uid)
    return <div className="bg-green-100 flex flex-col items-center border border-2 border-green-400 rounded-lg p-2">
        <div><h1 className="font-bold text-4xl">{post.title}</h1></div>
        <div><h1 className="text-2xl">{post.description}</h1></div>
        <div><h1>@{post.username}</h1></div>
        <div className="flex flex-row justify-around items-center bg-green-300 g-2 w-80">
        {post.username==user?.displayName && <button onClick={dman}>❎</button>}
        <div className="flex">
        <button onClick={userLiked ? removeLikes : addLikes }>{userLiked ?<>❤️</> : <>💚</>}</button>
        {likes && <p>{likes?.length}</p>}
        </div>
        </div>
        <hr/>
    </div>
}