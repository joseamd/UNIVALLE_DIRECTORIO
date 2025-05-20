import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip'; //animación de desvanecimiento

const DeleteIconButton = ({ onClick }) => (
  <Tooltip title="Eliminar" arrow>
    <IconButton onClick={onClick} color="error">
      <DeleteIcon />
    </IconButton>
  </Tooltip>
);

export default DeleteIconButton;
