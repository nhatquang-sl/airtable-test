import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from 'store';
import { getDrawings } from 'store/drawings-slice';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DrawingDto } from 'shared/models';
import IconButton from '@mui/material/IconButton';
import { Icon } from '@mui/material';

const Drawings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { getDrawingsStatus, records } = useSelector((state: RootState) => state.drawings);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (getDrawingsStatus === 'idle') {
      dispatch(getDrawings());
    }
  });

  const getModels = () => {
    const filtered = records.filter((r) => r.id === id);

    if (filtered.length)
      return filtered[0].models.map((m) => ({ id: m.id, name: m.number } as DrawingDto));
    return null;
  };

  return (
    <div>
      {getModels() && (
        <IconButton
          onClick={() => {
            navigate(`/drawings`, { replace: true });
          }}
        >
          <Icon>arrow_back</Icon>
        </IconButton>
      )}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(getModels() ?? records).map((row: DrawingDto) => (
              <TableRow
                key={row.id}
                hover={id === undefined}
                onClick={() => {
                  if (id === undefined) navigate(`/drawings/${row.id}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Drawings;
