import { Button } from "@mui/material";

const CustomButtonComp = (props: any) => {
  const handleViewClick = () => {
    props.onView?.(props.node.data.id);
  };

  const handleDeleteClick = () => {
    props.onDelete?.(props.node.data.id);
  };

  return (
    <div>
      <Button
        onClick={handleViewClick}
        size="small"
        variant="contained"
        sx={{ fontSize: "0.65rem", padding: "2px 6px", marginRight: "5px" }}
      >
        View
      </Button>
      <Button
        onClick={handleDeleteClick}
        size="small"
        variant="outlined"
        sx={{ fontSize: "0.65rem", padding: "2px 6px" }}
      >
        Delete
      </Button>
    </div>
  );
};

export default CustomButtonComp;
