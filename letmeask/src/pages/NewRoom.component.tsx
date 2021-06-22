// Images import
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
// wehpack (snowpack, vice, ...);

import '../styles/auth.style.scss';
// Componentes
import { ButtonComponents } from '../componentes/Button';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/Auth.context';

export function NewRoomComponent(){
    const { user } = useContext(AuthContext);

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
                    <form>
                        <input
                            type="text"
                            placeholder="Nome da sala"
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