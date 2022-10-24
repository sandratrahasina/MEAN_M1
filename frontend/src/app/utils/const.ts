import { gql } from 'apollo-angular'

export const GET_MENUS_QUERY = gql`
  {
    menus {
      id
      nom
      prix
      photoUrl
      restaurant {
        id
        nom
      }
    }
  }
`

export const GET_MENUS_BY_RESTAURANT = gql`
  query getMenusByRestaurant($restaurantId: String!) {
    menusByRestaurant(restaurantId: $restaurantId) {
      id
      nom
      prix
      photoUrl
      restaurant {
        id
        nom
      }
    }
  }
`

export const CREATE_MENU = gql`
  mutation CreateMenu(
    $imageFile: Upload
    $nom: String!
    $prix: Int!
    $visible: Boolean
  ) {
    createMenu(
      imageFile: $imageFile
      nom: $nom
      prix: $prix
      visible: $visible
    ) {
      id
      nom
      prix
      visible
      photoUrl
      restaurant {
        id
        nom
        adresse
      }
    }
  }
`

export const GET_MY_MENUS = gql`
  {
    myMenus {
      id
      nom
      prix
      visible
      photoUrl
    }
  }
`
