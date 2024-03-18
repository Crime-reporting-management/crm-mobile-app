import {
  SafeAreaView,
  FlatList,
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Linking,
  TextInput,
} from 'react-native'

import { HomeStackNavProps } from '@navigation'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { LabelComponent } from '@components'
import { styled } from 'nativewind'

const StyledLoader = styled(ActivityIndicator)
const StyledView = styled(View)
const StyledLabel = styled(LabelComponent)

export const DashboardScreen: React.FC<HomeStackNavProps<'DashboardScreen'>> = ({}) => {
  useEffect(() => {
    getMealTimes()
  }, [])
  const [isLoading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  const [news, setNews] = useState([])
  const getMealTimes = async () => {
    const apiKey = '92ee8cfd783749af960608b07080f396' // Replace with your News API key
    const category = ''
    await axios
      .get(
        'https://newsapi.org/v2/top-headlines?country=in&apiKey=92ee8cfd783749af960608b07080f396'
      )
      .then(res => {
        setNews(res?.data?.articles)
        console.log(res?.data)
      })
      .catch(err => console.log(err, 'err'))
      .finally(() => {
        setLoading(false)
      })
  }
  function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', options)
  }

  return (
    <SafeAreaView>
      <StyledView>
        <StyledView />
        <StyledView className={'flex-row items-center p-6'}>
          <StyledView className={'bg-[#ffa726] rounded-full w-4 h-4 mr-2'} />
          <StyledLabel
            title={'Latest News Section'}
            className={'text-black font-bold text-2xl'}
          />
        </StyledView>
        <TextInput
          placeholder='Search news'
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
          style={styles.searchInput}
        />
        <FlatList
          data={news.filter(
            item =>
              item?.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item?.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item?.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item?.source?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item?.title?.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          contentContainerStyle={{ paddingBottom: 260 }}
          renderItem={({ item }) => {
            return (
              item?.urlToImage && (
                <StyledView className={''}>
                  <TouchableOpacity
                    style={styles.container}
                    onPress={() => {
                      Linking.openURL(item?.url)
                    }}>
                    <Image source={{ uri: item?.urlToImage }} style={styles.image} />
                    <View style={styles.content}>
                      <Text style={styles.title}>{item?.title}</Text>
                      <Text style={styles.description}>{item?.description}</Text>
                      <View style={styles.info}>
                        <Text style={styles.source}>{item?.source.name}</Text>
                        <Text style={styles.date}>{formatDate(item?.publishedAt)}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </StyledView>
              )
            )
          }}
          // horizontal={true}
          // pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
        />
      </StyledView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    overflow: 'hidden',
    marginHorizontal: 15,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#555',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  source: {
    fontSize: 14,
    color: '#888',
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
  searchInput: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 16,
    marginHorizontal: 15,
  },
})
