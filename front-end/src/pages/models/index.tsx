import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { getModels, toggleModel } from 'store/models-slice';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ModelDto } from 'shared/models';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';

import { Icon } from '@mui/material';

const Models = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { getModelsStatus, records } = useSelector((state: RootState) => state.models);

  useEffect(() => {
    if (getModelsStatus === 'idle') {
      dispatch(getModels());
    }
  });

  const renderModels = (models: ModelDto[] = [], parentId: string = '', queue: number[] = []) => {
    return (
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {models.map((model: ModelDto, index: number) => {
            const key = parentId + model.id;
            const curQueue = queue.concat([index]);
            const hasChildren = model.children?.length;

            return (
              <React.Fragment key={key}>
                <TableRow>
                  <TableCell>
                    {hasChildren && (
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => {
                          dispatch(toggleModel(curQueue));
                        }}
                      >
                        <Icon>{model.open ? 'expand_less' : 'expand_more'}</Icon>
                      </IconButton>
                    )}
                    {curQueue.join('-')}
                  </TableCell>
                  <TableCell>{model.number}</TableCell>
                </TableRow>
                {hasChildren && (
                  <TableRow>
                    <TableCell style={{ paddingRight: 0, paddingTop: 0 }} colSpan={2}>
                      <Collapse in={model.open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>{renderModels(model.children, key, curQueue)}</Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    );
  };

  return <TableContainer component={Paper}>{renderModels(records)}</TableContainer>;
};

export default Models;
