import React          from 'react';
import {
  View,
  Text,
  ImageBackground
}                     from 'react-native-web'
import idx            from 'idx'
import {Link}         from 'react-router-dom'
import {style}        from './style'

// type Props = {
//   pokemon: {
//     name: string,
//     height: {
//       minimum: string,
//       maximum: string
//     },
//     weight: {
//       minimum: string,
//       maximum: string
//     }
//   }
// }
export const PokemonListCell = function PokemonListCell(props){
  const { pokemon } = props
    return <View style={style.cell}>
    <Link style={{flex: 1}} to={`/pokemon/${pokemon.id}`}>
      <ImageBackground
        source={pokemon.image}
        style={style.pokemonImage}>
        <View style={style.pokemonBio}>
          <Text style={style.pokemonTitle}>
            {pokemon.name}
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
            # {pokemon.number}
          </Text>
        </View>
      </ImageBackground>
      </Link>
    </View>
}
