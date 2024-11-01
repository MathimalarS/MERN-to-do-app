import '../assets/css/Notescontainer.css';

function Colour({ setColor, notesExist }) {
  const colors = ["#FFD700", "#FF6347", "#90EE90", "#ADD8E6", "#FFB6C1"];

  return (
    <div className="sidebar">
      {notesExist ? (
        colors.map((color, index) => (
          <div
            key={index}
            className="color-option"
            style={{ backgroundColor: color }}
            onClick={() => setColor(color)}
          />
        ))
      ) : (
        <p className="no-notes-message">No note exists</p>
      )}
    </div>
  );
}

export default Colour;
