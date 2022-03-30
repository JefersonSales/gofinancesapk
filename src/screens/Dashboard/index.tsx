import React from 'react';
import { HighLightCard } from '../../components/HighLightCard';
import { TransactionsCard, TransactionsCardProps } from '../../components/TransactionsCard';

import {
  Container,
  Header,
  UserInfo,
  UserWrapper,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighLightCards,
  Transactions,
  Title,
  TransactionList
} from './styles'

export interface DataListProps extends TransactionsCardProps {
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: '1',
      type: 'positive',
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: {
        name: 'Vendas',
        icon: 'dollar-sign',
      },
      date: "13/04/2020"
    },
    {
      id: '2',
      type: 'negative',
      title: "Hamburgueria Pizzi",
      amount: "R$ 59,00",
      category: {
        name: 'Alimentação',
        icon: 'coffee',
      },
      date: "10/04/2020"
    }, {
      id: '3',
      type: 'negative',
      title: "Aluguel do apartamento",
      amount: "R$ 1.200,00",
      category: {
        name: 'Casa',
        icon: 'shopping-bag',
      },
      date: "10/04/2020"
    },
  ];

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/23359852?v=4' }} />
            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>Jeferson</UserName>
            </User>
          </UserInfo>

          <Icon name="power" />
        </UserWrapper>

      </Header>
      <HighLightCards>
        <HighLightCard
          type="up"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="ùltima entrada dia 13 de Janeiro"
        />
        <HighLightCard
          type="down"
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="ùltima saída dia 30 de Janeiro"
        />
        <HighLightCard
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 30 Janeiro"
        />
      </HighLightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionsCard data={item} />}
        />

      </Transactions>
    </Container>
  )
}