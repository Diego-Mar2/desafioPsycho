import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { Overlay } from './styles';

import charmander from '../../assets/images/gifs-do-charmander-21.gif';

export default function Loader({ isLoading }){
  if(!isLoading) {
    return null;
  }

  return ReactDOM.createPortal(
    <Overlay>
      <img src={charmander} alt="loader" />
    </Overlay>,
    document.querySelector('#loader-root'),
  );
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
