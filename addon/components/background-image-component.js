import Ember from 'ember';
import ImageLoaderMixin from '../mixins/image-loader-mixin';

/**
  Loads a stateful image for its css background-image.
  Class names are updated according to the image state.

  @class BackgroundImageComponent
  @extends Ember.Component
  @uses ImageLoaderMixin
  @public
**/
export default Ember.Component.extend(ImageLoaderMixin, {
  attributeBindings: ['style'],
  classNames: ['background-image'],
  applyStyle: Ember.on('willLoad', function(url) {
    if (url) {
      let backgroundImageStyle = `background-image:url("${url}")`;
      this.set('style', backgroundImageStyle.htmlSafe());
    }
  })
});
