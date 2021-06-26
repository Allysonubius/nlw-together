import coyImg from '../assets/images/copy.svg';

import '../styles/room-code.style.scss';

type RoomCodeProps ={
    code:string;
}

export function RoomCodeComponents(props:RoomCodeProps){
    function copyRoomToClipboard(){
        navigator.clipboard.writeText(props.code);
    }

    return(
        <button className="room-code" onClick={copyRoomToClipboard}>
            <div>
                <img src={coyImg} alt=""/>
            </div>
            <span>SALA {props.code}</span>
        </button>
    )
}