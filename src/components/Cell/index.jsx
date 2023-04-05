import './index.css';

const Cell = ({content, onClick, disabled}) => {
    return (
        <div className={`cell ${disabled ? 'disabled' : ''}`} 
        onClick={onClick} 
        >{content}</div>
    )
}

export default Cell;