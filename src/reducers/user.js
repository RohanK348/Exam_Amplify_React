export default function user(
  state = {
    name: 'Lucas smith',
    email: 'lucas@smith.com',
    location: 'Cupertino, CA',
    company: 'Apple, Inc.',
    description: 'Vital Database Dude',
    img: 'm1.png',
    color: 'green',
    country: 'Australia'
  },
  action
) {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        [`${action.key}`]: action.value
      }
    default:
      return state
  }
}
