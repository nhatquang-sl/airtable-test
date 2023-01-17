import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from 'store';
import { getServices } from 'store/services-slice';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ServiceDto } from 'shared/models';
import IconButton from '@mui/material/IconButton';
import { Icon } from '@mui/material';

const Services = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { getServicesStatus, records } = useSelector((state: RootState) => state.services);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (getServicesStatus === 'idle') {
      dispatch(getServices());
    }
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>End Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((r) => (
            <TableRow key={r.id}>
              <TableCell>{r.name}</TableCell>
              <TableCell>{new Date(r.endDate).toISOString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Services;
