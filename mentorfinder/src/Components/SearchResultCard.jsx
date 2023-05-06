function SearchResultCard({ data, onButtonClick }) {
  const handleClick = () => {
    onButtonClick(data["_id"]["$oid"]);
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{`${data.fname} ${data.lname}`}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{data.email}</h6>
        <p className="card-text">{data.status}</p>
        <button onClick={handleClick}>Get fname</button>
      </div>
    </div>
  );
}

export default SearchResultCard;
