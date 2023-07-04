// import "./PresentationBox.css"

function PresentationBox ({ presentation: { author, title }}) {
  const { username } = author;
  return (
    <div className="presentation">
      <h3>{username}</h3>
      <p>{title}</p>
    </div>
  );
}

export default PresentationBox;