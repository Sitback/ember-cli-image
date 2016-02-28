import Ember from 'ember';
import ImgComponent from '../img-component';

const { reads } = Ember.computed;

/**
 * @private
 * ImgComponent class specifically for use in container views
 */
export default ImgComponent.extend({
  url: reads('parentView.url'),
  alt: reads('parentView.alt'),
  width: reads('parentView.width'),
  height: reads('parentView.height')
});
