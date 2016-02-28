import Ember from 'ember';
import BackgroundImageComponent from '../background-image-component';

/**
 * @private
 * BackgroundImageComponent class specifically for use in container views
 */
export default BackgroundImageComponent.extend({
  url: Ember.computed.reads('parentView.url')
});
