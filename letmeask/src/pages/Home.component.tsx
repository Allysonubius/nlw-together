// Images import
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { useHistory } from 'react-router-dom';

// Styles
import '../styles/auth.style.scss';
// Componentes
import { ButtonComponents } from '../componentes/Button';
import { useAuthHooks } from '../hooks/useAuth.hooks';

export function HomeComponent(){
    // Hooks
    const history = useHistory();
    const { user, signInWithGoogle } = useAuthHooks();

    async function handleCreateRoom() {
        if(!user){
            await signInWithGoogle();
        }
        history.push('/rooms/new');
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
                    <form>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
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