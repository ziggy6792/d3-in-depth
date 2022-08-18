/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { FC, PropsWithChildren, ReactNode, useState } from 'react';
import { Box, Grid, Skeleton, Typography } from '@mui/material';
import { SystemStyleObject } from '@mui/system';
import { Theme } from 'src/theme';

export type ISkeleton =
  | {
      width: string | number;
      height: string | number;
    }
  | boolean;

export interface ContainerProps {
  onClick?: () => void;
  padding?: boolean;
  maxHeight?: boolean;
  skeleton?: ISkeleton;
  title?: string | ReactNode;
  sx?: SystemStyleObject<Theme>;
  alignTitle?: string;
  titleStyle?: SystemStyleObject<Theme>;
}

const Container: FC<PropsWithChildren<ContainerProps>> = ({
  children,
  sx: sxProps,
  title,
  onClick,
  padding = true,
  maxHeight,
  skeleton = false,
  alignTitle = 'center',
  titleStyle = { fontWeight: 'normal' },
}) => {
  const [focus, setFocus] = useState(false);

  const isClackable = !!onClick;

  const sx = (theme: Theme) => ({
    backgroundColor: isClackable && focus ? theme.palette.common.lightBlue : theme.palette.common.white,
    // ToDo : it seems this padding is applied unevenly
    padding: padding ? theme.spacing(2) : undefined,
    cursor: isClackable ? 'pointer' : undefined,
    overflow: 'hidden',
    height: maxHeight ? '100%' : undefined,
    ...sxProps,
  });

  if (skeleton) {
    return (
      <Skeleton
        width={typeof skeleton === 'object' && skeleton.width ? skeleton.width : '100%'}
        height={typeof skeleton === 'object' && skeleton.height ? skeleton.height : '100%'}
        variant='rectangular'
      />
    );
  }

  return (
    <Box
      sx={sx}
      boxShadow={2}
      borderRadius={2}
      onMouseEnter={() => {
        setFocus(true);
      }}
      onMouseLeave={() => {
        setFocus(false);
      }}
      onClick={onClick}
    >
      <Grid container justifyContent='center' alignItems={alignTitle} direction='column' sx={{ height: '100%' }}>
        {typeof title === 'string' && !!title && (
          <Grid item marginBottom={2}>
            <Typography variant='subtitle1' sx={titleStyle}>
              {title}
            </Typography>
          </Grid>
        )}
        {typeof title !== 'string' && !!title && (
          <Grid item marginBottom={2}>
            {title}
          </Grid>
        )}

        <Grid item sx={{ height: '100%', width: '100%' }}>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Container;
