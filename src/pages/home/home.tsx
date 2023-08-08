import React, { useEffect, useState } from 'react'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../../config/firebase';
import { Post } from './individualPost';

export interface Post{
  id: string;
  userId: string;
  title: string;
  username: string;
  description: string;
}

export const Home = () => {

  const [postsList, setPostsList] = useState<Post[] | null>(null);
  const postRef = collection(db, "post");
  const getPosts = async ()=>{
    const data = await getDocs(postRef);
    setPostsList(
      data.docs.map((doc)=>({...doc.data(), id: doc.id})) as Post[]
      );
  }
  useEffect(()=>{
    getPosts();
  },[])
  return (
    <div>
       {
        postsList?.map((post)=>(<Post post={post}/>))
       }
    </div>
  )
}

export default Home