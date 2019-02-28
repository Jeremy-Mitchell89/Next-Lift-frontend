import EditLogMove from "../components/EditLogMove";

const EditLogMovePage = ({ query }) => (
  <EditLogMove id={query.id} weight={query.weight} reps={query.reps} />
);

export default EditLogMovePage;
