import PropTypes from 'prop-types';

import { Overlay } from './styles';

import charmander from '../../assets/images/gifs-do-charmander-21.gif';

export default function Loader({ isLoading }){
  if(!isLoading) {
    return null;
  }

  return (
    <Overlay>
      <img src={charmander} alt="loader" />
    </Overlay>
  );
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
