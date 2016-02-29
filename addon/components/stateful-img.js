import Ember from 'ember';
import layout from '../templates/components/stateful-img';
import ImageLoaderMixin from '../mixins/image-loader-mixin';

/**
  `stateful-img` renders a stateful `<img>` element whose loading and
  error states can be observed, and whose class names are updated accordingly.

  Instances of `stateful-img` can be created via:
  ```handlebars
  {{stateful-img src="img/image1.jpg" alt="Image" width=100 height=100}}
  ```

  @class StatefulImg
  @extends Ember.Component
  @uses ImageLoaderMixin
  @public
**/
export default Ember.Component.extend(ImageLoaderMixin, {
  layout,
  tagName: 'img',
  attributeBindings: ['alt', 'width', 'height'],

  /**
    @public
    @property imageLoader
    @type Object
    @default the img element itself
  */
  imageLoader: Ember.computed.reads('element'),

  /**
    @private
    @method _cancelLoadOnDestroy
    Cancels slow loading images when destroying view.
    Ember routing seems to hang otherwise.
  */
  _cancelLoadOnDestroy: Ember.on('willDestroyElement', function() {
    this.cancelImageLoad();
  })
});
