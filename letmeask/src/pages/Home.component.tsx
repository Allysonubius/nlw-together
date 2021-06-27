// Images import
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { useHistory } from 'react-router-dom';

// Styles
import '../styles/auth.style.scss';
// Componentes
import { ButtonComponents } from '../componentes/Button.components';
import { useAuthHooks } from '../hooks/useAuth.hooks';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase.service';

export function HomeComponent(){
    // Hooks
    const history = useHistory();
    const { user, signInWithGoogle } = useAuthHooks();
    const [roomCode, setRoomCode] = useState('');

    async function handleCreateRoom() {
        if(!user){
            await signInWithGoogle();
        }
        history.push('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent){
        event.preventDefault();
        if(roomCode.trim() === ''){
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if(!roomRef.exists()){
            alert('Room does not exists.');
            return;
        }

        if(roomRef.val().endedAt){
            alert('Room already closed !');
            return;
        }

        history.push(`rooms/${roomCode}`);
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
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com o google
                    </button>
                    <div className="separator">
                        ou enetre em uma sala
                    </div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <ButtonComponents type="submit">
                            Entrar na sala
                        </ButtonComponents>
                    </form>
                </div>
            </main>
        </div>
    )
}