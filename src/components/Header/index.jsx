import './index.css';
import logoRed from '../../assets/logoRed.svg';
import logoPurple from '../../assets/logoPurple.svg';
import logoGrey from '../../assets/logoGrey.svg';

const Header = ({ logoColor, emptyBoard, onClickBtn }) => {

    const logo = logoColor === 'red' ? logoRed : logoColor === 'grey' ? logoGrey : logoPurple;

    return (
        <header>
            <h1 className={emptyBoard}>Tic Tac Toe</h1>
            <img src={logo} alt="" className={`logo ${emptyBoard}`}/>
            <button className={`btn-reset ${emptyBoard}`}
            onClick={onClickBtn}
            >Reset the game</button>
        </header>
    )
}

export default Header;