import Card from "./shared/Card";

function FeedbackItem({ item }) {
  return (
    <Card>
      <div className="num-display">{item.rating}</div>
      <h2>{item.title}</h2>
      <span>by {item.author}</span>
      <div className="text-display">
        <p>{item.body}</p>
      </div>
      <div className="name-display">- {item.username}</div>
    </Card>
  );
}

export default FeedbackItem;
