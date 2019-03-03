import EditLogMove from "../components/EditLogMove";

const EditLogMovePage = ({ query }) => (
  <EditLogMove
    logId={query.logId}
    id={query.id}
    weight={query.weight}
    reps={query.reps}
  />
);

export default EditLogMovePage;
