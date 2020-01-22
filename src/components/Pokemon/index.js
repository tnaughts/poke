import React                from 'react';
import gql                  from 'graphql-tag';
import { useQuery }         from '@apollo/react-hooks';
import {View, Text, Image}  from 'react-native-web'
import idx                  from 'idx'
import Loader               from 'react-loader-spinner'
import {Link}               from 'react-router-dom'

import {style}              from './style'

const POKEMON = gql`
  query pokemon($id: String!){
    pokemon(id: $id){
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
      types,
      evolutions{
        id,
        name
      },
      maxHP,
      maxCP
    }
  }
`

export const Pokemon = function Pokemon(props){
  const { loading, error, data } = useQuery(POKEMON, {variables: { id: idx(props, _ => _.match.params.id) }});
  const pokemon = idx(data, _ => _.pokemon)

  function renderEvolutions(){
    if(pokemon.evolutions.length > 0){
    return <>
    <Text style={style.pokemonText}>Evolutions: </Text>
    {pokemon.evolutions.map( (p) =>{
         return <li>{p.name}</li>
      })}</>
    }
    return null
  }

  function renderPokemon() {
    return <View style={style.container}>
    <Text style={style.title}>{pokemon.name}</Text>
    <Image source={pokemon.image} style={style.image}/>
      <View>
        <Text style={style.pokemonText}>
          # {pokemon.number}
        </Text>
        <Text style={style.pokemonText}>
          Height: {pokemon.height.minimum} to {pokemon.height.maximum}
        </Text>
        <Text style={style.pokemonText}>
          Weight: {pokemon.weight.minimum} to {pokemon.weight.maximum}
        </Text>
        <Text style={style.pokemonText}>
          Classification: {pokemon.classification}
        </Text>
        <Text style={style.pokemonText}>
          Resistant: {pokemon.resistant.join(", ")}
        </Text>
        <Text style={style.pokemonText}>
          Max HP: {pokemon.maxHP}
        </Text>
        <Text style={style.pokemonText}>
          Max CP: {pokemon.maxCP}
        </Text>
        {renderEvolutions()}
      </View>
    </View>

  }
  if(pokemon){
    return <>
    <Link to="/">
      Back
    </Link>
    {renderPokemon()}</>
  }
  if(loading){
    return <View style={style.loader}>
      <Loader
         type="Puff"
         color="#00BFFF"
         height={100}
         width={100}
         timeout={3000}/>
      </View>
  }
}
