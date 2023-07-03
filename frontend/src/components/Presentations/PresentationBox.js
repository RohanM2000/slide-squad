// import "./PresentationBox.css"

function PresentationBox ({ presentation: { text, author }}) {
  const { username } = author;
  return (
    <div className="presentation">
      <h3>{username}</h3>
      <p>{text}</p>
    </div>
  );
}

export default PresentationBox;