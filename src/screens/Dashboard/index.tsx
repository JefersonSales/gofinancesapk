import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { HighLightCard } from '../../components/HighLightCard';
import { TransactionsCard, TransactionsCardProps } from '../../components/TransactionsCard';

import { useTheme } from 'styled-components';

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
  TransactionList,
  LoadingIndicator
} from './styles'
export interface DataListProps extends TransactionsCardProps {
  id: string;
}

interface HighlightProps {
  amount: string
}
interface HighlightData {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps
}

export function Dashboard() {

  const theme = useTheme()

  const [isLoading, setIsLoading] = useState(true);
  const [transaction, setTransaction] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

  async function loadTransaction() {
    const dataKey = '@gofinances:transaction';
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionFormatted: DataListProps[] = transactions
      .map((item: DataListProps) => {

        if (item.type === 'positive') {
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        }

        const amount = Number(item.amount)
          .toLocaleString('pt-BT', {
            style: 'currency',
            currency: 'BRL'
          });

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date,
        }

      });

    setTransaction(transactionFormatted)

    const total = entriesTotal - expensiveTotal;
    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      },
      expensives: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      }
    })
    setIsLoading(false);
  };

  useEffect(() => {
    loadTransaction();
  }, []);

  useFocusEffect(useCallback(() => {
    loadTransaction();
  }, []));

  return (
    <Container>
      {
        isLoading ?
          <LoadingIndicator>
            <ActivityIndicator
              color={theme.colors.primary}
              size="large"
            />
          </LoadingIndicator>
          :
          <>

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
                amount={highlightData.entries.amount}
                lastTransaction="ùltima entrada dia 13 de Janeiro"
              />
              <HighLightCard
                type="down"
                title="Saídas"
                amount={highlightData.expensives.amount}
                lastTransaction="ùltima saída dia 30 de Janeiro"
              />
              <HighLightCard
                type="total"
                title="Total"
                amount={highlightData.total.amount}
                lastTransaction="01 à 30 Janeiro"
              />
            </HighLightCards>

            <Transactions>
              <Title>Listagem</Title>

              <TransactionList
                data={transaction}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <TransactionsCard data={item} />}
              />

            </Transactions>
          </>}

    </Container>
  )
}