import { ButtonComponents } from "../componentes/Button.components";
import  logoImg from '../assets/images/logo.svg';

import '../styles/room.style.scss';
import { RoomCodeComponents } from "../componentes/RoomCode.components";
import { FormEvent, useEffect, useState } from "react";
import { useAuthHooks } from "../hooks/useAuth.hooks";
import { useParams } from "react-router-dom";
import { database } from "../services/firebase.service";

type FirebaseQuestions = Record<string,{
    author:{
        name:string;
        avatar:string;
    },
    content:string;
    isAnswered: boolean;
    isHignLighted:boolean;
}>

type RoomParams = {
    id:string;
}
type Questions ={
    id: string;
    author:{
        name:string;
        avatar:string;
    },
    content:string;
    isAnswered: boolean;
    isHignLighted:boolean;
}

export function RoomComponent(){
    const { user } = useAuthHooks();
    const params = useParams<RoomParams>();

    const [ newQuestion, setNewQuestion ] = useState('');
    const [ questions, setQuestions ] = useState<Questions[]>([]);
    const [ title, setTile ] = useState('');

    const roomId = params.id;

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
                }
            })
            setTile(databaseRoom.title);
            setQuestions(parseQuestions);
        })
    }, [roomId]);

    async function handleSendQuestion(event: FormEvent){
        event.preventDefault();
        if(newQuestion.trim() === ''){
            return;
        }
        if(!user){
            throw new Error ('You must be logged in');
        }
        const question = {
            content: newQuestion,
            author:{
                name: user.name,
                avatar: user.avatar,
            },
            isHighLighted: false,
            isAnswered: false
        };
        await database.ref(`rooms/${roomId}/questions`).push(question);
        setNewQuestion('');
    }
    
    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <RoomCodeComponents code={roomId}/>
                </div>
            </header>
            <main >
                <div className="room-title">
                    <h1>SALA {title}</h1>
                    {questions.length > 0 && 
                    <span>
                        {questions.length} perguntas
                    </span>
                    }
                </div>
                <form onSubmit={handleSendQuestion}>
                    <textarea
                        placeholder="O que voce quer perguntar ?"
                        onChange={event => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    />
                    <div className="form-footer">
                        {user ?(
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name}/>
                                <span> {user.name}</span>
                            </div>
                        ):(
                            <span>Para enviar uma pergunta, faça seu &nbsp;
                                <button> login </button> 
                            </span>
                            )
                        }
                        <ButtonComponents disabled={!user} type="submit">Enviar pergunta</ButtonComponents>
                    </div>
                </form>
            </main>
        </div>
    )
}