// Note.jsx
import { MdDeleteForever } from 'react-icons/md';

const Note = ({ id, text, date, handleDeleteNote }) => {
	return (
		<div className="note">
			<span className="note-text">{text}</span>
			<div className="note-footer">
				<small className="note-date">{date}</small>
				<MdDeleteForever
					onClick={() => handleDeleteNote(id)}
					className="delete-icon"
					size="1.5em"
				/>
			</div>
		</div>
	);
};

export default Note;
