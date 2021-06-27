import { useAuthHooks } from './useAuth.hooks';
import { useEffect, useState } from "react";
import { database } from "../services/firebase.service";

type FirebaseQuestions = Record<string,{
    author:{
        name:string;
        avatar:string;
    },
    content:string;
    isAnswered: boolean;
    isHignLighted:boolean;
    likes:Record<string, {
        authorId:string;
    }>;
}>

type QuestionsType ={
    id: string;
    author:{
        name:string;
        avatar:string;
    },
    content:string;
    isAnswered: boolean;
    isHignLighted:boolean;
    likeCount:number;
    likeId:string | undefined;
}



export function useRoomHook(roomId:string){
    const { user } = useAuthHooks();
    const [ questions, setQuestions ] = useState<QuestionsType[]>([]);
    const [ title, setTile ] = useState('');

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        roomRef.on('value', room => {
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
            const parseQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return{
                    id:key,
                    content:value.content,
                    author: value.author,
                    isHignLighted:value.isHignLighted,
                    isAnswered:value.isAnswered,
                    likeCount:Object.values(value.likes ??{}).length,
                    likeId:Object.entries(value.likes ??{}).find(([key,like]) => like.authorId === user?.id)?.[0],
                }
            })
            setTile(databaseRoom.title);
            setQuestions(parseQuestions);
        })
    }, [roomId, user?.id]);
    return {questions, title};
}