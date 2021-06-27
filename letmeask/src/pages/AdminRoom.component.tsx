import { RoomCodeComponents } from "../componentes/RoomCode.components";
import { QuestionComponent } from "../componentes/Question.components";
import { ButtonComponents } from "../componentes/Button.components";
import { useRoomHook } from "../hooks/useRoom.hooks";
import { useHistory, useParams } from "react-router-dom";

import answerImg from '../assets/images/answer.svg';
import checkImg from '../assets/images/check.svg';
import deleteImg from '../assets/images/delete.svg';
import logoImg from '../assets/images/logo.svg';

import '../styles/room.style.scss';
import { database } from "../services/firebase.service";

type RoomParams = {
    id: string;
}

export function AdminRoomComponent() {
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const { title, questions } = useRoomHook(roomId);
    const history = useHistory();

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        })
        history.push('/');
    }

    async function handleCheckQuestionAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        })
    }

    async function handleHighLightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighLighted: true,
        })
    }
    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Tem certeza que você deseja excluir esta pergunta ?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
        }
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                        <RoomCodeComponents code={roomId} />
                        <ButtonComponents onClick={handleEndRoom} isOutlined>Encerrar sala</ButtonComponents>
                    </div>
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
                <div className="question-list">
                    {questions.map(questions => {
                        return (
                            <QuestionComponent
                                key={questions.id}
                                content={questions.content}
                                author={questions.author}
                                isAnswered={questions.isAnswered}
                                isHighLighted={questions.isHignLighted}
                            >
                                {questions.isAnswered && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => handleCheckQuestionAnswered(questions.id)}
                                        >
                                            <img src={checkImg} alt="Marcar pergunta como respondida" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleHighLightQuestion(questions.id)}
                                        >
                                            <img src={answerImg} alt="Dar destaque á pergunta" />
                                        </button>
                                    </>
                                )}
                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(questions.id)}
                                >
                                    <img src={deleteImg} alt="Remover pergunta" />
                                </button>
                            </QuestionComponent>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}