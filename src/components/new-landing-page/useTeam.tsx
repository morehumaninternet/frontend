// tslint:disable:no-expression-statement
import React from 'react'

const teamMembers: readonly TeamMember[] = [
  {
    name: 'Will Weiss',
    title: 'Founder',
    image_file_name: 'will_weiss.png',
    background_color: 'human-pink-bg',
    background_shape: 'square',
  },
  {
    name: 'Barbara Prusiewicz',
    title: 'Software Developer',
    image_file_name: 'barbara_prusiewicz.png',
    background_color: 'human-gold-bg',
    background_shape: 'circle',
  },
  {
    name: 'Jackson Scher',
    title: 'Product Manager',
    image_file_name: 'jackson_scher.png',
    background_color: 'human-blue-bg',
    background_shape: 'square',
  },
  {
    name: 'Charlie Bitton',
    title: 'Head of human design',
    image_file_name: 'charlie_bitton.png',
    background_color: 'human-blue-bg',
    background_shape: 'circle',
  },
  {
    name: 'Shachar Langer',
    title: 'Software Developer',
    image_file_name: 'shachar_langer.png',
    background_color: 'human-green-bg',
    background_shape: 'square',
  },
  {
    name: 'Ezhil Vendhan',
    title: 'Software Developer',
    image_file_name: 'ezhil_vendhan.png',
    background_color: 'human-gold-bg',
    background_shape: 'square',
  },
  {
    name: 'Ahmet Feyzi Ates',
    title: 'Software Developer',
    image_file_name: 'ahmet_feyzi_ates.png',
    background_color: 'human-pink-bg',
    background_shape: 'square',
  },
  {
    name: 'Muhammad Alan',
    title: 'Software Developer',
    image_file_name: 'muhammad_alan.png',
    background_color: 'human-pink-bg',
    background_shape: 'circle',
  },
  {
    name: 'Jorge Sagnovihs',
    title: 'Software Developer',
    image_file_name: 'jorge_sagnovihs.png',
    background_color: 'human-green-bg',
    background_shape: 'square',
  },
]

const useTeam = () => {
  return { teamMembers }
}

export default useTeam
