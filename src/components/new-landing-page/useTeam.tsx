// tslint:disable:no-expression-statement
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import path from 'path'
import { reduce } from 'lodash'
import { FixedObject } from 'gatsby-image'

const teamMembers: readonly TeamMember<FixedObject>[] = [
  {
    name: 'Will Weiss',
    title: 'Founder',
    image_file_name: 'will_weiss.png',
    background_color: 'humanPink',
    background_shape: 'square',
    fixed: undefined,
  },
  {
    name: 'Barbara Prusiewicz',
    title: 'Software Developer',
    image_file_name: 'barbara_prusiewicz.png',
    background_color: 'humanGold',
    background_shape: 'circle',
    fixed: undefined,
  },
  {
    name: 'Jackson Scher',
    title: 'Product Manager',
    image_file_name: 'jackson_scher.png',
    background_color: 'humanBlue',
    background_shape: 'square',
    fixed: undefined,
  },
  {
    name: 'Jorge Sagnovihs',
    title: 'Software Developer',
    image_file_name: 'jorge_sagnovihs.png',
    background_color: 'humanGreen',
    background_shape: 'square',
    fixed: undefined,
  },
  {
    name: 'Charlie Bitton',
    title: 'Head of human design',
    image_file_name: 'charlie_bitton.png',
    background_color: 'humanBlue',
    background_shape: 'circle',
    fixed: undefined,
  },
  {
    name: 'Shachar Langer',
    title: 'Software Developer',
    image_file_name: 'shachar_langer.png',
    background_color: 'humanGreen',
    background_shape: 'square',
    fixed: undefined,
  },
  {
    name: 'Ezhil Vendhan',
    title: 'Software Developer',
    image_file_name: 'ezhil_vendhan.png',
    background_color: 'humanGold',
    background_shape: 'square',
    fixed: undefined,
  },
  {
    name: 'Muhammad Alan',
    title: 'Software Developer',
    image_file_name: 'muhammad_alan.png',
    background_color: 'humanPink',
    background_shape: 'circle',
    fixed: undefined,
  },
]

// The GraphQL query type for the head shots
type AvatarData = {
  allFile: {
    edges: readonly {
      node: {
        childImageSharp: {
          fixed: FixedObject
        }
      }
    }[]
  }
}

type FlatAvatarData = {
  [fileName: string]: FixedObject
}

const useTeam = () => {
  const data = useStaticQuery<AvatarData>(graphql`
    query {
      allFile(filter: { relativeDirectory: { eq: "headshots" } }) {
        edges {
          node {
            childImageSharp {
              fixed(width: 140, height: 140) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  `)

  // Flatten the GraphQL data
  const imageSharpFixedByFileName: FlatAvatarData = reduce(
    data.allFile.edges,
    (result: FlatAvatarData, edge) => {
      const fixed = edge.node.childImageSharp.fixed
      const originalName = path.basename(fixed.src)
      result[originalName] = fixed
      return result
    },
    {}
  )

  // Update the 'fixed' attribute for all team members
  teamMembers.map(member => {
    Object.assign(member, { fixed: imageSharpFixedByFileName[member.image_file_name] })
  })
  return { teamMembers }
}

export default useTeam
