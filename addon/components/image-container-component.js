import Ember from 'ember';
import ImageStateMixin from '../mixins/image-state-mixin';
import ImgComponent from './img-component';
import BackgroundImageComponent from './background-image-component';

const { reads } = Ember.computed;

/**
  A container component with a stateful image as a child component.
  Class names are updated according to the image's state.

  Instances of `ImageContainerComponent` can be created using the `image-container` Handlebars helper.
  ```handlebars
  {{image-container src="img/image1.jpg" alt="Image" width=100 height=100}}
  ```

  @class ImageContainerComponent
  @extends Ember.Component
  @uses ImageStateMixin
  @public
**/
export default Ember.Component.extend(ImageStateMixin, {
  classNames: ['image-view'],
  loadingClass: 'image-loading',
  errorClass: 'image-error',
  childComponents: [],

  /**
    If `background` is true, the container uses a `BackgroundImageView`
    as its child image view instead of the default `ImgView`

    @property background
    @type Boolean
    @default false
    @public
  */
  background: false,

  /**
    Proxy to child image's isLoading property

    @property isLoading
    @type Boolean
    @default false
    @public
  */
  isLoading: reads('imageView.isLoading'),

  /**
    Proxy to child image's isError property

    @property isError
    @type Boolean
    @default false
    @public
  */
  isError: reads('imageView.isError'),

  /**
    The child image component which is either an `ImgComponent` or
    `BackgroundImageComponent` based on the `background` property.

    @property imageView
    @type Ember.View
    @default Ember.ImgView
    @public
  */
  imageView: Ember.computed('background', function() {
    if (this.get('background')) {
      return BackgroundImageComponent.create();
    }
    return ImgComponent.create();
  }),

  /**
    @method _addImageViewChild
    @private
    Adds the sole child imageView
  */
  _addImageViewChild: Ember.on('init', function() {
    this.childComponents.push(this.get('imageView'));
  }),

  /**
    @method _onImageViewChanged
    @private
    Observes when the type of imageView is updated
    and recreates child views accordingly.
  */
  _onImageViewChanged: Ember.observer('imageView', function() {
    this.childComponents = [];
    this._addImageViewChild();
  })

});
