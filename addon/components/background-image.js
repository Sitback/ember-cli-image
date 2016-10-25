import Ember from 'ember';
import layout from '../templates/components/background-image';
import ImageLoaderMixin from '../mixins/image-loader-mixin';

const { Component, String: EmberString, on } = Ember;

/**
  Loads a stateful image for its css background-image.
  Class names are updated according to the image state.

  @class BackgroundImage
  @extends Ember.Component
  @uses ImageLoaderMixin
  @public
**/
export default Component.extend(ImageLoaderMixin, {
  layout,
  attributeBindings: ['style'],
  classNames: ['background-image'],

  applyStyle: on('willLoad', function(url) {
    if (url) {
      let backgroundImageStyle = `background-image:url("${url}")`;
      this.set('style', EmberString.htmlSafe(backgroundImageStyle));
    }
  })
});
