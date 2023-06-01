import React, { useContext } from 'react';
import {
  Box, Button, Card, CardActions, CardContent, CardHeader, Container, Grid, Typography, styled
} from '@mui/material';
import { useRouter } from 'next/router'
import _ from 'lodash';
import { ModalContext } from '@/pages/_app';
import { Login } from '@/components';

type ICard = {
  title: string;
  path: string;
  description: Array<string>;
  buttonText: string;
  buttonVariant: string
}

const Cards = () => {
  const cardList: ICard[] = [
    {
      title: 'Admin',
      path: 'admin',
      description: [
        '10 users included',
        '2 GB of storage',
        'Help center access',
        'Email support',
      ],
      buttonText: 'Sign up for free',
      buttonVariant: 'contained',
    },
    {
      title: 'Member',
      path: 'member',
      description: [
        '20 users included',
        '10 GB of storage',
        'Help center access',
        'Priority email support',
      ],
      buttonText: 'Get started',
      buttonVariant: 'contained',
    },
    {
      title: 'Setting',
      path: 'setting',
      description: [
        '50 users included',
        '30 GB of storage',
        'Help center access',
        'Phone & email support',
      ],
      buttonText: 'Contact us',
      buttonVariant: 'contained',
    },
  ];

  // const cardRefs = useRef<null[] | HTMLDivElement[]>([]);
  const modal = useContext(ModalContext);
  const router = useRouter();

  type Props = {
    hoverShadow: number;
  };

  const options = {
    shouldForwardProp: (prop: string) => prop !== 'hoverShadow',
  };

  const StyledCard = styled(
    Card,
    options,
  )<Props>(({ theme, hoverShadow = 1 }) => ({
    ':hover': {
      boxShadow: theme.shadows[hoverShadow],
      background: 'gray'
    },
  }));

  const onPage = (item: ICard) => {
    console.log('item', modal);
    // router.push(`/${item.path}`);
    modal.current.show({
      title: 'Login',
      Content: <Login />
    });
  };

  // const onOverCard = (index: number) => {
  //   _.forEach(cardRefs.current, (node: null | HTMLDivElement, i: number) => {
  //     if (i === index) {
  //       node!.style.backgroundColor = 'red';
  //     } else {
  //       node!.style.backgroundColor = '';
  //     }
  //   })
  // };

  return (
    <Container maxWidth="md" component="main">
      <Grid container spacing={5} alignItems="flex-end">
        {cardList.map((tier, i) => (
          <Grid
            item
            key={tier.title}
            xs={12}
            sm={tier.title === 'Enterprise' ? 12 : 6}
            md={4}
          >
            <StyledCard
              hoverShadow={20}
              // onMouseOver={() => onOverCard(i)}
              // sx={{
              //   minWidth: 275,
              //   ':hover': {
              //     boxShadow: 20,
              //     background: 'red'
              //   },
              // }}
            >
              <CardHeader
                title={tier.title}
                // subheader={tier.subheader}
                titleTypographyProps={{ align: 'center' }}
                action={null}
                subheaderTypographyProps={{
                  align: 'center',
                }}
                sx={{
                  backgroundColor: '#90caf9'
                }}
              />
              <CardContent>
                {tier.description.map((line) => (
                  <Typography
                    // component="span"
                    variant="subtitle1"
                    align="center"
                    key={line}
                  >
                    {line}
                  </Typography>
                ))}
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant={tier.buttonVariant as 'outlined' | 'contained'}
                  onClick={() => onPage(tier)}
                >
                  {tier.buttonText}
                </Button>
              </CardActions>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Cards;