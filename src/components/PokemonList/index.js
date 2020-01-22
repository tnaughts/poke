import React, {useEffect, useState}   from 'react';
import gql                            from 'graphql-tag';
import { useQuery }                   from '@apollo/react-hooks';
import {
  FlatList, 
  View, 
  Text, 
  ImageBackground, 
  TouchableOpacity, 
  Picker
}                                     from 'react-native-web'
import idx                            from 'idx'
import _                              from 'lodash'
import Loader                         from 'react-loader-spinner'

import {style}                        from './style'
import {PokemonListCell}              from './PokemonListCell'

const POKEMON_LIST = gql`{
  pokemons(first: 151){
    id
    name
    image
    number
    resistant
    weaknesses
    height{
      minimum
      maximum
    }
    weight{
      minimum
      maximum
    }
    classification
    types
  }
}`

export const PokemonList = function PokemonList(props){
  const [pokemon, setPokemon] = useState([])
  const [filteredPokemon, setFilteredPokemon] = useState([])
  const { loading, error, data } = useQuery(POKEMON_LIST);
  
  useEffect(
    function setPokemonFromApi(){
      setPokemon(idx(data, _ => _.pokemons) || [])
    },
    [data]
  )
  
  function renderItem({item: pokemon}){
    return <PokemonListCell pokemon={pokemon}/>
  }

  function sortBy(attr){
    if (pokemon && pokemon.length > 1) {
      const sortedPokemon = _.orderBy(pokemon, attr)
      setPokemon(sortedPokemon)
    }
  }
  
  return <View style={style.container}>
    <h1>Pokemon</h1>
    <View style={style.picker}>
    <Text>Sort: </Text><Picker
      style={{flex: 1}}
      multiple={false}
      onValueChange={(itemValue, itemIndex) => {
        sortBy(itemValue)
      }}>
      <Picker.Item label="Numerically" value="number" />
      <Picker.Item label="Alphabetically" value="name" />
    </Picker>
    </View>
    {loading ? 
      <View style={style.loader}>
        <Loader
           type="Puff"
           color="#00BFFF"
           height={100}
           width={100}
           timeout={3000}/>
        </View>
      :
      <FlatList
        data={pokemon}
        renderItem={renderItem}
        initialNumToRender={20}
        numColumns={2}
        horizontal={false}
        columnWrapperStyle={{justifyContent:'space-between'}}/>
    }
  </View>
}