import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip'; //animación de desvanecimiento

const EditIconButton = ({ onClick }) => (
  <Tooltip title="Editar" arrow>
    <IconButton onClick={onClick} color="warning">
      <EditIcon />
    </IconButton>
  </Tooltip>
);

export default EditIconButton;
