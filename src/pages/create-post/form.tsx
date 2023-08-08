import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup"
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

interface CreateFormData{
    title: string;
    description: string;
}

export const CreatePostForm = ()=>{
    
    const [user] = useAuthState(auth);

    const navigate = useNavigate();
    
    const schema = yup.object().shape({
        title: yup.string().required("You must add a title"),
        description: yup.string().required("You must add a description")
    })
    const {register, handleSubmit, formState: {errors}} = useForm<CreateFormData>({
        resolver: yupResolver(schema)
    });
    const postRef = collection(db, "post");
    const onCreatePost = async (data: CreateFormData)=>{
        await addDoc(postRef,{
           ...data,   
            username: user?.displayName,
            userId: user?.uid
        });

        navigate("/")

    }
    return(
        <form onSubmit={handleSubmit(onCreatePost)} className="flex flex-start flex-col items-center">
            <input placeholder="Title..." {...register("title")}
            className="border-2 border-green-400 p-2"
            />
            <p className="text-red-400">{errors.title?.message}</p>
            <textarea placeholder="Description..." {...register("description")}
            className="border-2 border-green-400 p-2s"/>
            <p className="text-red-400">{errors.description?.message}</p>
            <input type="submit"
       className='bg-green-300 rounded-lg p-1 border-2 border-green-400 active:bg-green-100'/>
        </form>
    )
}