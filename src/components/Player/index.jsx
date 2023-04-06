import './index.css';
import playerIcon from '../../assets/user.svg';

const Player = ({ playerId, playerName, playerScore, isDisabled, isActive, playerNameChange, isScoreActive }) => {




    return (
        <>
            <div className={`player ${playerId} ${isDisabled} ${isActive}`}>
                <img src={playerIcon} alt="" className="player-icon" />
                <p
                contentEditable
                onBlur={playerNameChange} 
                className="player-name"
                spellCheck="false"
                >
                    {playerName}
            </p>
                <p className={`player-score ${isScoreActive}`}>{playerScore}</p>
            </div>
        </>
    )
}

export default Player;