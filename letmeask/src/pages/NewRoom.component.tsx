// Images import
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
// wehpack (snowpack, vice, ...);

import '../styles/auth.style.scss';
// Componentes
import { ButtonComponents } from '../componentes/Button.components';
import { Link, useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase.service';
import { useAuthHooks } from '../hooks/useAuth.hooks';

export function NewRoomComponent(){
    const { user } = useAuthHooks();
    const history = useHistory();
    const [newRoom, setNewRoom ] = useState('');

    async function handleCreateRoom(event:FormEvent){
        event.preventDefault();
        if(newRoom.trim() === ''){
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId:user?.id,
        })
        history.push(`/rooms/${firebaseRoom.key}`)
    }

    return(
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando pergunta e respostas." />
                <strong>Crie salas de Q&amp;A ao vivo.</strong>
                <p>Tire suas dúvidas de sua audiência em tempo real.</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Logo do site" />
                    <h2 className="name">Olá <span>{user?.name}</span></h2>
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event?.target.value)}
                            value={newRoom}
                        />
                        <ButtonComponents type="submit">
                            Criar sala
                        </ButtonComponents>
                    </form>
                    <p>
                        Quer entrar uma sala uma existente ?<Link to="/"> clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}